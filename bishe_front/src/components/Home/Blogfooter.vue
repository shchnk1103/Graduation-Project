<template>
  <el-row :gutter="15" id="footer">
    <!--校标-->
    <el-col :span="8">
      <a href="http://zwu.edu.cn/">
        <el-image :src="src" fit="contain" class="school-badge"> </el-image>
      </a>
    </el-col>

    <el-col :span="8">
      <p class="complete-time">2021.3.23</p>
    </el-col>

    <el-col :span="8"></el-col>
  </el-row>
</template>

<script>
export default {
  name: "BlogFooter",
  data() {
    return {
      src: require("../../assets/wlxy.png"),
    };
  },
};
</script>

<style scoped>
#footer {
  position: fixed;
  left: 7px;
  bottom: 0;
  height: 50px;
  width: 100%;
  background: whitesmoke;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.school-badge {
  height: 50px;
  margin-left: 70px;
}

.complete-time {
  height: 50px;
  text-align: center;
  padding-top: 3%;
}
</style>
