<?php

require __DIR__ . "./../vendor/autoload.php";
?>

<!DOCTYPE html>
<html>
<head>
	<title>Dijkstra's Bus Stops</title>

	<link rel="stylesheet" type="text/css" href="<?= mix('css/app.css'); ?>">

</head>
<body>
	
	<div id="pathfinder">

		<section class="hero is-primary">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Dijkstra's Bus Stops
					</h1>
				</div>
			</div>
		</section>

		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column">
						<div id="path-viewer">
							<point v-for="point in points" :point="point" :key="point.id"></point>
							<svg style="width: 100%; height: 100%; position:absolute; z-index:10; ">
								<connection v-for="connection in connections" :connection="connection" :key="connection.id"></connection>
							</svg>
						</div>
					</div>
					<div class="column is-3" v-if="displayPoint">
						<div class="box">
							<div class="content">
								<h3 class="title is-3">
									{{displayPoint.point.callsign}}
								</h3>

								<h5 class="title is-5">
									Connected Terminals
								</h5>
								<ul>
									<li v-for="neighbor in displayPoint.neighbors">
										<a href="#" v-on:mouseover="highlightConnectionsForPoint(neighbor)" v-on:mouseout="unhighlightConnectionsForPoint(neighbor)" @click.prevent="loadPoint(neighbor.point)">
											{{neighbor.point.callsign}} - {{neighbor.connection.distance}}
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="section">

		</section>

	</div>


	<style>

		#path-viewer {
			width: 100%;
			height: 800px;
			position: relative;
		}

	</style>

	<script src="<?= mix('js/app.js'); ?>"></script>

</body>
</html>