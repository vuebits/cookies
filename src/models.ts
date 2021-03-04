export interface CookiesConfig {
  expireTimes?: string | number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: string;
}

export interface Cookies {
  config(config: CookiesConfig): void;
  set(keyName: string,
    value: any,
    expireTimes?: string | number | Date,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: string): this;
  get(keyName: string): any;
  remove(keyName: string, path?: string, domain?: string): boolean;
  isKey(keyName: string): boolean;
  keys(): string[];
}
