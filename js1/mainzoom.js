var bantu=0;
var dataByIdz = {};
var dataByIdz2 = {};
function full(zoom,f){
var Dataprov;
var fieldnamez;
var fieldnamez2;
var colorz,colorz2, range;
if(bantu==0){
	bsz(zoom,f);
}else{
	ShowMapz(zoom);
}
bantu=1;
}
function bsz(a,f){
//init();

	var width = window.innerWidth;
	var	height = window.innerHeight;

var projection = d3.geo.mercator()
		.center([121.10, -0.81])
		.scale(width*13/11)
		.translate([width -width/2.23, height*3.5/8]);

//Generate paths based on projection
var path = d3.geo.path()
    .projection(projection);

//Create an SVG

	var svg = d3.selectAll(".mapzoom").append("svg")
		.attr("width", width)
		.attr("height", height);
	
		svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height)
		.attr("transform", "translate(0,0)")
		.on("click",reset);



var featuresz = svg.append("g").attr("class", "featuresz");


d3.json("data/subunits.json",function(error,geodata) {
	console.log(geodata);
    if (error) return console.log(error); //unknown error, check the console
    
    featuresz.selectAll("#path")
        .data(topojson.feature(geodata,geodata.objects.subunits).features) //generate features from TopoJSON
        .enter()
        .append("path")
        .attr("d",path)
		.attr("class", 'featurez')
        .on('mousemove', function(d) {mousemovz(d)})
		.on("click",aclicked)
		.on('mouseout', function() {
		tooltip.classed('hidden', true);
		});
	
	featuresz.append("path")
		.datum(topojson.mesh(geodata,geodata.objects.subunits, function(a, b) { return a !== b;
		}))
		.attr("class", "boundaryz")
		.attr("d", path);
	ShowMapz(a);

});

function aclicked(d) {
	
	//if (active.node() == this){ 
	if (d3.select(this).classed("active")==true){ 
		
		return reset();
	}else{
	 	d3.selectAll("#pathz").remove();
		var provi=d.properties.name;
	
	d3.json("data/topojson/"+provi+".json",function(error,geodata) {
		console.log(geodata);
    if (error) return console.log(error); //unknown error, check the console


    featuresz.selectAll("#pathz")
        .data(topojson.feature(geodata,geodata.objects.subunits).features) //generate features from TopoJSON
        .enter()
        .append("path")
        .attr("d",path)
		.attr("class", 'featurez2')
		.attr("id", "pathz")
        .on('mousemove', function(d) {mousemovz2(d)})
		.on('mouseout', function() {
		tooltip.classed('hidden', true);
		});
        /* .on("click",clicked); */

	featuresz.append("path")
		.datum(topojson.mesh(geodata,geodata.objects.subunits, function(a, b) { return a !== b;
		}))
		.attr("class", "boundaryz2")
		.attr("id", "pathz")
		.attr("d", path);
	ShowMapz2(d);
	});

	d3.selectAll(".featurez").classed("active", false);
  active.classed("active", false);
  

  d3.select(this).classed("active", true);
  
 
   
   var bounds = path.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = .9 / Math.max(dx / width, dy / height),
      translate = [width / 2 - scale * x, height / 2 - scale * y];
	 
  featuresz.transition()
      .duration(750)
      .style("stroke-width", 1.5 / scale + "px")
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")"); 
	}
	
}
function reset() {

  d3.selectAll("#pathz").remove();
  d3.selectAll(".featurez").classed("active", false);

  featuresz.transition()
      .duration(750)
      .style("stroke-width", "1.5px")
      .attr("transform", "");
}
}
function initz(){
	doAjax('services/listnmfield.php','q=', 'funcselfield', 'post', '1')
}	
function mousemovz(d){

			tooltip.classed('hidden', false) .attr('style', 'left:' + (d3.event.pageX+tooltipOffset.x)+'px; top:' + (d3.event.pageY+tooltipOffset.y)+'px')
			.html( function (){
 				if (dataByIdz[d.properties.id] > 0) {
					
					var number= parseFloat(dataByIdz[d.properties.id]);
					return d.properties.name + " = " + number.toLocaleString(['ban', 'id']);
				

				}else{
					return (d.properties.name);
					
				} 
			});

}
function mousemovz2(d){

			tooltip.classed('hidden', false) .attr('style', 'left:' + (d3.event.pageX+tooltipOffset.x)+'px; top:' + (d3.event.pageY+tooltipOffset.y)+'px')
			.html( function (){
 				if (dataByIdz2[d.properties.IDKAB] > 0) {
					
					var number= parseFloat(dataByIdz2[d.properties.IDKAB]);
					return d.properties.KABKOT + " = " + number.toLocaleString(['ban', 'IDKAB']);
				

				}else{
					return (d.properties.KABKOT);
					
				} 
			});

}


