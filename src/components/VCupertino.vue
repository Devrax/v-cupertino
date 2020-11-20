<template>
  <div class="cupertino-container">
    <div class="cupertino-pane" ref="pane">
      <keep-alive>
        <component :is="entryComponent"></component>
      </keep-alive>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from "vue";
import { CupertinoPane, CupertinoSettings } from "cupertino-pane";

export const CUPERTINODEFAULTOPTS: CupertinoSettings = {
    initialBreak: "bottom",
    breaks: {
      middle: {
        enabled: true,
        height: 500,
        bounce: true,
      },
      bottom: {
        enabled: true,
        height: 100,
        bounce: true,
      },
    },
  };

export default defineComponent({
  name: "VCupertino",
  props: {
    drawerOptions: {
      type: Object,
      default: (): CupertinoSettings => ({ ...CUPERTINODEFAULTOPTS }),
    },
    entryAnimation: {
      type: Boolean,
      default: true,
    },
    entryComponent: {
      type: Object,
      default: () => null,
    },
  },
  setup(props, { emit }) {
    const cupertino: Ref<CupertinoPane | null> = ref(null);
    const pane: Ref<HTMLDivElement> = ref(document.createElement("div"));

    const staticOpts = {
      parentElement: ".cupertino-container",
      onDidDismiss: () => emit("did-dismiss"),
      onWillDismiss: () => emit("will-dismiss"),
      onDidPresent: () => emit("did-present", cupertino),
      onWillPresent: () => emit("will-present", cupertino),
      onDragStart: () =>
        emit("drag-start", Math.round(pane.value.getBoundingClientRect().y)),
      onDrag: () =>
        emit("drag", Math.round(pane.value.getBoundingClientRect().y)),
      onDragEnd: () =>
        emit("drag-end", Math.round(pane.value.getBoundingClientRect().y)),
      onBackdropTap: () => emit("backdrop-tap"),
      onTransitionStart: () => emit("transition-start"),
      onTransitionEnd: () => emit("transition-end"),
    };

    const initCupertino = (options: CupertinoSettings): CupertinoPane => {
      cupertino.value = new CupertinoPane(
        ".cupertino-pane",
        options
      ) as CupertinoPane;

      cupertino.value.present({ animate: props.entryAnimation });

      return cupertino.value;
    };

    onMounted(() => {
      initCupertino({
        ...props.drawerOptions,
        ...staticOpts,
      } as CupertinoSettings);
    });

    watch(
      () => props.drawerOptions,
      () => {
        (cupertino.value as CupertinoPane).destroy({
          animate: props.entryAnimation,
        });
        setTimeout(
          () => initCupertino({ ...props.drawerOptions, ...staticOpts }),
          1000
        );
      }
    );

    return {
      pane,
      initCupertino,
      cupertino,
    };
  },
});
</script>
