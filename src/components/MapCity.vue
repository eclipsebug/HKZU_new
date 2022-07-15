<template>
  <div>
    <div class="top">
      <div class="city">
        <span @click="city">{{hotCityNow.label}}<van-icon name="arrow-down" /></span>
      </div>

      <van-search
        v-model="value"
        class="searcg"
        background="transparent"
        show-action
        placeholder="请输入搜索关键词"
      >
        <template #action>
          <div @click="map"><van-icon name="location-o" /></div>
        </template>
      </van-search>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  methods: {
    map () {
      this.$router.push('/map')
    },
    city () {
      this.$router.push('/city')
    }
  },
  computed:{
    ...mapState(['hotCityNow'])
  }
}
</script>

<style lang="less" scoped>
.searcg {
     position: absolute;
    top: 0;
    left: 1rem;
    width: 80%;
    z-index: 1;
}
.city {
 position: absolute;
    top: 0.5rem;
    left: 0.2rem;
    z-index: 1;
}
</style>
