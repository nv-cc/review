<template>
  <section class="page">
    hello, this is defalue router!
    <el-tabs tab-position="left" class="tabs-container">
      <el-tab-pane v-for="li in componentsMsg" :key="li.name" :label="li.introduce">
        <component :is="li.name"></component>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script src="./index.js"></script>

<style scoped lang="stylus" src="./index.styl"></style>
