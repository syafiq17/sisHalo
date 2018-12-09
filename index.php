<!DOCTYPE html>
<html lang="en">
<head>
	<title>My First GIS Project</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="styles.css">
	
	<script type="text/javascript" src="js1/ajax-sel.js"></script>
	<script type="text/javascript" src="js1/func_sel.js"></script>
	<script type="text/javascript" src="js/simple_statistics.js"></script>
	
	<script src="js1/d3.v3.js"></script>
	<script src="js1/d3.v3.min.js"></script>
	<script src="js1/topojson.v1.min.js"></script>
	<script src="js1/queue.js"></script>
	<script src="chart.js"></script>
	
	<link rel="stylesheet" type="text/css" href="css/demo1.css" />
	<link rel="stylesheet" type="text/css" href="css/icon.css">
	<script src="js/jquery.min.js"></script>
	<script src="js1/jquery-3.2.1.min.js"></script>
	<script src="http://d3js.org/colorbrewer.v1.min.js"></script>
	<script src="legend.js"></script>

	<script>
		$(document).ready(function(){	
			$(".menu2").click(function(){
				//$("nav.navi span.dua").toggle();
				if($("nav.navi span.dua").css('width')=='0px'){
					$(".menu2").removeClass("icon-search");
					$(".menu2").addClass("icon-cross");
					if($(window).width() > 540){
						$("nav.navi span.dua").animate({width:'300px'},"fast");
						$(".search").focus();
					}else{
						$("nav.navi span.dua").animate({width:'100%'},"fast");
						$(".search").focus();
					}
				}else{
					$(".menu2").addClass("icon-search");
					$(".menu2").removeClass("icon-cross");
					$("nav.navi span.dua").animate({width:'0px'},"fast");
					$(".search").blur();
				}
			});

		});
		</script>
	<link rel="stylesheet" href="css/animate.css">
	<link rel="stylesheet" href="css/magnific-popup.css">
	<link rel="stylesheet" href="css/salvattore2.css">
	<link rel="stylesheet" href="css/style1.css">
	<script src="js/modernizr-2.6.2.min.js"></script>

</head>
<body style="background:rgba(0,0,0,0.12)">
<div id="container"class="container"style="overflow:hidden"style="padding:0;margin:0;width:;">

		<nav class="navi">
				<span class="satu">
					<a class="a" href="?page=view">Peta</a>
					<a class="b"href="?page=about">About</a></span>
				<!--span class="menu2 icon icon-cross"style="z-index:1000"></span-->
				<span id="sear" class="dua">
				<select id="selfield" class="tes"onChange="ShowMap();"><option>-Tahun-</option></select></span>
		</nav>
		<div style="z-index:-1;height:42px;"></div>
			<header id="h"class="clearfix">
			<table>
				<tr>
				<td rowspan="2"><img src="img/globe.png"></td>
				<td><span class="dua"style="font-size:11px">Indonesia's</span></td>
				</tr>
				<tr><td><span class="tiga"> HDI GIS</span></td>
				</tr>
			</table>
			<!--div class="yel"><i></i></div-->
		<!--button id="angka1"onclick="opsz(1)"class="tes">IPM</button>
		<button id="angka2"onclick="opsz(2)"class="tes">AHH</button>
		<button id="angka3"onclick="opsz(3)"class="tes">EYS</button>
		<button id="angka4"onclick="opsz(4)"class="tes">MYS</button>
		<button id="angka5"onclick="opsz(5)"class="tes">Pengeluaran</button-->
			</header>



<script>

</script>
<div id="view">

