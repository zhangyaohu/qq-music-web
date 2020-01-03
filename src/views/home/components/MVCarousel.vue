<template>
  <div class="container">
    <div class="section_inner">
      <div class="section_title">
        <h2>MV</h2>
      </div>
      <div class="section_tab">
        <li
          v-for="(item, index) in subMenuList"
          :key="index"
          @click="changeTab(item, index)"
          :class="{'active': currentSelectTab === index}"
          class="section_menu__link"
        >{{item.name}}</li>
      </div>

      <div>
         <el-carousel :interval="5000" arrow="always" height="490px">
          <el-carousel-item v-for="(it, i) in 4" :key="i">
            <div class="carousel-item" v-for="(item, index) in carouselList[i]" :key="index">
              <div class="carousel-content">
                <router-link to="/" class="link">
                  <img
                    :src="item.picurl"
                    class="carousel_item_image"
                  />
                </router-link>
                <div class="decsription">
                  <p class="title">{{item.mvtitle}}</p>
                  <p class="author">{{item.singername}}</p>
                  <p class="number">
                    <i class="el-icon-video-camera" 
                    style="font-size: 16px;"></i>
                  {{singleToSize(item.listennum)}}
                  </p>
                </div>
              </div>
               <div class="cover_play">
                  <img src="../../images/cover_play.png"/>
                </div>
            </div>
           </el-carousel-item>
          </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import {singleToSize} from 'src/views/utils/utils';
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
      subMenuList: [
        {
          id: 'all',
          name: '精选'
        },
        {
          id: 'neidi',
          name: '内地'
        },
        {
          id: 'korea',
          name: '韩国'
        },
        {
          id: 'gangtai',
          name: '港台'
        },
        {
          id: 'oumei',
          name: '欧美'
        },
        {
          id: 'janpan',
          name: '日本'
        }
      ]
    };
  },
  
  computed: {
    carouselList() {
      return _.chunk(this.dataSource, 10);
    }
  },
  methods: {
    singleToSize,
    changeTab(item, index) {
      this.currentSelectTab = index;
       let param = {
				 cmd: 'shoubo',
         lan: item.id
			 }
        HomeApi.getMv(param).then(resp => {
          this.dataSource = [];
          this.updateDataList({
            "dataName": "mvList",
						"data": resp.data.mvlist
          });
        });
    }
  },
  watch: {
    "param.data": function(newValue, oldValue) {
      if (this.$_.isEqual(newValue, oldValue)) return;
        this.dataSource = newValue;
    }
  }
};
</script>

<style lang="less" scoped>
.link {
  display: inline-block;
}

.active{
  color: #31c27c;
}

.carousel-item {
  padding-top: 20px;
  position: relative;

  &:hover{
    .cover_play{
      display: inline-block;
      position: absolute;
      top: 20%;
      left: 66px;
      transform: scale(1.07);
      transition: transfrom 0.75s cubiz-bezier(0, 1, 0.75, 1), opacity 0.5;
      opacity: 0.8;
    }
  }
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
    max-width: 105px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .number{
    color: #999;
    padding-left: 10px;
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

.cover_play {
  display: none;
}

</style>