function opsz(x){
	ShowMapz(x);
}
var z;
function ShowMapz(t){
	
	z=t;
	for(a=1;a<=5;a++){
		if(a==z){
			$("#angka"+z).css('background','lightblue');
			$("#angka"+z).css('color','#2c3e50');
		}else{
			$("#angka"+a).css('background','#2c3e50');
			$("#angka"+a).css('color','lightblue');
		}
	}
	queue()
		.defer(d3.csv, "data/SEindo.csv")
		.await(Data_loadingz);
		
}

function Data_loadingz(error, data1){
	if (error) throw error;
	Dataprov = data1;

	
	var fieldnamez3;
	var fieldnamez2;
		if(z==1){
			fieldnamez3="IPM";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "IPM_"+fieldname2;
	
		}else if(z==2){
			fieldnamez3 ="AHH";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "AHH_"+fieldname2;
		}else if(z==3){
			fieldnamez3="EYS";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "EYS_"+fieldname2;
		}else if(z==4){
			fieldnamez3="MYS";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "MYS_"+fieldname2;
		}else if(z==5){
			fieldnamez3="Pengeluaran";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "PENG_"+fieldname2;
		}

	
	//dataByIdz = {};

	Dataprov.forEach(function(d) {
		if (d[fieldnamez] > 0){
			dataByIdz[d.id] = d[fieldnamez];
			//console.log(Dataprov);
		}
	});

	ChoroMapz();
}

function CleanMapChorz(feat){
	d3.selectAll(feat)
	.transition()
	.duration(500)
	.style("fill", function(d) {
		return "grey";
	});
}

