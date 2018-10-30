<template>
  <div id="app" class="ui container">
    <div class="ui inverted menu">
      <div class="header item">Blockchain</div>
      <div v-bind:class="{ active: $route.name === 'Desktop' }" class="item"><router-link :to="{ name: 'Desktop' }">Desktop</router-link></div>
      <div v-bind:class="{ active: $route.name === 'TransactionStatus' }" class="item"><router-link :to="{ name: 'TransactionStatus' }">Transactions</router-link></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
