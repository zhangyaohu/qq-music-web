<template>
  <div class="header_container">
		<div class="header_inner">
			<h1 class="header_title">
				<a>
					<img src="//y.gtimg.cn/mediastyle/yqq/img/logo.png?nowebp=1"/>
				</a>
			</h1>
			<ul class="header_nav">
				<li class="header_nav__item">
					<router-link to='/home'>音乐馆</router-link>
				</li>
				<li class="header_nav__item">
					<router-link to='/home'>我的音乐</router-link>
				</li>
				<li class="header_nav__item">
					<router-link to='/home'>客户端</router-link>
				</li>
				<li class="header_nav__item">
					<router-link to='/home'>开放平台</router-link>
				</li>
				<li class="header_nav__item">
					<router-link to='/home'>VIP</router-link>
				</li>
			</ul>
			<ul class="header_search">
				<el-autocomplete placeholder="搜索音乐、MV、歌单、用户" 
				                :fetch-suggestions="querySearch">
					<i
						class="el-icon-search el-input__icon"
						slot="suffix"
						@click="handleIconClick">
  				</i>
				</el-autocomplete>
			</ul>
			<ul class="header_login">
				<router-link to='/home'>登录</router-link>
				<router-link to='/home' class="header_btn__center">
				  <el-button class="header_btn">开通绿砖豪华版</el-button>
				</router-link>
				<router-link to='/home'>
				  <el-button class="header_btn">开通付费包</el-button>
				</router-link>
			</ul>
			<ul class="header_menu">
				<li v-for="(item, index) in subMenuList" :key="index" class="header_menu__link">
          <router-link :to='item.path'>
            {{item.title}}
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
  data() {
		return{
			subMenuList: [
				{
					path: '/home',
					title: '首页'
				},
				{
					path: '/home',
					title: '歌手'
				},
				{
					path: '/home',
					title: '新碟'
				},
				{
					path: '/home',
					title: '排行榜'
				},
				{
					path: '/home',
					title: '分类歌单'
				},
				{
					path: '/home',
					title: '电台'
				},
				{
					path: '/home',
					title: 'MV'
				},
				{
					path: '/home',
					title: '数字专辑'
				},
				{
					path: '/home',
					title: '票务'
				},
			]
		}
	},
	methods: {
		handleIconClick() {

		},
		querySearch() {

		}
	}
}
</script>

<style lang="less" scoped>
  @import url('./header.less');
</style>