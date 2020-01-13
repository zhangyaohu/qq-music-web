<template>
  <div class="playlist_container">
    <div class="playlist_content">
      <div class="playlist_toolbar">
        <span class="playlist_btn store">收藏</span>
        <span class="playlist_btn add">添加到</span>
        <span class="playlist_btn">
          <i class="el-icon-download"></i>
          下载
          </span>
        <span class="playlist_btn">
          <i class="el-icon-delete"></i>
          清空列表
        </span>
      </div>
      <Table :dataSource="dataSource" :columns="columns" type="selection"></Table>
    </div>
    <div class="playlist_mask"></div>
    <div class="playlist_bg"></div>
  </div>
</template>

<script>
import Table from "src/views/components/table/Table";
import Root from "src/views/store/Root";

export default {
  name: "PlayList",
  mixins: [Root],
  components: {
    Table
  },
  computed: {
    dataSource() {
      return this.dbData.songList.splice(0, 10).filter(item => {
        if (item.isonly === 0) {
          return item;
        }
      });
    }
  },
  data() {
    return {
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
          key: "name",
          width: "45%"
        },
        {
          title: "歌手",
          key: "singer",
          width: "15%",
          render: (text, key) => {
            return <span>{text[key][0].name}</span>;
          }
        },
        {
          title: "专辑",
          key: "album",
          width: "15%",
          render: (text, key) => {
            return <span>{text[key].name}</span>;
          }
        },
        {
          title: "时长",
          width: "15%",
          key: "interval",
          render: (text, key) => {
            return <span>{(text[key] / 60).toFixed(2)}</span>;
          }
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.playlist {
  &_btn {
    opacity: 0.8;
    filter: alpha(opacity=80);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 10px 20px;
    display: inline-block;
    color: #fff;
    margin-right: 10px;
    cursor: pointer;
  }

  &_toolbar {
    max-width: 1200px;
    margin-left: 35px;
    padding-top: 3%;
  }

  &_container {
    min-width: 1100px;
    background-color: rgb(41, 42, 43);
    height: 100%;
  }

  &_content {
    background: rgba(225, 225, 225, 0.8);
    height: 100%;
    margin: 0 7.638889%;
    position: relative;
    z-index: 3;
  }

  &_mask {
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 2;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  &_bg {
    background-image: url("~images/play_bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(65px);
    filter: blur(65px);
    opacity: 0.6;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
}

.store {
  background-image: url("~images/shoucang.png");
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: -13px 0px;
}

.add {
  background-image: url("~images/add.png");
  background-repeat: no-repeat;
  background-size: 50px;
  background-position: -16px 2px;
}

.download {
  background-image: url("~images/download.png");
  background-repeat: no-repeat;
  background-size: 50px;
  background-position: -16px 2px;
}
</style>


