var pp;
var pro;
var Dataprov;
var Datakab;
var fieldname;
var dataById = [{},{},{},{},{},{},{}];
var dataById2 = [{},{},{},{},{},{},{}];
var color,color2, range, maxValue, minValue;
var tooltip = d3.select('body').append('div')
	.attr('class', 'hidden tooltip'); 
var tooltipOffset = {x: 10, y: -40};
var  active = d3.select(null);
var width1;
var width2;
function bs(a){
init();
if(window.innerWidth>451&&a!=1){
	var width = window.innerWidth*1/2;
	width2=width;
}else{
	var width = window.innerWidth;
	width1=width;
}
	var height = width*1/3;

var projection = d3.geo.mercator()
		.center([121.10, -0.81])
		.scale(width*7.5/8)
		.translate([width -width/2.2, height*3.3/9]);

//Generate paths based on projection
var path = d3.geo.path()
    .projection(projection);

//Create an SVG

	var svg = d3.selectAll(".map"+a).append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("id","svg"+a);
	
		svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height)
		.attr("id","rect"+a)
		.attr("transform", "translate(0,0)")
		.on("click",reset);


//Group for the  features
var features = svg.append("g").attr("class", "features").attr("id","g"+a);


/* var zoom = d3.behavior.zoom()
    .scaleExtent([1, Infinity])
    .on("zoom",zoomed);


svg.call(zoom);

function zoomed() {
    features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
        .selectAll("path").style("stroke-width", 1.25 / zoom.scale() + "px" );
} */


//Create a tooltip, hidden at the start
//var tooltip = d3.selectAll(".map"+a).append("div").attr("class","tooltip");

d3.json("data/subunits.json",function(error,geodata) {
	console.log(geodata);
    if (error) return console.log(error); //unknown error, check the console
    //Create a path for each ma0p feature in the data
    features.selectAll("#path"+a)
        .data(topojson.feature(geodata,geodata.objects.subunits).features) //generate features from TopoJSON
        .enter()
        .append("path")
        .attr("d",path)
		.attr("class", 'feature')
		.attr("id", "path"+a)
        .on('mousemove', function(d) {mousemov(d,a)})
		.on("click",aclicked)
		.on('mouseout', function() {
		tooltip.classed('hidden', true);
		});
	
	features.append("path")
		.datum(topojson.mesh(geodata,geodata.objects.subunits, function(a, b) { return a !== b;
		}))
		.attr("class", "boundary")
		.attr("d", path);

	/* if((d.properties.KABKOT=="DANAU")||(d.properties.KABKOT=="DANAU TOBA")||(d.properties.KABKOT=="WADUK")){
		d3.selectAll(".feature")
		.style("fill", function(d) {
			return "white";
		});
	} */
});

