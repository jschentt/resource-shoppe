import { defineComponent, PropType, unref, computed } from 'vue'
import { SvgIcon } from '@/components/svg-icon'
import { isString } from '@/libs/is'

export default defineComponent({
  name: 'icon-font',
  props: {
    type: {
      type: String as PropType<string>,
      default: ''
    },
    color: {
      type: String as PropType<string>,
      default: 'unset'
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 14
    },
    scriptUrl: {
      // 阿里图库字体图标路径
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props, { attrs }) {
    const wrapStyleRef = computed(() => {
      const { color, size } = props

      const fs = isString(size) ? parseFloat(size) : size

      return {
        color,
        fontSize: `${fs}px`
      }
    })

    return () => (
      <SvgIcon
        iconClass={props.type || ''}
        prefix={''}
        {...attrs}
        iconStyle={unref(wrapStyleRef)}
      />
    )
  }
})
