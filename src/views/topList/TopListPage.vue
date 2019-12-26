<template>
  <div class="topList">
		<div></div>
		<div>
			<table></table>
		</div>
	</div>
</template>

<script>
import TopListApi from "src/views/topList/topListApi";
import Root from "src/views/store/Root";

export default {
  name: "TopListPage",
  mixins: [Root],
  data() {
    return {
			topId:4,
			offset:0,
			num:20,
			period:"2019-12-26",
			param: {
				"detail":{
					"module":"musicToplist.ToplistInfoServer",
					"method":"GetDetail"
					},
					"comm":{
						"ct":24,"cv":0
				  }
				}
		};
	},
	
	mounted() {
		this.init();
	},
  methods: {
		init() {
			this.param.detail["param"] = {
				"topId": this.topId,
				"offset": this.offset,
				"num":  this.num,
				"period": this.period
				}

			TopListApi.getTopList(this.param)
			 .then((resp) => {
				 console.log(resp);
				 for(let i in resp.detail.data.songInfoList) {
					 for(let j in resp.detail.data.data.song) {
						 if(resp.detail.data.data.song[j].songId === resp.detail.data.songInfoList[i].id) {
							 resp.detail.data.songInfoList[i].song = resp.detail.data.data.song[j];
						 }
					 }
				 }
				 this.updateDataList({
					 "dataName": 'topList',
					 "data": resp.detail.data.songInfoList
				 })
		     console.log('topList ==== ' + this.dbData.topList);
			 })
		}
	}
};
</script>

<style lang="less" scoped>
  .topList{
		max-width: 1200px;
		margin: 0 auto;
	}
</style>