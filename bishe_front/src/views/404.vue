<template>
  <div class="not-found">
    <img :src="src" alt="" />
  </div>
</template>

<script>
export default {
  name: "404",
  data() {
    return {
      src: require("../../public/404.gif"),
    };
  },
};
</script>

<style scoped>
.not-found {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.not-found img {
  width: 100%;
  height: 100%;
}
</style>
