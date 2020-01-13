<template>
	 <div class="app_container">
		  <QQ-Header v-if="showHeader"></QQ-Header>
		 	<router-view></router-view>
	 </div>
</template>

<script>
import QQHeader from 'src/views/components/QQHeader';
export default {
	name: 'App',
  components: {
		 'QQ-Header': QQHeader
	},
	data() {
		return {
			showHeader: false
		}
	},
	watch: {
		'$route': function(newVal, oldVal) {
			let themeLink = document.querySelector('link[name="theme"]');
			if(newVal.path === '/play-list'){
				this.showHeader = false;
				debugger;
				 document.body.className ='theme_dark' ;
         localStorage.setItem('app',document.body.className)
			}else {
				this.showHeader = true;
				 document.body.className ='theme_light' ;
         localStorage.setItem('app',document.body.className)
			}
		}
	}
}
</script>

<style lang="less" scoped>
  @import './app.less';
</style>