function aclicked(d) {
	var dat=document.getElementById("demo3");
	dat.innerHTML=dat+d.properties.name;
	//if (active.node() == this){ 
	if (d3.select(this).classed("active")==true){ 
		
		return reset();
	}else{
	 	d3.selectAll("#path12").remove();
	var z=d3.select(this).attr("id");

	
		var provi=d.properties.name;
	
	d3.json("data/topojson/"+provi+".json",function(error,geodata) {
    if (error) return console.log(error); //unknown error, check the console

    //Create a path for each ma0p feature in the data
    features.selectAll("#path12")
        .data(topojson.feature(geodata,geodata.objects.subunits).features) //generate features from TopoJSON
        .enter()
        .append("path")
        .attr("d",path)
		.attr("class", 'feature2')
		.attr("id", "path12")
         .on('mousemove', function(d) {mousemov2(d,z)})
		.on('mouseout', function() {
		tooltip.classed('hidden', true);
		});
        /* .on("click",clicked); */

	features.append("path")
		.datum(topojson.mesh(geodata,geodata.objects.subunits, function(a, b) { return a !== b;
		}))
		.attr("class", "boundary2")
		.attr("id", "path12")
		.attr("d", path);
	if(z=="path1") ShowMap2(d,1)
	else if(z=="path2") ShowMap2(d,2)
	else if(z=="path3") ShowMap2(d,3)
	else if(z=="path4") ShowMap2(d,4)	
	else if(z=="path5") ShowMap2(d,5);
	});

	d3.selectAll(".feature").classed("active", false);
  active.classed("active", false);
  

  d3.select(this).classed("active", true);
  
   var bounds = path.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = .9 / Math.max(dx / width, dy / height),
      translate = [width / 2 - scale * x, height / 2 - scale * y];
	 
		features.transition()
			.duration(750)
			.style("stroke-width", 1.5 / scale + "px")
			.attr("transform", "translate(" + translate + ")scale(" + scale + ")"); 
		d3.selectAll('.boundary').transition()
		  .duration(750)
		  .style("stroke-width", 2.5 / scale + "px");  

	}

}
function reset() {

  d3.selectAll("#path12").remove();
  d3.selectAll(".feature").classed("active", false);

  features.transition()
      .duration(750)
      .style("stroke-width", "1.5px")
      .attr("transform", "");
	d3.selectAll('.boundary').transition()
      .duration(750)
      .style("stroke-width", "1.5px");
}


}
function mousemov(d,r){

			tooltip.classed('hidden', false) .attr('style', 'left:' + (d3.event.pageX+tooltipOffset.x)+'px; top:' + (d3.event.pageY+tooltipOffset.y)+'px')
			.html( function (){
 				if (dataById[r][d.properties.id] > 0) {
					
					var number= parseFloat(dataById[r][d.properties.id]);
					return d.properties.name + " = " + number.toLocaleString(['ban', 'id']);
				

				}else{
					return (d.properties.id + " " +d.properties.name);
					
				} 
			});

}
function mousemov2(d,z){
	var r;
	if(z=="path1") r=1
	else if(z=="path2") r=2
	else if(z=="path3") r=3
	else if(z=="path4") r=4	
	else if(z=="path5") r=5;
			tooltip.classed('hidden', false) .attr('style', 'left:' + (d3.event.pageX+tooltipOffset.x)+'px; top:' + (d3.event.pageY+tooltipOffset.y)+'px')
			.html( function (){
 				if (dataById2[r-1][d.properties.IDKAB] > 0) {
					
					var number= parseFloat(dataById2[r-1][d.properties.IDKAB]);
					return d.properties.KABKOT + " = " + number.toLocaleString(['ban', 'IDKAB']);

				}else{
					return (d.properties.KABKOT);
				} 
			});

}

function init(){
	doAjax('services/listnmfield.php','q=', 'funcselfield', 'post', '1')
}

var u;
function ShowMap1(s){

	u=s;
		
	queue()
		.defer(d3.csv, "data/SEindo.csv")
		.await(Data_loading2);
		
}


