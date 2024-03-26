import { defineComponent } from 'vue'
import { ElFooter } from 'element-plus'
import styles from './index.module.scss'

export default defineComponent({
  name: 'page-footer',
  setup() {
    return () => (
      <>
        <ElFooter class={styles.page_footer}>
          <div class={styles.page_footer_link}>
            <span>© 麦云分享. All rights reserved</span>
          </div>
        </ElFooter>
      </>
    )
  }
})
