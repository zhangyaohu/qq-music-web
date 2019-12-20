<template>
  <div>
    <div class="section_inner">
      <div class="section_title">
        <h2>歌单推荐</h2>
      </div>
      <div class="section_tab">
        <li
          class="section_menu__link"
          @click="changeTab('', 6)"
          :class="{'active': currentSelectTab === 6}"
        >为你推荐</li>
        <li
          v-for="(item, index) in subMenuList"
          :key="index"
          @click="changeTab(item, index)"
          :class="{'active': currentSelectTab === index}"
          class="section_menu__link"
        >{{item.item_name}}</li>
      </div>

      <div>
        <el-carousel :interval="5000" arrow="always" v-if="currentSelectTab!==6">
          <el-carousel-item v-for="(item, i) in 2" :key="i">
            <li class="carousel-item" v-for="(item, index) in dataSource[i]" :key="index">
              <img :src="item.cover_url_medium" class="carousel_item_image" />
            </li>
          </el-carousel-item>
        </el-carousel>
        <el-carousel :interval="5000" arrow="always" v-else>
          <el-carousel-item v-for="(item, i) in 2" :key="i">
            <li class="carousel-item" v-for="(item, index) in dataSource[i]" :key="index">
              <img :src="item.cover" class="carousel_item_image" />
            </li>
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
  name: "SongSheet",
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
      dataSource: [[], []],
      currentSelectTab: 6,
      subMenuList: []
    };
  },

  methods: {
    changeTab(item, index) {
      this.currentSelectTab = index;
      let param = {};
      if (index !== 6) {
        param = {
          data: {
            comm: { ct: 24 },
            playlist: {
              method: "get_playlist_by_category",
              param: {
                id: item.item_id,
                curPage: 1,
                size: 40,
                order: 5,
                titleid: 64
              },
              module: "playlist.PlayListPlazaServer"
            }
          }
        };
        HomeApi.queryAll(param).then(resp => {
          this.dataSource = [];
          this.updateDataList({
            dataName: "songList",
            data: resp.playlist.data.v_playlist
          });
        });
      } else {
        param = {
          data: {
            comm: { ct: 24 },
            recomPlaylist: {
              method: "get_hot_recommend",
              param: { async: 1, cmd: 2 },
              module: "playlist.HotRecommendServer"
            }
          }
        };
        HomeApi.queryAll(param).then(resp => {
          this.dataSource = [[], []];
          this.updateDataList({
            dataName: "songList",
            data: resp.recomPlaylist.data.v_hot
          });
        });
      }
    }
  },
  watch: {
    "param.data": function(newValue, oldValue) {
      if (_.isEqual(newValue, oldValue)) return;
        this.dataSource = [[], []];
        newValue.forEach((item, index) => {
          if (index / 5 < 1) {
            this.dataSource[0].push(item);
          } else if (index / 5 >= 1 && index / 5 < 2) {
            this.dataSource[1].push(item);
          }
        });
    },
    "param.category": function(newValue, oldValue) {
      if (_.isEqual(newValue, oldValue)) return;
      this.subMenuList = newValue[0].items.splice(0, 5);
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  color: #31c27c;
}
.carousel-item:hover,
.carousel_item_image-item {
  -webkit-transform: scale(1.01) translateZ(0);
  -webkit-transition: transfrom 0.75s cubiz-bezier(0, 1, 0.75, 1), opacity 0.5;
  cursor: pointer;
  opacity: 0.8;
}
</style>
