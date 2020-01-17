<template>
  <div>
    <div class="comment_zone">
      <h1>评论</h1>
      <div class="comment_zone__content">
        <textarea v-text="commentText" rows="3" class="comment_zone__content_text" />
        <div class="comment_zone__content_text__count">
          剩余
          <i>200</i>字
        </div>
      </div>
      <div class="comment_zone__submit">
        <span class="emoj_content">
          <img src="~images/emoj.jpg" class="emoj" @click="showEmoji = !showEmoji" />
          <div class="emoj_png" v-show="showEmoji">
            <VEmojiPicker @select="selectEmoji" ref="vEmoji"/>
          </div>
        </span>
        <span class="comment_zone__btn">发表评论</span>
      </div>
    </div>
    <div>
      <h2>最新评论({{total}})</h2>
      <ul v-for="(comment, index) in sourceData" :key="index">
        <li class="comment_list__img">
          <img :src="comment.avatarurl" class="comment_list__img__pic" />
        </li>
        <li class="comment_list__content">
          <span v-html="comment.nick" class="comment_list__content_title"></span>
          <span class="comment_list__content_text" 
					      v-html="getImg(comment.rootcommentcontent)"></span>
        </li>
        <li class="thumbs-up__content">
          <a class="thumbs-up" @click="handlePraise(comment)">
						<i class="qq-icon__changyongtubiao-xianxingdaochu-zhuanqu-"></i>
						<i class="praisenum">{{(comment.praisenum)}}</i>
					</a>
          <a>
            <i class="qq-icon__pinglun"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VEmojiPicker from "v-emoji-picker";

export default {
  data: () => ({
    commentText: "",
    showEmoji: false
  }),
  props: {
    sourceData: {
      type: Array,
			default: []
    },
    onChange: {
      type: Function
		},
		total: {
			type: Number | String
		}
  },
  components: {
    VEmojiPicker
  },
  mounted() {
    this.$refs.vEmoji.$el.addEventListener('mouseleave', () => {
      debugger
      this.showEmoji = false;
    })
  },
  methods: {
    selectEmoji(emoji) {
      this.commentText += emoji.data;
		},
		getImg(str) {
			let content = str.match(/(\[em\])[a-z0-9]+\[\/em\]/g);
			if(content && content.length>0)
      for(let i in content) {
				return str.replace(/(\[em\])[a-z0-9]+\[\/em\]/g,  `<img src='//y.gtimg.cn/mediastyle/global/emoji/img/${content[i].replace(/(\[em\])([a-z0-9]+)(\[\/em\])/, '$2')}.png'/>`)
			}
			else{
				return str;
			}
		},
		handlePraise(comment) {
			this.$emit('on-change', {type: 'praise', item: comment})
		}
  },
  destroyed() {
     this.$refs.vEmoji.$el.removeEventListener('mouseleave', () => {
      this.showEmoji = false;
    })
  }
};
</script>

<style lang="less" scoped>
.comment_zone {
  position: relative;
  &__content {
    border: 1px solid #ddd;

    &_text {
      display: block;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      &::placeholder {
        padding-left: 20px;
      }

      &__count {
        text-align: right;
        padding: 10px 20px;
        color: #999;
      }
    }
  }

  &__submit {
    padding: 20px 0px;
    text-align: right;
  }

  &__btn {
    background: #31c27c;
    color: #fff;
    border: 1px solid #31c27c;
    border-radius: 2px;
    padding: 10px 20px;
    cursor: pointer;
  }
}

.emoj {
  width: 36px;
  height: 36px;
  vertical-align: middle;
  cursor: pointer;

  &_content {
    position: relative;
    padding-right: 10px;
  }

  &_png {
    position: absolute;
    z-index: 10;
    right: -50px;
  }
}

.thumbs-up {

  &__content {
    text-align: right;
  }
}

.comment_list {
  &__content {
    display: inline-block;
		width: 80%;
		padding: 0px 15px 0px 15px;

    &_title {
      display: block;
    }
    &_text {
      overflow: hidden;
      word-break: break-all;
      word-wrap: break-word;
      line-height: 24px;
      text-align: justify;
    }
  }

  &__img {
    display: inline-block;
    vertical-align: top;
    width: 38px;
    height: 38px;

    &__pic {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      vertical-align: middle;
    }
  }
}

.praisenum{
	font-size: 16px;
	font-style: normal;
}
</style>
