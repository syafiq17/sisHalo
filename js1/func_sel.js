function getValue(elementname) {
	returnvalue = window.document.getElementById(elementname).value;
	return returnvalue;
}
function resetValues() {
	var typeOption = new Option('-Tahun-', '', false, false);
	var modelOption = new Option('-Tema-', '', false, false);
        var tahunOption = new Option('-Tahun-', '', false, false);
        var provOption = new Option('-Provinsi-', '', false, false);
	window.document.getElementById('seltable').options.length = 0;
	window.document.getElementById('seltable').options.add(typeOption);
	window.document.getElementById('seltable').disabled = true;		
	window.document.getElementById('selfield').options.length = 0;
	window.document.getElementById('selfield').options.add(modelOption);
	window.document.getElementById('selfield').disabled = true;
	window.document.getElementById('selyear').options.length = 0;
	window.document.getElementById('selyear').options.add(tahunOption);
	window.document.getElementById('selyear').disabled = true;
        //window.document.getElementById('selprov').options.length = 0;
	//window.document.getElementById('selprov').options.add(provOption);
	//window.document.getElementById('selprov').disabled = true;
}
function funcselgroup(xmlindata) {
    var typeOption = new Option('-Tahun-', '', false, false);
    window.document.getElementById('selgroup').options.length = 0;
    window.document.getElementById('selgroup').options.add(typeOption);

    var xmldata = xmlindata.getElementsByTagName('group');
    for(var i = 0; i < xmldata.length; i++) {
            var manid = '';
            var manname = '';
            var x, y;
            x = xmlindata.getElementsByTagName('id')[i]; // get manufacturer id
            y = x.childNodes[0];
            manid = y.nodeValue;
            x = xmlindata.getElementsByTagName('name')[i]; // get manufacturer name
            y = x.childNodes[0];
            manname = y.nodeValue;
            var newOption = new Option(manname, manid, false, false);
            window.document.getElementById('selgroup').options.add(newOption);
    }
}

function funcseltable(xmlindata) {
	var xmldata = xmlindata.getElementsByTagName('table');
	window.document.getElementById('seltable').options.length = 0;
	var firstOption = new Option('-Sub Tahun-', '', false, false);
	window.document.getElementById('seltable').options.add(firstOption);
	for(var i = 0; i < xmldata.length; i++) {
		var typeid = '';
		var typename = '';
		var x, y;
		x = xmlindata.getElementsByTagName('id')[i];
		y = x.childNodes[0];
		typeid = y.nodeValue;
		x = xmlindata.getElementsByTagName('name')[i];
		y = x.childNodes[0];
		typename = y.nodeValue;
		var newOption = new Option(typename, typeid, false, false);
		window.document.getElementById('seltable').options.add(newOption);
	}
	window.document.getElementById('seltable').disabled = false;
}

function funcselfield(xmlindata) {
        
    var typeOption = new Option('-Tahun-', '', false, false);
    window.document.getElementById('selfield').options.length = 0;
    window.document.getElementById('selfield').options.add(typeOption);

    var xmldata = xmlindata.getElementsByTagName('field');
    for(var i = 0; i < xmldata.length; i++) {
            var manid = '';
            var manname = '';
            var x, y;
            x = xmlindata.getElementsByTagName('id')[i]; // get manufacturer id
            y = x.childNodes[0];
            manid = y.nodeValue;
            x = xmlindata.getElementsByTagName('name')[i]; // get manufacturer name
            y = x.childNodes[0];
            manname = y.nodeValue;
            var newOption = new Option(manname, manid, false, false);
            window.document.getElementById('selfield').options.add(newOption);
    }}

function funcselyear(xmlindata) {
	var xmldata = xmlindata.getElementsByTagName('year');

	window.document.getElementById('selyear').options.length = 0;
	var firstOption = new Option('-Tahun-', '', false, false);
	window.document.getElementById('selyear').options.add(firstOption);
	for(var i = 0; i < xmldata.length; i++) {
		var typeid = '';
		var typename = '';
		var x, y;
		x = xmlindata.getElementsByTagName('id')[i]; // get type id
		y = x.childNodes[0];
		typeid = y.nodeValue;
		x = xmlindata.getElementsByTagName('name')[i];
		y = x.childNodes[0];
		typename = y.nodeValue;
		var newOption = new Option(typename, typeid, false, false);
		window.document.getElementById('selyear').options.add(newOption);
	}
	window.document.getElementById('selyear').disabled = false;
}

function funcselprov(xmlindata) {
	var xmldata = xmlindata.getElementsByTagName('prov');

	window.document.getElementById('selprov').options.length = 0;
	var firstOption = new Option('-Provinsi-', '', false, false);
	window.document.getElementById('selprov').options.add(firstOption);

	for(var i = 0; i < xmldata.length; i++) {
		var typeid = '';
		var typename = '';
		var x, y;
		x = xmlindata.getElementsByTagName('id')[i]; // get type id
		y = x.childNodes[0];
		typeid = y.nodeValue;
		x = xmlindata.getElementsByTagName('name')[i];
		y = x.childNodes[0];
		typename = y.nodeValue;
		var newOption = new Option(typename, typeid, false, false);
                
		window.document.getElementById('selprov').options.add(newOption);
	}
	window.document.getElementById('selprov').disabled = false;
}