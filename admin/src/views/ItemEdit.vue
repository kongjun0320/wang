<template>
  <div class="about">
    <h1>{{ editTitleName }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "itemEdit",
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
      return this.id ? "编辑物品" : "新建物品";
    }
  },
  mounted() {
    this.id && this.fetch();
  },
  methods: {
    afterUpload(res){
      // 这样的赋值不会触发响应
      // this.model.icon = res.url
      this.$set(this.model,'icon',res.url)
    },
    async save() {
      let id = this.id;
      if (id) {
        await this.$http.put(`/rest/items/${id}`, this.model);
      } else {
        await this.$http.post("/rest/items", this.model);
      }

      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.post(`/rest/items/${this.id}`);
      this.model = res.data.category;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
