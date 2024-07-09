//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqArticles, reqGetComment, reqLike, reqPostDetails, reqReports, reqSubmitText, reqsubmitComment } from "@/api/home";
import { PostIdParams, Like, Params, Text, submitComment, reports } from "@/api/home/type";

//创建用户小仓库
let useHomeStore = defineStore('Home', {
    //小仓库存储数据的地方
    state: () => {
        return {
            postId: null as string | null,
            initialLikeCount: 10,
            islike: 0
        };
    },
    //异步|逻辑的地方
    actions: {
        //举报
        async submitReports(data: reports) {
            let result: any = await reqReports(data);
            if (result.code == 0) {
                return Promise.reject(new Error(result.msg));
            }
            if (result.code == 1) {
                return result.data;
            }
        },

        //提交评论
        async submitComment(data: submitComment) {
            let result: any = await reqsubmitComment(data);
            if (result.code == 0) {
                return Promise.reject(new Error(result.msg));
            }
            if (result.code == 1) {
                return result.data;
            }
        },

        //获取评论信息
        async getComment(data: PostIdParams) {
            let result: any = await reqGetComment(data);
            if (result.code == 0) {
                return Promise.reject(new Error(result.msg));
            }
            if (result.code == 1) {
                return result.data;
            }
        },

        //用户点赞
        async postLike(data: Like) {
            let result: any = await reqLike(data);
            if (result.code == 0) {
                return Promise.reject(new Error(result.msg));
            }
            if (result.code == 1) {
                return result.data;
            }
        },

        //分页加载方法
        async sendArticles(data: Params) {
            //分页加载请求
            let result: any = await reqArticles(data);
            //成功返回code：1，失败为0并且返回错误信息
            if (result.code == 0) {
                return Promise.reject(new Error(result.msg));
            }
            if (result.code == 1) {
                return result.data;
            }
        },

        //提交文章方法
        async submitText(data: Text) {
            //提交文章
            let result: any = await reqSubmitText(data);
            //捕获错误状态码并返回错误信息
            if (result.code == 0) {
                return Promise.reject(new Error(result.msg));
            }
        },

        async postDetails(data: PostIdParams) {
            //获取文章详情信息
            let result: any = await reqPostDetails(data);
            if (result.code == 0) {
                return Promise.reject(new Error(result.msg));
            }
            if (result.code == 1) {
                this.initialLikeCount = result.data.likeCount;
                this.islike = result.data.isLiked;
                return result.data;
            }
        },

        //本地存储保证持久化
        setPostId(id: string | null) {
            if (id != null) {
                this.postId = id
                localStorage.setItem('postId', id) // 存储到 localStorage
            }
        },
        async loadPostId() {
            const storedId = localStorage.getItem('postId')
            if (storedId) {
                this.setPostId(storedId)
            }
        }
    },
    getters: {
        getPostId(): any {
            return this.postId;
        }
    },
});

//对外暴露小仓库
export default useHomeStore;
