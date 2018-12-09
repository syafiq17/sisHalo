var pilihank = [
["Bengsel",103.0331,-4.3415,50782.32946559653],
["Benteng",102.4171,-3.6883,50782.32946559653],
["Bengut",101.9805,-3.2663,25782.32946559653],
["Kaur",103.435,-4.599,32782.32946559653],
["Kepahiang",102.6381,-3.6138,60782.32946559653],
["Kotabeng",102.3101,-3.8199,140782.32946559653],
["Lebong",102.2090,-3.1455,40782.32946559653],
["Mukomuko",101.473,-2.681,20782.32946559653],
["Rejanglebong",102.6676,-3.4548,35782.32946559653],
["Seluma",102.7135,-4.0499,27782.32946559653]];

var sele = 5    ;
// console.log(sele);
if(document.querySelector("#kuy") != null){
    sele = document.querySelector("#kuy").selectedIndex;
    //console.log(sele);
}
function load(a){
if (document.querySelector(".sample"+a)) {
    var table = document.querySelector(".sample"+a);
    var data = parseTable(table);
	//var purban = 4;
	//var prural =5;
	//var purban = document.getElementById("surban").innerHTML;
	//var prural = document.getElementById("srural").innerHTML;
	var purban =Number(document.getElementById("surban").getAttribute("value"));
	var prural =Number(document.getElementById("srural").getAttribute("value"));

	//document.getElementById("demo23").innerHTML ="urban : "+ purban;
	//document.getElementById("demo24").innerHTML ="rural : "+ prural;

//console.log(data);
    str = JSON.stringify(data[0]);
	
    var bs = [];

    /*for (i = 0; i < data.length; i++) {
        ndeso[i] = data[i].Desa;
    }*/    
	for (i = 0; i < purban; i++) {
        bs[i] = data[i].ID;
    }
	//var sm = [];

    for (i = purban; i<purban+prural; i++) {
        bs[i] = data[i].ID;
    }
    var kecamatan = [];

    for (i = 0; i < data.length; i++) {
        kecamatan[i] = data[i].Kecamatan;
    } 
}

var desa=["SURABAYA","SUMUR DEWA","PASAR BERKAS","KOTA PADANG"];

var width = 380,
    height = 600;
//var width = window.innerWidth, height = window.innerHeight;
//Ma0p_ projection
/* var projection = d3.geo.mercator()
    .scale(60782.32946559653)
    .center([102.6381,-3.6138]) //projection center
    .translate([width/2,height/2]) //translate to center the ma0p in view
 */
var projection = d3.geo.mercator()
    .scale(pilihank[sele][3])
    .center([pilihank[sele][1],pilihank[sele][2]])
    .translate([width/2,height/2])

//Generate paths based on projection
var path = d3.geo.path()
    .projection(projection);

//Create an SVG

	var svg = d3.selectAll(".map"+a).append("svg")
		.attr("width", width)
		.attr("height", height);
	



//Group for the  features
var features = svg.append("g")
    .attr("class","features");

//Create zoom/pan listener
//Change [1,Infinity] to adjust the min/max zoom scale
var zoom = d3.behavior.zoom()
    .scaleExtent([1, Infinity])
    .on("zoom",zoomed);


svg.call(zoom);

function zoomed() {
    features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
        .selectAll("path").style("stroke-width", 1.25 / zoom.scale() + "px" );
}


//Create a tooltip, hidden at the start
var tooltip = d3.selectAll(".map"+a).append("div").attr("class","tooltip");

d3.json("data/topojson/"+pilihank[sele][0]+".json",function(error,geodata) {
    if (error) return console.log(error); //unknown error, check the console

    //Create a path for each ma0p feature in the data
    features.selectAll("path")
        .data(topojson.feature(geodata,geodata.objects.bengkulu).features) //generate features from TopoJSON
        .enter()
        .append("path")
        .attr("d",path)
        .style("fill", function(d){
            /*for( i=0;i<ndeso.length;i++){
                if(d.properties.DESA === ndeso[i]){
                    return "blue";}
            }*/

			for( i=0;i<purban;i++){
                if(d.properties.IDBS === bs[i]){
                    return "blue";}
            }
			for( i=purban;i<purban+prural;i++){
                if(d.properties.IDBS === bs[i]){
                    return "red";}
            }
		/*	for( i=0;i<kecamatan.length;i++){
                if(d.properties.KECAMATAN === kecamatan[i]){
                    return "black";}
            }*/
        })
       /* .style("stroke", function(d){
          for( i=0;i<kecamatan.length;i++){
                if(d.properties.KECAMATAN === kecamatan[i]){
                    return "black";}
            }
        })*/
		/* .style("opacity", function(d){
            for( i=0;i<kecamatan.length;i++){
                if(d.properties.KECAMATAN === kecamatan[i]){
                    return 0.5;}
            }
			})*/
        .on("mouseover",showTooltip)
        .on("mousemove",moveTooltip)
        .on("mouseout",hideTooltip)
        .on("click",clicked);
	
	
	
});


// Add optional onClick events for features here
// d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
function clicked(d,i) {

}





//Position of the tooltip relative to the cursor
var tooltipOffset = {x: 5, y: -25};

//Create a tooltip, hidden at the start
function showTooltip(d) {
    moveTooltip();

    tooltip.style("display","block")
        .text(d.properties.DESA);
}

//Move the tooltip to track the mouse
function moveTooltip() {
    tooltip.style("top",(d3.event.pageY+tooltipOffset.y)+"px")
        .style("left",(d3.event.pageX+tooltipOffset.x)+"px");
}

//Create a tooltip, hidden at the start
function hideTooltip() {
    tooltip.style("display","none");
}
}