<template>
  <div class="header">
    <van-nav-bar
      :title="route.name"
      :left-arrow="route.name !== 'index'"
      @click-left="router.back()"
      @click-right="router.push('/login')"
    >
      <template #right>
        <van-icon name="friends-o" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup>
  const router = useRouter();
  const route = useRoute();
</script>

<style lang="less" scoped>
  .header {
    .van-nav-bar {
      background-color: @green;
    }
  }
</style>
