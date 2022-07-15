<template>
  <div>
    <div class="title"><MapCity></MapCity></div>
    <div class="tabs">
      <van-tabs v-model:active="active" @click="onClick">
        <van-tab title="区域">
          <template #default>
            <!-- <van-picker show-toolbar title="标题" :columns="conditionList" /> -->
          </template>
        </van-tab>
        <van-tab title="方式">
          <template #default>
            <van-picker :columns="wayList"></van-picker>
          </template>
        </van-tab>
        <van-tab title="租金">
          <template #default>
            <van-picker :columns="moneyList"></van-picker> </template
        ></van-tab>
        <van-tab title="标签 4">
          <template #default>
            <van-popup
              v-model="show4"
              closeable
              position="right"
              :style="{ height: '80%', width: '80%' }"
            ></van-popup> </template
        ></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

import MapCity from "@/components/MapCity.vue";
import { getHouses, housesCondition } from "@/api/houses";
import { House } from "@/components/houses.vue";
import HousesList from "@/components/house-list.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: [],
      active: 0,
      show: false,
      show4: false,
      conditionList: {},
      wayList: [],
      moneyList: [],
    };
  },
  created() {
    this.getHouses();
    this.housesCondition();
  },
  methods: {
    setKey(obj) {
      const isHaveChildren = Object.prototype.hasOwnProperty.call(
        obj,
        "children"
      );
      if (isHaveChildren) {
        obj.children = [{ text: "不限", value: "null" }];
        console.log(1);
      } else {
        for (const key in obj.children) {
          this.setKey(obj.children[key]);
        }
      }
      return obj;
    },
    // 渲染页面
    async getHouses() {
      const res = await getHouses(this.hotCityNow.value);
      this.list = res.data.body.list;
    },
    async housesCondition() {
      const res = await housesCondition(this.hotCityNow.value);
      this.$store.commit("getAll", res);
      this.conditionList = res.data.body.area;
      console.log(this.setKey(this.conditionList));
      // 筛选方式
      this.wayList = res.data.body.rentType;
      this.wayList = this.wayList.map((item) => {
        return {
          text: item.label,
          value: item.value,
        };
      });

      // 价格筛选方式
      this.moneyList = res.data.body.price;
      this.moneyList = this.moneyList.map((item) => {
        return {
          text: item.label,
          children: item.children,
        };
      });
      // 筛选地区
      // area=this.setKey(res.area)
      // subway=this.setKey(res.subway)
      // this.conditionList[area,subway]
    },
    // 展示弹出层
    onClick(name) {
      console.log(name);
      if (name === 0) {
        this.show = true;
      }
      if (name === 3) {
        this.show4 = true;
      } else {
        return;
      }
    },
    setKey(a) {
      if (!a.children) {
        a.children = [{ text: "不限", value: "null" }];
      } else {
        for (const key in a.children) {
          this.setKey(a.children[key]);
        }
      }
      return a;
    },
  },
  components: {
    MapCity,
    HousesList,
    House,
  },
  computed: {
    ...mapState(["hotCityNow"]),
  },
};
</script>

<style scoped lang='less'>
.showList {
  margin-top: 100px;
}
.van-tab__pane {
  width: 100%;
  height: 40%;
}
.title {
  width: 100%;
  z-index: 1;
}
.tabs {
  position: relative;
  top: 1.5rem;
  left: 0;
  .van-popup--top {
    top: 2.66667rem;
    left: 0;
    height: 40% !important;
    width: 100%;
  }
}
</style>
