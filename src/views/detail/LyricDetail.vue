<template>
  <div class="lyric_detail__container">
    <detail-header :param="songObj" :comment="commentTotal" :collect="collectNum" type="lyric"></detail-header>
    <div class="lyric_detail__content">
      <div class="lyric_detail__title_con">
        <h2 class="lyric_detail__title_con__title">歌词</h2>
        <a class="lyric_detail__title_con__copy" @click="copyLyric">
          <i class="el-icon-document-copy"></i>
        </a>
      </div>
      <div v-html="lyric" :class="{'unexpend':!isExpend}" ref="targetEle"></div>
      <a @click="isExpend = !isExpend" class="expend_btn">{{isExpend ? '收起' : "展开"}}</a>
    </div>
		 <comment-component :sourceData="dbData.commentList" :total="commentTotal"></comment-component>
  </div>
</template>

<script>
import { chunk } from "lodash";
import Root from "src/views/store/Root";
import DetailApi from "src/views/detail/detailApi";
import DetailHeader from "src/views/components/detail/Header";
import Table from "src/views/components/table/Table";
import CommentComponet from "src/views/components/comment/CommentComponent";
import { unescapeHTML, copyText } from "src/views/utils/utils";
export default {
	mixins: [Root],
  components: {
    "detail-header": DetailHeader,
    "comment-component": CommentComponet,
    Table
  },
  data() {
    return {
      lyric: "",
			isExpend: false,
			commentTotal: 0,
			songObj: {},
			collectNum: 0,
			commentParam: {
				cid: 205360772,
        reqtype: 2,
        biztype: 1,
        cmd: 8,
        needmusiccrit: 0,
        pagenum: 0,
        pagesize: 25,
        lasthotcommentid:'' ,
        domain: 'qq.com',
        ct: 24,
        cv: 10101010,
			},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    detailQueryLyric() {
      let param = {
        nobase64: "1",
        musicid: this.$route.params.id ? this.$route.params.id : ""
      };
      DetailApi.queryLyricDetail(param).then(resp => {
        debugger;
        let s = unescapeHTML(resp.lyric),
          lyric = s
            .replace(/\[[^\[\]]*\]/g, "<p>")
            .replace(/\\n/g, "</p>")
            .trim();
        if (
          -1 == lyric.indexOf("<p>") &&
          (lyric = "<p>" + resp.lyric.replace(/&#10;/g, "</p><p>") + "</p>")
        )
          this.lyric = s
            .replace(/\[[^\[\]]*\]/g, "")
            .replace(/\\n/g, "\r\n")
            .trim();
        this.lyric = lyric;
      });
    },
    copyLyric() {
      copyText(this.$refs.targetEle);
		},
		init() {
			return Promise.all([this.detailQueryLyric(), this.detailQueryComment(), this.detailQueryInfo()])
		}, 
    detailQueryInfo() {
      let param = {
        data: {
          comm: {
            ct: 24,
            cv: 0
          },
          songinfo: {
            method: "get_song_detail_yqq",
            param: {
              song_type: 0,
              song_mid: "002ZN5gT2YaabQ",
              song_id: this.$route.params.id ? this.$route.params.id : ""
            },
            module: "music.pf_song_detail_svr"
          }
        }
      };
      DetailApi.querySongInfo(param).then((resp) => {
        this.songObj = resp.songinfo.data;
			});
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
		}
  }
};
</script>

<style lang="less" scoped>
.lyric_detail {
  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }
  &__content {
    font-size: 14px;
    color: #000;
    line-height: 26px;
    margin-bottom: 40px;
  }
  &__title {
    &_con {
      position: relative;

      &__title {
        display: inline-block;
        font-size: 20px;
        font-weight: 400;
        margin-right: 10px;
      }

      &__copy {
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}

.unexpend {
  max-height: 390px;
  overflow: hidden;
}

.expend_btn {
  cursor: pointer;
  color: #31c27c;
}
</style>