var pixel = 5;
var columns = 20;
var rows = 20;

var colorNow = function(){
	document.getElementById('actualcolor').style.background = c;
}

function init(){
	columns = document.getElementById('setcol').value;
	rows = document.getElementById('setrow').value;
	pixel = document.getElementById('setpixel').value;
	createList();
	control();
	createResult();
	createCookie("visitor", "secondtime", 20);
	noIntro();
	return false;
}

function handleChange(input) {
    if (input.value < 0) input.value = 0;
    if (input.value > 20) input.value = 20;
  }

function noIntro(){
	// Stop intro animations
		document.getElementById('stp1').classList.remove('start');
		document.getElementById('stp2').classList.remove('start');
		document.getElementById('stp3').classList.remove('start');
		document.getElementById('stp4').classList.remove('start');
		document.getElementById('stp5').classList.remove('start');
		document.getElementById('header').classList.remove('start');
		document.getElementById('initials').classList.remove('start');
		document.getElementById('ps').classList.remove('start');
		document.getElementById('preview').classList.remove('start');
		document.getElementById('cd').classList.remove('start');
		document.getElementById('openpreview').classList.remove('start');
		document.getElementById('openpresets').classList.remove('start');
		document.getElementById('opencode').classList.remove('start');
}

function selectPreset(e){
	var selected = e.id;
	var theselected = selected.replace("select", "preset");
	c = "#" + document.getElementById(theselected).value;
	colorNow();
}

function addPreset(){
	var presets = document.getElementById('presets');
	var q = presets.getElementsByTagName('input').length;
	q = q+1;
	if(q<=13){
		var newPreset = document.createElement("div");
		newPreset.innerHTML = '<button id="select-'+q+'" onclick="selectPreset(this)">'+q+'</button><input id="preset-'+q+'" class="color" name="preset-'+q+'" value="">';
		presets.appendChild(newPreset);
		// Bind color-picker
		var myPicker = new jscolor.color(document.getElementById('preset-'+q), {})
		myPicker.fromString('ecf0f1')
	}
}


function createList(){
	var li = document.createElement('li');
	var listElement = document.createElement("ul");
	listElement.id = "grid";
	listElement.style.width = columns*22+"px";

	document.getElementsByClassName("main")[0].insertBefore(listElement, document.getElementById("init"));
	var numberOfListItems = rows*columns;

	for( var i =  1 ; i <= numberOfListItems ; ++i){
		var listItem = document.createElement("li");
		listItem.innerHTML = '<input type="checkbox" name="ch'+i+'" id="ch'+i+'"><label for="ch'+i+'" class="ch"></label>'
		listElement.appendChild(listItem);
    }

    // delete the inputs of initial settings -> force to refresh page (todo!)
    var elem = document.getElementById('initials');
    elem.className += " " + "close";
} //createList

//createList();

function createResult(){
	var result = document.getElementById('result');
	result.style.width = pixel + "px";
	result.style.height = pixel + "px";
	var preview = document.getElementById('preview');
	preview.style.width = columns*pixel+(pixel*1+10) + "px";
	var openPreview = document.getElementById('openpreview');
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		var declarations = document.createTextNode('#openpreview:hover, #openpreview:hover + #preview { -webkit-transform:translateX('+ (columns*pixel+(pixel*1)) +'px); -moz-transform:translateX('+ (columns*pixel+(pixel*1)) +'px); transform:translateX('+ (columns*pixel+(pixel*1)) +'px); } #preview, #openpreview { -webkit-transform:translateX('+ preview.style.width +'); -moz-transform:translateX('+ preview.style.width +'); transform:translateX('+ preview.style.width +'); } input[type="checkbox"][name="open-pr"]:checked ~ #preview, input[type="checkbox"][name="open-pr"]:checked + #openpreview { -webkit-transform:translateX(0px)!important; -moz-transform:translateX(0px)!important; transform:translateX(0px)!important; } #openpreview { right:'+ preview.style.width +' }');
		style.type = 'text/css';
		if (style.styleSheet) {
		  style.styleSheet.cssText = declarations.nodeValue;
		} else {
		  style.appendChild(declarations);
		}
		head.appendChild(style);
}


