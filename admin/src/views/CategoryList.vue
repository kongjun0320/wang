<template>
  <div class="about">
    <h1>分类列表</h1>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column prop="_id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "categoryList",
  data() {
    return {
      categoryList: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/list");
      this.categoryList = res.data;
    }
  }
};
</script>
<style></style>
