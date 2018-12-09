  function legendDemo(r,aa,sampleThreshold) {
	 //d3.selectAll(".legend").remove();
	var	bb = aa*2/6;
  //sampleNumerical = [1,2.5,5,10,20,25,30,35,40,45,50];
  //sampleThreshold=d3.scale.threshold().domain(sampleNumerical).range(["#33cccc","#2eb8b8","#29a3a3","#248f8f","#1f7a7a","#196666","#145252","#0f3d3d","#0a2929","#051414","#000000"]);
  //sampleThreshold=d3.scale.threshold().domain(sampleNumerical).range(colorbrewer.Reds[9]);
  horizontalLegend = d3.svg.legend().units("0").cellWidth(aa*1/23).cellHeight(aa*1/130).inputScale(sampleThreshold).cellStepping(100);

  d3.select("#svg"+r).append("g").attr("transform", "translate("+(aa/120)+","+(bb/1.03)+")").attr("class", "legend"+r).call(horizontalLegend);

  }

d3.svg.legend = function() {
    
    var legendValues=[{color: "red", stop: [0,1]},{color: "blue", stop: [1,2]},{color: "purple", stop: [2,3]},{color: "yellow", stop: [3,4]},{color: "Aquamarine", stop: [4,5]}];
    var legendScale;
    var cellWidth = 30;
    var cellHeight = 20;
    var adjustable = false;
    var labelFormat = d3.format(".01f");
    var labelUnits = "units";
    var lastValue = 6;
    var changeValue = 1;
    var orientation = "horizontal";
    var cellPadding = 0;
   
    function legend(g) {
    
    function cellRange(valuePosition, changeVal) {
    legendValues[valuePosition].stop[0] += changeVal;
    legendValues[valuePosition - 1].stop[1] += changeVal;
    redraw();
    }

    function redraw() {
        
        g.selectAll("g.legendCells").data(legendValues).exit().remove();
        g.selectAll("g.legendCells").select("rect").style("fill", function(d) {return d.color});
        if (orientation == "vertical") {
            g.selectAll("g.legendCells").select("text.breakLabels").style("display", "block").style("text-anchor", "start").attr("x", cellWidth + cellPadding).attr("y", 5 + (cellHeight / 2)).text(function(d) {return labelFormat(d.stop[0]) + (d.stop[1].length > 0 ? " - " + labelFormat(d.stop[1]) : "")})
            g.selectAll("g.legendCells").attr("transform", function(d,i) {return "translate(0," + (i * (cellHeight + cellPadding)) + ")" });
        }
        else {
            g.selectAll("g.legendCells").attr("transform", function(d,i) {return "translate(" + (i * cellWidth) + ",0)" });
            g.selectAll("text.breakLabels").style("text-anchor", "middle").style("font-size","8px").attr("x", 0).attr("y", -4).style("display", function(d,i) {return (i == 0)||(i%3==2)||(i%3==0) ? "none" : "block"}).text(function(d) {return labelFormat(d.stop[0])});
        }
    }
    g.selectAll("g.legendCells")
    .data(legendValues)
    .enter()
    .append("g")
    .attr("class", "legendCells")
    .attr("transform", function(d,i) {return "translate(" + (i * (cellWidth + cellPadding)) + ",0)" })
    
    g.selectAll("g.legendCells")
    .append("rect")
    .attr("height", cellHeight)
    .attr("width", cellWidth)
    .style("fill", function(d) {return d.color})
    .style("stroke", "black")
    .style("stroke-width", "0.5px");

    g.selectAll("g.legendCells")
    .append("text")
    .attr("class", "breakLabels")
    .style("pointer-events", "none");
    
/*     g.append("text")
    .text(labelUnits)
    .attr("y", -4)
	.style("font-size","8px"); */
    
    redraw();
    }
    
    legend.inputScale = function(newScale) {
        if (!arguments.length) return scale;
            scale = newScale;
            legendValues = [];
            if (scale.invertExtent) {
                //Is a quantile scale
                scale.range().forEach(function(el) {
                    var cellObject = {color: el, stop: scale.invertExtent(el)}
                    legendValues.push(cellObject)
					
                })
            }
            else {
                scale.domain().forEach(function (el) {
                    var cellObject = {color: scale(el), stop: [el,""]}
                    legendValues.push(cellObject)
                })
            }
            return this;
    }
    
    legend.scale = function(testValue) {
        var foundColor = legendValues[legendValues.length - 1].color;
        for (el in legendValues) {
            if(testValue < legendValues[el].stop[1]) {
                foundColor = legendValues[el].color;
                break;
            }
        }
        return foundColor;
    }

    legend.cellWidth = function(newCellSize) {
        if (!arguments.length) return cellWidth;
            cellWidth = newCellSize;
            return this;
    }

    legend.cellHeight = function(newCellSize) {
        if (!arguments.length) return cellHeight;
            cellHeight = newCellSize;
            return this;
    }

    legend.cellPadding = function(newCellPadding) {
        if (!arguments.length) return cellPadding;
            cellPadding = newCellPadding;
            return this;
    }
    
    legend.cellExtent = function(incColor,newExtent) {
        var selectedStop = legendValues.filter(function(el) {return el.color == incColor})[0].stop;
        if (arguments.length == 1) return selectedStop;
            legendValues.filter(function(el) {return el.color == incColor})[0].stop = newExtent;
            return this;
    }
    
    legend.cellStepping = function(incStep) {
        if (!arguments.length) return changeValue;
            changeValue = incStep;
            return this;
    }
    
    legend.units = function(incUnits) {
        if (!arguments.length) return labelUnits;
            labelUnits = incUnits;
            return this;
    }
    
    legend.orientation = function(incOrient) {
        if (!arguments.length) return orientation;
            orientation = incOrient;
            return this;
    }

    legend.labelFormat = function(incFormat) {
        if (!arguments.length) return labelFormat;
            labelFormat = incFormat;
            if (incFormat == "none") {
                labelFormat = function(inc) {return inc};
            }
            return this;
    }

return legend;    
    
}