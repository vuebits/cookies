<h1 align="center">Vuebits cookies</h1>

<h4 align="center">*** Maintainers & Contributors welcome ***</h4>

<h4 align="center">Vue 3 library for cookies management</h4>

---

## Table of Contents

* [Installation](#installation)
* [API](#api)
* [Documentation](#documentation)


## Installation

`npm i @vuebits/cookies` / `yarn add @vuebits/cookies`

And install in your entry file (e.g. `main.js`):

```javascript
import { createCookies } from '@vuebits/cookies';

createApp(App).use(createCookies({ /* your config here */ })).mount('#app');
```

## API

### Available functions:

* `createCookies (options: CookiesConfig)`:

```ts
interface CookiesConfig {
  expireTimes?: string | number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: string;
}
```

### Vue instance properties and methods:

* `$cookies: Cookies`:

```ts
interface Cookies {
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
```

### Examples

```vue
<template>
  <main>
    <button @click="setCookie">
      Set cookie "test"
    </button>
    <button @click="getCookie">
      Get cookie "test"
    </button>
    <button @click="removeCookie">
      Remove cookie "test"
    </button>
    <div>
      cookie "test": {{ cookie }}
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data () {
    return {
      cookie: null as any
    };
  },
  methods: {
    setCookie (): void {
      this.$cookies.set('test', 123);
    },
    getCookie (): void {
      this.cookie = this.$cookies.get('test');
    },
    removeCookie (): void {
      this.$cookies.remove('test');
    }
  }
});
</script>
```
