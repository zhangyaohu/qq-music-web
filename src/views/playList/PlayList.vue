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
      <Table :dataSource="dataSource" :columns="columns" type="selection" @play="play"></Table>
    </div>
    <div class="playlist_mask"></div>
    <div class="playlist_bg"></div>
  </div>
</template>

<script>
import Table from "src/views/components/table/Table";
import Root from "src/views/store/Root";
import PlayListApi from './playListApi';

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
      playId: '',
      isPlay: false,
      columns: [
        {
          title: "",
          key: "index_album",
          width: "10%",
          render: (text, key, dI) => {
            return this.playId === text.mid && this.isPlay ? <span class="el-icon-video-play"></span> : <div>{dI + 1}</div>;
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
            return (<div>
              <span>{text[key][0].name}</span>
               <li class="play">
                  <span class='play_btn' onClick={() => this.play(text)}>
                    { this.playId === text.mid && this.isPlay ? <i class="el-icon-video-pause"></i> : <i class="el-icon-video-play"></i>}
                  </span>
                  <span class='play_btn' onClick={() => this.$emit('add')}>
                     <i class="el-icon-plus"></i>
                  </span>
                  <span class='play_btn' onClick={() => this.$emit('download')}>
                     <i class="el-icon-download"></i>
                  </span>
                  <span class='play_btn' onClick={() => this.$emit('share')}>
                     <i class="el-icon-share"></i>
                  </span>
                </li>
            </div>);
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
  },
  methods: {
     async play(item) {
      let  mid = `C400${item.mid}.m4a`
      let resp = await PlayListApi.getSongVkey({
        filename: mid, 
        format: 'jsonp',
        platform: 'yqq',
        cid: '205361747',
        guid: '5931742855',
        songmid: item.mid
        })
        console.log(resp)
         let  param = {
          guid: 5931742855,
          vkey: resp.data.items[0].vkey,
          uin: 0,
          fromtag: 66
         }
         PlayListApi.play(resp.data.items[0].filename, param)
         .then((resp) => {
             let playId  = document.querySelector(`#play${item.mid}`)
           if(this.isPlay) {
             if(playId)
              playId.pause();
              this.isPlay = false;
           }else if(!this.isPlay && !playId){
           this.playId = item.mid;
           this.isPlay = true;
            let doc = document.createElement('audio');
           doc.src = `http://isure.stream.qqmusic.qq.com/${mid}?guid=${param.guid}&vkey=${param.vkey}&uin=0&fromtag=66`;
           doc.setAttribute('autoplay', 'autoplay');
           doc.setAttribute('controls', "controls");
           doc.style.height= '0px';
           doc.style.width= '0px';
           doc.style.display= 'none';
           if(doc.getAttribute('id') !== `play${item.mid}`)
             doc.setAttribute('id',  `play${item.mid}`)
             document.body.append(doc);
           }else if(!this.isPlay) {
             playId.play();
             this.isPlay = true;
           }
         })
    }
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
    background-color: #292a2b;
    min-height: 100%;
    overflow: hidden;
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

.play_icon{
  background-image: url("~images/play.gif")
}
</style>


