<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <img
        src="~@/assets/logo.png"
        class="logo"
        alt="logo"
      >
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: '今天吃啥管理后台',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
