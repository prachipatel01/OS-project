var input2=document.getElementsByClassName("userinput2")[0];
var input1=document.getElementsByClassName("userinput1")[0];
var Add= document.getElementsByClassName("Add")[0];
var Enter= document.getElementsByClassName("Enter")[0];
var refresh= document.getElementsByClassName("refresh")[0];
var blocks=document.getElementsByClassName("blocks")[0];

var array=[];
var frames=-1;
var ptr=0;
var page_fault=0;
var element_inside=0;


function FIFO(){
	
	for (var i = 0; i < element_inside; i++) {
		if(array[i]===input2.value)
		{
			input2.value="";
			return;
		}
	}
	if(element_inside<frames)
	{
		add_element(input2.value);
		var num=array.push(input2.value);
		element_inside++;
		page_fault++;
		ptr++;

		document.getElementById("Calculate").innerHTML = page_fault;
		input2.value="";
		return;
	}
	if(ptr===parseInt(frames))
	{
		ptr=0;
	}
	update_element(input2.value,ptr);
	array[ptr]=input2.value;
	ptr++;
	page_fault++;
	
	document.getElementById("Calculate").innerHTML = page_fault;
	input2.value="";
}



function Calculate() {
	document.getElementById("Calculate").innerHTML = page_fault;
}

function Refresh() {
	array=[];
	ptr=0;
	page_fault=0;
	element_inside=0;
	blocks.innerHTML="";
	document.getElementById("Calculate").innerHTML = "";
	frames=-1;
	input2.value="";
}


function inputLength2() {
	return input2.value.length;
	// body...
}
function inputLength1() {
	return input1.value.length;
	// body...
}


function update_element(value,ptr)
{
	blocks.childNodes[ptr].innerHTML=value;
}


function add_element(value){
	let newElement=document.createElement('span');
	newElement.className="badge badge-secondary";
	newElement.innerText=value;
	blocks.appendChild(newElement);
}



function addListAfterClick() {
	if(inputLength2()>0)
	{
		if(frames===-1)
		{
			input2.value="";
			window.alert("enter number of frames!");
			return;
		}
		else
		{
			FIFO();
		}
	}
}
function addListAfterKeypress(event) {
	if(inputLength2()>0 && event.keyCode===13)
	{
		if(frames===-1)
		{
			input2.value="";
			window.alert("enter maximum number of frames!");
			return;
		}
		else
		{
			FIFO();
		}
	}
}

function Update_frame() {
	if(inputLength1()>0)
	{
		Refresh();
		frames=input1.value;
		input1.value="";
		return;
	}
}
function Update_frame_AfterKeypress() {
	if(inputLength1()>0 && event.keyCode===13)
	{
		Refresh();
		frames=input1.value;
		input1.value="";
		return;
	}
}




Enter.addEventListener("click",Update_frame);
Add.addEventListener("click",addListAfterClick);
input2.addEventListener("keypress",addListAfterKeypress);
input1.addEventListener("keypress",Update_frame_AfterKeypress);
refresh.addEventListener("click",Refresh);