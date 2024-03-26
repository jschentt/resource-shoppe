<template>
  <div class="page-choose-project">
    <!--页面主体-->
    <div class="page-body">
      <div class="page-body-inner">
        <p class="title-welcome">SORRY</p>
        <p class="title-2">您暂无权限访问该界面</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: 'no-permission'
})
</script>
<style lang="scss" scoped>
.page-choose-project {
  position: relative;
  height: 100vh;
  .page-body {
    position: relative;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 1px;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
    background-image: url(@/assets/pics/login_bg_1366.png);
    .page-sidebar {
      position: absolute;
      top: 5%;
      left: 30px;
      z-index: 4;
      width: 270px;
      height: 90%;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(227, 228, 228, 1);
      border-radius: 6px;
    }
    .page-body-inner {
      position: relative;
      top: 50%;
      z-index: 3;
      width: 400px;
      height: 300px;
      margin-top: -150px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.4;
      text-align: center;
      .title-welcome {
        font-size: 36px;
        font-weight: bold;
        color: rgba(228, 230, 235, 1);
      }
      .title-2 {
        font-size: 28px;
        font-weight: bold;
        color: rgba(58, 157, 128, 1);
      }
      .title-des {
        line-height: 1.8;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
}
/**
  用于css媒体查询设置
  */

@media screen and (max-width: 1900px) {
  .page-body {
    background-image: url(~assets/pics/login_bg.png);
  }
}
@media screen and (max-width: 1600px) {
  .page-body {
    background-image: url(~assets/pics/login_bg_1366.png);
  }
}
</style>
