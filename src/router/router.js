const HomePage = () =>  import(/* webpackChunkName: "HOMEPAGE" */ 'src/views/home/HomePage');
const SingerPage = () => import(/*webpackChunkName: "SINGERPAGE"*/'src/views/singer/SingerPage');
const NewAlbumPage = () => import(/*webpackChunkName: "NEWALBUMPAGE"*/'src/views/album/NewAlbum');
const TopListPage = () => import(/*webpackChunkName: "TOPLISTPAGE"*/'src/views/topList/TopListPage');

export default [
	{
		path: '/',
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
	}
]
