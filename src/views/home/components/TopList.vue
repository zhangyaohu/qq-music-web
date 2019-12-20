<template>
  <div class="container">
    <div class="section_inner">
      <div class="section_title">
        <h2>排行榜</h2>
      </div>

      <div>
        <div class="carousel-item" v-for="(item, index) in dataSource" :key="index">
          <div class="carousel-content">
            <div class="bg-pic"></div>
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
      if (_.isEqual(newValue, oldValue)) return;
      this.dataSource = newValue;
    }
  }
};
</script>

<style lang="less" scoped>
 .bg-pic{
	background: url('../../images/bg_index_top.jpg');
 }
</style>
