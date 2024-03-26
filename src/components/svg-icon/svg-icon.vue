<template>
  <svg :class="svgClass" :style="iconStyle" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue'

interface SvgIcon {
  iconClass: string
  prefix?: string
  className?: string
  iconStyle?: object
}

export default defineComponent({
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    prefix: {
      type: String,
      defualt: 'icon'
    },
    iconStyle: {
      type: Object,
      defualt: () => {}
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props: SvgIcon) {
    const iconAttrs = reactive({
      iconStyle: computed(() => props.iconStyle),
      iconName: computed(() =>
        props.prefix ? `#${props.prefix}-${props.iconClass}` : `#${props.iconClass}`
      ),
      svgClass: computed(() => 'svg-icon')
    })

    return {
      ...toRefs(iconAttrs)
    }
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
