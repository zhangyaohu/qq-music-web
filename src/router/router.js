const HomePage = () =>  import(/* webpackChunkName: "HOMEPAGE" */ 'src/views/home/HomePage');
const SingerPage = () => import(/*webpackChunkName: "SINGERPAGE"*/'src/views/singer/SingerPage');
const NewAlbumPage = () => import(/*webpackChunkName: "NEWALBUMPAGE"*/'src/views/album/NewAlbum');
const TopListPage = () => import(/*webpackChunkName: "TOPLISTPAGE"*/'src/views/topList/TopListPage');
const SongDetailPage = () => import(/*webpackChunkName: "SONGDETAILPAGE"*/'src/views/detail/SongDetail');
const LyricDetailPage = () => import(/*webpackChunkName: "LYRICDETAILPAGE"*/'src/views/detail/LyricDetail')

export default [
	{
		path: '*',
    redirect: '/home'
	},
	{
		path: '/home',
		component: HomePage,
		meta: {
			title: '首页'
		}
	},
	{
		path: '/singer',
		component: SingerPage,
		meta: {
		  title: '歌手'
		}
	},
	{
		path: '/new_album',
		component: NewAlbumPage,
		meta: {
		  title: '新碟'
		}
	},
	{
		path: '/top_list',
		component: TopListPage,
		meta: {
			title: '排行榜'
		}
	},
	{
		path: '/top_list/:topId',
		component: TopListPage,
		meta: {
			title: '排行榜'
		}
	},
	{
		path: '/sing_detail/:id',
		component: SongDetailPage,
		meta: {
			title: '专辑详情'
		}
	},
	{
		path: '/lyric_detail/:id',
		component: LyricDetailPage,
		meta: {
			title: '歌词详情'
		}
	}
]