function control(){
	var inputsContainer = document.getElementsByClassName('main')[0];
	var inputs = inputsContainer.getElementsByTagName('input');
	var nodeArray = [];
	var px, py;
	var pairsArray = [];
	for (var i = 0; i < inputs.length; ++i) {
		if(inputs[i].getAttribute("type") == "checkbox"){
			inputs[i].onclick = function(){
				this.value = c;
				control();
				if (this.checked){
					this.nextSibling.style.background = this.value;
					this.nextSibling.title = c;
				} else {
					this.nextSibling.style.background = "rgba(0,0,0,0.1)";
					this.nextSibling.title = c;
				}
			}
			theid = inputs[i].id;
			thenumber = parseFloat(theid.replace("ch", ""));
			var tempY = thenumber/columns;
			if (inputs[i].checked){
				thecolor = inputs[i].value;
		    	nodeArray.push(thenumber);
		    	var px = thenumber%columns == 0 ? columns : thenumber%columns;
		    	var py = px == columns ? Math.floor(tempY) : Math.floor(tempY)+1;
		    	pairsArray.push(px*pixel + 'px ' + py*pixel + 'px 0 ' + thecolor)
		    } //if:checked
		}
	} //for

	var theboxshadow = pairsArray.toString();
	// console.log(theboxshadow);

	var codepen = new Object();
	codepen.html = '<div class="result"></div>';
	codepen.css = '.result { width:'+pixel+'px; height:'+pixel+'px; box-shadow:'+theboxshadow+'; }';
	codepen.js = '// generated with Pixelator http://lab.elrumordelaluz.com/pixelator';
	codepen.css_prefix_free = "true";
	codepen.title = "One-element Pixelator";
	codepen.description = "Pen generated from Pixelator: http://lab.elrumordelaluz.com/pixelator/"

	var codepenArr = new Array();
	codepenArr[0] = "html";
	codepenArr[1] = "css";
	codepenArr[3] = "js";
	codepenArr[4] = "css_prefix_free";
	codepenArr[5] = "title";
	codepenArr[6] = "description";
	var jsonText = JSON.stringify(codepen, codepenArr, "\t");
	document.getElementById('cdpn-data').value = jsonText;

	result.style.boxShadow = theboxshadow;
	if(theboxshadow != ""){
		document.getElementById('code').value = 'box-shadow: ' + theboxshadow + ';';
		document.getElementById('codepen').style.display = "block";
		window.onbeforeunload = function() {
		    return 'Are you sure you want to leave this page?';
		};
	} else {
		document.getElementById('code').value = '';
		document.getElementById('codepen').style.display = "none";
	}
		
}

var c = "#f00";

function pick(e){
	//e.value = '#'+e.color;
	return "#"+document.getElementById(e).value;
}
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charTyped = String.fromCharCode(charCode);
    var presets = document.getElementById('presets');
	var q = presets.getElementsByTagName('input').length;
	for (var i = 1; i <= q; ++i) {
		if(charTyped == i)
			c = pick('preset-'+i);
	}
	colorNow();
	if(charTyped == "r"){
		if(document.getElementById('open-ps').checked == true)
			document.getElementById('open-ps').checked = false;
		else
			document.getElementById('open-ps').checked = true;
	}
	if(charTyped == "p"){
		if(document.getElementById('open-pr').checked == true)
			document.getElementById('open-pr').checked = false;
		else
			document.getElementById('open-pr').checked = true;
	}
	if(charTyped == "c"){
		if(document.getElementById('open-code').checked == true)
			document.getElementById('open-code').checked = false;
		else
			document.getElementById('open-code').checked = true;
	}
}; //keypress
control();


var visited = getCookie("visitor");
if(visited == "secondtime")
	noIntro();

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}



// functions by @toddmotto 
// http://toddmotto.com/creating-jquery-style-functions-in-javascript-hasclass-addclass-removeclass-toggleclass/

// hasClass
function hasClass(elem, className) {
	return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// toggleClass
function toggleClass(elem, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0 ) {
            newClass = newClass.replace( " " + className + " " , " " );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}
document.getElementById('help-opener').onclick = function() {
    toggleClass(document.getElementById('help'), 'open');
}