function Data_loading2(error, data1){
	
	if (error) throw error;

	Dataprov = data1;
	var fieldname0="name";
	Dataprov.forEach(function(d) {
			if (d[fieldname0] != null){
				
				dataById[0][d.id] = d[fieldname0];
				
				//console.log(Dataprov)
			}
		});
	for(r=1;r<=u;r++){

	var fieldname3;
		if(r==1){
			fieldname3="IPM";
			fieldname2 = getValue('selfield');
			fieldname = "IPM_"+fieldname2;
	
		}else if(r==2){
			fieldname3="AHH";
			fieldname2 = getValue('selfield');
			fieldname = "AHH_"+fieldname2;
		}else if(r==3){
			fieldname3="EYS";
			fieldname2 = getValue('selfield');
			fieldname = "EYS_"+fieldname2;
		}else if(r==4){
			fieldname3="MYS";
			fieldname2 = getValue('selfield');
			fieldname = "MYS_"+fieldname2;
		}else if(r==5){
			fieldname3="Pengeluaran";
			fieldname2 = getValue('selfield');
			fieldname = "PENG_"+fieldname2;
		}
		var dat=document.getElementById("jud"+r);
			dat.innerHTML=fieldname3;
		
		
//console.log(Dataprov)
		Dataprov.forEach(function(d) {
			if (d[fieldname] > 0){
				
				dataById[r][d.id] = d[fieldname];
				
				//console.log(Dataprov)
			}
		});
		ChoroMap();
		
		function CleanMapChor(feat){
		d3.selectAll(feat)
		.transition()
		.duration(500)
		.style("fill", function(d) {
			return "lightblue";
		});
		}
		
		function ChoroMap(){
		CleanMapChor(".map"+r+" .feature");	
		if(r==1){
			
			color = d3.scale.threshold()
			.domain([54,56,58,60,62,64,66,68,70,72])
			.range(["#33cccc","#2eb8b8","#29a3a3","#248f8f","#1f7a7a","#196666","#145252","#0f3d3d","#0a2929","#051414","#000000"]);
			legendDemo(r,width1,color);
		}else if(r==2){
			color = d3.scale.threshold()
			.domain([54,56,58,60,62,64,66,68,70,72])
			.range(["#ffcccc","#ff9999","#ff6666","#ff4d4d","#ff1a1a","#e60000","#b30000","#800000","#4d0000","#1a0000","#000000"]);
			legendDemo(r,width2,color);
		}else if(r==3){
			color = d3.scale.threshold()
			.domain([8.5,9,9.5,10,10.5,11,11.5,12,12.5,13])
			.range(["#e6ecff","#ccd9ff","#99b3ff","#668cff","#3366ff","#0040ff","#0033cc","#002699","#001a66","#00134d","#000000"]);
			legendDemo(r,width2,color);
		}else if(r==4){
			color = d3.scale.threshold()
			.domain([4,4.5,5,5.5,6,6.5,7,7.5,8,8.5])
			.range(["#ffe6ff","#ffccff","#ff99ff","#ff66ff","#ff33ff","#ff00ff","#cc00cc","#990099","#660066","#330033","#000000"]);
			legendDemo(r,width2,color);
		}else if(r==5){
			color = d3.scale.threshold()
			.domain([4000,5000,6000,7000,8000,9000,10000,11000,12000,13000])
			.range(["#ffeecc","#ffdd99","#ffcc66","#ffbb33","#ffaa00","#cc8800","#996600","#664400","#332200","#1a1100","#000000"]);
			legendDemo(r,width2,color);
		}else{
			color = d3.scale.threshold()
			.domain([54,56,58,60])
			.range(["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);
		}
		
		d3.selectAll(".map"+r+" .feature")
			.transition()
			.delay(function(d,i) {
				return i * 10;
			})
			.duration(250)
			.style("fill", function(d) {
 			if (dataById[r][d.properties.id] > 0){
					
				return color(dataById[r][d.properties.id]);
			}else{
				return "#ccc";
			} 
		});
		}
	}
	var dat=document.getElementById("demo");
	dat.innerHTML="name,IPM,AHH,EYS,MYS,PENG\n";
		Dataprov.forEach(function(d) {
			for(r=0;r<=5;r++){
			if (dataById[r][d.id] > 0){
				if(r==5){
					dat.innerHTML=dat.innerHTML+dataById[r][d.id]+"\n";
				}else{
					dat.innerHTML=dat.innerHTML+dataById[r][d.id]+",";
				}
			}else if ((r==0)&&(dataById[r][d.id] != null)){

					dat.innerHTML=dat.innerHTML+dataById[r][d.id]+",";
				
				
			}else{
				if(r==5){
					dat.innerHTML=dat.innerHTML+"\n";
				}else{
					dat.innerHTML=dat.innerHTML+0+",";
				}
			}
			}
		});
renderChart(1,"IPM");
renderChart(2,"AHH");
renderChart(3,"EYS");
renderChart(4,"MYS");
renderChart(5,"PENG");

}

var t;
function ShowMap2(d,s){
	t=s;	
	   queue()
		.defer(d3.csv, "data/csvprov/"+d.properties.name+".csv")
		.await(Data_loading3);  
}
 function Data_loading3(error, data2){

	if (error) throw error;
	Datakab = data2;
	//console.log(Datakab);
	var r=t;
	console.log(Datakab);
	var fieldname3;

		if(r==1){
			fieldname3="IPM";
			fieldname2 = getValue('selfield');
			fieldname = "IPM_"+fieldname2;
	
		}else if(r==2){
			fieldname3="AHH";
			fieldname2 = getValue('selfield');
			fieldname = "AHH_"+fieldname2;
		}else if(r==3){
			fieldname3="EYS";
			fieldname2 = getValue('selfield');
			fieldname = "EYS_"+fieldname2;
		}else if(r==4){
			fieldname3="MYS";
			fieldname2 = getValue('selfield');
			fieldname = "MYS_"+fieldname2;
		}else if(r==5){
			fieldname3="Pengeluaran";
			fieldname2 = getValue('selfield');
			fieldname = "PENG_"+fieldname2;
		}
		if(r>1){
		var dat=document.getElementById("jud"+r);
			dat.innerHTML=fieldname3;
		}
	

  		Datakab.forEach(function(d) {

			if (d[fieldname] > 0){
		
				dataById2[r-1][d.IDKAB] = d[fieldname];
				//console.log(Datakab);
			}
		});  
	
		ChoroMap2();
		
		function CleanMapChor2(feat){
			
		d3.selectAll(feat)
		.transition()
		.duration(500)
		.style("fill", function(d) {
			return "#ccc";
		});
		}
		
		function ChoroMap2(){

		
		CleanMapChor2(".map"+t+" .feature2");	

		if(r==1){
			
			color2 = d3.scale.threshold()
			.domain([54,56,58,60,62,64,66,68,70,72])
			.range(["#33cccc","#2eb8b8","#29a3a3","#248f8f","#1f7a7a","#196666","#145252","#0f3d3d","#0a2929","#051414","#000000"]);
		}else if(r==2){
			color2 = d3.scale.threshold()
			.domain([54,56,58,60,62,64,66,68,70,72])
			.range(["#ffcccc","#ff9999","#ff6666","#ff4d4d","#ff1a1a","#e60000","#b30000","#800000","#4d0000","#1a0000","#000000"]);
		}else if(r==3){
			color2 = d3.scale.threshold()
			.domain([8.5,9,9.5,10,10.5,11,11.5,12,13])
			.range(["#ccd9ff","#99b3ff","#668cff","#3366ff","#0040ff","#0033cc","#002699","#001a66","#00134d","#000000"]);
		}else if(r==4){
			color2 = d3.scale.threshold()
			.domain([4.5,5,5.5,6,6.5,7,7.5,8,8.5])
			.range(["#ffccff","#ff99ff","#ff66ff","#ff33ff","#ff00ff","#cc00cc","#990099","#660066","#330033","#000000"]);
		}else if(r==5){
			color2 = d3.scale.threshold()
			.domain([4000,5000,6000,7000,8000,9000,10000,11000,12000,13000])
			.range(["#ffeecc","#ffdd99","#ffcc66","#ffbb33","#ffaa00","#cc8800","#996600","#664400","#332200","#1a1100","#000000"]);
		}else{
			color2 = d3.scale.threshold()
			.domain([54,56,58,60])
			.range(["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]);
		}
		
		d3.selectAll(".map"+t+" .feature2")
			.transition()
			.delay(function(d,i) {
				return i * 10;
			})
			.duration(250)
			.style("fill", function(d) {//console.log(d.properties);
 			if (dataById2[r-1][d.properties.IDKAB] > 0){
				return color2(dataById2[r-1][d.properties.IDKAB]);
				
			}else{
				
				return "#ccc";
			} 
			});
			 

	
		}
}
 
/*  	if (dataById2[d.id] > 0){
	var dat=document.getElementById("demo");
	dat.innerHTML=dat.innerHTML+" "+dataById2[d.id];
	} */
