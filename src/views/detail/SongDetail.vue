<template>
	<div class="song_detail__container">
		<detail-header :param="songObj" :comment="commentTotal" :collect="collectNum" @play="playAll"></detail-header>
		<Table :columns="columns" 
		       :dataSource="songDataSource" 
					 type="radio"
					@play="playAll" 
					@add="addSong" 
					@download="downLoad" 
					@share="share"></Table>
		<comment-component :sourceData="dbData.commentList" :total="commentTotal"></comment-component>
	</div>
</template>

<script>

import {chunk} from 'lodash'
import Root from 'src/views/store/Root';
import DetailApi from 'src/views/detail/detailApi';
import DetailHeader from 'src/views/components/detail/Header';
import Table from 'src/views/components/table/Table';
import CommentComponet from 'src/views/components/comment/CommentComponent';
export default {
	mixins: [Root],
	components: {
		'detail-header': DetailHeader,
		'comment-component' : CommentComponet,
		Table
	},
	data(){
    return {
			songObj: {},
			commentTotal: 0,
			collectNum: 0,
			commentParam: {
				cid: 205360772,
        reqtype: 2,
        biztype: 3,
        cmd: 8,
        needmusiccrit: 0,
        pagenum: 0,
        pagesize: 25,
        lasthotcommentid:'' ,
        domain: 'qq.com',
        ct: 24,
        cv: 10101010,
			},
			columns: [
        {
          title: "",
          key: "index_album",
					width: "10%",
					render: (text, key, dI) => {
            return dI + 1;
					}
        },
        {
          title: "歌曲",
          key: "title",
          width: "45%",
        },
        {
          title: "歌手",
          key: "singer",
          width: "15%",
          render: (text, key) => {
            return <span>{text[key] && text[key][0].name}</span>;
          }
				},
				{
          title: "专辑",
          key: "name",
          width: "15%",
        },
        {
          title: "时长",
          width: "15%",
					key: "interval",
					render: (text, key) => {
						return <span>{(text[key]/60).toFixed(2)}</span>
					}
        }
      ]
		}
	},
	computed: {
		songDataSource: function (){
			return this.dbData.songList.splice(0, 10)
		}
	},
  mounted() {
		this.init();
	},
	methods: {
		init() {
			return Promise.all([this.detailQuery(), this.detailQueryCollect(), this.detailQueryComment()])
		}, 
		detailQuery() {
			let param = {
				'type': 1,
				json: 1,
				utf8: 1,
        onlysong: 0,
        new_format: 1,
				disstid: this.$route.params.id
			}
			DetailApi.querySongDetail(param)
			.then((resp) => {
				this.songObj = resp.cdlist[0];
				 this.updateDataList({
						"dataName": "songList",
						"data": resp.cdlist[0].songlist
				})
			})
		},
		detailQueryCollect() {
			let param = {
        cid: 322,
        nocompress: 1,
        disstid: this.$route.params.id,
			}
			DetailApi.querySongCollect(param)
			.then(resp => {
				 this.collectNum = resp.totalnum
			})
		},
		detailQueryComment() {
			let param = Object.assign({}, this.commentParam, {topid: this.$route.params.id})
			DetailApi.querySongComment(param)
			.then(resp => {
				this.commentTotal = resp.comment.commenttotal;
				this.updateDataList({
						"dataName": "commentList",
						"data": resp.comment.commentlist
				})
			})
		},
    //播放全部
		playAll() {
      this.$router.push('/play-list')
		},
		//添加歌曲
		addSong() {

		},
		//下载歌曲
		downLoad() {

		},
		//分享歌曲
		share() {

		}
	}
}
</script>

<style lang="less" scoped>
 .song_detail{
   &__container{
		 position: relative;
		 max-width: 1200px;
		 margin: 0 auto;
	 }
 }
</style>