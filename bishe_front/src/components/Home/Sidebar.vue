<template>
  <el-row>
    <el-col :span="13" class="sidebar">
      <div class="category">
        <p class="position-left font-size-big">
          分类（共{{ number_of_categories }}个）
        </p>
        <hr />
        <el-row>
          <el-button
            type="primary"
            plain
            class="category-button"
            v-for="category in categories"
            :key="category.id"
          >
            {{ category.title }}
          </el-button>
        </el-row>
      </div>

      <div class="tag">
        <p class="position-left font-size-big">
          标签（共{{ number_of_tags }}个）
        </p>
        <hr />
        <el-row>
          <el-button
            type="info"
            round
            class="tag-button"
            v-for="tag in tags"
            :key="tag.id"
          >
            {{ tag.text }}
          </el-button>
        </el-row>
      </div>
    </el-col>
    <el-col :span="11"></el-col>
  </el-row>
</template>

<script>
import { getCategories, getTags } from "@/network/home";
import axios from "axios";

export default {
  name: "Sidebar",
  data() {
    return {
      categories: [],
      number_of_categories: 0,
      tags: [],
      number_of_tags: 0,
    };
  },
  mounted() {
    axios.get("/api/category/").then((response) => {
      this.categories = response.data;
      this.number_of_categories = response.data.length;
    });
    axios.get("/api/tag/").then((response) => {
      this.tags = response.data;
      this.number_of_tags = response.data.length;
    });
  },
};
</script>

<style scoped>
.sidebar {
  padding-left: 2px;
  line-height: 50px;
  margin-right: 20px;
  margin-top: 20px;
}

.category,
.tag {
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.category-button,
.tag-button {
  margin-left: 8px;
  margin-bottom: 4px;
  margin-top: 4px;
}

.position-left {
  text-align: left;
  margin-left: 20px;
}

.font-size-big {
  font-weight: 500;
}
</style>
