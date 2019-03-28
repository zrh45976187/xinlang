<template>

	<div>
		<div class="phtot" ref="photo" v-show="show">
			<div class="close" @click="close()">X</div>
			<swiper :options="swiperOption">
				<swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
					<img :src="slide.url" alt="" class="pthimg">
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<div class="phtot" ref="photo" v-show="show1">
			<div class="close" @click="close()">X</div>
			<video :src="src" autoplay="autoplay" controls style="position: absolute;width: 100%;"></video>
		</div>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="9">

			<div class="wb-item-wrap" @click="onc()" v-for="(item,i) in msg.slice(1)" :key="i">
				<div class="card-wrap">
					<router-link tag="div" :to="{name: 'xiangqing',params:{id:item.mblog.user.id}}">
						<header class="weibo-top">
							<div class="touxiang">
								<div class="">
									<img :src="item.mblog.user.avatar_hd" alt="">
								</div>
							</div>
							<div class="title-name">
								<div class="textbox">
									<h3>{{item.mblog.user.screen_name}}</h3>
									<h4>{{item.mblog.created_at}} 来自 {{item.mblog.source}}</h4>
								</div>
							</div>
						</header>
					</router-link>
				</div>
				<router-view></router-view>

				<div class="weibo-main">

					<div class="card-wrap">
						<div class="weibo-og">



							<div class="weibo-text" v-html="item.mblog.text">
								<span class="surl-text">{{item.mblog.text}}</span>
								<span class="url-icon">以后可以叫骚猪刘校长 </span>
							</div>



						</div>

					</div>
				</div>
				<div style="margin: 0 .8rem 0 1rem;" v-if="item.mblog.pics">
					<div class="weiboimg">
						<ul>
							<li v-for="(imgs,index) in item.mblog.pics" :key="index" @click="ind(index,item.mblog.pics)">
								<div class="imgs"><img :src="imgs.url" alt=""></div>
							</li>

						</ul>
					</div>
				</div>
				<div class="video" v-else-if="item.mblog.page_info">
					<div class="media">
						<div>
							<div class="card-video">
								<div class="mwb-video">
									<div class="m-img-box">
										<img :src="item.mblog.page_info.page_pic.url" alt="">
									</div>
									<button class="mwbv-play-button" @click="video(item.mblog.page_info.media_info.mp4_sd_url)"></button>
									<div class="mwbv-info-bar">
										<div class="m-box">
											<div class="m-box-col">
												<div v-if="item.mblog.page_info.play_count > 1000">{{(item.mblog.page_info.play_count / 1000).toFixed(1)}}万次观看</div>
												<div v-else-if="item.mblog.page_info.play_count < 1000">{{item.mblog.page_info.play_count}}次观看</div>
											</div>
											<div class="time">6:32</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="f-footer-ctrl">
					<div class="good">
						<i class="isi icon-uniE905"></i>
						<h4 v-if="item.mblog.reposts_count > 1000">{{(item.mblog.reposts_count / 1000).toFixed(1)}}万</h4>
						<h4 v-else-if="item.mblog.reposts_count < 1000">{{item.mblog.reposts_count}}</h4>
					</div>
					<div class="good">
						<i class="isi icon-2"></i>
						<h4 v-if="item.mblog.comments_count > 1000">{{(item.mblog.comments_count / 1000).toFixed(1)}}万</h4>
						<h4 v-else-if="item.mblog.comments_count < 1000">{{item.mblog.comments_count}}</h4>
					</div>
					<div class="good">
						<i class="isi icon-4"></i>
						<h4 v-if="item.mblog.attitudes_count > 1000">{{(item.mblog.attitudes_count / 1000).toFixed(1)}}万</h4>
						<h4 v-else-if="item.mblog.attitudes_count < 1000">{{item.mblog.attitudes_count}}</h4>
					</div>
				</div>


			</div>

		</div>
	</div>

</template>
<script>
	// import  imgg from 'imgg'
	export default {
		name: 'remen',
		props: ['msg', 'id'],
		data() {
			return {
				swiperOption: {
					pagination: {
						el: '.swiper-pagination'
					}
				},
				swiperSlides: [],
				show: false,
				show1: false,
				src: [],
				page: 1
			}

		},

		computed: {},
		methods: {
			onc() {
				console.log(this.id)
			},
			ind(i, item) {
				console.log(item)
				this.swiperSlides = item
				this.show = !this.show
			},
			video(src) {
				this.src = src
				console.log(this.src)
				this.show1 = !this.show1
			},
			close() {
				this.show = false
				this.show1 = false
			},
			loadMore() {
				this.loading = true;
				this.page++
				setTimeout(() => {
					this.$axios.get('/api/api/container/getIndex', {
							params: {
								containerid: this.id,
								openApp: 0,
								page: this.page

							}
						})
						.then(response => {
							for (let i = 0; i < response.data.data.cards.length; i++) {
								this.msg.push(response.data.data.cards[i])
							}
							console.log(response.data.data.cards)
							console.log(this.msg)

						})

				}, 200);

			}
		}
	}
