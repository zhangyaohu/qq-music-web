<template>
	 <ul>
		 <div class="prev" 
		      v-if="currPage > 1" 
					@click="handlePrev()"></div>
		 <div v-if="totalNum >=4">
			  <li v-for="(p, index) in 4" 
	       :key="index + 1" @click="clickCurrentPage(index + 1)" class="pagination-item">
			   {{index + 1}}
			  </li>
				<li class="pagination-item">....</li>
				<li>{{Math.ceil(totalNum / size)}}</li>
		 </div>
		  <div v-if="totalNum < 4">
			  <li v-for="(p, index) in totalNum" 
	       :key="index + 1" @click="clickCurrentPage(index + 1)"  class="pagination-item">
			   {{index + 1}}
			  </li>
		 </div>
		 <div class="next" 
		      :class="{'disabled': currPage === Math.ceil(totalNum / size) }"
					@click="handleNext()"></div>
	 </ul>
</template>

<script>
export default {
	name: 'Pagination',
  props: {
		currentPage:{
			type: String | Number,
			default: [1, '1'],
			required: true
		},
		total: {
			type:  String | Number,
			default: [0, '0'],
			required: true
		},
		pageSize: {
			type:  String | Number,
			default: [10, '10'],
			required: true
		},
		pageSizes: {
			type:  Array ,
			default: () => {
			  return [5, 10, 20, 100];
			},
		},
		currentChange: {
			type: Function
		},
		sizeChage: {
			type: Function
		}
	},
	
	data() {
		return {
			currPage: 1,
			totalNum: 0,
			size: 10
		}
	},
	
	mounted() {
		this.totalNum = this.total;
		this.size = this.pageSize;
		this.currPage = this.currentPage;
	},
	methods: {
		handlePrev() {
			this.currPage +=1;
			this.$emit('currentChange', this.currPage);
		},
		handleNext() {
      this.currPage -=1;
			this.$emit('currentChange', this.currPage);
		},
		clickCurrentPage(index) {
			this.currPage = index;
			this.$emit('currentChange', this.currPage);
		}
	},

	watch: {
		'currentPage': function(newVal, oldVal) {
       if(Number(newVal) !== Number(oldVal)) {
				 this.currPage = newVal;
			 }
		},
		'pageSize':  function(newVal, oldVal) {
       if(Number(newVal) !== Number(oldVal)) {
				 this.size = newVal;
			 }
		},
		'total':  function(newVal, oldVal) {
       if(Number(newVal) !== Number(oldVal)) {
				 this.totalNum = newVal;
			 }
		},
	}

}
</script>

<style scoped lang="less">
  .pagination-item{
		display: inline-block;
	}
</style>
