import { App } from 'vue';
import { CookiesConfig, Cookies } from '@/models';

const defaultConfig: CookiesConfig = {
  expireTimes: '1d',
  path: '; path=/',
  domain: '',
  secure: false,
  sameSite: '; SameSite=Lax'
};

class CookiesManager implements Cookies {
  private currentDefaultConfig: CookiesConfig;

  constructor () {
    this.currentDefaultConfig = defaultConfig;
  }

  config (config: CookiesConfig): void {
    this.currentDefaultConfig = {
      ...defaultConfig,
      ...config
    };
  }

  get (keyName: string): any {
    let value = decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(keyName).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;

    if (value && value.substring(0, 1) === '{' && value.substring(value.length - 1, value.length) === '}') {
      try {
        value = JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  }

  set (keyName: string, value: any, expireTimes?: string | number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: string): this {
    if (!keyName) {
      throw new Error('Cookie name is not found in the first argument.');
    } else if (/^(?:expires|max-age|path|domain|secure|SameSite)$/i.test(keyName)) {
      throw new Error('Cookie name illegality. Cannot be set to ["expires","max-age","path","domain","secure","SameSite"]\t current key name: ' + keyName);
    }
    // support json object
    if (value && value.constructor === Object) {
      value = JSON.stringify(value);
    }
    let _expires = '';
    if (expireTimes === undefined) {
      expireTimes = this.currentDefaultConfig.expireTimes ? this.currentDefaultConfig.expireTimes : '';
    }
    if (expireTimes && expireTimes !== 0) {
      switch (expireTimes.constructor) {
      case Number:
        if (expireTimes === Infinity || expireTimes === -1) _expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
        else _expires = '; max-age=' + expireTimes;
        break;
      case String:
        if (/^(?:\d+(y|m|d|h|min|s))$/i.test(expireTimes as string)) {
          // get capture number group
          const _expireTime = (expireTimes as string).replace(/^(\d+)(?:y|m|d|h|min|s)$/i, '$1');
          // get capture type group , to lower case
          switch ((expireTimes as string).replace(/^(?:\d+)(y|m|d|h|min|s)$/i, '$1').toLowerCase()) {
          // Frequency sorting
          case 'm':
            _expires = '; max-age=' + +_expireTime * 2592000;
            break; // 60 * 60 * 24 * 30
          case 'd':
            _expires = '; max-age=' + +_expireTime * 86400;
            break; // 60 * 60 * 24
          case 'h':
            _expires = '; max-age=' + +_expireTime * 3600;
            break; // 60 * 60
          case 'min':
            _expires = '; max-age=' + +_expireTime * 60;
            break; // 60
          case 's':
            _expires = '; max-age=' + _expireTime;
            break;
          case 'y':
            _expires = '; max-age=' + +_expireTime * 31104000;
            break; // 60 * 60 * 24 * 30 * 12
          default:
            throw new Error('unknown exception of "set operation"');
          }
        } else {
          _expires = '; expires=' + expireTimes;
        }
        break;
      case Date:
        _expires = '; expires=' + (expireTimes as Date).toUTCString();
        break;
      }
    }
    document.cookie =
      encodeURIComponent(keyName) + '=' + encodeURIComponent(value) +
      _expires +
      (domain ? '; domain=' + domain : (this.currentDefaultConfig.domain ? this.currentDefaultConfig.domain : '')) +
      (path ? '; path=' + path : (this.currentDefaultConfig.path ? this.currentDefaultConfig.path : '; path=/')) +
      (secure === undefined ? (this.currentDefaultConfig.secure ? '; Secure' : '') : secure ? '; Secure' : '') +
      (sameSite === undefined ? (this.currentDefaultConfig.sameSite ? '; SameSute=' + this.currentDefaultConfig.sameSite : '') : (sameSite ? '; SameSite=' + sameSite : ''));
    return this;
  }

  remove (keyName: string, path?: string, domain?: string): boolean {
    if (!keyName || !this.isKey(keyName)) {
      return false;
    }
    document.cookie = encodeURIComponent(keyName) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (domain ? '; domain=' + domain : (this.currentDefaultConfig.domain ? this.currentDefaultConfig.domain : '')) +
      (path ? '; path=' + path : (this.currentDefaultConfig.path ? this.currentDefaultConfig.path : '; path=/')) +
      '; SameSite=Lax';
    return true;
  }

  isKey (keyName: string): boolean {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(keyName).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
  }

  keys (): string[] {
    if (!document.cookie) return [];
    const _keys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:=[^;]*)?;\s*/);
    for (let _index = 0; _index < _keys.length; _index++) {
      _keys[_index] = decodeURIComponent(_keys[_index]);
    }
    return _keys;
  }
}

export function install (app: App, options?: CookiesConfig): void {
  app.config.globalProperties.$cookies = new CookiesManager();
  if (options) {
    app.config.globalProperties.$cookies.config(options);
  }
};
