<template>
  <v-cupertino>
    <img alt="Vue logo" src="./assets/logo.png">
  </v-cupertino>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VCupertino from './components/VCupertino.vue';

export default defineComponent({
  name: 'App',
  components: {
    VCupertino
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
