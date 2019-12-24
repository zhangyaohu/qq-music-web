<template>
  <div class="singer_container">
    <div class="singer_login">
      <h2 class="singer_login__title">万千歌手 尽在眼前</h2>
      <div class="singer_login__des">登录查看你关注的歌手</div>
      <el-button class="singer_login__btn">
        <div style="color: #fff;">立即登录</div>
      </el-button>
    </div>
    <div class="singer_main">
      <div class="singer_tag">
        <ul class="singer_tag__item">
          <li
            class="singer_tag__item_li"
            v-for="(i, index) in dbData.singerTagsObj.index"
            :class="{'active': index === currentIndex}"
            @click="handleIndexChange(i, index)"
            :key="index"
          >{{i.name}}</li>
        </ul>
        <ul class="singer_tag__item">
          <li
            class="singer_tag__item_li"
            v-for="(area, index) in dbData.singerTagsObj.area"
            :class="{'active': index === currentAreaIndex}"
            @click="handleAreaChange(area, index)"
            :key="index"
          >{{area.name}}</li>
        </ul>
        <ul class="singer_tag__item">
          <li
            class="singer_tag__item_li"
            v-for="(sex, index) in dbData.singerTagsObj.sex"
            @click="handleSexChange(sex, index)"
            :class="{'active': index === currentSexIndex}"
            :key="index"
          >{{sex.name}}</li>
        </ul>
        <ul class="singer_tag__item">
          <li
            class="singer_tag__item_li"
            v-for="(genre, index) in dbData.singerTagsObj.genre"
            :class="{'active': index === currentGenreIndex}"
            @click="handleGenreChange(genre, index)"
            :key="index"
          >{{genre.name}}</li>
        </ul>
      </div>
      <div class="singer_list">
        <ul>
          <li v-for="(singer, index) in showSingerList" :key="index" class="singer_list__item">
            <div class="singer_list__item_box">
              <a>
                <img
                  class="singer_img"
                  :src="`//y.gtimg.cn/music/photo_new/T001R150x150M000${singer.singer_mid}.jpg`"
                />
              </a>
              <span class="singer_list__item_desc">{{singer.singer_name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <ul class="singer_list__text">
				<li v-for="(si, index) in dbData.singerList" :key="index" class="singer_list__text_item">
					<span class="singer_list__item_desc">{{si.singer_name}}</span>
				</li>
				<Pagination :currentPage="1" 
				            :pageSize="10"
										:currentChange="handleCurrentChange"
										:total="100"></Pagination>
			</ul>
    </div>
  </div>
</template>

<script>
import Pagination from 'src/views/components/pagination/Pagination';
import SingerApi from "src/views/singer/singerApi";
import Root from "src/views/store/Root";

export default {
  name: "SingerPage",

	mixins: [Root],
	
	components:{
		Pagination
	},

  data() {
    return {
      currentIndex: 0,
      currentAreaIndex: 0,
      currentSexIndex: 0,
      currentGenreIndex: 0
    };
  },

  mounted() {
    this.init();
  },

  computed: {
    showSingerList() {
      return this.dbData.singerList.splice(0, 10);
		},
		handleCurrentChange() {

		}
  },
  methods: {
    init() {
      let param = {
        comm: { ct: 24, cv: 0 },
        singerList: {
          module: "Music.SingerListServer",
          method: "get_singer_list",
          param: {
            area: -100,
            sex: -100,
            genre: -100,
            index: -100,
            sin: 0,
            cur_page: 1
          }
        }
      };
      SingerApi.getSingerList({ data: param }).then(resp => {
        this.updateDataList({
          dataName: "singerList",
          data: resp.singerlist
        });
        this.updateDataObject({
          name: "singerTagsObj",
          data: resp.tags
        });
      });
    },
    handleIndexChange(it, index) {
      this.currentIndex = index;
    },
    handleAreaChange(it, index) {
      this.currentAreaIndex = index;
    },
    handleSexChange(it, index) {
      this.currentSexIndex = index;
    },
    handleGenreChange(it, index) {
      this.currentGenreIndex = index;
    }
  }
};
</script>

<style scoped lang="less">
.singer_login {
  position: relative;
  width: 100%;
  height: 376px;
  background: url("../images/bg_singer.jpg") 50% 0 repeat-x;
  overflow: hidden;
  text-align: center;
  color: #fff;
  &__title {
    padding-top: 100px;
    padding-bottom: 20px;
    cursor: pointer;
    font-size: 60px;
    font-weight: 500;
  }

  &__des {
    padding-bottom: 20px;
    font-size: 26px;
    font-weight: 500;
  }

  &__btn {
    background: #000000;
    opacity: 0.2;
    border: 1px solid #fff;
  }
}

.singer_main {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  background: #fff;
}

.singer_tag {
  background-color: #fbfbfd;
  padding: 34px 0 17px 40px;
  margin: 30px 0 20px;
  &__item {
    padding-bottom: 3px;
    height: auto;
    zoom: 1;
    clear: both;
    overflow: hidden;
    cursor: pointer;

    &_li {
      display: inline-block;
      line-height: 26px;
      padding: 0 8px;
      margin: 0 12px 14px 0;
      cursor: pointer;
    }
  }
}

.active {
  background: #31c27c;
  color: #fff;
}

.singer_list {
  &__item {
    display: inline-block;
    vertical-align: top;
    width: 20%;
    margin-bottom: 20px;
    overflow: hidden;
    &_box {
      position: relative;
      margin-right: 20px;
      background-color: #fbfbfd;
      min-height: 195px;
      padding: 25px 0;
			overflow: hidden;
			text-align: center;
		}
		&_desc{
			margin-top: 20px;
			display: inline-block;
			cursor: pointer;
			&:hover{
				color: #31c27c;
			}
		}
  }
}

.singer_img {
  display: block;
  width: 140px;
  height: 140px;
	border-radius: 126px;
	margin: 0 auto;
}

.singer_list__text{
	padding-top: 20px;

	&_item{
		display: inline-block;
		width: 20%;
		text-align: center
	}
}
</style>
