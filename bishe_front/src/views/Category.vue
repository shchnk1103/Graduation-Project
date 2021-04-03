<template>
  <el-container>
    <el-header class="rm-padding">
      <nav-bar />
    </el-header>

    <el-main class="category rm-padding">
      <!--头部信息-->
      <el-row class="tag-detail tag-head">
        <el-col :span="12">
          <p class="font-size-big position-left position-center">分类</p>
        </el-col>
        <el-col :span="12">
          <p class="font-size-big position-right position-center">
            共 {{ number_of_categories }} 个
          </p>
        </el-col>
      </el-row>

      <!--具体分类信息-->
      <el-row class="tag-detail tag-border">
        <el-button
          type="primary"
          plain
          class="category-button"
          v-for="category in categories"
          :key="category.id"
          @click="getCategoryArticles(category.id)"
        >
          {{ category.title }}
        </el-button>
      </el-row>

      <!--具体分类下的详情文章-->
      <div
        class="tag-detail article"
        v-for="article in articles"
        :key="article.id"
      >
        <router-link
          class="font-size-large color-black"
          :to="{ name: 'ArticleDetail', params: { id: article.id } }"
        >
          {{ article.title }}
        </router-link>
        <p class="font-size-small color-gray">oasis 2021.3.17 11:00</p>
      </div>

      <el-footer>
        <blog-footer />
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import NavBar from "@/components/Home/Navbar";
import axios from "axios";
import BlogFooter from "@/components/Home/Blogfooter";

export default {
  name: "Category",
  components: {
    BlogFooter,
    NavBar,
  },
  data() {
    return {
      categories: [],
      number_of_categories: 0,
      articles: [],
    };
  },
  mounted() {
    axios.get("/api/category/").then((response) => {
      this.categories = response.data;
      this.number_of_categories = response.data.length;
    });
  },
  methods: {
    getCategoryArticles(category_id) {
      axios.get("/api/category/" + category_id + "/").then((response) => {
        this.articles = response.data.articles;
      });
    },
  },
};
</script>

<style scoped>
.tag-head {
  height: 50px;
  margin: 1% 15%;
}

.tag-detail {
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.tag-border {
  height: auto;
  margin: 1% 15%;
}

.category-button {
  position: relative;
  margin: 1%;
}

.article {
  line-height: 50px;
  height: 100px;
  margin: 1% 15%;
}

.rm-padding {
  padding: 0 !important;
}

.position-center {
  position: relative;
  top: 33%;
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

a {
  color: black;
  text-decoration: none;
}

.font-size-small {
  font-size: 12px;
}

.font-size-large {
  font-size: 18px;
  font-weight: 700;
}

.font-size-big {
  font-weight: 500;
}
</style>
