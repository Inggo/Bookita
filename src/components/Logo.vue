<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-one-quarter">
      <img :src="logo" :alt="title" class="logo">
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logo: process.env.LOGO ? process.env.LOGO : 'logo.png',
      title: process.env.TITLE
    }
  }
}
</script>

<style>

</style>
