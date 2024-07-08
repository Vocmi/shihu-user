<template>
  <ul v-infinite-scroll class="infinite-list" style="overflow: auto">
    <el-row>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple-light left_">
          <li v-for="item in items" :key="item.id" class="infinite-list-item" @click="details(item.id)">
            <h1>{{ item.title }}</h1>
            <div class="article-content">
              {{
                item.content.length > 100
                  ? `${item.content.slice(0, 100)}...`
                  : item.content
              }}
            </div>
            <div class="meta">
              <el-button type="primary">赞同:{{ item.likeCount }}</el-button>
              <span>浏览次数:{{ item.viewCount }}</span>
              <span>回复数量:{{ item.replyCount }}</span>
            </div>
          </li>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple-light"></div>
      </el-col>
    </el-row>
    <div v-if="loading" class="loading-container">加载中...</div>
  </ul>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import useHomeStore from '@/store/modules/home/home';
import { Params } from '@/api/home/type';
import { useRouter } from 'vue-router';

const items: any = ref([]); // 用于存储文章列表数据
const loading = ref(false); // 是否正在加载更多数据
const page = ref(1); // 当前页数，用于分页请求

const perPage = 10; // 每页显示的文章数量

let $router = useRouter();

let homeStore = useHomeStore();

let params: Params = {
  params: {
    page: page.value,
    per_page: perPage,
  }
}

onMounted(() => {
  // 页面加载时初始化加载数据
  loadMore();
});

const details = (itemId: any) => {
  //这里进行跳转路由
  homeStore.postId = itemId;
  $router.push("/details");
}

const loadMore = async () => {
  if (loading.value) return; // 如果正在加载，则不执行
  loading.value = true;

  try {
    const response: any = await homeStore.sendArticles(params);
    items.value.push(...response.articles);
    console.log(items.value)
    page.value++; // 加载下一页
  } catch (error) {
    console.error('加载数据出错:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style>
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

  .article-content {
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
</style>
