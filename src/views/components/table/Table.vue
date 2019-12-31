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
									 return <li class="table_body__item" style={{width: column.width}} title={data[column.key]}>{data[column.key]}</li>
								 }else if(column.render){
									 return <li class="table_body__item" style={{width: column.width}}>{column.render(data, column.key, dI)}</li>
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
	 overflow: hidden;

	 &__item{
		 display: table-cell;
	 }

	 &_tr{
		 table-layout: fixed;
		 display: table;
		 width: 100%;
		 padding: 20px 20px;
		 background-color: #fbfbfd;
	 }
 }

 .table_body{
	 display: block;
	 width: 100%;
	 table-layout: fixed;
	  overflow: hidden;

	 &__item{
		 display: table-cell;
		 white-space: nowrap;
		 text-overflow: ellipsis;
		 overflow: hidden;
	 }

	 &_tr{
		 display: table;
			width: 100%;
			padding: 20px 20px;
			table-layout: fixed;
		 &:nth-child(2n) {
			 background-color: #fbfbfd;
		 }
		 &:nth-child(2n + 1) {
			  background-color: #fff;
		 }
	 }
 }
</style>