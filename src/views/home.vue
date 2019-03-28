<template>
	 <div id="app">
	<div class="top">
		<div class="mine icon-5"></div>
		<div class="sousuo"></div>
	<div class="search bar7">
		<form>
			
			<router-link tag="div" :to="{name: 'resou',params:{}}">
							<input type="text" placeholder="大家都在搜 :">
				</router-link>
			<router-view></router-view>

			
			
		</form>
	</div>

		<div class="mine1 icon-1"></div>
		<div class="mine2 icon-3"></div>
		<div class="router person-wrap" ref="personWrap">
			<ul class="rtul person-list" ref="personTab">		
				<li @click="click(i,item.gid)" :class="{active:active==i }" v-for="(item,i) in list" :key="item.gid" :ref="i">
					
					<a href="#">{{item.name}}</a>
					</li>
			</ul>
			
		</div>
		
	</div>
	<remen :msg="msg" :id="id"></remen>
	<!-- <Imgg></Imgg> -->
	</div>
</template>

<script>
	 // import Imgg from './components/imgg'
	// import BScroll from 'better-scroll'
	import remen from '../components/remen.vue'
	
	export default {
		name:'home',
		data(){
			return{
				msg:[],
				list:Array,
				active:0,
				id:102803,
				
				
			}
		},
		methods:{
			click(i,id){
				this.active = i
				console.log(id)
				this.id = id
				console.log(document.getElementById('app').scrollTop)
				
				this.$axios.get('/api/api/container/getIndex', {
					params: {
						containerid:id,
						openApp: 0,
						
					}
				})
				.then(response => {
					console.log(response.data)
					this.msg =response.data.data.cards
					console.log(this.msg)
					
				}), err => {
					alert(err)
				}
			},
			top(){
				
			}
		},
		created(){
				this.$axios.get('/api/api/container/getIndex', {
					params: {
						containerid: this.id,
						openApp: 0
					}
				})
				.then(response => {
					console.log(response.data.data)
					this.msg =response.data.data.cards
					
				}), err => {
					alert(err)
				}
				
				this.$axios.get('/api/api/config/list', {
			params: {
				
			}
				})
				.then(response => {
					console.log(response.data.data.channel)
					this.list = response.data.data.channel
					
				}), err => {
					alert(err)
				}
				
					// https://m.weibo.cn/api/config/list
			
		},
		components:{
		remen

		}
		}
</script>

<style>
body{
	margin: 0;
}
.img{
	position: relative;
	width: 100%;
	height: 4rem;
}
.sousuo{
	position: absolute;
	    left: 2.75rem;
    right: 5.375rem;
    line-height: 2.5rem;
		    color: #507DAF;
}
		.top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		box-sizing: border-box;
		padding: 0;
		background-color: #fafafa;
		color: #262626;
		border-color: #e6e6e6;
		border-style: solid;
		font-size: 1rem;
		z-index: 995;
		height: 5.25rem;
	}
	
	.mine {
		cursor: pointer;
		left: .75rem;
		z-index: 1;
		position: absolute;
		line-height: 2.75rem;
		font-family: litefont;
		font-size: 1.75rem;
		color: #00000069;
	
	}
	
	.sousuo {
		position: absolute;
		left: 2.75rem;
		right: 5.375rem;
		line-height: 2.5rem;
		color: #507DAF;
	}
	
	.right {
		right: .9375rem;
		cursor: pointer;
		z-index: 1;
		position: absolute;
		line-height: 2.75rem;
	}
	
	.yx {
		position: relative;
		display: block;
	
	}
	
	.mine1 {
		right: 3.7rem;
		cursor: pointer;
		z-index: 1;
		position: absolute;
		line-height: 2.75rem;
		font-family: litefont;
		font-size: 1.75rem;
		color: #00000069;
	}
	
	.mine2 {
		right: .9375rem;
		cursor: pointer;
		z-index: 1;
		position: absolute;
		line-height: 2.75rem;
		font-family: litefont;
		font-size: 1.75rem;
		color: #00000069;
	}
	
	.router {
		right: 0;
		top: 2.5rem;
		position: relative;
		left: 0;
		font-size: 1rem;
		height: 100%;
		width: 100%;
		color: #a5adb5;
		height: 2.5rem;
	}
	.rtul{
		    padding: 0;
	  margin: 0;
	  list-style: none;
	  padding-top: 5px;
	  height: 100%;
		    display: flex;
	  overflow-x: auto;
	  white-space: nowrap;
	}
	.rtul li{
		    position: relative;
	  margin: 0 14px;
	  height: 70%;
	  
	  float: left;
	}
		.bar7 form {
		height: 42px;
		padding-right: 10px;
		width: 100%;
	}
	
	.bar7 input {
		width: 90%;
		background: #ebebec;
		transition: .3s linear;
	}
	
	
	
	.bar7 button {
		background: none;
		top: 0px;
		right: 6px;
	}
	
	.bar7 button:before {
		color: #324b4e;
	}
	
	form {
		position: relative;
		width: 235px;
		margin: 0 auto;
	}
	
	input,
	button {
		border: none;
		outline: none;
	}
	
	input {
		width: 100%;
		height: 28px;
		padding-left: 13px;
	}
	
	button {
		height: 30px;
		width: 42px;
		cursor: pointer;
		position: absolute;
	}
		.search{
		position: absolute;
		    left: 3rem;
	    right: 5.375rem;
	    line-height: 2.5rem;
			    color: #507DAF;
	}

	a{
		list-style: none;
		text-decoration: none;
		color: #ccc;
	}
	em{
		display: block;
    position: relative;
    left: 50%;
    width: .875rem;
    margin-left: -.4375rem;
    border-top: 2px solid #282f3c;
	}
	.active{
		color: black!important;
		border-bottom: 3px solid #CCCCCC;
	}
</style>
