import Vue from 'vue';
import Vuex from 'vuex';
import db from 'src/views/store/mudules/db';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		db
	}
})

export default store;