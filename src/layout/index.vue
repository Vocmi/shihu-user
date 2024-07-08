<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <div class="grid-content ep-bg-purple-dark ban">
          <navbar></navbar>
        </div>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/home/Navbar.vue';
// import { onMounted } from 'vue';
// import useUserStore from "@/store/modules/user";

// const userStore = useUserStore();

// onMounted(() => {
//   userStore.userInfo();
// })

</script>

<style lang="scss">
.container {
  background-color: #f4f6f9;
}

.ban {
  background-color: white;
  height: $base-tabbar-height;
}



.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>