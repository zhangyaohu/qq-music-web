<template>
  <div>
    <song-sheet :param="{'data': dbData.songList, 'category': dbData.categoryList}"></song-sheet>
		<song-carousel :param="{'data': dbData.newSongList, 'category': dbData.lanList}"></song-carousel>
		<focus-carousel :param="{'data': dbData.focusList}"></focus-carousel>
	  <new-album-carousel :param="{'data': dbData.newAlbumList, 'category': dbData.newAlbumTagList}"></new-album-carousel>
		<top-list :param="{'data': dbData.topList}"></top-list>
		<song-sheet></song-sheet>
	</div>
</template>

<script>
import NewAlbumCarousel from 'src/views/home/components/NewAlbumCarousel'
import FocusCarousel from 'src/views/home/components/FocusCarousel'
import SongCarousel from 'src/views/home/components/SongCarousel'
import SongSheet from 'src/views/home/components/SongSheet';
import topList from 'src/views/home/components/topList'
import Root from 'src/views/store/Root';
import HomeApi from './homeApi';

export default {
	name: 'HomePage',
	mixins: [Root],

	data() {
    return {
			songList: [[], []]
		}
	},
	
  components: {
		SongSheet,
		SongCarousel,
		FocusCarousel,
		NewAlbumCarousel,
		topList
	},
	
	mounted() {
		this.init();
	},
	methods: {
		/*首页请求热歌，mv，等*/
		init(){
      let param = {
				data: {"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":5}},"new_album":{"module":"newalbum.NewAlbumServer","method":"get_new_album_info","param":{"area":1,"sin":0,"num":10}},"new_album_tag":{"module":"newalbum.NewAlbumServer","method":"get_new_album_area","param":{}},"toplist":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}
			}
			HomeApi.queryAll(param)
			 .then((resp) => {
				  this.updateDataList({
						"dataName": "songList",
						"data": resp.recomPlaylist.data.v_hot
					})
					this.updateDataList({
						"dataName": "newSongList",
						"data": resp.new_song.data.songlist
					})
					this.updateDataList({
						"dataName": "lanList",
						"data": resp.new_song.data.lanlist
					})
					this.updateDataList({
						"dataName": "newAlbumList",
						"data": resp.new_album.data.albums
					})
					this.updateDataList({
						"dataName": "newAlbumTagList",
						"data": resp.new_album_tag.data.area
					})
					this.updateDataList({
						"dataName": "topList",
						"data": resp.toplist.data.group
					})
					this.updateDataList({
						"dataName": "focusList",
						"data": resp.focus.data.content
					})
					this.updateDataList({
						"dataName": "categoryList",
						"data": resp.category.data.category
					})
			 })
		}
	}
}
</script>