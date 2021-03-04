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
  hyphenate?: boolean;
}
```

### Vue instance properties and methods:

* `$bem ({ b, e, m }: BemItem): string[]`:

```ts
interface BemItem {
  b?: string;
  e?: string;
  m?: string | string[] | {[key in string]: boolean};
}
```

## Examples

### Using component name by default:

```vue
<template>
  <div :class="$bem({})"> <!-- $bem({}) will return 'hello-world' -->
    Hello world!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'hello-world'
});
</script>

<style lang="scss">
.hello-world {
  // some styles here
}
</style>

```

### Using hyphenated component name:

If you use PascalCase naming convence you should init library with `hyphenate` option:

```js
import { createCookies } from '@vuebits/cookies';

createApp(App).use(createCookies({
  hyphenate: true
})).mount('#app');
```

and then:

```vue
<template>
  <div :class="$bem({})"> <!-- returns ['hello-world'] -->
    Hello world!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld'
});
</script>

<style lang="scss">
.hello-world {
  // some styles here
}
</style>

```

### Custom block name:

```vue
<template>
  <div :class="$bem({b: 'custom-block'})"> <!-- returns ['custom-block'] -->
    Hello world!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld'
});
</script>

<style lang="scss">
.custom-block {
  // some styles here
}
</style>

```

### Element name:

```vue
<template>
  <div :class="$bem({})"> <!-- (or $bem({b: 'hello-world'})) - return ['hello-world'] -->
    <h1 :class="$bem({e: 'title'})"> <!-- (or $bem({b: 'hello-world', e: 'title'})) - returns ['hello-world__title'] -->
      Hello world!
    </h1>
    <p :class="$bem({e: 'description'})"> <!-- (or $bem({b: 'hello-world', e: 'description'})) - returns ['hello-world__description'] -->
      This is a description
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld'
});
</script>

<style lang="scss">
.hello-world {
  // some styles here
  &__title {
    // some styles here
  }
  &__description {
    // some styles here
  }
}
</style>

```

### Inline modfiers:

```vue
<template>
  <div :class="$bem({})"> <!-- returns ['hello-world'] -->
    <p :class="$bem({e: 'text', m: ['underlined']})"> <!-- returns ['hello-world__text', 'hello-world__text--underlined'] -->
      This is a description
    </p>
    <p :class="$bem({e: 'text', m: ['underlined', 'highlighted']})"> <!-- returns ['hello-world__text', 'hello-world__text--underlined', 'hello-world__text--highlighted'] -->
      This is a description
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld'
});
</script>

<style lang="scss">
.hello-world {
  // some styles here
  &__text {
    // some styles here
    &--underlined {
      // some styles here
    }
    &--highlighted {
      // some styles here
    }
  }
}
</style>

```

### Conditional modfiers:

```vue
<template>
  <div :class="$bem({})"> <!-- returns ['hello-world'] -->
    <p :class="$bem({e: 'description', m: {underlined: true, highlighted: isHighlighted}})"> <!-- returns ['hello-world__description', 'hello-world__description--underlined'] -->
      This is a description
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {
      isHighlighted: false
    };
  }
});
</script>

<style lang="scss">
.hello-world {
  // some styles here
  &__description {
    // some styles here
    &--underlined {
      // some styles here
    }
    &--highlighted {
      // some styles here
    }
  }
}
</style>

```
