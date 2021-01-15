//const inputs = document.querySelectorAll(".input");


var miniage = document.getElementById('mini_age'); 
var teenage = document.getElementById('teen_age'); 

function mini_age() {
	alert("Hello Mini");
}

function teen_age() {
	alert("Hello Teen");
}

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


function pageRedirect(url) {
	window.location.href = url;
  } 

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});