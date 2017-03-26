<template>
	<div class="point" :class="{ selected : selected, highlighted : highlighted }" :style="styleObject" @click="showPoint">
		<span class="point-label">{{point.callsign}}</span>
	</div>
</template>

<script>
export default {
	props : ['point'],
	data(){
		return {
			selected : false,
			highlighted : false
		}
	},
	methods : {
		showPoint(){
			Event.$emit('unselectAllPoints');
			this.$parent.showPoint(this);
			this.selected = true;
		},
		highlightPoint(){
			this.highlighted = true;
		},
		unhighlightPoint(){
			this.highlighted = false;
		}
	},
	mounted(){

		Event.$on('unhighlightAllPoints', function(){
			this.highlighted = false;
		}.bind(this))

		Event.$on('highlightPoint', function(point){
			if (point.id == this.point.id){
				this.highlighted = true;
			}
		}.bind(this))

		Event.$on('unhighlightPoint', function(point){
			if (point.id == this.point.id){
				this.highlighted = false;
			}
		}.bind(this))

		Event.$on('unselectAllPoints', function(){
			this.selected = false;
		}.bind(this))

		Event.$on('selectPoint', function(point){
			if (point.id == this.point.id){
				this.selected = true;
			}
		}.bind(this))

		Event.$on('unSelectPoint', function(point){
			if (point.id == this.point.id){
				this.selected = false;
			}
		}.bind(this))
	},
	computed : {
		styleObject(){
			let translateX = this.point.position[0]
			let translateY = this.point.position[1]
			return {
				left: translateX+"%",
				top: translateY+"%"
			}
		},
		neighbors(){

			var neighbors = [];
			let id = this.point.id

			this.point.connections.forEach(function(connection){
				connection.points.forEach(function(connectedPointId){
					if (connectedPointId != id){
						neighbors.push({ point : this.$parent.pointWithId(connectedPointId), connection : connection})
					}
				}.bind(this))
			}.bind(this));

			return neighbors;
		}
	}
}
</script>

<style>
	.point {
		position: absolute;
		height: 10px;
		width: 10px;
		border-radius: 100%;
		background: black;
		cursor: pointer;
		z-index: 20;
	}

	.point-label {
		font-size: 150%;
		background: rgba(255,255,255,0.9);
		position: relative;
		padding: 0.05em;
		left: -18px;
		top: 10px;
	}

	.point.selected, .point.highlighted {
		z-index: 100;
	}

	.point.selected .point-label {
		background: rgba(150,179,40, 1);
		color:white;
	}

	.point.highlighted .point-label {
		background: rgba(255,0,0, 0.5);
		color: white;
	}

	.point.selected .point-label, .point.highlighted .point-label {
		padding: 0.2em;
		z-index: 100;
	}

</style>