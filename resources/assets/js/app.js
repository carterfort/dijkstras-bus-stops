
require('./bootstrap');

Vue.component('point', require('./components/Point'))
Vue.component('connection', require('./components/Connection'))

window.Event = new Vue();

const app = new Vue({

	el : "#pathfinder",
	data : {
		points : [],
		traveled : [],
		notTraveled : [],
		connections : [],
		displayPoint : false,
		pointsToCreate : 10
	},
	mounted(){

		let alphabet = this.shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

		for (var i = 0; i < this.pointsToCreate; i++){
			let x = Math.floor(Math.random() * 100);
			let y = Math.floor(Math.random() * 100);

			alphabet = this.shuffle(alphabet);
			let firstLetter = alphabet[0];
			alphabet = this.shuffle(alphabet);
			let secondLetter = alphabet[0];
			alphabet = this.shuffle(alphabet);
			let thirdLetter = alphabet[0];


			this.points.push({
				id : i,
				callsign : firstLetter+secondLetter+thirdLetter,
				position : [x,y],
				connections : []
			})
		}

		var current = 0;

		while ( current < this.points.length){
			let pointA = this.points[current]

			let connectionCount = Math.floor(Math.random() * (this.points.length - current))

			if (connectionCount > 5) connectionCount = 5;
			if (connectionCount == 1) connectionCount = 2;

			var pointsToConnect = this.shuffle(this.points).slice(0, connectionCount);
			pointsToConnect.forEach(function(pointB){
				this.connectPoints(pointA, pointB, current);
			}.bind(this))

			current++;
		}

		this.traveled = this.points[0];
	},
	computed : {
		startingPoint(){
			return this.points[0];
		},
		endingPoint(){
			return this.points[this.points.length - 1];
		}
	},
	methods : {
		showPoint(point){
			this.displayPoint = point;
		},
		highlightConnectionsForPoint(point){
			this.childPointWithId(point.point.id).highlightPoint();
			this.childConnectionWithId(point.connection.id).highlight();
		},
		unhighlightConnectionsForPoint(point){
			this.childPointWithId(point.point.id).unhighlightPoint();
			this.childConnectionWithId(point.connection.id).unhighlight();
		},
		loadPoint(point){
			this.childPointWithId(point.id).showPoint();
		},
		connectPoints(pointA, pointB, id){
			let pos1 = pointA.position
			let pos2 = pointB.position

			if (pointA.connections.find(function(connection){
				return connection.points.find(function(point){
					return point.id == pointB.id;
				})
			})){
				return;
			}

			let connection = {
				id : id,
				left : pos1[0] + .6,
				right : pos2[0] + .6,
				top : pos1[1] + .6,
				bottom : pos2[1] + .6,
				distance :  Math.floor(Math.random() * 9) + 1,
				points : [pointA.id, pointB.id]
			}

			this.connections.push(connection)

			if ( ! pointA.connections.find(function(con){
				return con.id == connection.id
			})){
				pointA.connections.push(connection)
			}
			if ( ! pointB.connections.find(function(con){
				return con.id == connection.id
			})){
				pointB.connections.push(connection)
			}
		},
		shuffle(array){
			let counter = array.length;

		    // While there are elements in the array
		    while (counter > 0) {
		        // Pick a random index
		        let index = Math.floor(Math.random() * counter);

		        // Decrease counter by 1
		        counter--;

		        // And swap the last element with it
		        let temp = array[counter];
		        array[counter] = array[index];
		        array[index] = temp;
		    }

		    return array;
		},
		pointWithId(id){
			return this.points.find(function(point){
				return point.id == id;
			});
		},
		childPointWithId(id){
			return (this.$children.filter(function(component){
				return (component.point);
			}).filter(function(component){
				return component.point.id == id
			}))[0]
		},
		childConnectionWithId(id){
			return (this.$children.filter(function(component){
				return (component.connection);
			}).filter(function(component){
				return component.connection.id == id
			}))[0]
		}
	}

})