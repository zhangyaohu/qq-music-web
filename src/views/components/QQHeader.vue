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
				                :fetch-suggestions="querySearch" 
												v-model="queryString">
					<i
						class="el-icon-search el-input__icon"
						slot="suffix"
						@click="handleIconClick">
  				</i>
					 <template slot-scope="{ item }">
              <ul class="search_content" v-if="queryString === ''">
							  <li class="name">{{  item.k }}</li>
                <li class="addr">{{ singleToSize(item.n) }}</li>
							</ul>
							<div  v-else>
								<h5>单曲</h5>
							  <ul class="search_content" v-for="(song, sIndex) in item.songList">
								  <li>{{song.name}}</li>
									<li class='singer' :title="song.singer">{{song.singer}}</li>
								</ul>
								<h5>专辑</h5>
								<ul class="search_content" v-for="(song, sIndex) in item.albumList">
								  <li>{{song.name}}</li>
									<li class='singer' :title="song.singer">{{song.singer}}</li>
								</ul>
								<h5>歌手</h5>
								<ul class="search_content" v-for="(song, sIndex) in item.singerList">
								  <li>{{song.name}}</li>
									<li class='singer' :title="song.singer">{{song.singer}}</li>
								</ul>
								<h5>MV</h5>
								<ul class="search_content" v-for="(song, sIndex) in item.mvList">
								  <li>{{song.name}}</li>
									<li class='singer' :title="song.singer">{{song.singer}}</li>
								</ul>
							</div>
            </template>
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
				<li v-for="(item, index) in subMenuList" :key="index" class="header_menu__link" >
          <router-link :to='item.path' :class="{'active': item.path === $route.path}">
            {{item.title}}
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

import qqHeaderApi from 'src/views/components/qqHeaderApi';
import Root from 'src/views/store/Root';
import {singleToSize} from 'src/views/utils/utils';
export default {
	mixins: [Root],

  data() {
		return{
			currentPath: '/home',
			subMenuList: [
				{
					path: '/home',
					title: '首页'
				},
				{
					path: '/singer',
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
			],
			queryString: '',
			timeout:null
		}
	},
	mounted() {
	 this.init();
	 console.log(this.$router);
	},

	methods: {
		singleToSize,
		handleIconClick() {

		},
		querySearch(queryString, cb) {
      var restaurants = this.dbData.searchSongList;
        var results = restaurants;
				if(queryString) {
           this.createFilter(queryString, cb)
				}else{
					 cb(results);
				}
		},

		createFilter(queryString, cb) {
			let param = {
				is_xml: 0,
        key: queryString
			}
     qqHeaderApi.getSearchRes(param)
			.then((resp) => {
						cb([{
							songList: resp.data.song.itemlist,
							singerList: resp.data.singer.itemlist,
							mvList: resp.data.mv.itemlist,
							albumList:  resp.data.album.itemlist
						}])
			 })
		},

		init() {
			qqHeaderApi.searchAll()
			 .then((resp) => {
          this.updateDataList({
        'dataName': 'searchSongList',
        'data': resp.data.hotkey.splice(0, 5)
        })
		  })
		}
	}
}
</script>

<style lang="less" scoped>
  @import url('./header.less');

	.search_content{
		font-size: 12px; 
		li{
			display: inline-block;
			    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999;
		}

		.singer{
		overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999;
		min-width: 30%;
		}
	}

	.active{
		color: #31c27c;
	}
</style>