<template>
	 <div>
		 <div class="section_inner">
			 <div class="section_title">
				  <h2>歌单推荐</h2>
			 </div>
			 <div class="section_tab">
				 <li v-for="(item, index) in subMenuList" :key="index" class="section_menu__link">
          <router-link :to='item.path'>
            {{item.title}}
					</router-link>
				</li>
			 </div>

			 <div>
				 <el-carousel :interval="5000" arrow="always">
						<el-carousel-item v-for="item in 2" :key="item">
							<li class="carousel-item">
								<img src="http://qpic.y.qq.com/music_cover/8eiaDBJ27yYicpMibYZmmEdNNOrqbr2Zus7rJbY5lXibI4ttRXwTgE0oXw/300?n=1" class="carousel_item_image"/>
							</li>
						  <li class="carousel-item">
								<img src="http://qpic.y.qq.com/music_cover/8eiaDBJ27yYicpMibYZmmEdNNOrqbr2Zus7rJbY5lXibI4ttRXwTgE0oXw/300?n=1" class="carousel_item_image"/>
							</li>
							<li class="carousel-item">
								<img src="http://qpic.y.qq.com/music_cover/8eiaDBJ27yYicpMibYZmmEdNNOrqbr2Zus7rJbY5lXibI4ttRXwTgE0oXw/300?n=1" class="carousel_item_image"/>
							</li>
							<li class="carousel-item">
								<img src="http://qpic.y.qq.com/music_cover/8eiaDBJ27yYicpMibYZmmEdNNOrqbr2Zus7rJbY5lXibI4ttRXwTgE0oXw/300?n=1" class="carousel_item_image"/>
							</li>
							<li class="carousel-item">
								<img src="http://qpic.y.qq.com/music_cover/8eiaDBJ27yYicpMibYZmmEdNNOrqbr2Zus7rJbY5lXibI4ttRXwTgE0oXw/300?n=1" class="carousel_item_image"/>
							</li>
						</el-carousel-item>
          </el-carousel>
			 </div>
		 </div>
	 </div>
</template>

<script>
export default {
	data() {
		return {
			subMenuList: [
					{
					path: '/home',
					title: '为你推荐'
				},
				{
					path: '/home',
					title: '经典国语'
				},
				{
					path: '/home',
					title: '轻音乐'
				},
				{
					path: '/home',
					title: '九月推荐'
				},
				{
					path: '/home',
					title: '官方歌单'
				},
				{
					path: '/home',
					title: '情歌'
				}
			]
		}
	}
}
</script>

<style lang="less" scoped>

</style>
