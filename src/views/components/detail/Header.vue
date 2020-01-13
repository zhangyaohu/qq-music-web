<template>
  <div class="detail_header">
    <div class="detail_header__pic" v-if="type === 'song'">
      <img :src="sourceData.logo" />
    </div>
		<div class="detail_header__pic" v-if="type === 'lyric'">
      <img :src="`//y.gtimg.cn/music/photo_new/T002R300x300M000${sourceData.track_info.album.pmid}.jpg`" />
    </div>
    <div class="detail_header__content">
      <ul v-if="type === 'song'">
        <li>
          <h1 class="detail_header__content_title" :title="sourceData.dissname">{{sourceData.dissname}}</h1>
        </li>
        <li class="detail_header__content_item">{{sourceData.nickname}}</li>
        <li class="detail_header__content_item">标签：
					<i v-for="(tag, index) in sourceData.tags" :key="index">
						{{tag.name}}
					</i>
				</li> 
        <li class="detail_header__content_item">播放量：{{sourceData.visitnum && singleToSize(sourceData.visitnum)}}</li>
        <li class="detail_header__content_item">收藏量：{{collectNum}}</li>
      </ul>
			<ul v-if="type === 'lyric'">
        <li>
          <h1 class="detail_header__content_title" :title="sourceData.track_info.title">{{sourceData.track_info.title}}</h1>
        </li>
        <li class="detail_header__content_item">
					 <i v-for="(item, index) in sourceData.track_info.singer" :key="index">
						 {{item.name}}/
					 </i>
					</li>
        <li class="detail_header__content_item_left">
					<div>
						<span>专辑</span>
					  <span>{{sourceData.info.album}}</span>
					</div>
					<div>
						<span>流派</span>
					  <span></span>
					</div>
					<div>
						<span>发行时间</span>
					  <span></span>
					</div>
				</li>
				<li class="detail_header__content_item_right">
					<div>
						<span>语种</span>
					  <span></span>
					</div>
					<div>
						<span>唱片公司</span>
					  <span></span>
					</div>
				</li>
      </ul>
      <div>
        <span class="detail_header__btn play" @click="$emit('play')">
					 <i class="el-icon-caret-right"></i>
					播放全部
				</span>
        <span class="detail_header__btn normal">
					<i class="el-icon-folder-add"></i>
					收藏
				</span>
        <span class="detail_header__btn normal" @click="scrollToComment">
					<i class="el-icon-chat-dot-round"></i>
					评论({{commentTotal}})
				</span>
				<span class="detail_header__btn normal">
					<i class="el-icon-more"></i>
					更多
				</span>
      </div>
    </div>
  </div>
</template>

<script>

import {singleToSize} from 'src/views/utils/utils';
export default {
	props: {
		param: {
			type: Object,
			default: {}
		},
		comment: {
			type: Number,
			default: 0
		},
		collect: {
			type: Number,
			default: {}
		},
		type: {
			type: String,
			default: 'song'
		}
	},
	
	data(){
		return {
			sourceData: {},
			commentTotal: 0,
			collectNum: 0
		}
	},
	mounted() {
		console.log(this.sourceData);
	},
  methods: {
		singleToSize,
		scrollToComment(event) {
			document.documentElement.scrollTop = 1150;
		} 
	},
	watch:  {
		'param': function (newVal, oldVal){
			if(this.$_.isEqual(newVal, oldVal)) return ;
			this.sourceData = newVal;
		},
		'comment': function (newVal, oldVal){
			if(this.$_.isEqual(newVal, oldVal)) return ;
			this.commentTotal = newVal;
		},
		'collect': function (newVal, oldVal){
			if(this.$_.isEqual(newVal, oldVal)) return ;
			this.collectNum = newVal;
		}
	}
};
</script>

<style lang="less" scoped>
.detail_header {
  position: relative;
  padding: 20px 10px;

  &__pic {
    display: inline-block;
    vertical-align: top;
    padding-right: 20px;
  }

  &__content {
    display: inline-block;
    vertical-align: top;
    padding-top: 13px;
    &_item {
      height: 27px;
      line-height: 27px;
      width: 400px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
			font-size: 14px;
			i{
				font-style: normal;
			}

			&_left{
				display: inline-block;
			}

			&_right{
				display: inline-block;
			}
    }
    &_title {
      font-size: 31px;
      line-height: 50px;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      margin-right: 10px;
    }
  }
  &__btn {
    display: inline-block;
    padding: 10px 30px;
		margin-right: 10px;
		cursor: pointer;
		border-radius: 2px;
  }
  .play {
    border: 1px solid #31c27c;
    background-color: #31c27c;
		color: #fff;
	}
	.normal{
		border: 1px solid #c9c9c9
	}
}
</style>