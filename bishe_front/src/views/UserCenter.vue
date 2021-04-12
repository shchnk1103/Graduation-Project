<template>
  <el-row>
    <nav-bar ref="navbar" class="navbar" />

    <el-col :span="8"></el-col>
    <el-col :span="8">
      <div id="user-center" class="padding-top">
        <h3>更新资料信息</h3>
        <form>
          <div class="form-elem">
            <span>用户名：</span>
            <input v-model="username" type="text" placeholder="输入用户名" />
          </div>

          <div class="form-elem">
            <span>新密码：</span>
            <input v-model="password" type="password" placeholder="输入密码" />
          </div>

          <div class="form-elem">
            <el-button :plain="true" v-on:click="changeInfo" class="update-btn">
              更新
            </el-button>
          </div>

          <div class="form-elem">
            <el-button type="text" @click="open" class="delete-btn">
              删除用户
            </el-button>
          </div>
        </form>
      </div>
    </el-col>
    <el-col :span="8"></el-col>

    <blog-footer />
  </el-row>
</template>

<script>
import NavBar from "@/components/Home/Navbar";
import BlogFooter from "@/components/Home/Blogfooter";
import authorization from "@/utils/authorization";
import axios from "axios";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

const storage = localStorage;

export default defineComponent({
  name: "UserCenter",
  components: {
    NavBar,
    BlogFooter,
  },
  data() {
    return {
      username: "",
      password: "",
      token: "",
      showingDeleteAlert: false,
    };
  },
  mounted() {
    this.username = storage.getItem("username.bishe");
  },
  methods: {
    open() {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.confirmDelete();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    changeInfo() {
      authorization().then((response) => {
        // 检查登录状态
        if (!response[0]) {
          alert("登录已过期，请重新登录");
          return;
        }

        console.log("change info start");
        // 密码不能小于 6 位
        if (this.password.length > 0 && this.password.length < 6) {
          alert("Password too short.");
          return;
        }

        const oldName = storage.getItem("username.bishe");
        let data = {};
        if (this.username !== "") {
          data.username = this.username;
        }
        if (this.password !== "") {
          data.password = this.password;
        }

        // 获取令牌
        this.token = storage.getItem("access.bishe");

        // 发送更新数据到接口
        axios
          .patch("/api/user/" + oldName + "/", data, {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((response) => {
            const name = response.data.username;
            storage.setItem("username.bishe", name);
            this.$router.push({
              name: "UserCenter",
              params: { username: name },
            });
            this.$refs.navbar.refresh();
            ElMessage.success({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    confirmDelete() {
      authorization().then((response) => {
        if (response[0]) {
          this.token = storage.getItem("access.bishe");
          axios
            .delete("/api/user/" + this.username + "/", {
              headers: { authorization: "Bearer " + this.token },
            })
            .then(() => {
              storage.clear();
              this.$router.push({ name: "Home" });
            });
        }
      });
    },
  },
});
</script>

<style scoped>
.padding-top {
  padding-top: 10px;
}

#user-center {
  text-align: center;
}

.form-elem {
  padding: 10px;
}

input {
  height: 25px;
  padding-left: 10px;
}

/* button { */
/* height: 35px;
  cursor: pointer;
  border: none;
  outline: none; */
/* background: gray;
  color: whitesmoke; */
/* border-radius: 5px;
  width: 200px; */
/* } */

.navbar {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.update-btn {
  color: rgb(52, 129, 112);
}

.delete-btn {
  color: red;
}
</style>
