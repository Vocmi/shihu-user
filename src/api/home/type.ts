//分页查询暴露方法
export interface Pagefrom {
    page: number;
    per_page: number;
}

export interface Params {
    params: Pagefrom;
}

//文章接口的暴露方法
export interface Text {
    title: string;
    content: string;
}

//文章详情接口
export interface PostId {
    postId: number;
}
export interface PostIdParams {
    params: PostId;
}

//用户点赞
export interface Like {
    userId: number;
    postId: number;
    isLike: number;
}

// 定义评论数据结构
export interface Comment {
    id: number;
    username: string;
    content: string;
}

// 提交评论
export interface submitComment {
    userId: number;
    postId: number;
    content: string;
}

// 举报
export interface reports {
    reporterId: number;
    postId: number;
    reason: string;
}
