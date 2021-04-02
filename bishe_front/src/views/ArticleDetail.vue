<template>
  <div class="detail">
    <el-header class="rm-padding">
      <navbar/>
    </el-header>

    <el-row v-if="article != null">
      <el-col :span="5"></el-col>

      <el-col :span="11" class="margin-left">
        <div class="article-detail">
          <h1 id="title">{{ article.title }}</h1>
          <p id="subtitle">
            {{ category }} · {{ username }} · {{ formatted_time(article.created) }}
            <span v-if="isSuperuser">
            <router-link
                :to="{ name: 'ArticleEdit', params: { id: article.id }}"
                class="edit"
            >
              编辑
            </router-link>
          </span>
          </p>
          <div v-html="article.body_html" class="article-body"></div>
        </div>
      </el-col>

      <!--目录-->
      <el-col :span="8">
        <div class="toc-detail">
          <h3>目录</h3>
          <div v-html="article.toc_html" class="toc"></div>
        </div>
      </el-col>
    </el-row>

    <comments :article="article"/>

    <el-footer class="rm-padding">
      <blog-footer></blog-footer>
    </el-footer>

  </div>
</template>

<script>
import Navbar from "@/components/Home/Navbar"
import BlogFooter from "@/components/Home/Blogfooter"
import {getArticleDetail} from "@/network/home";
import Comments from "@/components/Home/Comments";


export default {
  name: "ArticleDetail",
  components: {
    Comments,
    Navbar,
    BlogFooter,
  },
  data() {
    return {
      article: {},
      username: '',
      category: '',
    }
  },
  mounted() {
    getArticleDetail(this.$route.params.id).then(response => {
      this.article = response
      this.username = response.author.username
      this.category = response.category.title
    })
  },
  methods: {
    formatted_time: function (iso_date_string) {
      const date = new Date(iso_date_string);
      return date.toLocaleDateString()
    }
  },
  computed: {
    isSuperuser() {
      return localStorage.getItem('isSuperuser.bishe') === 'true'
    }
  }
}
</script>

<style scoped>
.detail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.rm-padding {
  padding: 0 !important;
}

#title {
  text-align: center;
  font-size: x-large;
}

#subtitle {
  text-align: center;
  color: gray;
  font-size: small;
}

.margin-left {
  margin-left: -6%;
}

.article-detail {
  padding-left: 2%;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.toc-detail {
  width: 300px;
  margin-bottom: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-left: 8%;
}

.article-body {
  margin-left: 5%;
  margin-right: 5%;
  padding-bottom: 1%;
}

.edit {
  text-decoration: none;
  color: gray;
  font-size: small;
}

.edit:hover {
  color: brown;
}
</style>
<style>
.article-body p img {
  max-width: 100%;
  border-radius: 50px;
  box-shadow: gray 0 0 20px;
}

.toc ul {
  list-style-type: none;
  padding-left: 0;
}

.toc ul li {
  padding-left: 0;
}

.toc a {
  color: gray;
  text-decoration: none;
}
</style>
