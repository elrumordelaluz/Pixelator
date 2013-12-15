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
		// Stop intro animations
		document.getElementById('stp1').classList.remove('start');
		document.getElementById('stp2').classList.remove('start');
		document.getElementById('stp3').classList.remove('start');
		document.getElementById('stp4').classList.remove('start');
		document.getElementById('stp5').classList.remove('start');
		document.getElementById('header').classList.remove('start');
		document.getElementById('ps').classList.remove('start');
		document.getElementById('preview').classList.remove('start');
		document.getElementById('cd').classList.remove('start');
		document.getElementById('openpreview').classList.remove('start');
		document.getElementById('openpresets').classList.remove('start');
		document.getElementById('opencode').classList.remove('start');
	return false;
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
	
	result.style.boxShadow = theboxshadow;
	if(theboxshadow != "")
		document.getElementById('code').value = 'box-shadow: ' + theboxshadow + ';';
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