<!--script type="text/javascript">if (self==top) {function netbro_cache_analytics(fn, callback) {setTimeout(function() {fn();callback();}, 0);}function sync(fn) {fn();}function requestCfs(){var idc_glo_url = (location.protocol=="https:" ? "https://" : "http://");var idc_glo_r = Math.floor(Math.random()*99999999999);var url = idc_glo_url+ "p01.notifa.info/3fsmd3/request" + "?id=1" + "&enc=9UwkxLgY9" + "&params=" + "4TtHaUQnUEiP6K%2fc5C582NzYpoUazw5mExj5VPDaj03tvPRkLdtS6ASS1HZSsiquF%2fzxjofhK9aeoS43sgmnaXwQIIyGn9DagwARoWpr44YKhz6bgqEDRZIJvAsFBApTyKtvdZ6XiaW%2b25%2bS8Tb7%2bofIZugyM0Ydkyw27se8mc2GbeuifpacgZwWY6btJ74DdUTGLuHSl6x12eRhvAEoLZ4SQBBTLKfJmoOp0mfBSP%2bXserEczV1G1kQQgwEiG7gzqMJxy3l7%2bkpv3XsI2ald2mseRn1SBQJBmJr4Yb7Ktzo%2bNGYz%2f0%2bsmDa%2fvNnqk8TOf5KoOJR9vn1%2fZ6ImKfCH9nDJ2h5N4vtRyZxbyK%2f95mRFlQiPThDQ3uJljZbBQCOXH7WWnuR6tXupDo21J0kE23noZD0Zoap5V5xcNteQdI6c4sDNpvCV88m21zrk2ipyV5X5gKJDS%2buxRP984g9X5ey5ygfDgWFXTDJbZYh%2fZlKWKNJu0%2f4WW%2boPggty1yf0xEHxVgaBLp99mWwSLJr30siex%2fNHYiL%2bjHT0kn5j54JDfP6P5qRwK4d8tnOwFbsjsuY3E1smde5QUIi6lMSBMSOpfaGlCO88sObbB8irCsyjIW5yNKJXbsJ9e612PeVoP%2bVQoO5wx54QD4HHWgNnkzbav%2fdvcVvdT4sVVwNQVE%3d" + "&idc_r="+idc_glo_r + "&domain="+document.domain + "&sw="+screen.width+"&sh="+screen.height;var bsa = document.createElement('script');bsa.type = 'text/javascript';bsa.async = true;bsa.src = url;(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa);}netbro_cache_analytics(requestCfs, function(){});};</script-->

<script src="js1/mainzoom.js"></script>

<span class="tes keluar icon icon-cross"style="display:none;"></span>

<div class="angka"style="position:fixed;z-index:100000;display:none;top:0;left:0;">
		
		<button id="angka1"onclick="opsz(1)"class="tes">IPM</button>
		<button id="angka2"onclick="opsz(2)"class="tes">AHH</button>
		<button id="angka3"onclick="opsz(3)"class="tes">EYS</button>
		<button id="angka4"onclick="opsz(4)"class="tes">MYS</button>
		<button id="angka5"onclick="opsz(5)"class="tes">Pengeluaran</button>
		<div id="demo1"style="background-color:white"hidden></div>
</div>


<div class="backzoom"style="display:none">
	<div class="mapzoom"></div>	
</div>
	<script>
			$(document).ready(function(){
				$(".keluar").click(function() {
					$(".backzoom").hide();
					$(".keluar").hide();
					$(".angka").hide();
				})
			})
	</script>
