<template>
  <div :class="containerClass">
    <div :class="targetClass" ref="pane">
      <keep-alive>
        <component :is="entryComponent"></component>
      </keep-alive>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref, watch } from "vue";
import { CupertinoPane, CupertinoSettings } from "cupertino-pane";

const CUPERTINODEFAULTOPTS: CupertinoSettings = {
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
      type: Object as PropType<CupertinoSettings>,
      default: (): CupertinoSettings => Object.assign({}, CUPERTINODEFAULTOPTS),
    },
    entryAnimation: {
      type: Boolean,
      default: true,
    },
    entryComponent: {
      type: Object as PropType<unknown>,
      default: () => null,
    },
    isPresent: {
      type: Boolean,
      default: true
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props, { emit }) {
    const cupertino: Ref<CupertinoPane | null> = ref(null);
    const pane: Ref<HTMLDivElement> = ref(document.createElement("div"));
    const containerClass = `cupertino-container${props.id ? '-' + props.id : props.id}`;
    const targetClass = `cupertino-pane${props.id ? '-' + props.id : props.id}`;

    const staticOpts = {
      parentElement: `.${containerClass}`,
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
        `.${targetClass}`,
        options
      ) as CupertinoPane;

      if(props.isPresent) cupertino.value.present({ animate: props.entryAnimation });

      return cupertino.value;
    };

    onMounted(() => {
      initCupertino(Object.assign<Partial<CupertinoSettings>, CupertinoSettings>(props.drawerOptions, staticOpts));
    });

    watch(
      () => props.drawerOptions,
      () => {
        (cupertino.value as CupertinoPane).destroy({
          animate: props.entryAnimation,
        });
        setTimeout(
          () => initCupertino(Object.assign<Partial<CupertinoSettings>, CupertinoSettings>(props.drawerOptions, staticOpts)),
          1000
        );
      }
    );

    watch(
      () => props.isPresent,
      () => {
        props.isPresent 
        ? (cupertino.value as CupertinoPane).present({ animate: props.entryAnimation }) 
        : (cupertino.value as CupertinoPane).hide();
      }
    )

    return {
      pane,
      initCupertino,
      cupertino,
      containerClass,
      targetClass
    };
  },
});
</script>