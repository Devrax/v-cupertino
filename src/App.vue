<template>
  <div>
    <h1>Welcome!</h1>
    <v-cupertino>
      <div style="color: #2c3e50;">Hola Mundo!</div>
    </v-cupertino>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VCupertino from "./components/VCupertino.vue";

export default defineComponent({
  name: "App",
  components: {
    VCupertino,
  },
});
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f4f4f4;
}

</style>
