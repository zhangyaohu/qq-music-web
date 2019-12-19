const HomePage = () =>  import(/*webpackChunkName: HOMEPAGE*/'src/views/home/HomePage');

export default [
	{
		path: '/home',
		component: HomePage,
		meta: {
			title: '首页'
		}
	}
]