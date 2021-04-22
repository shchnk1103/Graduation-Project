<template>
  <el-row>
    <nav-bar class="navbar" />

    <el-form ref="form" :model="form" label-width="80px" class="form-shadow">
      <h3 class="title">发表文章</h3>

      <!--标题-->
      <el-form-item label="文章名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="文章图片">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          limit="1"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">选取文件</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传 jpg/png 文件，且不超过 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <!--标签-->
      <el-form-item label="标签">
        <el-input v-model="tags" placeholder="输入标签，用逗号分隔"></el-input>
      </el-form-item>

      <!--分类-->
      <el-form-item label="分类">
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
      </el-form-item>

      <!--正文-->
      <el-form-item label="正文">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          v-model="form.body"
        ></el-input>
      </el-form-item>

      <el-form-item class="button-all">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button class="button-cancel">取消</el-button>
      </el-form-item>
    </el-form>

    <blog-footer />
  </el-row>
</template>

<script>
import NavBar from "@/components/Home/Navbar";
import BlogFooter from "@/components/Home/Blogfooter";
import axios from "axios";
import authorization from "@/utils/authorization";

export default {
  name: "ArticleCreate",
  components: { BlogFooter, NavBar },
  data() {
    return {
      fileList: [],
      // 数据库中所有的分类
      categories: [],
      // 选定的分类
      selectedCategory: null,
      // 标签
      tags: "",
      // 标题图 id
      avatarID: null,
      form: {
        // 文章标题
        title: "",
        // 文章正文
        body: "",
      },
    };
  },
  mounted() {
    // 页面初始化时获取所有分类
    axios
      .get("/api/category/")
      .then((response) => (this.categories = response.data));
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击提交按钮
    onSubmit() {
      console.log("submit!");
      const that = this;
      const token = localStorage.getItem("access.bishe");
      authorization().then((response) => {
        if (response[0]) {
          // 需要传给后端的数据字典
          let data = {
            title: that.form.title,
            body: that.form.body,
          };
          // 添加分类
          if (that.selectedCategory) {
            data.category_id = that.selectedCategory.id;
          }
          // 标签预处理
          data.tag = that.tags
            // 用逗号分隔标签
            .split(/[,，]/)
            // 剔除标签首尾空格
            .map((x) => x.trim())
            // 剔除长度为零的无效标签
            .filter((x) => x.charAt(0) !== "");

          let file = this.$refs.upload.uploadFiles.pop().raw;
          let formData = new FormData();
          formData.append("content", file);

          axios
            .post("/api/avatar/", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
              },
            })
            .then((response) => {
              this.avatarID = response.data.id;
              // 添加标题图 id
              data.avatar_id = that.avatarID;
              // 将发表文章请求发送至接口
              // 成功后前往详情页面
              axios
                .post("/api/articles/", data, {
                  headers: { Authorization: "Bearer " + token },
                })
                .then(function (response) {
                  that.$router.push({
                    name: "ArticleDetail",
                    params: { id: response.data.id },
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            });
        } else {
          alert("令牌过期，请重新登录。");
        }
      });
    },
    // 根据分类是否被选中，按钮的颜色发生变化
    // 这里可以看出 css 也是可以被 vue 绑定的，很方便
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
    // 选取分类的方法
    chooseCategory(category) {
      // 如果点击已选取的分类，则将 selectedCategory 置空
      if (
        this.selectedCategory !== null &&
        this.selectedCategory.id === category.id
      ) {
        this.selectedCategory = null;
      }
      // 如果没选中当前分类，则选中它
      else {
        this.selectedCategory = category;
      }
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-top: 2px;
  margin-bottom: 2px;
}

.category-btn {
  margin-right: 10px;
  height: 35px;
  cursor: pointer;
  border: none;
  outline: none;
  background: steelblue;
  color: whitesmoke;
  border-radius: 5px;
  width: 60px;
}

.form-shadow {
  padding-right: 10px;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 20px;
  width: 800px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.navbar {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.button-all {
  margin-left: 25%;
  margin-right: 25%;
}

.button-cancel {
  margin-left: 10%;
}
</style>
