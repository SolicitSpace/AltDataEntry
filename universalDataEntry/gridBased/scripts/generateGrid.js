
function generateGrid(rawTableData) {

	console.log(rawTableData)

	// return;
	// no. of columns
	let noOfFields = rawTableData.length; 



	// table for stroing the values.
	let table = document.createElement('table');
	table.className = 'grid-table-header-row';
	// appending the table on the body.
	document.body.appendChild(table);


	// create new row
	let table_header_row = document.createElement('tr');



	// Creating the table headers.
	// loop for creating multiple fields
	let fieldName = document.createElement('td');
	fieldName.className = 'field-name';
	let headerFieldName = document.createElement('p');
	headerFieldName.innerHTML = "Sr no.";
	fieldName.appendChild(headerFieldName);
	table_header_row.appendChild(fieldName);			// appending the data cells to the row.





	// appending the data row to the table.
	table.appendChild(table_header_row);

	for (let i=0; i<noOfFields; i++) { 
		generateGridHeaders_helper(i, rawTableData, table, table_header_row);
	}

	
	// now that headers are complete working on body.
	generateGridBody_helper(noOfFields, rawTableData, table, 5)


	// Creating the section for adding additional rows. (5 are provided by default)
	createAddRowBtn(noOfFields, rawTableData, table);





	// // Creating a button for submit.
	// let submitBtn = document.createElement('button');
	// submitBtn.innerHTML = 'SUBMIT';
	// submitBtn.onclick = function() {
	// 	verifyData(noOfFields);
	// }

	// document.body.appendChild(submitBtn);


	// // Creating a button for reset.
	// let resetBtn = document.createElement('button');
	// resetBtn.innerHTML = 'RESET';
	// document.body.appendChild(resetBtn);

}





function createAddRowBtn (noOfFields, rawTableData, table) {

	// creating table.
	let addSection_table = document.createElement('table');
		
		// creating table row.
		let addSection_row = document.createElement('tr');

		//---------------------------------------------------------------
		// Cell #1 
		//---------------------------------------------------------------
		// Creating and appending add button to the datacell.
		let addSection_data_numRows = document.createElement('td');

			// Create input field to add number of fields to be added.
			let numRows = document.createElement('input');
			numRows.type = "number";
			numRows.min = 1;
			numRows.max = 10;
			numRows.className = "data-input-fields";
			numRows.id = '1';
			numRows.onkeyup = function() {
				// Need to plug validations.
				if (this.value < 11) {

				} else {
					alert("Only 10 rows can be added at once.");
					numRows.value = 10;
				}

			} 

		addSection_data_numRows.appendChild(numRows);					// appending the elements to the data cells.
		addSection_row.appendChild(addSection_data_numRows);			// appending the data cells to the row.



		//---------------------------------------------------------------
		// Cell #2 
		//---------------------------------------------------------------
		// Creating and appending add button to the datacell.
		let addSection_data_addBtn = document.createElement('td');

			// Creating the add rows button.
			let submitBtn = document.createElement('button');
			submitBtn.innerHTML = 'ADD';
			submitBtn.onclick = function() {
				// reusing the `generateGridBody_helper()` to create additional rows. 
				generateGridBody_helper(noOfFields, rawTableData, table, numRows.value);				
			}

		addSection_data_addBtn.appendChild(submitBtn);					// appending the elements to the data cells.
		addSection_row.appendChild(addSection_data_addBtn);				// appending the data cells to the row.


	// appending the table to the html body.
	document.body.appendChild(addSection_row);
}
























/*
|----------------------------------------------------------------------------------------
|	Creating the table/grid's headers.
|----------------------------------------------------------------------------------------
*/
function generateGridHeaders_helper (i, rawTableData, table, table_header_row) {


	// creating the first data cell which includes label.
	let fieldName = document.createElement('td');
	fieldName.className = 'field-name';
	let headerFieldName = document.createElement('p');
	headerFieldName.innerHTML = rawTableData[i]['column_name'];
	fieldName.appendChild(headerFieldName);
	table_header_row.appendChild(fieldName);			// appending the data cells to the row.


	// appending the data row to the table.
	table.appendChild(table_header_row);

}









/*
|----------------------------------------------------------------------------------------
|	Creating the table/grid's body.
|----------------------------------------------------------------------------------------
*/
function generateGridBody_helper(noOfFields, rawTableData, table, numRows) {
	// return;


	// rows
	for (let i=0; i<numRows; i++) { 

		// create new row
		let table_body_row = document.createElement('tr');
		table_body_row.className = 'grid-table-body-row';
		// cols

		let fieldName = document.createElement('td');
		fieldName.className = 'field-name';
		let headerFieldName = document.createElement('p');
		headerFieldName.innerHTML = i + 1;
		fieldName.appendChild(headerFieldName);
		table_body_row.appendChild(fieldName);			// appending the data cells to the row.


	// appending the data row to the table.
	table.appendChild(table_body_row);


		for (let j=0; j<noOfFields; j++) { 
		
				// generateGridBody_helper(i, rawTableData, table, table_body_row);
				let table_cell = document.createElement("td");
				table_cell.className = 'grid-table-body-data';


					let inputField = document.createElement('input');
					inputField.className = "data-input-fields";
					inputField.id = "data-input-field-" + rawTableData[j]['column_name'] + '-' + i;

					inputField.onkeydown = function() {

						// Need to plug validations.
						// validateField(this);
						// console.log(inputField.id);
					} 

				table_cell.appendChild(inputField);


			table_body_row.appendChild(table_cell);			// appending the data cells to the row.
		}	

		table.appendChild(table_body_row);	
	}	


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























