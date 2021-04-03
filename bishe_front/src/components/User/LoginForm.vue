<template>
  <el-form
    ref="loginForm"
    :model="loginUser"
    :rules="rules"
    label-width="100px"
    class="loginForm sign-in-form"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginUser.username" placeholder="Enter Username...">
      </el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginUser.password"
        type="password"
        placeholder="Enter Password..."
      >
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="submitForm('loginForm')"
      >
        登陆
      </el-button>
    </el-form-item>

    <div class="tip-area">
      <p>忘记密码？ <a>立即找回</a></p>
    </div>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      loginUser: {
        username: "",
        password: "",
      },
      // 校验规则
      rules: {
        username: [
          {
            message: "username is incorrect...",
            required: true,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "password could not be empty...",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "password's length has to be 6 to 20 characters...",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("/api/token/", {
              username: this.loginUser.username,
              password: this.loginUser.password,
            })
            .then((response) => {
              const storage = localStorage;
              const expiredTime = Date.now() + 86400000;
              console.log(expiredTime);
              storage.setItem("access.bishe", response.data.access);
              storage.setItem("refresh.bishe", response.data.refresh);
              storage.setItem("expiredTime.bishe", expiredTime);
              storage.setItem("username.bishe", this.loginUser.username);

              axios
                .get("/api/user/" + this.loginUser.username + "/")
                .then((response) => {
                  storage.setItem(
                    "isSuperuser.bishe",
                    response.data.is_superuser
                  );

                  // 路由跳转
                  this.$router.push({ name: "Home" });
                });
            })
            .catch((error) => {
              alert("登陆失败！请重试！");
            });
          console.log("success");
          return true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
/*form*/
.loginForm {
  margin-top: 45%;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}

.tip-area {
  text-align: right;
  font-size: 12px;
  color: #333;
}

.tip-area p a {
  color: #409eff;
}
</style>
