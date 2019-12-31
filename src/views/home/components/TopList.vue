<template>
  <div class="container">
    <div class="section_inner">
      <div class="section_title">
        <h2>排行榜</h2>
      </div>
      <div>
        <div class="carousel-item" v-for="(item, index) in (dataSource[0] && dataSource[0].toplist)" :key="index">
          <div class="carousel-content" v-show="index !== 5">
            <div :class="[`bg-pic-${index}`, 'bg-pic']">
              <h3 class="carousel-title">
                <div> {{dataSource[0].groupName}}</div>
                 <h4>{{item.title}}</h4>
              </h3>
              <div class="toplist-line"></div>
              <ul class="toplist-songlist">
                <li class="toplist__song" v-for="(it, index) in item.song">
                   <div class="toplist__song__title">{{it.rank}}{{it.title}}</div>
                   <div class="toplist__song__name">{{it.singerName}}</div>
                </li>
              </ul>
            </div>
          </div>
           <div class="cover_play">
              <img src="~images/cover_play.png"/>
            </div>
        </div>
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
  name: "TopList",
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

  methods: {

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
 .bg-pic-0{
    background-image: url('~images/bg_index_top.jpg');
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    height: 567px;
    background-position: 0% 0%;
 }

 .bg-pic-1{
	  background-image: url('~images/bg_index_top.jpg');
    background-position: 25% 0%;
 }
 .bg-pic-2{
	  background-image: url('~images/bg_index_top.jpg');
    background-position: 50% 0%;
 }
 .bg-pic-3{
	  background-image: url('~images/bg_index_top.jpg');
    background-position: 75% 0%;
 }

 .bg-pic-4{
	  background-image: url('~images/bg_index_top.jpg');
    background-position: 100% 0%;
 }

 .bg-pic{
     position: relative;
    top: 0;
    left: 0;
    right: 0;
    height: 567px;
    margin-right: 30px;
    color: #fff;

    &:last-child{

    }
 }

 .carousel-title{
   text-align: center;
       position: absolute;
    top: 50px;
    left: 50%;
    margin-left: -100px;
    width: 200px;
 }

 .toplist-line{
    position: absolute;
    left: 50%;
    top: 148px;
    margin-left: -18px;
    width: 36px;
    height: 2px;
    background: #fff;
 }

 .toplist-songlist{
       position: absolute;
    top: 188px;
    left: 30px;
    right: 30px;
    white-space: nowrap;
 }

 .toplist__song{
    position: relative;
    padding-left: 15px;
    margin-bottom: 27px;

    &__name{
       overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 5px;
    }

    &__title{
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 5px;
    }
 }

 .carousel-item{
   position: relative;
    &:hover{
    .cover_play{
      display: inline-block;
      position: absolute;
      top: 20%;
      left: 66px;
      transform: scale(1.07);
      transition: transfrom 0.75s cubiz-bezier(0, 1, 0.75, 1), opacity 0.5;
      opacity: 1;
    }
  }
 }

 .cover_play{
   display: none;
 }
</style>
