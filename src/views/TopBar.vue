<template>
	<div class="top-bar">
		<div class="left">
			<span><i class="iconfont">&#xe733;</i></span>
			<span>App Store</span>
			<span>编辑</span>
			<span>商店</span>
			<span>窗口</span>
			<span>帮助</span>
		</div>
		<div class="right">
			<span><i class="iconfont">&#xe651;</i></span>
			<span><i class="iconfont" style="font-size: 15px">&#xe68b;</i></span>
			<span><i class="iconfont" style="font-size: 12px">&#xe63d;</i></span>
			<span>11月10日 周二 上午9:41</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "TopBar",
};
</script>

<style lang="less" scoped>
.top-bar {
	width: 100%;
	height: 22px;
	top: 0;
	left: 0;
	background-color: rgba(103, 121, 172, 0.2);
	color: white;
	font-size: 12px;
	line-height: 21px;
	display: flex;
	justify-content: space-between;

	div {
		margin: 0 8px;

		span {
			margin: 0 8px;

			i {
				font-size: 13px;
				line-height: 21px;
			}
		}
	}
}
</style>