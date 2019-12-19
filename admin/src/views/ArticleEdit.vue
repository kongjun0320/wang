<template>
  <div class="about">
    <h1>{{ editTitleName }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "articleEdit",
  data() {
    return {
      model: {},
      categories: []
    };
  },
  components: {
    VueEditor
  },
  props: {
    id: {
      type: String
    }
  },
  computed: {
    editTitleName() {
      return this.id ? "编辑文章" : "新建文章";
    }
  },
  mounted() {
    this.id && this.fetch();
    this.fetchCategories();
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let id = this.id;
      if (id) {
        await this.$http.put(`/rest/articles/${id}`, this.model);
      } else {
        await this.$http.post("/rest/articles", this.model);
      }

      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.post(`/rest/articles/${this.id}`);
      this.model = res.data.category;
    },
    async fetchCategories() {
      const res = await this.$http.get("/rest/categories");
      this.categories = res.data.list;
    }
  }
};
</script>
<style></style>
