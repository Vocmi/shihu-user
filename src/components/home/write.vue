<template>
    <el-row>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="12">
            <div class="write-article">
                <el-form label-width="120px" :model="articleForm">
                    <el-form-item label="标题">
                        <el-input v-model="articleForm.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="正文">
                        <el-input type="textarea" v-model="articleForm.content" placeholder="请输入正文"
                            :rows="26"></el-input>
                    </el-form-item>
                    <!-- 注意这里直接使用submit，因为我们在setup中返回了submit方法 -->
                    <el-button type="primary" @click="submit" class="primary">发布</el-button>
                </el-form>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content ep-bg-purple" />
        </el-col>
    </el-row>

</template>

<script lang="ts" setup>
import { Text } from '@/api/home/type';
import { ref } from 'vue';
import useHomeStore from '@/store/modules/home/home';

let homeStore = useHomeStore();


// setup函数是Vue 3中组合式API的核心部分
const articleForm: any = ref({
    title: '',
    content: ''
});

const submit = () => {
    // 提交表单数据到后端的操作
    homeStore.submitText(articleForm.value);
    articleForm.value = {
        title: '',
        content: ''
    }
};

</script>

<style scoped>
.primary {
    float: right;
}
</style>