<template>
	<line v-bind:x1="connection.left+'%'" v-bind:x2="connection.right+'%'" v-bind:y1="connection.top+'%'" v-bind:y2="connection.bottom+'%'" v-bind:style="styleObject" />
</template>

<script>

export default {
	props : ['connection'],
	data(){
		return {
			highlighted : false
		}
	},
	methods : {
		highlight(){
			this.highlighted = true;
		},
		unhighlight(){
			this.highlighted = false;
		}
	},
	computed : {
		styleObject(){

			let red = Math.floor(Math.random() * 255);
			let blue = Math.floor(Math.random() * 255);
			let green = Math.floor(Math.random() * 255);
			let alpha = ((10 - this.connection.distance) / 10);
			let animationDelay = (this.connection.id * 60)+"ms";
			let depth = 10

			if (this.highlighted) {
				depth = 200;
				red = 255;
				green = 255;
				blue = 64;
				alpha = 1;
			}

			let strokeColor = 'rgba('+red+', '+green+', '+blue+', '+alpha+')';

			let strokeWidth = Math.floor((10 - this.connection.distance) / 2)

			let duration = Math.floor((Math.random() * 10) + 1) * 100+'ms';

			return {
				stroke : strokeColor,
				strokeWidth : strokeWidth,
				opacity : 0,
				animation : "offset "+duration+" ease-out forwards",
				animationDelay: animationDelay,
				zIndex : depth
			}
		}
	}

}

</script>

<style>

	@keyframes offset{
		to {
			opacity: 1;
		}
	}
</style>