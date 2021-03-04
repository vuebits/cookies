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
  name: 'VApp',
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

<style lang="scss">
</style>
