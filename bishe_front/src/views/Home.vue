<template>
  <div class="home">
    <el-container>
      <el-header class="rm-padding">
        <nav-bar />
      </el-header>

      <el-container class="rm-padding">
        <el-main>
          <article-list v-bind:sidebar_show="sidebar_show" />
        </el-main>
        <el-aside width="500px" v-show="sidebar_show">
          <sidebar />
        </el-aside>
      </el-container>

      <br />
      <br />
      <br />
      <br />
      <br />

      <el-footer class="color-black">
        <BlogFooter />
      </el-footer>
    </el-container>

    Scroll down to see the bottom-right button.
    <el-backtop target=".home"></el-backtop>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleList from "@/components/Home/ArticleList.vue";
import NavBar from "@/components/Home/Navbar";
import Sidebar from "@/components/Home/Sidebar";
import BlogFooter from "@/components/Home/Blogfooter";

export default {
  name: "Home",
  components: {
    ArticleList,
    NavBar,
    Sidebar,
    BlogFooter,
  },
  data() {
    return {
      screenWidth: "",
      sidebar_show: true,
    };
  },
  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
      this.sidebar_show = this.screenWidth > 1100;
    };
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}

.rm-padding {
  padding: 0 !important;
}

.color-black {
  color: black;
}
</style>
