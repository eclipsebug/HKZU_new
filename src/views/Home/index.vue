<template>
  <div>
    <div v-if="isShow">
      <!-- 首页 -->
      <MapCity></MapCity>
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" class="swipe">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 导航 -->
      <div class="nav">
        <van-grid :gutter="10">
          <van-grid-item
            class="nav-icon"
            icon="wap-home-o"
            icon-size="60px"
            text="整租"
          />
          <van-grid-item
            class="nav-icon"
            icon="wap-home-o"
            icon-size="60px"
            text="整租"
          />
          <van-grid-item
            class="nav-icon"
            icon="wap-home-o"
            icon-size="60px"
            text="整租"
          />
          <van-grid-item
            class="nav-icon"
            icon="wap-home-o"
            icon-size="60px"
            text="整租"
          />
        </van-grid>
      </div>
      <main class="group">
        <!-- 显示 -->
        <van-nav-bar left-text="租房小组" right-text="更多" class="zhu" />
        <van-grid direction="horizontal" :column-num="2">
          <van-grid-item
            v-for="item in groupList"
            :key="item.id"
            :icon="item.imgSrc"
            :text="item.title + item.desc"
          />
        </van-grid>
      </main>
      <!-- 底部 -->
      <van-tabbar v-model="active" gutter="10px">
        <van-tabbar-item name="home" icon="home-o" class="nav-list" to="/home"
          >首页</van-tabbar-item
        >
        <van-tabbar-item name="search" icon="search" to="/home/list"
          >找房</van-tabbar-item
        >
        <van-tabbar-item name="friends" icon="friends-o" to="/home/news"
          >资讯</van-tabbar-item
        >
        <van-tabbar-item name="profile" icon="setting-o" to="/home/profile"
          >我的</van-tabbar-item
        >
      </van-tabbar>
    </div>
    <div v-else>
      <router-view></router-view>
      <van-tabbar v-model="active" gutter="10px">
        <van-tabbar-item name="home" icon="home-o" class="nav-list" to="/home"
          >首页</van-tabbar-item
        >
        <van-tabbar-item name="search" icon="search" to="/home/list"
          >找房</van-tabbar-item
        >
        <van-tabbar-item name="friends" icon="friends-o" to="/home/news"
          >资讯</van-tabbar-item
        >
        <van-tabbar-item name="profile" icon="setting-o" to="/home/profile"
          >我的</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { getGroups } from "@/api";
import MapCity from "@/components/MapCity.vue";
export default {
  components: {
    MapCity,
  },
  data() {
    return {
      images: [
        "http://liufusong.top:8080/img/swiper/1.png",
        "http://liufusong.top:8080/img/swiper/2.png",
        "http://liufusong.top:8080/img/swiper/3.png",
      ],
      img: [
        { name: "整租", i: "wap-home-o" },
        { name: "合租", i: "friends-o" },
        { name: "地图找房", i: "location-o" },
        { name: "去出租", i: "home-o" },
      ],
      groupList: [],
      active: "home",
      isShow: true,
    };
  },
  created() {
    this.getGroups();
  },
  methods: {
    async getGroups() {
      const res = await getGroups();
      this.groupList = res.data.body;
    },
  },
  watch: {
    active(newValue) {
      newValue !== "home" ? (this.isShow = false) : (this.isShow = true);
      console.log(newValue);
    },
  },
};
</script>

<style scoped lang="less">
.swipe {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}

.nav {
  width: 100%;
  height: 100%;
  .nav-icon {
    color: greenyellow;
  }
}
.group {
  height: 188px;
  width: 100%;
  background-color: #f6f5f6;
}
/deep/.van-nav-bar__content {
  .van-nav-bar__left {
    .van-nav-bar__text {
      font-family: "Microsoft YaHei";
      color: #333;
      font-weight: bold;
    }
  }
  .van-nav-bar__right {
    .van-nav-bar__text {
      color: #333;
    }
  }
  background-color: #f6f5f6;
}
.nav-list {
  width: 172px;
}
.des__text {
  width: 70px;
}
</style>
