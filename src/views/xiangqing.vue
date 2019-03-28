<template>
	<div>
		<div class="toper">
			<router-link tag="div" to="/">
				
				<div class="back">
					<div class="left">
						<span> < </span> </div> </div> </router-link> <router-view></router-view><div class="uesrimg">
								<div class="bigusimg">
									<img :src="user.avatar_hd" alt="">
									<!-- <img src="../assets/logo.png" alt=""> -->
								</div>
								<div class="username">
									<div class="m-text-box">
										<h3 class="m-box"><span class="m-text-cut">{{user.screen_name}}</span></h3>
										<h4 class="m-text-cut-2">微博认证：{{user.verified_reason}}</h4>
									</div>
								</div>

					</div>
					<div class="prf-handle">
						<div class="m-box-center-a">
							<span class="prf-num">
								<div class="iii">{{user.follow_count}}</div>
								<b class="text-center">关注</b>
							</span>
							<span class="prf-num">
								<div class="iii">{{followers_count}}万</div>
								<b class="text-center">粉丝</b>
							</span>
						</div>

						<div class="bar-btn">
							<div class="danger">+   关注</div>
						</div>
						<div class="dm-btn">
							<i class="icon-1"></i>
						</div>
					</div>
				</div>
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
				
					<div class="wb-item-wrap" @click="onc()" v-for="(item,i) in data" :key="i">
						<div class="card-wrap">
							
								<header class="weibo-top">
									<div class="touxiang">
										<div class="">
											<img :src="item.user.avatar_hd" alt="">
										</div>
									</div>
									<div class="title-name">
										<div class="textbox">
											<h3>{{item.user.screen_name}}</h3>
											<h4>{{item.created_at}} 来自 {{item.source}}</h4>
										</div>
									</div>
								</header>
							
						</div>
						
				
						<div class="weibo-main">
				
							<div class="card-wrap">
								<div class="weibo-og">
				
				
				
									<div class="weibo-text" v-html="item.text">
										<span class="surl-text">{{item.text}}</span>
										<span class="url-icon">以后可以叫骚猪刘校长 </span>
									</div>
				
				
				
								</div>
				
							</div>
						</div>
						<div style="margin: 0 .8rem 0 1rem;" v-if="item.pics">
							<div class="weiboimg">
								<ul>
									<li v-for="(imgs,index) in item.pics" :key="index" @click="ind(index,item.pics)">
										<div class="imgs"><img :src="imgs.url" alt=""></div>
									</li>
				
								</ul>
							</div>
						</div>
						<div class="video" v-else-if="item.page_info">
							<div class="media">
								<div>
									<div class="card-video">
										<div class="mwb-video">
											<div class="m-img-box">
												<img :src="item.page_info.page_pic.url" alt="">
											</div>
											<button class="mwbv-play-button" @click="video(item.page_info.media_info.stream_url)"></button>
											<div class="mwbv-info-bar">
												<div class="m-box">
													<div class="m-box-col">{{item.page_info.play_count}}次观看</div>
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
								<h4 v-if="item.reposts_count > 1000">{{(item.reposts_count / 1000).toFixed(1)}}万</h4>
								<h4 v-else-if="item.reposts_count < 1000">{{item.reposts_count}}</h4>
							</div>
							<div class="good">
								<i class="isi icon-2"></i>
								<h4 v-if="item.comments_count > 1000">{{(item.comments_count / 1000).toFixed(1)}}万</h4>
								<h4 v-else-if="item.comments_count < 1000">{{item.comments_count}}</h4>
							</div>
							<div class="good">
								<i class="isi icon-4"></i>
								<h4 v-if="item.attitudes_count > 1000">{{(item.attitudes_count / 1000).toFixed(1)}}万</h4>
								<h4 v-else-if="item.attitudes_count < 1000">{{item.attitudes_count}}</h4>
							</div>
						</div>
				
				
					</div>
				
				</div>
				<div class="lite-btn-more">查看全部微博</div>
		</div>

</template>

