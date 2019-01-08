<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  // import MyHome from './components/Home'
  // import MySearch from './components/Search'
  // import MyPlayer from './components/Player'
  export default {
  name: 'App',
  data(){
  return{
  }
  },
  component:{
    // MyHome,
    // MySearch,
    // MyPlayer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-left: auto;*/
  /*margin-right: auto;*/

}
body{
  /*width: 100%;*/
  /*overflow: hidden;*/
  margin:  0;
  padding: 0 ;
  /*background: yellow;*/
  min-width: 1600px;
}
html，body{
  width: 100%;
  min-width:1600px;
  overflow: hidden;
}
a{
  text-decoration: none;
  color: #000;
}
a:hover{
  color: #169af3;
}
</style >
