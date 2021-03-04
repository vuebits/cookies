import { App } from 'vue';
import { CookiesConfig, Cookies } from './models';
import { install } from './library';

export function createCookies (options: CookiesConfig): {install: (T: App) => void} {
  return {
    install: (app: App): void => install(app, options)
  };
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $cookies: Cookies;
  }
}
