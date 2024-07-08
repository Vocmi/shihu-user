//统一管理项目用户相关的接口
import request from "@/utils/request";
import { PostIdParams, Like, Params, Text, submitComment, reports } from "./type";
//统一管理接口
enum API {
    ARTICLES_URL = '/articles',
    SUBMIT_TEXT = '/submitText',
    POST_DETAILS = '/postDetails',
    LIKE_URL = '/like',
    GET_COMMENT = '/getComment',
    SUBMIT_COMMENT = '/submitComment',
    REPORTS_URL = '/reports',
    PROMPT_URL = '/prompt',
}
//暴露请求函数
//分页加载获取请求
export const reqArticles = (data: Params) => request.get(API.ARTICLES_URL, data);

//提交文章获取请求
export const reqSubmitText = (data: Text) => request.post(API.SUBMIT_TEXT, data);

//获取文章详细信息
export const reqPostDetails = (data: PostIdParams) => request.get(API.POST_DETAILS, data);

//用户点赞
export const reqLike = (data: Like) => request.post(API.LIKE_URL, data);

//用户评论
export const reqGetComment = (data: PostIdParams) => request.get(API.GET_COMMENT, data);

//提交评论
export const reqsubmitComment = (data: submitComment) => request.post(API.SUBMIT_COMMENT, data);

//举报
export const reqReports = (data: reports) => request.post(API.REPORTS_URL, data);

//搜索提示
export const reqPrompt = (data: any) => request.get(API.PROMPT_URL, data)
