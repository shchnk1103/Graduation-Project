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
            共 {{ number_of_tags }} 个
          </p>
        </el-col>
      </el-row>

      <!--具体分类信息-->
      <el-row class="tag-detail tag-border">
        <el-button
          type="info"
          round
          class="category-button"
          v-for="tag in tags"
          :key="tag.id"
          @click="getTagArticles(tag.id)"
        >
          {{ tag.text }}
        </el-button>
      </el-row>

      <!--具体分类下的详情文章-->
      <div class="tag-detail article">
        <a href="#" class="font-size-large color-black">今天的风好大！</a>
        <p class="font-size-small color-gray">oasis 2021.3.17 11:00</p>
      </div>
      <div class="tag-detail article">
        <a href="#" class="font-size-large color-black">今天的风好大！</a>
        <p class="font-size-small color-gray">oasis 2021.3.17 11:00</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import NavBar from "@/components/Home/Navbar";
import { getTags } from "@/network/home";
import axios from "axios";

export default {
  name: "Tag",
  components: {
    NavBar,
  },
  data() {
    return {
      tags: [],
      number_of_tags: 0,
    };
  },
  mounted() {
    getTags().then((response) => {
      this.tags = response;
      this.number_of_tags = response.length;
      console.log(this.tags);
    });
  },
  methods: {
    getTagArticles(tag_id) {
      axios
        .get("http://127.0.0.1:8000/api/tag/" + tag_id + "/")
        .then((response) => {
          console.log(response.data);
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
