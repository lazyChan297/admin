<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import {Loading} from 'vux'
export default {
  name: 'App',
  components: {
    Loading
  }
}
</script>

<style>
[v-cloak] {
  /* display: none !important; */
  background: red !important;;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
