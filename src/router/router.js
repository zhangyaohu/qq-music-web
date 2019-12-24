const HomePage = () =>  import(/* webpackChunkName: "HOMEPAGE" */ 'src/views/home/HomePage');
const SingerPage = () => import(/*webpackChunkName: "SINGERPAGE"*/'src/views/singer/SingerPage');

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
	}
]
