<template>
  <el-form
      ref="registerForm"
      :model="registerUser"
      :rules="registerRules"
      label-width="100px"
      class="registerForm sign-up-form"
  >

    <el-form-item label="用户名" prop="name">
      <el-input v-model="registerUser.name"
                placeholder="Enter Name...">

      </el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerUser.email"
                placeholder="Enter Email...">

      </el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password1">
      <el-input v-model="registerUser.password1"
                type="password"
                placeholder="Enter Password...">

      </el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="password2">
      <el-input v-model="registerUser.password2"
                type="password"
                placeholder="Enter Password...">

      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button
          type="primary"
          class="submit-btn"
          @click.prevent="submitFormRegister('registerForm')"
      >
        注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {registerUser} from "@/network/home";
import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerUser.password1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: '',
        email: '',
        password1: '',
        password2: '',
        role: '',
      },

      registerRules: {
        name: [
          {
            message: "username can't be empty...",
            required: true,
            trigger: 'blur'
          },
          {
            min: 2,
            max: 30,
            message: "username's length has to be 2 to 30 characters..."
          }
        ],
        email: [
          {
            type: 'email',
            message: 'email is incorrect...',
            required: true,
            trigger: 'blur'
          }
        ],
        password1: [
          {
            required: true,
            message: 'password1 could not be empty...',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 20,
            message: "password1's length has to be 6 to 20 characters...",
            trigger: 'blur',
          }
        ],
        password2: [
          {
            required: true,
            message: 'password2 could not be empty...',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 20,
            message: "password2's length has to be 6 to 20 characters...",
            trigger: 'blur',
          },
          {
            validator: validatePass2,
            trigger: 'blur',
          }
        ]
      }
    }
  },
  methods: {
    submitFormRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          registerUser({
            username: this.registerUser.name,
            password: this.registerUser.password2
          }).then(response => {
            console.log(response)
            console.log(this.registerUser.name)
            console.log(this.registerUser.password2)
            alert('注册成功!页面将会自动跳转到首页!');
          }, error => {
            console.log(error.message)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
/* register */
.registerForm {
  margin-top: -50%;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}
</style>