</script>
<style scoped>
	.pthimg {
		width: 100%;
		height: 100%;
	}

	>>>a {
		text-decoration: none !important;
		color: #3c6e9e;
	}

	.weibo-text a {
		text-decoration: none;
	}

	body {
		margin: 0 !important;
	}

	.body {
		width: 100%;
		overflow: hidden;
	}

	.wb-item-wrap {
		position: relative;
		overflow: hidden;
		top: 5rem;
		border-bottom: 1px solid #d3d9df96;
	}

	.card-wrap {
		margin-left: .75rem;
		margin-right: .75rem;
		padding-top: .9375rem;
		height: 100%;
	}

	.touxiang {
		display: flex;
		-webkit-box-pack: center;
		width: 2rem;
		height: 2rem;
	}

	.touxiang img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
		border: 1px solid #ddd;
	}

	.title-name {
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-box-pack: center;
		justify-content: center;
	}

	.textbox {
		margin: .15rem 0 .15rem .5rem;
	}

	.textbox h3 {
		font-size: .875rem;
		margin: 0;
		color: #333;
	}

	.textbox h4 {
		font-size: .675rem;
		margin: 0;
		color: #939393;
	}

	.weibo-top {
		display: flex;
	}

	html,
	body {
		position: relative;
		height: 100%;
	}

	body {
		background: #eee;
		font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
		font-size: 14px;
		color: #000;
		margin: 0;
		padding: 0;
	}

	.swiper-container {}

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;

		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.weibo-main {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		display: block;
	}

	.weibo-og {
		padding: 0 0 0 .25rem;
		font-size: 1rem;
	}

	.weiboimg {
		margin: .625rem 0 -.375rem;
	}

	.weiboimg ul {
		margin: 0 0 -.25rem;
		padding: 0;
		max-width: 100%;
		list-style: none;
	}

	.weiboimg li {
		display: inline-block;
		vertical-align: top;
		box-sizing: border-box;
		width: 33.33%;
		padding: 0 .3125rem .3125rem 0;
	}

	.imgs {
		padding-bottom: 100%;
		background-color: #e6e6e6;
		height: 0;
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.imgs img {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50%;
		position: absolute;
		width: 100%;
		height: 100%;
		vertical-align: top;
		object-fit: cover;
	}

	.f-footer-ctrl {
		border-top-width: 0;
		height: 1.1rem;
		padding: 1rem .375rem 1rem 0;
		margin: 0 0.75rem;
		display: block;
	}

	.good {
		color: rgba(40, 47, 60, 0.8);
		height: 100%;
		float: left;
		display: flex;
		margin-right: 1.5rem;
		-webkit-box-align: center;
		align-items: center;
	}

	.isi {
		cursor: pointer;
		color: rgba(40, 47, 60, .8);
		font-size: 1.125rem;
	}

	.good h4 {
		font-size: .8125rem;
		display: inline-block;
		margin: 0 0 0 .25rem;
	}

	.video {
		margin: 0 .75rem;
	}

	.media {
		margin-top: .625rem;
	}

	.card-video {
		position: relative;
		width: 100%;
		height: 0;
		padding-bottom: 56.25%;
	}

	.mwb-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		color: #fff;
		user-select: none;
	}

	.m-img-box {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background-size: 100%;
		background-position: 50%;
		overflow: hidden;
		background-color: #e6e6e6;
		display: inline-block;
		width: 100%;
	}

	.m-img-box {
		width: 100%;
		height: 100%;
		vertical-align: top;
		object-fit: cover;
	}

	.mwbv-play-button {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 3.375rem;
		height: 3.375rem;
		margin: -1.6875rem 0 0 -1.6875rem;
		background: rgba(0, 0, 0, .4);
		border-radius: 50%;
		padding: 0;
		border: none;
		outline: none;
		color: #fff;
	}

	.phtot {
		position: fixed;
		width: 100%;
		height: 100%;
		background: black;
		margin: 0;
		overflow-y: scroll;
		top: 0;
		display: flex;
		align-items: center;
		left: 0;
		z-index: 99999;
		transition: all 1s;
	}


	.close {
		position: absolute;
		color: #cfcfcfdb;
		top: 9px;
		right: 5%;
		font-size: 23px;
		font-weight: 500;
		z-index: 99999;
	}

	.mwbv-info-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1rem;
		padding: .9375rem 0 .3125rem;
		background-image: linear-gradient(-180deg, transparent 3%, rgba(0, 0, 0, .2) 98%);
		display: block;
	}

	.m-box {
		margin: 0 .3125rem;
		line-height: 1rem;
		font-size: .75rem;
		text-shadow: 0 0 2px rgba(0, 0, 0, .4);
		display: flex;
	}

	.m-box-col {
		-webkit-box-flex: 1;
		flex: 1;
		width: 100%;
		display: block;
		line-height: 1rem;
		font-size: .75rem;
		text-shadow: 0 0 2px rgba(0, 0, 0, .4);

		min-width: 0;
	}

	.time {
		line-height: 1rem;
		font-size: .75rem;
		text-shadow: 0 0 2px rgba(0, 0, 0, .4);
	}

	.phtot>div {
		overflow-y: scroll;
	}
</style>
