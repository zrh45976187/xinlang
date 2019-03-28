<template>
	<div class="ntop-nav">
		<div class="m-box-center-a">
			<div class="nt-box-col">
				<div class="nt-left">
					<i> < </i> </div> <div class="nt-sbox">
							<form action="." class="nt-search">
								<input type="search" :placeholder="hotwords.tip + hotwords.word">
							</form>
				</div>
			</div>
		</div>
		<div class="card">
			<div>
				<div class="cardlist">
					<div class="m-panel">
						<div class="card-wrap">
							<div class="card-main">
								<div class="m-item-box" v-for="(item,i) in news" :key="i">
									<a :href="item.scheme" style="text-decoration: none; color: #333;">
										<div class="m-diy-btn">
											<h4 class="m-text-cut">{{item.title_sub}}</h4>
											<span class="m-link-icon"><img :src="item.icon" alt=""></span>
										</div>
									</a>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>




</template>
<script>
	export default {
		name: 'resou',
		data() {
			return {
				news: {},
				hotwords: {},
				group: {}
			}
		},
		created() {
			this.$axios.get('/api/container/getIndex?containerid=231583&page_type=searchall')
				.then(response => {
					// console.log(response.data.data.cards[0].card_group[1].group)
					this.news = response.data.data.cards[0].card_group[0].group
					this.hotwords = response.data.data.hotwords[0]
				}), err => {
					alert(err)
				}
			// https://m.weibo.cn/api/container/getIndex?containerid=231583&page_type=searchall
		}

	}
</script>


<style scoped>
	.ntop-nav {
		height: 44px;
		background-color: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .2);
	}

	.m-box-center-a {
		height: 100%;
		box-sizing: border-box;
		padding: 0 .625rem;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.nt-box-col {
		flex-basis: auto;
		-webkit-box-flex: 1;
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.nt-left {
		padding-right: 1.1875rem;
		cursor: pointer;
	}

	.nt-left i {
		color: #606060;
		font-weight: 700;
		font-family: marvelfont;
		display: inline-block;
		-webkit-font-smoothing: antialiased;

	}

	.nt-sbox {
		height: 28px;
		border-radius: 4px;
		background-color: #e3e4e6;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-flex: 1;
		flex: 1;
		width: 100%;
		min-width: 0;
	}

	.nt-search {
		position: relative;
		width: 100%;
		flex-basis: auto;
		-webkit-box-flex: 1;
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.nt-search input {
		background-color: transparent;
		border: 0 none;
		font-size: .875rem;
		color: #333;
		width: 100%;
		margin-right: 2rem;
	}

	.cardlist {}

	.m-panel {
		margin-bottom: 0;
		margin-top: -1px;
		border-image: none;
		border-top-width: .5px;
		border-right-width: 0;
		border-bottom-width: .5px;
		border-left-width: 0;
		border-color: #e6e6e6;
		border-style: solid;
		background: #fff;
		overflow: hidden;
	}

	.card-wrap {
		margin-left: .75rem;
		margin-right: .75rem;
		height: 100%;
	}

	.card-main {
		margin-bottom: -1px;
		box-sizing: border-box;
		margin-left: -.75rem;
		margin-right: -.75rem;
		height: 100%;
	}

	.m-item-box {
		height: 2.75rem;
		line-height: 2.75rem;
		text-align: center;
		padding: 0 .5rem 0 .75rem;
		display: inline-block;
		box-sizing: border-box;
		vertical-align: top;
		position: relative;
		font-size: 0;
		color: #333;
		width: 50%;
	}

	.m-diy-btn {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-flex: 1;
		flex: 1;
		width: 100%;
		min-width: 0;
	}

	.m-text-cut {
		margin-left: .25rem;
		text-align: left;
		font-size: 1rem;
		margin: 0 0 0 1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.m-link-icon {
		margin-left: .25rem;
		display: inline-block;
		vertical-align: middle;
		width: .875rem;
		height: .875rem;
		font-size: 0;
	}

	.m-link-icon img {
		width: 100%;
		height: 100%;
		vertical-align: top;
	}

	.m-item-box::before {
		right: 0;
		top: 1rem;
		bottom: 1rem;
		width: 1px;
		background-color: #e6e6e6;
		width: .5px;
		top: .5rem;
		bottom: .5rem;
		content: "";
		position: absolute;
	}
</style>
