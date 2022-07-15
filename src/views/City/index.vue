<template>
  <div>
    <Title title1="城市列表"></Title>

    <!-- 全部城市 -->
    <van-index-bar :index-list="Word" >
          <!-- 当前城市 -->
    <van-index-anchor  index="#" >当前城市
      <div>{{hotCityNow.label}}</div>
    </van-index-anchor>
 
    <!-- 热门城市 -->
    <van-index-anchor index="热" >热门城市
      <div  v-for="(item, index) in hotCity"  :key="index"   @click="event(item)" >
        {{item.label}}
      </div>
    </van-index-anchor>
     
  <!--列表 -->
      <div  v-for="(item, index) in citys"
      :key="index" >
        <van-index-anchor  :index="item.name">{{ item.name }}</van-index-anchor>

<div index="item.name"
        v-for="(item, index) in item.label"
        :key="index"
         @click="event(item)">
  <van-index-anchor
        >{{ item.label }}</van-index-anchor
      >
</div>
    
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import { getCity, getHotCity } from "@/api";
import {mapState} from 'vuex'
export default {
  name: "city",
  components: { Title },
  data() {
    return {
      hotCity: [],
      cityList: [],
      level: 1,
      pinyinFrist: [],
      Word: ['#','热'],
      newWord: [],
      newCityList: [],
      citys: [],
   
    };
  },
  created() {
    this.getHotCity();
    this.getCity();
  },
  methods: {
 
    async getHotCity() {
      const res = await getHotCity();
      this.hotCity = res.data.body;
    },
    // 全部城市
    async getCity() {
      const res = await getCity(this.level);
      this.cityList = res.data.body;
      // 遍历每一个 ，把首字母提取出来，并把数据放在一个数组里面
      // 截取首字母转化为大写
      this.cityList.forEach((item) => {
        const first = item.short.substr(0, 1).toUpperCase();
        this.Word.push(first);
        this.Word = [...new Set(this.Word)];

        item.short = first;
      });
      // 按照首字母排序
      this.pinyinFrist = this.cityList.sort(
        (a, b) => a.short.charCodeAt() - b.short.charCodeAt()
      );
      this.newWord = this.Word.sort((a, b) => a.charCodeAt() - b.charCodeAt());

      // 新建一个数组利用forEach遍历 把首字母相同的放到一个对象里面
      const city = {};
      this.pinyinFrist.forEach((item) => {
        const first = item.short;
        if (city[first]) {
          city[first].push(item);
        } else {
          city[first] = [item];
        }
      });
      // 对象转为数组

      for (const key in city) {
        this.citys.push({
          name: key,
          label: city[key],
        });
      }
      this.$store.commit('getAllCity',this.citys)
   
    },
      event(a){
      console.log(a);
      this.$store.commit('getHotCity',a)
    },
    
  },
  computed:{
    ...mapState(['hotCityNow'])
  }
};
</script>

<style scoped lang="less">
.title{
  color: #ccc;
    padding-left: 18px;
}
.box{
    padding: 0 15px;
    border-bottom: 1px solid #eee;
    color: #333;
   
    
}
</style>
