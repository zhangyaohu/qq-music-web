<template>
  <div>
    <song-sheet></song-sheet>
		 <song-sheet></song-sheet>
		  <song-sheet></song-sheet>
			 <song-sheet></song-sheet>
			  <song-sheet></song-sheet>
	</div>
</template>

<script>
import SongSheet from 'src/views/home/components/SongSheet';
import HomeApi from './homeApi';

export default {
	name: 'HomePage',
  components: {
		SongSheet
	},
	
	mounted() {
		this.init();
	},
	methods: {
		init(){
      let param = {
				data: {"comm":{"ct":24},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"}}
			}
			HomeApi.queryHotSuggest(param)
			 .then((resp) => {
				 console.log(resp);
			 })
		}
	}
}
</script>