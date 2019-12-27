<template>
  <div class="menu_container">
    <div v-for="(menu, index) in list" :key="index">
      <li v-if="menu.type === 'btn'" class="menu_item menu_btn">
				<i v-if="menu.icon" :class="menu.icon"></i>
				{{menu.title}}
			</li>
			<li v-if="menu.type === 'link'" 
			    class="menu_item" 
					@click="handleToLink(menu)"
			    :class="{'active': menu.topId === $route.params.topId}">
				<i v-if="menu.icon" :class="menu.icon"></i>
				{{menu.title}}
			</li>
      <ul v-if="menu.children" class="sub_menu">
			  <menu-list :list="menu.children" @on-change="$emit('change', arguments)"></menu-list>
      </ul>
		</div>
  </div>
</template>

<script>
export default {
	name: 'MenuList',
	props: {
		list: {
			type: Array,
			default: []
		}
	},
	methods: {
		handleToLink(menu) {
			debugger;
			this.$router.push(`${menu.topId}`);
			this.$emit('on-change', menu);
		}
	}
}
</script>

<style lang="less" scoped>
  .menu_item{
		padding: 8px 17px;
		font-size: 15px;
		cursor: pointer;
	}
	.sub_menu{
		.menu_container{
			border: none;
		}
		.menu_item{
			padding-left: 30px;
		}
	}

	.menu_btn{
		font-size: 20px;
	  border-bottom: 1px solid rgba(153,153,153,.2);
	}

	.menu_container{
	  border: 1px solid rgba(153,153,153,.2);
	}

	.active{
		background:#31c27c;
		color: #fff;
		border-radius: 2px;
	}
</style>