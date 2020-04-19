<template>
    <div style="display: flex; flex-direction:column; align-items:flex-start">
        <div style="margin-left:170px; margin-top: 20px;">
            <el-upload
                class="avatar-uploader"
                action="/api/users/upload/photo2"
                :data="user"
                :show-file-list="false"
                :on-success="fileUploadSuccess"
                :on-error="fileUploadError"
                :before-upload="beforeAvatarUpload">
                <img v-if="user.httpUserFace != ''" :src="user.httpUserFace" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        
        <el-form ref="user" :model="form" label-width="80px" class="center">
            <el-form-item label="个人账号:">
                <el-input v-model="user.userId"></el-input>
            </el-form-item>
            <el-form-item label="职位:">
                <el-input v-model="user.job"></el-input>
            </el-form-item>
            <el-form-item label="职位:" style="width: 300px;">
                <el-tag
                    v-for="tag in user.roles"
                    :key="tag.name"
                    :type="''"
                    style="margin-left:10px; ">
                    {{tag.nameZH}}
                </el-tag>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },

    computed: {
        user(){
            return this.$store.state.user
        }
    },


    methods: {
        //头像上传成功后
        fileUploadSuccess(res, file) {
            if(res.state == 200){
              this.user.httpUserFace = res.data.httpUserFace;
              this.user.userFace = res.data.userFace;
              this.$store.commit('login',this.user);
            }
            this.$message({type: res.state, message: res.message});
      },


      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

    }
  }
</script>
<style>
 .center {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 20px 50px 50px 20px; 
    width: 300px;
    padding: 15px 15px 15px 15px;
    background: #fff;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 50px
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    }
</style>