<template>
  <div>
    <Title title1="注册"></Title>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px">
        <van-button  block type="info" native-type="submit" class="color"
          >注册</van-button
        >
      </div>
    </van-form>
  
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import {register} from '@/api/index'
import {Toast} from 'vant'
export default {
  components: { Title },
  data(){
    return{
      user:{
        username:'hzhmq',
        password:'123456'
      },
      rules:{
        username:[
       {
          required: true,
          message:"用户名不能为空"
       },
       {
        // pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,8}$/,
         message:"用户名格式5-8位的字母和数字"
       }
        ],
        password:[
       {
          required: true,
          message:"密码不能为空"
       },
       {
        // pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,12}$/,
         message:"密码格式5-12位的字母和数字"
       }
        ],
      }
    }
  },
  methods:{
   async onSubmit(){
        const user=this.user
         const res=await register(user)
         try {
            console.log(res.data.body);
          this.$store.commit("setUser", res.data.body);
        Toast.success("注册成功");
         } catch (error) {
           Toast.fail("注册失败");
         }
        
      
    }
  }
};
</script>

<style scoped lang="less">
.color {
  background-color: green;
}

</style>
