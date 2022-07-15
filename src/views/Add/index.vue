<template>
  <div class="add">
    <Title title1="发布房源"></Title>

    <van-cell title="发布房源"></van-cell>
    <van-cell-group>
      <van-field v-model="title" label="小区名称">
        <template #extra>请输入小区名称 ></template>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="size" label="租金" placeholder="请输入租金/月">
        <template #extra>￥/月 ></template>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="size" label="建筑面积" placeholder="请输入建筑面积">
        <template #extra>m^2</template>
      </van-field>
    </van-cell-group>

    <van-cell title="户型" is-link value="请选择" @click="showPopup">
    </van-cell>
    <van-popup v-model="show" position="bottom"
      ><van-picker
        title="标题"
        show-toolbar
        :columns="huxingList"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
    /></van-popup>
    <van-cell title="所在楼层" is-link value="请选择"> </van-cell>
    <van-cell title="朝向" is-link value="请选择"> </van-cell>

    <van-cell-group>
      <van-field
        v-model="value"
        placeholder=" 请输入标题(例如:整租 小区名 2 室 5000元 )"
      >
      </van-field>
    </van-cell-group>
    <van-cell title="房屋图像"></van-cell>
    <van-uploader :after-read="afterRead" />
    <van-cell title="房屋配置"></van-cell>
    <van-grid square>
      <van-grid-item icon="photo-o" text="衣柜" />
      <van-grid-item icon="photo-o" text="洗衣机" />
      <van-grid-item icon="photo-o" text="空调" />
      <van-grid-item icon="photo-o" text="天然气" />
      <van-grid-item icon="photo-o" text="冰箱" />
      <van-grid-item icon="photo-o" text="暖气" />
      <van-grid-item icon="photo-o" text="电视" />
      <van-grid-item icon="photo-o" text="热水器" />
      <van-grid-item icon="photo-o" text="宽带" />
      <van-grid-item icon="photo-o" text="沙发" />
    </van-grid>
    <van-cell title="房屋描述"></van-cell>

    <van-cell-group>
      <van-field v-model="value" placeholder=" 请输入房屋的描述信息">
      </van-field>
    </van-cell-group>

    <div class="bottom">
      <van-button type="default">取消</van-button>
      <van-button type="primary" @click="postHousesMessage">提交</van-button>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import { TOKEN } from "@/constants";
import { postHouses } from "@/api/user";
export default {
  data() {
    return {
      huxingList: ["一室", "二室", "三室", "四室", "四室+"],
      show: false,
      title: "",
      description:
        "【装修描述】 装修简洁，家电配齐，通风采光效果良好，格局方正。",
      houseImg: "img1|im2|img3",
      oriented: "ORIEN|caa6f80b-b764-c2df",
      supporting: "空调|洗衣机",
      price: "1234",
      roomType: "ROOM|ce2a5daa-811d-2f49",
      size: "123",
      floor: "FLOOR|1",
      community: "AREA|93cbbe43-741d-de54",
    };
  },
  components: {
    Title,
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    async postHousesMessage() {
      const res = await postHouses({
        title: this.title,
        description: this.description,
        houseImg: this.houseImg,
        oriented: this.oriented,
        supporting: this.supporting,
        price: this.price,
        roomType: this.roomType,
        size: this.size,
        floor: this.floor,
        community: this.community,
      });
      console.log(res);
    },
  },
};
</script>

<style scoped lang='less'>
.add {
  padding: 0 0 500px;
}
.bottom {
  margin-top: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  flex: 1;
  display: flex;
  /deep/ .van-button__content {
    width: 4.15rem;
  }
}
</style>