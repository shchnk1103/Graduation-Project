<template>
  <el-row :gutter="15" class="navbar">
    <!--Logo-->
    <el-col :span="8">
      <div class="block">
        <a href="/">
          <el-image class="header-photo" :src="src" fit="contain"> </el-image>
        </a>
      </div>
    </el-col>

    <!--搜索框-->
    <el-col :span="5">
      <div class="search demo-input-suffix">
        <el-input
          v-model="input"
          suffix-icon="el-icon-search"
          placeholder="请输入内容"
          @keyup.enter.native="searchArticles"
        >
        </el-input>
      </div>
    </el-col>

    <!--图标-->
    <el-col :span="3" class="button-position">
      <el-row class="icon-bar">
        <el-col :span="6" class="auto-width">
          <a href="/">
            <i class="el-icon-house position-and-big home"></i>
          </a>
        </el-col>

        <el-col :span="6" class="auto-width">
          <a href="/category">
            <i class="el-icon-s-order position-and-big category"></i>
          </a>
        </el-col>

        <el-col :span="6" class="auto-width">
          <a href="/tag">
            <i class="el-icon-s-flag position-and-big tag"></i>
          </a>
        </el-col>

        <el-col :span="6"></el-col>
      </el-row>
    </el-col>

    <!--头像-->
    <el-col :span="4" class="userprofile">
      <div class="block main-info avatar" v-if="hasLogin">
        <!--下拉框-->
        <div class="dropdown">
          <button class="drop-btn">{{ username }}!</button>
          <div class="dropdown-content">
            <router-link
              :to="{ name: 'UserCenter', params: { username: username } }"
              >用户中心</router-link
            >
            <router-link :to="{ name: 'ArticleCreate' }" v-if="isSuperuser"
              >发表文章</router-link
            >
            <router-link v-on:click.prevent="logout()" to="">登出</router-link>
          </div>
        </div>
      </div>
      <!--登陆注册-->
      <div class="login-and-register" v-else>
        <el-link href="/login" type="danger" class="login-button">登陆</el-link>
        <span> / </span>
        <el-link href="/login" type="warning" class="register-button">
          注册
        </el-link>
      </div>
    </el-col>

    <el-col :span="4"></el-col>
  </el-row>
</template>

<script>
import authorization from "@/utils/authorization";

export default {
  name: "NavBar",
  data() {
    return {
      src:
        "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      input: "",
      hasLogin: false,
      username: "",
      isSuperuser: JSON.parse(localStorage.getItem("isSuperuser.bishe")),
    };
  },
  mounted() {
    authorization().then((data) => ([this.hasLogin, this.username] = data));
  },
  methods: {
    // 搜索文章
    searchArticles() {
      const text = this.input.trim();
      if (text.charAt(0) !== "") {
        this.$router.push({ name: "Home", query: { search: text } });
      }
    },
    // 登出
    logout() {
      localStorage.clear();
      window.location.reload(false);
      alert("登出成功！");
    },
    refresh() {
      this.username = localStorage.getItem("username.bishe");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: cornflowerblue;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.header-photo {
  text-align: right;
  height: 54px;
  line-height: 75px;
  margin-left: 45%;
}

.search {
  position: absolute;
  text-align: center;
  height: 54px;
  line-height: 54px;
}

.main-info {
  position: absolute;
  text-align: right;
  height: 54px;
  line-height: 85px;
  margin-right: 45%;
}

.button-position {
  height: auto;
  padding-top: 10px;
}

.auto-width {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  width: auto;
}

.position-and-big {
  display: flex;
  flex-direction: column;
  font-size: 35px;
  margin: 0;
}

.userprofile {
  display: inline-block;
}

.avatar {
  width: 30px;
  height: 30px;
}

.login-and-register {
  position: absolute;
  left: auto;
  right: 250px;
  top: 20px;
  width: 90px;
  height: 25px;
}

.login-button,
.register-button {
  margin-bottom: 5px;
}

.icon-bar {
  position: absolute;
}

.home {
  position: absolute;
  left: 5px;
}

.category {
  position: absolute;
  left: 45px;
}

.tag {
  position: absolute;
  left: 85px;
}

.drop-btn {
  background-color: mediumslateblue;
  color: white;
  padding: 8px 8px 30px 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  height: 16px;
  border-radius: 5px;
}

/* 容器 <div> - 需要定位下拉内容 */
.dropdown {
  position: relative;
  display: inline-block;
  top: -17px;
  right: -60px;
}

/* 下拉内容 (默认隐藏) */
.dropdown-content {
  display: none;
  position: absolute;
  top: 65px;
  left: -13px;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 999;
}

/* 下拉菜单的链接 */
.dropdown-content a {
  color: black;
  padding: 1px 1px;
  text-decoration: none;
  display: block;
  text-align: center;
  line-height: 50px;
}

/* 鼠标移上去后修改下拉菜单链接颜色 */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* 在鼠标移上去后显示下拉菜单 */
.dropdown:hover .dropdown-content {
  display: block;
}

/* 当下拉内容显示后修改下拉按钮的背景颜色 */
.dropdown:hover .drop-btn {
  background-color: darkslateblue;
}
</style>
