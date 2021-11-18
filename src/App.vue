<template>
  <graph :initData="dataSource"></graph>
</template>

<script>
import { Graph } from '../packages/index';

export default {
  name: 'App',
  data() {
    return {
      dataSource: {}
    }
  },
  methods: {

  },
  components: {
    Graph,
  },
  mounted() {
    // setTimeout(() => {
    //   console.log('123')
    //   this.dataSource = {a: '123', b: '4456'}
    // }, 3000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>