<template>
  <div class="channel-edit">
    <van-cell title="我的频道">
      <template #default>
        <van-button class="edit-btn" plain round type="danger">编辑</van-button>
      </template>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value">
        <div class="text">
          <span>{{ value }}</span>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "ChannelEdit",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.edit-btn {
  width: 130px;
  height: 50px;
}
/deep/.van-grid-item__content {
  background-color: #f4f5f6;
}
.text {
  color: #646566;
  font-size: 0.32rem;
  line-height: 1.5;
  word-break: break-all;
}
</style>
