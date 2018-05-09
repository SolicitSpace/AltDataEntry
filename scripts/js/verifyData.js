function verifyData(noOfFields) {
	alert(noOfFields);
	

	let dataInputField = document.getElementsByClassName("data-input-fields");

	for (let i=0; i<noOfFields; i++) {
		
		if(dataInputField[i].value == '') {
			dataInputField[i].style.backgroundColor = 'orange';
		}
	}
}