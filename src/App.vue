<template>
  <div id="app">
    <DummyTable></DummyTable>
  </div>
</template>

<script>
import DummyTable from './components/DummyTable.vue'
export default {
  name: 'App',
  components: {
    DummyTable
  }
}
</script>

<style>
#app {
  text-align: left;
  margin-top: 60px;
}
</style>
