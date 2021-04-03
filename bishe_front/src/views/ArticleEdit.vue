<template>
  <div>
    <nav-bar />

    <div id="article-create">
      <h3>更新文章</h3>

      <form id="image_form">
        <div class="form-elem">
          <span>图片：</span>
          <input v-on:change="onFileChange" type="file" id="file" />
        </div>
      </form>

      <form>
        <div class="form-elem">
          <span>标题：</span>
          <input v-model="title" type="text" placeholder="输入标题" />
        </div>

        <div class="form-elem">
          <span>分类：</span>
          <span v-for="category in categories" :key="category.id">
            <!--样式也可以通过 :style 绑定-->
            <button
              class="category-btn"
              :style="categoryStyle(category)"
              @click.prevent="chooseCategory(category)"
            >
              {{ category.title }}
            </button>
          </span>
        </div>

        <div class="form-elem">
          <span>标签：</span>
          <input
            v-model="tags"
            type="text"
            placeholder="输入标签，用逗号分隔"
          />
        </div>

        <div class="form-elem">
          <span>正文：</span>
          <textarea
            v-model="body"
            placeholder="输入正文"
            rows="20"
            cols="50"
          ></textarea>
        </div>

        <div class="form-elem button">
          <button v-on:click.prevent="submit">提交</button>
        </div>
        <div class="form-elem button">
          <button
            v-on:click.prevent="deleteArticle"
            style="background-color: darkred"
            class="position"
          >
            删除
          </button>
        </div>
      </form>
    </div>

    <br />
    <br />
    <br />

    <blog-footer />
  </div>
</template>

<script>
import NavBar from "@/components/Home/Navbar";
import BlogFooter from "@/components/Home/Blogfooter";
import axios from "axios";
import authorization from "@/utils/authorization";

export default {
  name: "ArticleEdit",
  components: { BlogFooter, NavBar },
  data() {
    return {
      title: "",
      body: "",
      categories: [],
      selectedCategory: null,
      tags: "",
      articleID: null,
      avatarID: null,
    };
  },
  mounted() {
    // 页面初始化时获取所有分类
    axios
      .get("/api/category/")
      .then((response) => (this.categories = response.data));

    axios
      .get("/api/article/" + this.$route.params.id + "/")
      .then((response) => {
        this.title = response.data.title;
        this.body = response.data.body;
        this.selectedCategory = response.data.category;
        this.tags = response.data.tag.join(",");
        this.articleID = response.data.id;
      });
  },
  methods: {
    // 根据分类是否被选中，按钮的颜色发生变化
    categoryStyle(category) {
      if (
        this.selectedCategory !== null &&
        category.id === this.selectedCategory.id
      ) {
        return {
          backgroundColor: "black",
        };
      }
      return {
        backgroundColor: "lightgrey",
        color: "black",
      };
    },
    // 选取分类
    chooseCategory(category) {
      // 如果点击已选取的分类，则将 selectedCategory 置空
      if (
        this.selectedCategory !== null &&
        this.selectedCategory.id === category.id
      ) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
      }
    },
    onFileChange(e) {
      // 将文件二进制数据添加到提交数据中
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("content", file);

      axios
        .post("/api/avatar/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("access.bishe"),
          },
        })
        .then((response) => (this.avatarID = response.data.id));
    },
    submit() {
      authorization().then((response) => {
        if (response[0]) {
          let data = {
            title: this.title,
            body: this.body,
          };

          data.category_id = this.selectedCategory
            ? this.selectedCategory.id
            : null;

          data.tag = this.tags
            .split(/[,，]/)
            .map((x) => x.trim())
            .filter((x) => x.charAt(0) !== "");

          data.avatar_id = this.avatarID;

          const token = localStorage.getItem("access.bishe");
          axios
            .put("/api/article/" + this.articleID + "/", data, {
              headers: { Authorization: "Bearer " + token },
            })
            .then((response) => {
              this.$router.push({
                name: "ArticleDetail",
                params: { id: response.id },
              });
            });
        } else {
          alert("令牌过期，请重新登录!");
        }
      });
    },
    deleteArticle() {
      const token = localStorage.getItem("access.bishe");
      authorization().then((response) => {
        if (response[0]) {
          axios
            .delete("/api/articles/" + this.articleID + "/", {
              headers: { Authorization: "Bearer " + token },
            })
            .then(() => {
              this.$router.push({ name: "Home" });
            });
        } else {
          alert("令牌过期，请重新登录!");
        }
      });
    },
  },
};
</script>

<style scoped>
.category-btn {
  margin-right: 10px;
}

#article-create {
  text-align: center;
  font-size: large;
}

form {
  text-align: left;
  padding-left: 100px;
  padding-right: 10px;
}

.form-elem {
  margin-left: 200px;
  padding: 10px;
}

input {
  height: 25px;
  padding-left: 10px;
  width: 50%;
}

button {
  height: 35px;
  cursor: pointer;
  border: none;
  outline: none;
  background: steelblue;
  color: whitesmoke;
  border-radius: 5px;
  width: 60px;
}

.button {
  margin-left: 235px;
  width: 100px;
  display: inline-block;
  text-align: center;
}
</style>
