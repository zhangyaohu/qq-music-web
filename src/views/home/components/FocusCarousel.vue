<template>
  <div class="container">
    <div class="section_inner">
      <div class="section_title">
        <h2>精彩推荐</h2>
      </div>

      <div>
        <el-carousel :interval="5000" arrow="always" height="425px">
          <el-carousel-item v-for="(it, i) in 5" :key="i">
            <div class="carousel-item" v-for="(item, index) in carouselList[i]" :key="index">
              <div class="carousel-content">
                <router-link to="/" class="link">
                  <img
                    :src="item.pic_info.url"
                    class="carousel_item_image"
                  />
                </router-link>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },

  computed: {
    carouselList() {
      return this.$_.chunk(this.dataSource, 2);
    }
  },
  watch: {
    "param.data": function(newValue, oldValue) {
      // if (_.isEqual(newValue, oldValue)) return;
        this.dataSource = newValue;
    }
  }
};
</script>

<style lang="less" scoped>
.link {
  height: 86px;
  display: inline-block;
}

.active{
  color: #31c27c;
}

.carousel-item {
	padding-top: 20px;
	width: calc((100% - 40px)/ 2)
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
</style>
