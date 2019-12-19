<template>
  <div class="about">
    <h1>文章列表</h1>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column prop="_id" label="ID"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <!-- <el-table-column prop="body" label="详情"> </el-table-column> -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button 
            type="text"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "articleList",
  data() {
    return {
      categoryList: []
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/articles");
      this.categoryList = res.data.list;
    },
    async remove(row) {
      this.$confirm(`确定要删除"${row.title}"分类吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/articles/${row._id}`);
          this.fetch();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style></style>
