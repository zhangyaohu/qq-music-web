<script>
export default {
	name: 'Table',
	props: {
		columns: {
			type: Array,
			default: []	
		},
		dataSource: {
			type: Array,
			default: []
		}
	},
	render(h) {
		return (
			<div>
				<div class="table_header">
					<ul class="table_header_tr">
					  {
						this.columns.map((column, index) => {
             return <li class="table_header__item" style={{width: column.width}}>{column.title}</li>
						})
				  	}
					</ul>
				</div>
				<div class="table_body">
				  {
						this.dataSource.map((data, dI) => {
						return(<ul class="table_body_tr">
							 {
								 this.columns.map((column, cI) => {
                 if(!column.render){
									 return <li class="table_body__item" style={{width: column.width}}>{data[column.key]}</li>
								 }else if(column.render){
									 return <li class="table_body__item" style={{width: column.width}}>{column.render(data, column.key)}</li>
								 }
						   })
							 }
							</ul>
							)
						})
					}
				</div>
			</div>
		)
	},

	methods: {

	},

	watch: {

	}
}
</script>

<style lang="less" scoped>
 .table_header{
	 width: 100%;

	 &__item{
		 display: table-cell;
	 }

	 &_tr{
		 display: table;
		 width: 100%;
		 padding: 20px 0px;
	 }
 }

 .table_body{
	 display: block;
	 width: 100%;

	 &__item{
		 display: table-cell;
	 }

	 &_tr{
		 display: table;
			width: 100%;
			padding: 10px 0px;
	 }
 }
</style>