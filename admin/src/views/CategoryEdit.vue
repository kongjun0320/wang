<template>
  <div class="about">
    <h1>{{ editTitleName }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择分类">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "categoryEdit",
  data() {
    return {
      model: {},
      parents: []
    };
  },
  props: {
    id: {
      type: String
    }
  },
  computed: {
    editTitleName() {
      return this.id ? "编辑分类" : "新建分类";
    }
  },
  mounted() {
    this.id && this.fetch();
    this.fetchParents();
  },
  methods: {
    async save() {
      let id = this.id;
      if (id) {
        await this.$http.put(`/rest/categories/${id}`, this.model);
      } else {
        await this.$http.post("/rest/categories", this.model);
      }

      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.post(`/rest/categories/${this.id}`);
      this.model = res.data.category;
    },
    async fetchParents() {
      const res = await this.$http.get("/rest/categories");
      this.parents = res.data.list;
    }
  }
};
</script>
<style></style>
