<template>
  <div>
    <van-nav-bar
      :title="title1"
      left-arrow
      class="title"
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  props: {
    title1: {
      type: String,
      require: true,
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  background-color: green;
  /deep/.van-nav-bar__title {
    color: white;
  }
  /deep/ .van-icon {
    color: white;
  }
}
</style>
