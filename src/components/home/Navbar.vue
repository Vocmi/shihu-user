<template>
  <el-header>
    <el-row class="navbar" type="flex" justify="space-between" align="middle">
      <el-col :span="4">
        <div class="logo">识乎</div>
      </el-col>
      <el-col :span="5">
        <el-menu mode="horizontal" default-active="1">
          <el-menu-item index="1" @click="home">首页</el-menu-item>
          <el-menu-item index="2" @click="write">写文章</el-menu-item>
          <el-menu-item index="3">等你来答</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="8" class="right-section">
        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入"
          @select="handleSelect" />
        <el-button type="primary">搜索</el-button>
      </el-col>
      <el-col :span="7">
        <el-button type="button.type" text>
          消息
        </el-button>
        <el-button type="button.type" text @click="logOut">
          退出登录
        </el-button>
        <el-avatar> {{ username }} </el-avatar>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';

let userStore = useUserStore();
const username = ref(userStore.username);


let $router = useRouter();

const home = () => {
  $router.push("/home");
}

const write = () => {
  $router.push("/write");
}

import { ref, onMounted } from 'vue';

interface LinkItem {
  value: string;
  link: string;
}

const links = ref<LinkItem[]>([]);
const state = ref('');

const loadAll = async () => {
  // try {
  //   const response = await axios.get('/api/your-endpoint'); // 替换为你的后端API地址
  //   if (response.status === 200) {
  //     links.value = response.data; // 假设后端返回的数据直接符合LinkItem数组格式
  //   } else {
  //     console.error('Failed to fetch data');
  //   }
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  // }
};

let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = (queryString: string, cb: (arg: LinkItem[]) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 3000 * Math.random());
};

const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return restaurant.value.toLowerCase().includes(queryString.toLowerCase());
  };
};

const handleSelect = (item: LinkItem) => {
  console.log(item);
};

onMounted(() => {
  loadAll();
});

//  退出登录功能的实现
const logOut = () => {
  userStore.userLogout();
  $router.push("/login")
}

</script>

<style scoped>
.logo {
  font-size: 24px;
  color: #409eff;
  float: right;
}

.right-section {
  display: flex;
  align-items: center;
}

.right-section .el-input {
  margin-right: 10px;
}
</style>
