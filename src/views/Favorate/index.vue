<template>
  <div>
    <Title title1="收藏列表"></Title>
    <div>
     <HousesList :List='favoritesList'></HousesList>
  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Title from '@/components/Title.vue'
import {getFavorites} from '@/api'
import HousesList from '@/components/house-list.vue'

export default {
  components:{
    Title,
    HousesList
  },
  data(){
    return{
      url:'http://liufusong.top:8080',
      favoritesList:[]
    }
  },
  created(){
    this.getFavorites()
  },
  methods:{
    async getFavorites(){
      const res=await getFavorites(this.user)
      this.favoritesList=res.data.body
    
    }
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style scoped lang='less'>
/deep/.van-card__price{
      font-size: 12px;
    color: #fa5741;
}
.tags{
  color: #39becd;
    background: #e1f5f8;
}
/deep/.van-card__desc {
    font-size: 12px;
    color: #afb2b3;
}
/deep/.van-card__title{
    margin: 0;
    font-size: 15px;
    color: #394043;
    font-weight: 800;
}

</style>