<script>
	export default {
		name: 'xiangqing',
		props: ['id'],
		data() {
			return {
				user: {},
				data: {},
				swiperSlides: [],
				show: false,
				show1: false,
				src: [],
				page: 1,
								swiperOption: {
					pagination: {
						el: '.swiper-pagination'
					}
				}
			}
		},
		methods: {
			cli() {
				console.log(this.id)
			},
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
			}
		},
		created() {
			this.$axios.get('/api/profile/info', {
					params: {
						uid: this.id
					}
				})
				.then(response => {
					console.log(response.data.data)
					this.user = response.data.data.user
					this.data = response.data.data.statuses
					console.log(this.user)
					console.log(this.data)
				}), err => {
					alert(err)
				}

		},
		computed:{
			followers_count(){
				let follow = this.user.followers_count / 10000
				let count = follow.toFixed(2)
				return count
			}
		}

	}
</script>

<style scoped>
	.aaa {
		position: absolute;
		width: 100px;
		height: 100px;
		background: red;
		z-index: 99999999;
	}

	.toper {
		border-image: none;
		border-top-width: 0;
		border-right-width: 0;
		border-bottom-width: .5px;
		border-left-width: 0;
		position: relative;
		background-repeat: no-repeat;
		background-position: 50%;
		background-size: cover;
		background: #fff;
		border-color: #e6e6e6;
		border-style: solid;
	}

	.back {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 2.75rem;
		line-height: 2.75rem;
		background: #fff;
		z-index: 995;
	}

	.left {
		position: absolute;
		left: .625rem;
		color: #282f3c;
		z-index: 100;
	}

	.left span {
		font-size: 1.3125rem;
		cursor: pointer;
	}

	.uesrimg {
		padding: 3.25rem .9375rem 1.25rem;
		display: flex;
	}

	.bigusimg {
		width: 4rem;
		height: 4rem;
		margin-right: .9375rem;
		border-radius: 50%;
		position: relative;
		display: inline-block;
	}

	.bigusimg img {
		width: 100%;
		height: 100%;
		vertical-align: top;
		object-fit: cover;
		border-radius: 50%;
	}

	.username {
		-webkit-box-flex: 1;
		flex: 1;
		width: 100%;
		min-width: 0;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex-direction: column;
	}

	.m-text-box {}

	.m-box {
		font-size: 1.3125rem;
		color: #333;
		line-height: 1.4;
		display: flex;
		margin: 0 0 .375rem 0;
	}

	.m-text-cut {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 1.3125rem;
		color: #333;
		line-height: 1.4;
	}

	.m-text-cut-2 {
		font-size: .8125rem;
		color: #999;
		margin: 0;
		line-height: 1.5;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.prf-handle {
		padding: 0 .9375rem 1.6875rem;
		display: flex;

	}

	.m-box-center-a {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.prf-num {
		margin-right: 1.75rem;
		cursor: pointer;
	}

	.iii {
		display: block;
		width: 100%;
		text-align: left;
		line-height: 1.3;
		font-size: .9375rem;
	}

	.text-center {
		display: block;
		width: 100%;
		text-align: left;
		line-height: 1.3;
		font-size: .8125rem;
		font-weight: 500;
	}

	.bar-btn {
		    max-width: 12.5rem;
    -webkit-box-flex: 1;
    text-align: center;
    border-radius: 5px;
    background-color: #5290CC;
    flex: 1;
    width: 100%;
    min-width: 0;
	}
	.danger{
		    display: inline-block;
    align-items: center;
    height: 100%;
    text-align: center;
    color: #fff;
    line-height: 36px;
	}
	.dm-btn{
		position: relative;
    text-align: center;
    width: 2.625rem;
    height: 2rem;
    line-height: 2.125rem;
    margin-left: 1.5rem;
    cursor: pointer;
	border: 1px solid #697480;
	}
	.dm-btn i{
		    font-size: 2rem;
    padding-left: 1px;
    color: #697480;
	}
	
	
	.wb-item-wrap {
		position: relative;
		overflow: hidden;
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
		background: #070707f2;
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
	.lite-btn-more{
		background: #fff;
    height: 2.125rem;
    line-height: 2.125rem;
    color: #636363;
    font-size: .875rem;
    text-align: center;
    cursor: pointer;
	border-bottom: .625rem solid #f2f2f2;
	border-top: .625rem solid #f2f2f2;
	}
</style>
