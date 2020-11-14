<template>
  <div class="cupertino-container">
    <slot></slot>

    <div class="cupertino-pane">
      hola mundo
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';

export default defineComponent({
  name: 'VCupertino',
  props: ['options'],
  setup(props) {

    onMounted(() => {
      const options = props?.options || {
        initialBreak: 'bottom',
        parentElement: '.cupertino-container',
        breaks: {
          top: { // Topper point that pane can reach
            enabled: true, // Enable or disable breakpoint
            height: 700, // Pane breakpoint height
            bounce: true // Bounce pane on transition
          },
          middle: {
            enabled: true, // Enable or disable breakpoint
            height: 400, // Pane breakpoint height
            bounce: true // Bounce pane on transition
          },
          bottom: { 
            enabled: true, // Enable or disable breakpoint
            height: 200, // Pane breakpoint height
            bounce: true // Bounce pane on transition
          }
        }
      };

      const settings: CupertinoSettings = reactive(options);
      const cupertino: CupertinoPane = new CupertinoPane('.cupertino-pane', settings);
      cupertino.present({animate: true});
    })

    return {}


  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
