<template>
  <el-row v-if="sidebar_show">
    <el-col :span="5"></el-col>
    <el-col :span="19" class="article">
      <!--头部信息-->
      <el-row class="article-detail">
        <el-col :span="12">
          <p class="font-size-big position-left">首页</p>
        </el-col>
        <el-col :span="12">
          <p class="font-size-big position-right">共13篇文章</p>
        </el-col>
      </el-row>

      <!--正文-->
      <div
        class="article-detail position"
        v-for="article in articles"
        :key="article.url"
      >
        <!--图片-->
        <el-image
          :src="imageIfExists(article)"
          fit="contain"
          class="avatar"
          v-if="article.avatar != null"
        ></el-image>
        <el-image v-else fit="contain" :src="src" class="avatar"></el-image>
        <!--标题-->
        <router-link
          :to="{ name: 'ArticleDetail', params: { id: article.id } }"
          class="title"
        >
          <p class="font-size-large color-black colored">{{ article.title }}</p>
        </router-link>
        <!--具体信息-->
        <p class="font-size-small color-gray info">
          oasis · {{ formatted_time(article.created) }}
        </p>
      </div>

      <!--翻页-->
      <div id="paginator">
        <!--上一页-->
        <span v-if="is_page_exists('previous')">
          <router-link :to="get_path('previous')"> Prev </router-link>
        </span>

        <!--当前页数-->
        <span class="current-page">
          {{ get_page_param("current") }}
        </span>

        <!--下一页-->
        <span v-if="is_page_exists('next')">
          <router-link :to="get_path('next')"> Next </router-link>
        </span>
      </div>
    </el-col>
  </el-row>

  <el-row v-else>
    <el-col :span="5"></el-col>
    <el-col :span="14" class="article">
      <div
        class="article-detail"
        v-for="article in articles"
        :key="article.url"
      >
        <a href="#" class="font-size-large color-black">{{ article.title }}</a>
        <p class="font-size-small color-gray">
          oasis · {{ formatted_time(article.created) }}
        </p>
      </div>
    </el-col>
    <el-col :span="5"></el-col>
  </el-row>
</template>

<script>
import axiox from "axios";

export default {
  name: "ArticleList",
  props: {
    sidebar_show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      articles: {},
      pages: {},
      src: require("../../../public/404.gif"),
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    // 请求文章
    getArticleList: function () {
      let url = "/api/articles";
      let params = new URLSearchParams();
      params.appendIfExists("page", this.$route.query.page);
      params.appendIfExists("search", this.$route.query.search);
      const paramsString = params.toString();
      if (paramsString.charAt(0) !== "") {
        url += "/?" + paramsString;
      }
      axiox.get(url).then((response) => {
        console.log(response.data.results);
        this.articles = response.data.results;
        this.pages = response.data;
      });
    },
    // 格式化时间
    formatted_time: function (iso_date_string) {
      const date = new Date(iso_date_string);
      return date.toLocaleDateString();
    },
    // 判断页面是否存在
    is_page_exists: function (direction) {
      if (direction === "next") {
        return this.pages.next !== null;
      }
      return this.pages.previous !== null;
    },
    // 获取页码
    get_page_param: function (direction) {
      try {
        let url_string;
        switch (direction) {
          case "next":
            url_string = this.pages.next;
            break;
          case "previous":
            url_string = this.pages.previous;
            break;
          default:
            return this.$route.query.page;
        }

        const url = new URL(url_string);
        return url.searchParams.get("page");
      } catch (error) {
        console.log(error);
      }
    },
    // 修改页码路径
    get_path: function (direction) {
      let url = "";

      try {
        switch (direction) {
          case "next":
            if (this.pages.next !== undefined) {
              url += new URL(this.pages.next).search;
            }
            break;
          case "previous":
            if (this.pages.previous !== undefined) {
              url += new URL(this.pages.previous).search;
            }
            break;
        }
      } catch {
        return url;
      }

      return url;
    },
    imageIfExists(article) {
      if (article.avatar) {
        return article.avatar.content;
      }
    },
  },
  watch: {
    // 监听路由是否有变化
    $route() {
      this.getArticleList();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}

a,
.colored:hover {
  color: cornflowerblue;
}

.article {
  line-height: 50px;
}

.article-detail {
  margin-bottom: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

#paginator {
  text-align: center;
  padding-top: 50px;
}

.current-page {
  font-size: x-large;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
}

a {
  color: black;
}

.position {
  position: relative;
  height: 200px;
}

.avatar {
  position: absolute;
  left: 3%;
  top: 11%;
  height: 150px;
  width: 250px;
  border-radius: 10px;
}

.title {
  position: absolute;
  left: 300px;
  top: 11%;
}

.info {
  position: absolute;
  left: 300px;
  top: 21%;
}

.position-left {
  text-align: left;
  margin-left: 20px;
}

.position-right {
  text-align: right;
  margin-right: 20px;
}

.color-black {
  color: black;
}

.color-gray {
  color: gray;
}

.font-size-big {
  font-weight: 500;
}

.font-size-small {
  font-size: 12px;
}

.font-size-large {
  font-size: 18px;
  font-weight: 700;
}
</style>
