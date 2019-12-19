<template>
	 <div class="app_container">
		  <QQ-Header></QQ-Header>
		 	<router-view></router-view>
	 </div>
</template>

<script>
import QQHeader from 'src/views/components/QQHeader';
export default {
	name: 'App',
  components: {
		 'QQ-Header': QQHeader
	}
}
</script>

<style lang="less" scoped>
  @import './app.less';
</style>