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

			var red = Math.floor(Math.random() * 255);
			var blue = Math.floor(Math.random() * 255);
			var green = Math.floor(Math.random() * 255);
			var alpha = ((10 - this.connection.distance) / 10);
			var animationDelay = (this.connection.id * 20)+"ms";
			var depth = 10
			var strokeColor = 'rgba('+red+', '+green+', '+blue+', '+alpha+')';
			var strokeWidth = Math.floor((10 - this.connection.distance) / 3)
			var duration = Math.floor((Math.random() * 10) + 1) * 50+'ms';

			if (this.highlighted) {
				depth = 200;
				red = 0;
				green = 0;
				blue = 0;
				alpha = 1;
				strokeWidth = 8;
			}

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