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

<script setup>
  import BScroll from '@better-scroll/core';
  import PullDown from '@better-scroll/pull-down';
  import { ref } from 'vue';
  const Props = defineProps({
    pullDown: { type: Boolean, default: false },
    pullDownRefresh: { type: () => Promise, default: () => Promise.resolve(true) },
  });
  let BS = null;
  const beforePullDown = ref(true);
  const isPullingDown = {};
  const scrollOptions = {};
  if (Props.pullDown) {
    BScroll.use(PullDown);
    scrollOptions.pullDownRefresh = true;
  }

  onMounted(() => {
    let wrapper = document.getElementById('scroll');

    BS = new BScroll(wrapper, scrollOptions);
    BS.on('pullingDown', pullingDownHandler);
  });
  async function pullingDownHandler() {
    beforePullDown.value = false;
    isPullingDown.value = true;
    const result = await Props.pullDownRefresh();
    if (result) {
      isPullingDown.value = false;
      setTimeout(() => {
        finishPullDown();
      }, 100);
    }
  }
  function getInstance() {
    return BS;
  }
  function finishPullDown() {
    BS.finishPullDown();
    BS.refresh();
    beforePullDown.value = true;
  }
  defineExpose({
    getInstance,
    finishPullDown,
  });
</script>

<style lang="less" scoped>
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
