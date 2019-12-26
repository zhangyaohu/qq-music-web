<template>
  <div class="album">
    <ul class="album_tag">
      <li
        class="album_tag__item"
        v-for="(tag, index) in dbData.newAlbumTagList"
        :class="{'active': index === currentTagIndex}"
        @click="handleChange(tag, index)"
        :key="index"
      >{{tag.name}}</li>
    </ul>
    <ul class="album_container">
      <li class="album_container__item" v-for="(album, index) in dbData.newAlbumList" :key="index">
        <div>
          <img
            :src="`//y.gtimg.cn/music/photo_new/T002R300x300M000${album.photo.pic_mid}.jpg`"
            style="inline-size: 224px;"
						class="album_container__item___img"
          />
          <p class="album_container__item___title">{{album.name}}</p>
          <p class="album_container__item___singer">{{album.singers[0].name}}</p>
          <p class="album_container__item___time">{{album.release_time}}</p>
        </div>
        <div class="cover_play">
          <img src="~images/cover_play.png" />
        </div>
      </li>
    </ul>
    <div class="pagination_content">
      <el-pagination
        :current-page="pageIndex"
         :pageSize="20"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Root from "src/views/store/Root";
import newAlbumApi from "./newAlbumApi";
export default {
  name: "NewAlbum",
  mixins: [Root],
  data() {
    return {
      total: 0,
      currentTagIndex: 0,
      area: 1,
      start: 0,
      num: 20,
      pageIndex: 1,
      param: {
        new_album: {
          module: "newalbum.NewAlbumServer",
          method: "get_new_album_info"
        },
        comm: {
          ct: 24,
          cv: 0
        }
      }
    };
  },
  mounted() {
    let param = Object.assign({}, this.param, {
      new_album_tag: {
        module: "newalbum.NewAlbumServer",
        method: "get_new_album_area",
        param: {}
      }
    });
    this.init(param);
  },
  methods: {
    init(param) {
      this.param.new_album["param"] = {
        area: this.area,
        start: (this.pageIndex - 1) * 20,
        num: this.num
      };
      if (param) {
        Object.assign({}, param, {
          param: {
            area: this.area,
            start: (this.pageIndex - 1) * 20,
            num: this.num
          }
        });
        newAlbumApi.getAlbumAll(param).then(resp => {
          this.updateDataList({
            dataName: "newAlbumList",
            data: resp.new_album.data.albums
          });
          this.updateDataList({
            dataName: "newAlbumTagList",
            data: resp.new_album_tag.data.area
          });
          this.total = resp.new_album.data.total;
        });
      } else {
        newAlbumApi.getAlbumAll(this.param).then(resp => {
          this.updateDataList({
            dataName: "newAlbumList",
            data: resp.new_album.data.albums
          });
          this.total = resp.new_album.data.total;
        });
      }
    },
    handleChange(it, index) {
			this.currentTagIndex = index;
			this.pageIndex = 1;
      this.area = it.id;
      this.init();
    },
    handleCurrentChange(e) {
      this.pageIndex = e;
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
.album {
  max-width: 1200px;
  margin: 0 auto;
  &_tag {
    padding-top: 20px;
    margin-bottom: 20px;

    &__item {
      display: inline-block;
      padding: 10px 20px;
      margin: 0px 10px;
      cursor: pointer;

      &___title {
        color: #000;
        text-decoration: none;
        text-align: left;
      }

      &___singer {
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 22px;
        text-align: left;
      }

      &___time {
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 22px;
        text-align: left;
      }
    }
  }

  &_container {
    &__item {
      display: inline-block;
      width: 20%;
      padding-bottom: 44px;
      overflow: hidden;
      font-size: 14px;
      vertical-align: top;
			position: relative;
			
			&___img{
				&:hover{
					transform: scale(1.07) translateZ(0);
          transition: transform .75s cubic-bezier(0,1,.75,1);
				}
			}

      &:hover {
        .cover_play {
          display: inline-block;
          position: absolute;
          top: 25%;
          left: 66px;
          transform: scale(1.07);
          transition: transfrom 0.75s cubiz-bezier(0, 1, 0.75, 1), opacity 0.5;
          opacity: 1;
        }
      }
    }
  }
}

.active {
  color: #fff;
  background-color: #31c27c;
}

.cover_play {
  display: none;
}
</style>
