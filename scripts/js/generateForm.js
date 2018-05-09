
function generateForm(rawTableData) {


	// no. of columns
	let noOfFields = rawTableData.length; 



	// table for stroing the values.
	let table = document.createElement('table');

	// appending the table on the body.
	document.body.appendChild(table);

	// loop for creating multiple fields
	for (let i=0; i<noOfFields; i++) { 
		
		generateForm_helper(i, rawTableData, table);
	}




	// Creating a button for submit.
	let submitBtn = document.createElement('button');
	submitBtn.innerHTML = 'SUBMIT';
	submitBtn.onclick = function() {
		verifyData(noOfFields);
	}

	document.body.appendChild(submitBtn);


	// Creating a button for reset.
	let resetBtn = document.createElement('button');
	resetBtn.innerHTML = 'RESET';
	document.body.appendChild(resetBtn);

}











function generateForm_helper (i, rawTableData, table) {

	// create new row
	let table_row = document.createElement('tr');

	// creating the first data cell which includes label.
	let fieldName = document.createElement('td');
	let labelFieldName = document.createElement('p');
	labelFieldName.innerHTML = rawTableData[i]['column_name'];
	fieldName.appendChild(labelFieldName);
	table_row.appendChild(fieldName);			// appending the data cells to the row.


	// creating the second data cell which includes input field.
	let inputFieldName = document.createElement('td');
	let inputField = document.createElement('input');
	inputField.className = "data-input-fields";
	inputField.id = "data-input-field-" + labelFieldName.innerHTML;

	inputField.onkeydown = function() {
		validateField(this);
	} 

	inputFieldName.appendChild(inputField);
	table_row.appendChild(inputFieldName);			// appending the data cells to the row.


	// creating the first data cell which includes label.
	let fieldInfo = document.createElement('td');
	let labelFieldInfo = document.createElement('p');
	labelFieldInfo.innerHTML = processColDataType(rawTableData[i]['column_type']) + '<br>' +  processMaxLength(rawTableData[i]['column_type']);
	fieldInfo.appendChild(labelFieldInfo);
	table_row.appendChild(fieldInfo);			// appending the data cells to the row.




	// appending the data row to the table.
	table.appendChild(table_row);

}




function processColDataType (colType) {

	let noteAboutType;

	colDataType = colType.split('(');
	colDataType = colDataType[0];


	switch (colDataType) {
		case 'int':
			noteAboutType = "Only Numbers allowed!";
		break;
		case 'varchar':
			noteAboutType = "Both Numbers and String allowed!";
		break;
		case 'string':
			noteAboutType = "Both Numbers and String allowed!";
		break;
		case 'text':
			noteAboutType = "Both Numbers and String allowed!";
		break;
		case 'longtext':
			noteAboutType = "Both Numbers and String allowed!";
		break;
		default:
			noteAboutType = "Some issue here!";
			break;
	}


	return noteAboutType;
}





function processMaxLength(colType) {

	let noteAboutMaxLength;


	// getting the value of max length from int(11), so getting 11
	// checking if the received str contains ( (int(12)). 
	// If not then the data must be text/longtext or something where the upper character limit must have not been set.
	if (colType.includes('(')) {

		let regExp = /\(([^)]+)\)/;
		let maxLength = regExp.exec(colType);

		maxLength = maxLength[1];

		noteAboutMaxLength = "Character limit: " + maxLength; 
	} 

	else {
		noteAboutMaxLength = "Datatype max character limit not set."; 
	}


	return noteAboutMaxLength;

}























