<template>
  <div class="profile">
    <div class="My_title">
      <!-- 游客 -->
    <div class="youke" v-if="!user">
        <img src="http://liufusong.top:8080/img/profile/bg.png" alt="" />
      <div class="My_info">
        <!-- 个人信息 -->
        <div class="My_avatar">
          <!-- 头像 -->
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <div class="My_user">
          <!-- 用户 -->
          <div class="My_name">游客</div>
          <div class="My_edit">
            <router-link to="/login" class="tologin">去登录</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录界面 -->
    <div class="login" v-else>
         <img src="http://liufusong.top:8080/img/avatar.png" alt="" class="bgcinfo" />
      <div class="My_info">
        <!-- 个人信息 -->
        <div class="My_avatar">
          <!-- 头像 -->
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <div class="My_user">
          <!-- 用户 -->
          <div class="My_nickname">{{userinfo.nickname}}</div>
          <div class="My_tui">
           <a href=""@click="logout">退出</a>
          </div>
        </div>
      </div>
    </div>
      <main>
        
        <van-grid square :column-num="3" >
        <van-grid-item icon="star-o" text="我的收藏" @click="my_favoate"/>
        <van-grid-item icon="home-o" text="我的出租"@click='my_rent' />
        <van-grid-item icon="underway-o" text="看房记录"/>
        <van-grid-item icon="idcard" text="成为房主"/>
        <van-grid-item icon="manager-o" text="个人资料"/>
        <van-grid-item icon="service-o" text="联系我们"/>
        
      </van-grid>
      </main>
      <div class="My_ad">
        <!-- 广告 -->
        <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {getUser} from '@/api/index'

export default {
  data() {
    return {
      userinfo:[]
    };
  },
  created(){
    this.getUser()
  },
  methods:{
    logout(){
      console.log('退出登录');
      this.$store.commit("setUser", null);
      this.$router.push('/home')
    },
   async getUser(){
         const res=await getUser(this.user)
        //  console.log(res);

        //  console.log(this.user);
        this.userinfo=res.data.body
    },
    // 我的收藏
    my_favoate(){
      // 账号验证
      this.user?this.$router.push('/favorate'): this.$router.push('/login')
    // if(this.user){
    //   this.$router.push('/favorate')
    // }else{
    //    this.$router.push('/login')
    // }
    },
    // 我的出租
    my_rent(){
         // 账号验证
      this.user?this.$router.push('/favorate'): this.$router.push('/login')
      this.$router.push('/rent')
    }
  },
computed:{
    ...mapState(["user"])
  },
};
</script>

<style scoped lang="less">
.My_tui{
    position: relative;
        top: -1.2rem;
        left: 2.55rem;
        width: 2rem;
        height: 1rem;
        font-size: 26px;
        background-color: green;
        border-radius: 0.06667rem;
        padding-left: 0.26667rem;
        a {
          text-align: center;
          max-width: auto 0;
          color: white;
          font-size: 36px;
          line-height: 1rem;
        }
}
.My_nickname{
   position: relative;
     
    top: -1.5rem;
    left: 2.7rem;
    width: 2.8rem;
    height: 0.26667rem;
    font-size: 0.16rem;
}
main{
     margin-top: 3.13333rem;
}
.login{
 width: 100%;
  height: 40%;
  .bgcinfo{
     width: 100% !important;
  height: 100% !important;
  margin-bottom: 10px;

  }
}
.My_title {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  img {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 191px;
  }
  .My_info {
    position: relative;
    top: -0.8rem;
    left: 1.4rem;
    width: 7.24rem;
    height: 4.2rem;
    box-shadow: 0 16px 16px rgba(10, 16, 20, 0.24),
      0 0 16px rgba(10, 16, 20, 0.12);
    z-index: 1;
    .My_avatar {
      width: 260px;
      height: 260px;
      img {
        width: 160px;
        height: 160px;
        position: relative;
        top: -30px;
        left: 2.6rem;
      }
    }
    .My_user {
      .My_name {
        position: relative;
       top: -1.5rem;
    left: 3.3rem;
      }
      .My_edit {
        position: relative;
        top: -1.2rem;
        left: 2.55rem;
        width: 2rem;
        height: 1rem;
        background-color: green;
        border-radius: 0.06667rem;
        padding-left: 0.26667rem;
        a {
          text-align: center;
          max-width: auto 0;
          color: white;
          font-size: 36px;
          line-height: 1rem;
        }
      }
    }
  }
  .My_ad {
    width: 8.5rem;
    height: 260px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.tologin {
  line-height: 30px;
}
</style>
