import {mapState, mapGetters, mapActions} from 'vuex'

export default {
	methods: {
    ...mapActions([
			'updateDataList'
		])
	},

	computed: {
	  ...mapState({
       dbData: (state) => {
				 return state.db;
			 }
		})
	}
}