<template>
	<div class="search bar7">
		<form>
			<router-link tag="div" :to="{name: 'resou',params:{}}">
				<input type="text" placeholder="大家都在搜 :">
			</router-link>
			<router-view></router-view>
			
		</form>
	</div>

</template>

<script>
	export default {
		name: 'sousuo',
		props: {
			msg: String
		}
	}
</script>

<style scoped>
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
</style>
