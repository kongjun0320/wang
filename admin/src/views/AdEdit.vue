<template>
  <div class="about">
    <h1>{{ editTitleName }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
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
  name: "adEdit",
  data() {
    return {
      model: {}
    };
  },
  props: {
    id: {
      type: String
    }
  },
  computed: {
    editTitleName() {
      return this.id ? "编辑广告" : "新建广告";
    }
  },
  mounted() {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      let id = this.id;
      if (id) {
        await this.$http.put(`/rest/ads/${id}`, this.model);
      } else {
        await this.$http.post("/rest/ads", this.model);
      }

      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.post(`/rest/ads/${this.id}`);
      this.model = res.data.category;
    }
  }
};
</script>
<style></style>
