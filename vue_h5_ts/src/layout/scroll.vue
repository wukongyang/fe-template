<template>
  <div id="scroll" class="scroll-warp">
    <div class="scroll-content">
      <div v-if="pullDown" class="pulldown-wrapper">
        <div v-show="beforePullDown">
          <span>下拉刷新...</span>
        </div>
        <div v-show="!beforePullDown">
          <div v-show="isPullingDown">
            <span>加载中...</span>
          </div>
          <div v-show="!isPullingDown">
            <span>加载成功</span>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BScroll, { Options, BScrollInstance } from '@better-scroll/core';
  import PullDown from '@better-scroll/pull-down';
  import { ref } from 'vue';
  const Props = withDefaults(
    defineProps<{
      pullDown?: boolean;
    }>(),
    {
      pullDown: false,
    }
  );
  let BS: BScrollInstance;
  const beforePullDown = ref(true);
  const isPullingDown = ref(false);

  const scrollOptions: Options = {};
  if (Props.pullDown) {
    BScroll.use(PullDown);
    scrollOptions.pullDownRefresh = true;
  }

  // import watermark from '@/utils/lib/watermark';
  // import copyPaste from '@/utils/lib/copy-paste';

  onMounted(() => {
    // 因为debug是存入localStorage中的，刷新页面会从localStorage取出，根据debug控制是否隐藏
    let wrapper = document.getElementById('scroll') as HTMLElement;

    BS = new BScroll(wrapper, scrollOptions);
    BS.on('pullingDown', pullingDownHandler);
    // const { username = '', mobile = '' } = auth.getUser();
    // watermark.add({
    //   // content: username + ' ' + mobile,
    // });
    // copyPaste.disable();
  });
  function pullingDownHandler() {
    beforePullDown.value = false;
    isPullingDown.value = true;
    console.log('pullingDownHandler');
    setTimeout(() => {
      isPullingDown.value = false;
      setTimeout(() => {
        BS.finishPullDown();
        BS.refresh();
        beforePullDown.value = true;
      }, 100);
    }, 1000);
  }
</script>

<style lang="less" scoped>
  // .layout {
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   .header {
  //     position: fixed;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: @header-height;
  //     z-index: 1;
  //     box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  //   }
  //   .content {
  //     padding: 16px;
  //     margin-top: @header-height;
  //     height: calc(100% - @header-height);
  //     overflow: auto;
  //   }
  // }
  .scroll-warp {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
    .scroll-content {
      padding-bottom: 100px;
    }
  }
  .pulldown-wrapper {
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transform: translateY(-100%) translateZ(0);
    text-align: center;
    color: #999;
  }
</style>
