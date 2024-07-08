<template>
    <ul v-infinite-scroll class="infinite-list" style="overflow: auto">
        <el-row>
            <el-col :span="6">
                <div class="grid-content ep-bg-purple" />
            </el-col>
            <el-col :span="12">
                <div class="grid-content ep-bg-purple-light left_">
                    <li v-for="item in items" :key="item.id" class="infinite-list-item">
                        <div class="avatar">
                            <el-avatar> user </el-avatar>
                            <span>{{ item.username }}</span>
                        </div>
                        <div class="answer-feedback">{{ likeCount }}人赞同了该回答</div>
                        <h1>{{ item.title }}</h1>
                        <div class="article-content">
                            {{ item.content }}
                        </div>
                        <div class="meta">
                            <div>
                                <el-button :type="like.isLike == 1 ? 'success' : 'primary'" @click="toggleLike">
                                    {{ like.isLike == 1 ? '已赞同' : '赞同' }}: {{ likeCount }}
                                </el-button>
                            </div>
                            <span>
                                <el-button plain @click="showCommentsDialog">
                                    评论
                                </el-button>
                                <el-button plain @click="dialogFormVisible = true">
                                    举报
                                </el-button>

                                <el-dialog v-model="dialogTableVisible" title="评论" width="800">
                                    <div class="comment-container">
                                        <h2 class="title">评论区</h2>
                                        <div class="comment-list">
                                            <ul>
                                                <li v-for="comment in comments" :key="comment.id" class="comment-item">
                                                    <div class="username">{{ comment.username }}</div>
                                                    <p class="content">{{ comment.content }}</p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="add-comment-form">
                                            <h3>发表您的评论</h3>
                                            <form @submit.prevent="addComment">
                                                <textarea v-model="newComment.content" placeholder="分享您的想法..." required
                                                    class="textarea-field"></textarea>
                                                <button type="submit" class="submit-btn">发布评论</button>
                                            </form>
                                        </div>
                                    </div>
                                </el-dialog>
                                <el-dialog v-model="dialogFormVisible" title="举报" width="500">
                                    <div class="add-comment-form">
                                        <h3>举报原因</h3>
                                        <form @submit.prevent="report">
                                            <textarea v-model="newReports.content" placeholder="例：垃圾广告、色情低俗、引人不适等。"
                                                required class="textarea-field"></textarea>
                                            <button type="submit" class="submit-btn">举报</button>
                                        </form>
                                    </div>
                                </el-dialog>
                            </span>
                        </div>
                    </li>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content ep-bg-purple-light"></div>
            </el-col>
        </el-row>
    </ul>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import useHomeStore from '@/store/modules/home/home';
import useUserStore from '@/store/modules/user';
import { PostIdParams, Like, submitComment, reports } from '@/api/home/type';
import { ElNotification, ElMessage } from "element-plus";

let homeStore = useHomeStore();
let userStore = useUserStore();

//评论功能的实现
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

let param: any = {
    params: {
        id: homeStore.postId
    }
};

let params: any = {
    params: {
        postId: homeStore.postId
    }
}

// 评论信息
const comments: any = ref([]);


//用户点击时获取评论数据
const showCommentsDialog = async () => {
    dialogTableVisible.value = true;
    try {
        const response: any = await homeStore.getComment(params);
        comments.value = []
        comments.value.push(...response);
    } catch (error) {
        console.error('加载数据出错:', error);
    }
};

// 新评论的状态
const newComment = ref({ content: '' });

// 添加评论的方法
const addComment = async () => {
    const submitComment: submitComment = {
        userId: userStore.userId,
        postId: homeStore.postId,
        content: newComment.value.content,
    }

    //重新获取评论信息
    try {
        //提交评论发起请求
        await homeStore.submitComment(submitComment);
        //刷新评论内容
        const response: any = await homeStore.getComment(params);
        comments.value = []
        comments.value.push(...response);
        // 清空表单
        newComment.value = { content: '' };
    } catch (error) {
        console.error('加载数据出错:', error);
    }
};

// 新评论的状态
const newReports = ref({ content: '' });


const report = async () => {
    const report: reports = {
        reporterId: userStore.userId,
        postId: homeStore.postId,
        reason: newReports.value.content,
    }

    try {
        await homeStore.submitReports(report);
        ElNotification({
            type: "success",
            message: "举报成功",
        });
    } catch (error) {

    }
    dialogFormVisible.value = false;
}


const items: any = ref([]);

onMounted(async () => {
    // 页面加载时初始化加载数据
    let params: any = {
        params: {
            id: homeStore.postId
        }
    };
    try {
        const response: any = await homeStore.postDetails(params);
        items.value.push(response);
        likeCount.value = response.likeCount;
        console.log(likeCount.value)
        like.value.isLike = response.isLiked;
        console.log(like.value.isLike)
    } catch (error) {
        console.error('加载数据出错:', error);
    }

});

//点赞按钮功能的实现
let likeCount = ref(0);
const like: any = ref({
    userId: userStore.userId,
    postId: homeStore.postId,
    isLike: 0
})

// 切换点赞状态的处理函数
const toggleLike = async () => {
    // 根据当前状态决定是要点赞还是取消点赞
    try {
        if (like.value.isLike == 1) {
            like.value.isLike = 0;
            await homeStore.postLike(like.value);
            likeCount.value--;
        } else {
            like.value.isLike = 1;
            await homeStore.postLike(like.value);
            likeCount.value++;
        }
    } catch (error) {
        console.error('请求错误:', error);
        ElMessage.error('网络错误，点赞失败！');
    }
};
</script>

<style lang="scss">
.comment-container {
    max-width: 900px;
    margin: 50px auto;
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    margin-bottom: 30px;
}

.comment-list {
    margin-bottom: 40px;
}

.comment-item {
    padding: 15px;
    border-bottom: 1px solid #ddd;
}

.username {
    font-weight: bold;
    margin-bottom: 5px;
}

.content {
    color: #555;
}

.add-comment-form {
    text-align: center;
}

.input-field,
.textarea-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
}

.textarea-field {
    resize: vertical;
    height: 150px;
}

.submit-btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.submit-btn:hover {
    background-color: #0056b3;
}

.avatar {
    margin: 10px;

    span {
        padding: 10px;
    }
}

.answer-feedback {
    display: inline-block;
    border-radius: 2px;
    padding: 4px 6px;
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
}

.infinite-list {
    width: 100%;
    height: 89vh;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    border-bottom: 1px solid #f4f6f9;

    h1 {
        font-weight: 900;
        padding-bottom: 10px;
    }

    /* 在你的全局样式文件（如app.css或相应的SCSS/LESS文件）中添加 */
    .article-content {
        /* 允许自动换行，包括在单词中间换行以避免溢出容器 */
        /* overflow-wrap: break-word;
    word-break: break-word; */
        /* 或者使用下面的简写形式 */
        white-space: normal;
        padding-bottom: 10px;
    }

    .meta {
        display: flex;
        justify-content: space-between;
    }

}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.left_ {
    background-color: white;
    height: 100%;
    margin-right: 10px;
}

.right_ {
    background-color: white;
    height: 90vh;
}

.loading-container {
    text-align: center;
    margin: 10px;
}
</style>: any: any
