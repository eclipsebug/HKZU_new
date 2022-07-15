<template>
  <div>
    <Title title1="账号登录"></Title>
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
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="color"
          >登录</van-button
        >
      </div>
    </van-form>
    <div class="register">
      <router-link to="/registe">还没有账号，去注册~</router-link>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import { TOKEN } from "@/constants";
import { Login } from "@/api/index";
import { Toast } from "vant";
import { setLocal } from "@/utils/storage";
export default {
  components: { Title },
  data() {
    return {
      user: {
        username: "hzhmqd",
        password: "123456",
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
          },
          {
            // pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,8}$/,
            message: "用户名格式5-8位的字母和数字",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
          },
          {
            // pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,12}$/,
            message: "密码格式5-12位的字母和数字",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      const res = await Login(user);
      if (res.data.status === 200) {
        // console.log(res.data.body);
        this.$store.commit("setUser", res.data.body.token);
        setLocal(TOKEN, res.data.body.token);
        Toast.success("登录成功");
        this.$router.push("/home/profile");
      } else {
        Toast.fail("登录失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.color {
  background-color: green;
}
.register {
  margin: 100px;
  width: 150px;
  height: 20px;
  margin: 0 auto;
  font-size: 14px;
  color: black;
}
</style>
