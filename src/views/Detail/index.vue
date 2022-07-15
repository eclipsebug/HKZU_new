<template>
  <div class="detail">
    <Title :title1="`${detailson.community}`"></Title>

    <div class="swip">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in imgs" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="miaoshu">
      <van-cell title="整租 2室" :label="detailson.tags[0]" />
    </div>
    <div class="fu">
      <div class="cotent">
        <van-cell :title="`${detailson.price}` + '/月'" label="租金"></van-cell>
        <van-cell :title="detailson.roomType" label="房型"></van-cell>
        <van-cell :title="`${detailson.size}` + '平米'" label="面积"></van-cell>
      </div>
    </div>
    <div class="miaoshu2">
      <div class="left">
        <van-cell title="装修：" value="精装" />
        <van-cell title="楼层：" :value="`${detailson.floor}`" />
      </div>
      <div class="right">
        <van-cell title="朝向：" :value="`${detailson.oriented[0]}`" />
        <van-cell title="类型：" value="普通住宅" />
      </div>
    </div>
    <div class="HouseDetail_map">
      <van-cell title="小区：" value="天山星城" />
      <div class="map">
        <img src="" alt="" />
      </div>
      <van-cell title="房屋配套"></van-cell>
      <van-grid :gutter="10">
        <van-grid-item icon="photo-o" :text="`${detailson.supporting[0]}`" />
        <van-grid-item icon="photo-o" :text="`${detailson.supporting[1]}`" />
      </van-grid>
      <!-- 房屋概况-->
      <div class="homedesc">
        <h3>房源概况</h3>
        <van-divider
          :style="{
            borderColor: 'gray',
          }"
        >
        </van-divider>
        <div class="wang">
          <div class="left">
            <van-image
              round
              width="2rem"
              height="2rem"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            ></van-image>

            <div class="name">
              <van-cell title="王女士"></van-cell>
              <van-cell title="已认证房主" icon="shield-o"></van-cell>
            </div>
          </div>
          <div class="rigth">
            <van-button plain type="primary" style="width='90px'" size="small"
              >发消息</van-button
            >
          </div>
        </div>
        <div class="desc">
          1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
          2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
          3.人车分流，环境优美。
          4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="like">
        <van-cell title="猜你喜欢"></van-cell>
        <van-divider
          :style="{
            borderColor: 'gray',
          }"
        >
        </van-divider>
        <div like-house>
          <van-card
            price="4500/月"
            desc="12212"
            title="321232"
            thumb="http://liufusong.top:8080/img/message/1.png"
          >
            <template #tags>
              <van-tag plain type="danger" class="tags">随时看房</van-tag>
            </template>
          </van-card>
          <van-card
            price="4500/月"
            desc="12212"
            title="321232"
            thumb="http://liufusong.top:8080/img/message/2.png"
          >
            <template #tags>
              <van-tag plain type="danger" class="tags">随时看房</van-tag>
            </template>
          </van-card>
          <van-card
            price="4500/月"
            desc="12212"
            title="321232"
            thumb="http://liufusong.top:8080/img/message/3.png"
          >
            <template #tags>
              <van-tag plain type="danger" class="tags">随时看房</van-tag>
            </template>
          </van-card>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-button
        class="favorite"
        :icon="favorite ? 'star' : 'star-o'"
        :class="{ active: favorite }"
        type="default"
        @click="isFav"
        >收藏</van-button
      >
      <van-button type="default">在线质询</van-button>
      <van-button type="primary">电话预约</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage } from "vant";

Vue.use(VanImage);
import Title from "@/components/Title.vue";
import { mapState } from "vuex";
import { getLocal, setLocal } from "@/utils/storage";

import { DETAILSKEY, HOUSEID, TOKEN } from "@/constants";
import { getFavorite, addFavorite, delFavorite } from "@/api/user";
export default {
  data() {
    return {
      baseURL: "http://liufusong.top:8080",
      imgs: [],
      detailson: {},
      houseId: getLocal(HOUSEID),
      token: getLocal(TOKEN),
      favorite: "",
    };
  },
  components: {
    Title,
  },
  computed: {
    ...mapState(["detail", "user"]),
  },
  created() {
    this.photo();
    this.getFavorite();
  },
  methods: {
    photo() {
      console.log(getLocal(DETAILSKEY));
      this.detailson = getLocal(DETAILSKEY);
      console.log(this.detailson);

      this.detailson.houseImg.forEach((item) => {
        this.imgs.push(this.baseURL + item);
      });
      console.log(this.imgs);
    },
    async getFavorite() {
      console.log(this.houseId);
      console.log(this.token);
      // 顺序，第一个是id ，第二个token
      const res = await getFavorite(this.houseId, this.token);
      this.favorite = res.data.body.isFavorite;
      // console.log(res.data.body.isFavorite);
    },
    async isFav() {
      try {
        this.$toast.loading({
          duration: 0, //表示toast不会消失
          forbidClick: true, //禁用背景点击
        });
        if (this.favorite) {
          await delFavorite(this.houseId, this.token);
        } else {
          await addFavorite(this.houseId, this.token);
        }
        this.favorite = !this.favorite;
        this.$toast(this.favorite ? "收藏房屋成功" : "取消收藏");
      } catch (error) {
        this.$toast.fail("出现错误！！");
      }
    },
  },
};
</script>

<style scoped lang='less'>
.detail {
  padding-bottom: 100px;
}
.swip {
  width: 100%;
  height: 25%;
  img {
    width: 100%;
    height: 100%;
  }
}
.miaoshu {
  .van-cell__label {
    margin-top: 0.10667rem;
    color: #39becd;
    width: 1.2rem;
    background: #e1f5f8;
    font-size: 0.32rem;
    line-height: 0.48rem;
  }
}
.fu {
  padding: 0 20px;

  .cotent {
    display: flex;
    justify-content: space-around;
    text-align: center;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    span {
      color: red;
    }
  }
}
.miaoshu2 {
  display: flex;
  .van-cell__title {
    color: gray;
  }
  .van-cell__value {
    color: black;
  }
  .left {
    width: 33%;
    margin-right: 10%;
  }
  .right {
    width: 40%;
  }
}
.HouseDetail_map {
  .van-cell {
    width: 44%;
  }
}
.homedesc {
  padding: 0 0.26667rem;
  .wang {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      .name {
        font-size: 0.4rem;
        .van-cell {
          width: 3.4rem;
        }
      }
    }
  }
  .desc {
    font-size: 20px;
  }
}
.like {
  .like-house {
    /deep/.van-card__title {
      max-height: 0.85333rem;
      font-weight: 500;
      line-height: 0.42667rem;
      color: red !important;
    }
    .tags {
      color: red;
    }
  }
}
.bottom {
  .favorite {
    &.active {
      color: red;
    }
  }
  margin-top: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  flex: 1;
  display: flex;
  /deep/ .van-button__content {
    width: 2.5rem;
  }
}
</style>