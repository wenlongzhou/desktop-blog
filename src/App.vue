<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* Project id 2769951 */
  src: url('//at.alicdn.com/t/font_2769951_8guzrwr4umu.woff2?t=1630034426488') format('woff2'),
       url('//at.alicdn.com/t/font_2769951_8guzrwr4umu.woff?t=1630034426488') format('woff'),
       url('//at.alicdn.com/t/font_2769951_8guzrwr4umu.ttf?t=1630034426488') format('truetype');
}


.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

body {
  -webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>