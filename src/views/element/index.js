import {
	Input,
	Button,
	Autocomplete,
	Carousel,
	CarouselItem,
	Icon,
	Pagination,
	Checkbox
} from 'element-ui';
import Vue from 'vue';

export default {
	install: (Vue) => {
		Vue.use(Input);
		Vue.use(Autocomplete);
		Vue.use(Button);
		Vue.use(Carousel);
		Vue.use(CarouselItem);
		Vue.use(Icon);
		Vue.use(Pagination);
		Vue.use(Checkbox);
	}
}
