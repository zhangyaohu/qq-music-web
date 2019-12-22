<template>
  <div class="container">
    <div class="section_inner">
      <div class="section_title">
        <h2>新歌首发</h2>
      </div>
      <div class="section_tab">
        <li
          v-for="(item, index) in subMenuList"
          :key="index"
          @click="changeTab(item, index)"
          :class="{'active': currentSelectTab === index}"
          class="section_menu__link"
        >{{item.lan}}</li>
      </div>

      <div>
        <el-carousel :interval="5000" arrow="always" height="425px">
          <el-carousel-item v-for="(it, i) in 4" :key="i">
            <div class="carousel-item" v-for="(item, index) in carouselList[i]" :key="index">
              <div class="carousel-content">
                <router-link to="/" class="link">
                  <img
                    :src="`//y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.pmid}.jpg`"
                    class="carousel_item_image"
                  />
                  <div class="cover_play">
                    <img src="../../images/cover_play.png" style="background-size: 50"/>
                  </div>
                </router-link>
                <div class="decsription">
                  <p class="title">{{item.name}}</p>
                  <p class="author">{{item.singer[0].name}}</p>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import HomeApi from "src/views/home/homeApi";
import Root from "src/views/store/Root";

export default {
	mixins: [Root],
	name: 'SongCarousel',
  props: {
    param: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      dataSource: [],
      currentSelectTab: 0,
      subMenuList: []
    };
  },

  computed: {
    carouselList() {
      return _.chunk(this.dataSource, 9);
    }
  },
  methods: {
    changeTab(item, index) {
      this.currentSelectTab = index;
       let param = {
				 data: {
					 "comm":{"ct":24},
					 "new_song":{"module":"newsong.NewSongServer",
					 "method":"get_new_song_info",
					 "param":{"type":item.type}}
					 }
			 }
        HomeApi.queryAll(param).then(resp => {
          this.dataSource = [];
          this.updateDataList({
            dataName: "newSongList",
            data: resp.new_song.data.songlist
          });
        });
    }
  },
  watch: {
    "param.data": function(newValue, oldValue) {
      if (_.isEqual(newValue, oldValue)) return;
        this.dataSource = newValue;
    },

    "param.category": function(newValue, oldValue) {
			 if (_.isEqual(newValue, oldValue)) return;
       this.subMenuList = newValue;
    }
  }
};
</script>

<style lang="less" scoped>
.link {
  width: 86px;
  height: 86px;
  display: inline-block;
}

.active{
  color: #31c27c;
}

.carousel-item {
  padding-top: 20px;
  width: calc((100% - 60px) / 3);
  position: relative;
}

.carousel-content{
	padding: 10px;
	border-bottom: 1px solid #f2f2f2;
}

.decsription {
  display: inline-block;
  font-size: 14px;
  vertical-align: top;
  .author {
    color: #999;
    padding-left: 10px;
  }
  .title {
    color: #000;
    padding: 10px 0px 3px 10px;
  }
}

.author, .title{
 &:hover{
	 color: #31c27c;
	 cursor: pointer;
 }
}
.container{
	background: #fff;
}

.link:hover,
.carousel_item_image-item {
  -webkit-transform: scale(1.01) translateZ(0);
  -webkit-transition: transfrom 0.75s cubiz-bezier(0, 1, 0.75, 1), opacity 0.5;
  cursor: pointer;
  opacity: 0.8;
}

.link{
  position: relative;
  &:hover{
    .cover_play{
      display: inline-block;
      position: absolute;
      top: 12%;
      left: 12px;
      transform: scale(1.07);
      transition: transfrom 0.75s cubiz-bezier(0, 1, 0.75, 1), opacity 0.5;
      opacity: 0.8;
    }
  }
}

.cover_play{
  display: none;
  width: 50px;
  height: 50px;
}
</style>