function ChoroMapz(){
//SetData(Dataprov);
//var domain1[],range1[];

CleanMapChorz(".featurez")
color = d3.scale.threshold()
		if(z==1){
			
			colorz = d3.scale.threshold()
			.domain([54,56,58,60,62,64,66,68,70,72])
			.range(["#33cccc","#2eb8b8","#29a3a3","#248f8f","#1f7a7a","#196666","#145252","#0f3d3d","#0a2929","#051414","#000000"]);
		}else if(z==2){
			colorz = d3.scale.threshold()
			.domain([54,56,58,60,62,64,66,68,70,72])
			.range(["#ffcccc","#ff9999","#ff6666","#ff4d4d","#ff1a1a","#e60000","#b30000","#800000","#4d0000","#1a0000","#000000"]);
		}else if(z==3){
			colorz = d3.scale.threshold()
			.domain([8.5,9,9.5,10,10.5,11,11.5,12,12.5,13])
			.range(["#e6ecff","#ccd9ff","#99b3ff","#668cff","#3366ff","#0040ff","#0033cc","#002699","#001a66","#00134d","#000000"]);
		}else if(z==4){
			colorz = d3.scale.threshold()
			.domain([4,4.5,5,5.5,6,6.5,7,7.5,8,8.5])
			.range(["#ffe6ff","#ffccff","#ff99ff","#ff66ff","#ff33ff","#ff00ff","#cc00cc","#990099","#660066","#330033","#000000"]);
		}else if(z==5){
			colorz = d3.scale.threshold()
			.domain([4000,5000,6000,7000,8000,9000,10000,11000,12000,13000])
			.range(["#ffeecc","#ffdd99","#ffcc66","#ffbb33","#ffaa00","#cc8800","#996600","#664400","#332200","#1a1100","#000000"]);
		}else{
			colorz = d3.scale.threshold()
			.domain([54,56,58,60])
			.range(["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);
		}
d3.selectAll(".featurez")
	.transition()
	.delay(function(d,i) {
		return i * 10;
	})
	.duration(250)
	.style("fill", function(d) {
	if (dataByIdz[d.properties.id] > 0){
		return colorz(dataByIdz[d.properties.id]);
	}else{
		return "grey";
	}
});
}
var zz;
function ShowMapz2(d){

	zz=z;	
	   queue()
		.defer(d3.csv, "data/csvprov/"+d.properties.name+".csv")
		.await(Data_loadingz3);  

}
 function Data_loadingz3(error, data2){
	
	if (error) throw error;
	Datakab = data2;
	console.log(Datakab);
	var fieldnamez3;
	var fieldnamez2;

		if(zz==1){
			fieldnamez3="IPM";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "IPM_"+fieldname2;
	
		}else if(zz==2){
			fieldnamez3="AHH";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "AHH_"+fieldname2;
		}else if(zz==3){
			fieldnamez3="EYS";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "EYS_"+fieldname2;
		}else if(zz==4){
			fieldnamez3="MYS";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "MYS_"+fieldname2;
		}else if(zz==5){
			fieldnamez3="Pengeluaran";
			fieldnamez2 = getValue('selfield');
			fieldnamez = "PENG_"+fieldname2;
		}
		//dataByIdz2={};
		
  		Datakab.forEach(function(d) {

			if (d[fieldnamez] > 0){
		
				dataByIdz2[d.IDKAB] = d[fieldnamez];
				
				//console.log(Datakab);
			}
		});  
	
		ChoroMapz2();
 }
function CleanMapChorz2(feat){
			
		d3.selectAll(feat)
		.transition()
		.duration(500)
		.style("fill", function(d) {
			return "grey";
		});
}
		
function ChoroMapz2(){

		
		CleanMapChorz2(".featurez2");	

		if(zz==1){
			
			colorz2 = d3.scale.threshold()
			.domain([54,56,58,60,62,64,66,68,70,72])
			.range(["#33cccc","#2eb8b8","#29a3a3","#248f8f","#1f7a7a","#196666","#145252","#0f3d3d","#0a2929","#051414","#000000"]);
		}else if(zz==2){
			colorz2 = d3.scale.threshold()
			.domain([54,56,58,60,62,64,66,68,70,72])
			.range(["#ffcccc","#ff9999","#ff6666","#ff4d4d","#ff1a1a","#e60000","#b30000","#800000","#4d0000","#1a0000","#000000"]);
		}else if(zz==3){
			colorz2 = d3.scale.threshold()
			.domain([8.5,9,9.5,10,10.5,11,11.5,12,12.5,13])
			.range(["#e6ecff","#ccd9ff","#99b3ff","#668cff","#3366ff","#0040ff","#0033cc","#002699","#001a66","#00134d","#000000"]);
		}else if(zz==4){
			colorz2 = d3.scale.threshold()
			.domain([4,4.5,5,5.5,6,6.5,7,7.5,8,8.5])
			.range(["#ffe6ff","#ffccff","#ff99ff","#ff66ff","#ff33ff","#ff00ff","#cc00cc","#990099","#660066","#330033","#000000"]);
		}else if(zz==5){
			colorz2 = d3.scale.threshold()
			.domain([4000,5000,6000,7000,8000,9000,10000,11000,12000,13000])
			.range(["#ffeecc","#ffdd99","#ffcc66","#ffbb33","#ffaa00","#cc8800","#996600","#664400","#332200","#1a1100","#000000"]);
		}else{
			colorz2 = d3.scale.threshold()
			.domain([54,56,58,60])
			.range(["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);
		}
		
		d3.selectAll(".featurez2")
			.transition()
			.delay(function(d,i) {
				return i * 10;
			})
			.duration(250)
			.style("fill", function(d) {
 			if (dataByIdz2[d.properties.IDKAB] > 0){
				return colorz2(dataByIdz2[d.properties.IDKAB]);
				
			}else{
				
				return "grey";
			} 
			});
			 

	
}

