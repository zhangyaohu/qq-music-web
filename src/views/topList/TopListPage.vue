<template>
  <div class="topList">
		<div class="topList_menu">
			 <Menu :list="asideMenu" @change="goToPath"></Menu>
		</div>
		<div class="topList_main">
			<div class="topList_header">
				<h1  class="topList_header__title">
					{{dbData.topListObj.title}}
				</h1>
				<span>{{dbData.topListObj.updateTime}}</span>
				<span>榜单规则</span>
			</div>
			<div class="topList_toolbar">
				<ul>
				<li class="topList_btn play_all">
          <i class="el-icon-caret-right"></i>
					播放全部
				</li>
				<li class="topList_btn">
					 <i class="el-icon-folder-add"></i>
					添加到
				</li>
				<li class="topList_btn">
					 <i class="el-icon-download"></i>
					下载
				</li>
				<li class="topList_btn">
					 <i class="el-icon-caret-right"></i>
					批量操作
				</li>
				<li class="topList_btn">
					 <i class="el-icon-chat-dot-round"></i>
					评论
				</li>
			</ul>
			</div>
			<Table :columns="columns" :dataSource="dbData.topList"></Table>
		</div>
	</div>
</template>

<script>
import TopListApi from "src/views/topList/topListApi";
import Root from "src/views/store/Root";
import Table from 'src/views/components/table/Table';
import asideMenuList from  './asideMenuList.json';
import Menu from 'src/views/components/Menu/MenuList';
import { formatDateTime } from 'src/views/utils/utils';

export default {
  name: "TopListPage",
	mixins: [Root],
	components: {
		Table,
		Menu
	},
  data() {
    return {
			offset:0,
			num:20,
			period:"2019-12-26",
			asideMenu: asideMenuList,
			columns: [
				{
					title: '',
					key: 'song',
					width: '10%',
					render: (text, key) => {
						console.log(text)
						 return (<span >
							<i class={['top_num', `${text[key].rank <=3 ? 'red_color' : ''}`].join(' ')}>{text[key].rank}</i>
							 {text[key].rankValue}</span>)
					}
				},
				{
					title: '歌曲',
					key: 'name',
					width: '65%',
					render: (text, key) => {
            return (
							<div>
								<img src={`//y.gtimg.cn/music/photo_new/T002R90x90M000${text.album.pmid}.jpg`} class="album_pic"/>
								<span>{text[key]}</span>
								{
									text.isonly === 1 ? <i class="is_only">独家</i> : ''
								}
								{
									text.mv.vid ? <i class="is_only">MV</i> : ''
								}
								{
									text.pay.pay_play === 1 ? <i class="is_only">VIP</i> : ''
								}
							</div>
						)
					}
				},
				{
					title: '歌手',
					key: 'singer',
					width: '15%',
					render: (text, key) => {
            return <span>{text[key][0].name}</span>
					}
				},
				{
					title: '时长',
					width: '10%',
					key: 'time_public'
				},
			],
			param: {
				"detail":{
					"module":"musicToplist.ToplistInfoServer",
					"method":"GetDetail"
					},
					"comm":{
						"ct":24,"cv":0
				  }
				}
		};
	},
	
	mounted() {
		if(['4', '27', '62', '67', '5'].includes(this.$route.params.topId)) {
			this.period = formatDateTime(new Date() , 'yyyy-MM-dd')
		}else{
			this.period = '2019_51'
		}
			this.init();
	},
  methods: {
		init() {
			this.param.detail["param"] = {
				"topId": Number(this.$route.params.topId),
				"offset": this.offset,
				"num":  this.num,
				"period": this.period
				}

			TopListApi.getTopList(this.param)
			 .then((resp) => {
				 for(let i in resp.detail.data.songInfoList) {
					 for(let j in resp.detail.data.data.song) {
						 if(resp.detail.data.data.song[j].songId === resp.detail.data.songInfoList[i].id) {
							 resp.detail.data.songInfoList[i].song = resp.detail.data.data.song[j];
						 }
					 }
				 }
				 this.updateDataObject({
					 "name": 'topListObj',
					 "data": resp.detail.data.data
				 })
				 this.updateDataList({
					 "dataName": 'topList',
					 "data": resp.detail.data.songInfoList
				 })
		     console.log('topList ==== ' + this.dbData.topList);
			 })
		},

		goToPath(menu) {
		 this.period = menu[0] ? menu[0].period : formatDateTime(new Date() , 'yyyy-MM-dd');
		 this.init();
		}
	}
};
</script>

<style lang="less" scoped>
  .topList{
		max-width: 1200px;
		margin: 0 auto;
		padding-top: 60px;

		&_header{
			line-height: 64px;
      height: 64px;
      margin-bottom: 10px;
			&__title{
				display: inline-block;
				font-weight: 400;
        font-size: 24px;
        margin-right: 15px;
			}
		}

		&_btn{
			display: inline-block;
			border: 1px solid #c9c9c9;
			padding: 10px 30px;
			cursor: pointer;
			border-radius: 2px;
			font-size: 16px;
      margin-right: 5px;
		}

		&_menu{
			display: inline-block;
			vertical-align: top;
			width: 20%;
		}
	}

	.top_num{
		font-style: normal;
		display: inline-block;
		padding-right: 20px;
	}

	.red_color{
    color: #ff4222;
	}

	.album_pic{
		vertical-align: middle;
		padding-right: 20px;
	}

	.is_only{
		padding: 0px 10px;
		font-size: 12px;
		border-radius: 2px;
		border: 1px solid #31c27c;
		color: #31c27c;
		margin-left: 10px;
		text-align: center;
		font-style: normal;
	}

	.play_all{
		border: 1px solid #31c27c;
		background-color: #31c27c;
		color: #fff;
	}

	.topList_main{
		display: inline-block;
		vertical-align: top;
		width: calc(80% - 30px);
    padding-left: 20px;
	}
</style>