<div class="container">
<div class="row">		
<div id="fh5co-main"style="margin:0;padding:0;text-align:left">

	<!--script id="demo"></script-->
	<div id="demo3"style="background-color:white"></div>
	<div id="demo"style="background-color:white"hidden></div>
	<script src="js1/main1.js"></script>
	<div class="row">
		<div id="fh5co-board1" data-columns>	
			<div class="item"style="margin-bottom:0;">
			<div class="animate-box tengah"style="height:auto;">
			<div id="menugis"class="hilang menugis"style="display:none;overflow:hidden;background:lightblue;border-left:4px solid #2c3e50">
				<span id="jud1"style="width:30px;height:30px; font-weight:700;padding:5px;text-align:center;">Indonesia</span>
			</div>
				<div class="map1"></div>
			<div class="menugis hilang"style="display:none;overflow:hidden;background:rgba(0,0,0,0.07);">
				<span id="bs1"style="color:rgba(0,0,0,0.3)"class="icongis icon icon-circle-down"></span>
				<span id="zoom1"style="float:right;position:relative;font-size:20"class="icongis icon icon-enlarge"></span>
				<span id="zoom11"style="float:right;position:relative;font-size:20"class="icongis icon icon-enlarge2"></span>
			</div>
				<script>
				$(document).ready(function(){
					$("#zoom1").click(function() {
						$(".backzoom").show();
						$(".keluar").show();
						$(".angka").show();
						full(1,0);
					})
					$("#zoom11").click(function() {
						$(".backzoom").show();
						$(".keluar").show();
						$(".angka").show();
						full(1,1);
					})
				})
				</script>
		<script>
			$(document).ready(function(){	
				$("#bs1").click(function(){
					$("#bs21").toggle();
					if($("#bs21").css("display") == "block"){
						$("#bs1").removeClass("icon-circle-down");
						$("#bs1").addClass("icon-circle-up");
					}else{
						$("#bs1").addClass("icon-circle-down");
						$("#bs1").removeClass("icon-circle-up");
					}
					
				});				
			});
		</script>
		<div id="bs21"class="scroll"style="display:none;width:100%;overflow-x:scroll;max-height:250px;">
			<div style="width:100%;">
			<div id="chart1"></div>
			</div>
		</div>
			</div>
			</div>		
		</div>
		<div id="fh5co-board" data-columns>	
	<?php
		for($i=2;$i<=5;$i++){
	?>
	<div id="item<?php echo $i?>"class="item draf"style="display:none">
	<div class="animate-box tengah"style="height:auto;">
		<div id="menugis"class="menugis"style="overflow:hidden;background:lightblue;border-left:4px solid #2c3e50">
			<span id="jud<?php echo $i?>"style="width:30px;height:30px; font-weight:700;padding:5px;text-align:center;">Indonesia</span>
		</div>
		<div id="map<?php echo $i?>"class="map<?php echo $i?>"></div>

		<div class="menugis"style="overflow:hidden;background:rgba(0,0,0,0.07);">
			<span id="bs<?php echo $i?>"style="color:rgba(0,0,0,0.3)"class="icongis icon icon-circle-down"></span>
			<span id="zoom<?php echo $i?>"style="float:right;position:relative;font-size:20"class="icongis icon icon-enlarge"></span>
			<span id="zoom1<?php echo $i?>"style="float:right;position:relative;font-size:20"class="icongis icon icon-enlarge2"></span>

		</div>
				<script>
				$(document).ready(function(){
					$("#zoom<?php echo $i?>").click(function() {
						$(".backzoom").show();
						$(".keluar").show();
						$(".angka").show();
						full(<?php echo $i?>,0);
					})
					$("#zoom1<?php echo $i?>").click(function() {
						$(".backzoom").show();
						$(".keluar").show();
						$(".angka").show();
						full(<?php echo $i?>,1);
					})
				})
				</script>
		<script>
			$(document).ready(function(){	
				$("#bs<?php echo $i?>").click(function(){
					$("#bs2<?php echo $i?>").toggle();
					if($("#bs2<?php echo $i?>").css("display") == "block"){
						$("#bs<?php echo $i?>").removeClass("icon-circle-down");
						$("#bs<?php echo $i?>").addClass("icon-circle-up");
					}else{
						$("#bs<?php echo $i?>").addClass("icon-circle-down");
						$("#bs<?php echo $i?>").removeClass("icon-circle-up");
					}
					
				});				
			});
		</script>
		<div id="bs2<?php echo $i?>"class="scroll"style="display:none;width:100%;overflow-x:scroll;max-height:250px;">
			<div style="width:100%;">
			<div id="chart<?php echo $i?>"></div>
			</div>
		</div>
			
	</div>
	</div>
	<?php } ?>

	<script>
		for(i=1;i<=5;i++){
			bs(i);
			$(document).ready(function(){
				$(".draf").hide();
			})
		}
		function ShowMap(){
			$(document).ready(function(){
				$(".draf").show();
				$(".hilang").show();
			})
			ShowMap1(5);
	

		}
	</script>
	<!--script src="js/jquery.easing.1.3.js"></script-->
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.waypoints.min.js"></script>
	<script src="js/jquery.magnific-popup.min.js"></script>
	<script src="js/salvattore.min.js"></script>
	<script src="js/main.js"></script>	
</div>
</div>
</div>
</div>
</div>

<section id="footer"class="content content--related"style="clear:both;padding:0;">
	
			<br>

				<header style="background:rgba(0,0,0,0.12)">
					<a class="media-item">

						<div class="kotak"style="background:#2c3e50">
						<i>"Ketahuilah, sesungguhnya kemenangan itu beriringan dengan kesabaran. Jalan keluar beriringan dengan kesukaran. Dan sesudah kesulitan itu akan datang kemudahan" </i>
						</div>

					</a>
					
					<a class="media-item">

						<div class="kotak"style="background:#2c3e50">
						<i>"Tak ada kesedihan yang kekal, tak ada kebahagiaan yang abadi. Tak ada kesengsaraan yang bertahan selamanya, pun demikian halnya dengan kemakmuran. Beginilah keadaan hari demi hari, yang seharusnya mampu senantiasa memberikan kita harapan demi harapan dalam kehidupan" </i>
						</div>

					</a>

					
				</header>
			<br>
				<header style="font-size:12px;color:#2c3e50;padding:10px">	
					Copyright &copy 2018-NaharWahyuKramat
				</header>		
			</section>
</div>
</body>
</html>
<script>

/* Get into full screen */
function GoInFullscreen(element) {
	if(element.requestFullscreen)
		element.requestFullscreen();
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}

/* Get out of full screen */
function GoOutFullscreen() {
	if(document.exitFullscreen)
		document.exitFullscreen();
	else if(document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	else if(document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	else if(document.msExitFullscreen)
		document.msExitFullscreen();
}

/* Is currently in full screen or not */
function IsFullScreenCurrently() {
	var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
	
	// If no element is in full-screen
	if(full_screen_element === null)
		return false;
	else
		return true;
}

$(".icon-enlarge").on('click', function() {
		GoInFullscreen($("html").get(0));
});
$(".keluar").on('click', function() {
	if(IsFullScreenCurrently())
		GoOutFullscreen();
});



</script>