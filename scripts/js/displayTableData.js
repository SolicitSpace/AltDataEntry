// DB-0
function displayDBListData(listOfDB){

	let dbListSection = document.getElementById('db-list-section');
	let dbList = document.createElement('ol');
	dbListSection.id = 'db-list';
	
	dbList.innerHTML = '';
	dbListSection.appendChild(dbList);




	listOfDB.forEach (function(currentVal, index) {

		createDBList_helper(index, dbList);
	});

	
};




// DB-1
function createDBList_helper (i, dbList) {
	let dbListElem = document.createElement('li');
	dbListElem.name = listOfDB[i];
	dbListElem.appendChild(document.createTextNode(listOfDB[i]));   		
	dbList.appendChild(dbListElem); 

	dbListElem.onclick = function () {
		onDBItemSelected(this, dbList);
	}
}


// DB-2
function onDBItemSelected(dbSelected, dbList) {
	
	// resetting all the others
	let dbListElemLength = dbList.getElementsByTagName('li').length;

	for (let i=0; i<dbListElemLength; i++) {

		dbList.getElementsByTagName('li')[i].style.color = '';
		dbList.getElementsByTagName('li')[i].style.backgroundColor = '';
	}
	
	
	// Now applying selected indicator the currently selected element
	dbSelected.style.backgroundColor = 'rgba(0,0,0,0.2)';
	dbSelected.style.color = 'green';

	getTableListFor(dbSelected.innerHTML)
}



// Table-0
function getTableListFor(dbSelected) {

	// **Saving the currently selected database
	currSelectedDB = dbSelected;


	let showTableList_final_query = showTableList_query + dbSelected;


	// Send the selected db to a php
	// set it on the db section in the php
	// fire get all the tables 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			

			let rawTableListData = JSON.parse(this.responseText);
			
			// resetting the tables list array.
			listOfTable = [];

			rawTableListData.forEach(function(currentVal, index) {

				listOfTable[index] = currentVal['Tables_in_' + dbSelected];
			});
			
			displayTableListData(listOfTable);

		}
	};
	xhttp.open("POST", "../scripts/server/showSql.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("query=" + showTableList_final_query);
}













// // Table-1
function displayTableListData(listOfTable){

	let tableListSection = document.getElementById('tables-list-section');
	let tableList = document.createElement('ol');
	tableList.id = 'table-list';

	tableListSection.innerHTML = '';
	tableListSection.appendChild(tableList);


	listOfTable.forEach (function(currentVal, index) {

		createTableList_helper(index, tableList);
	});

	
};



// Table-2
function createTableList_helper (i, tableList) { 
	let tableListElem = document.createElement('li');
	tableListElem.name = listOfTable[i];
	tableListElem.appendChild(document.createTextNode(listOfTable[i]));   		
	tableList.appendChild(tableListElem); 

	tableListElem.onclick = function () {
		onTableItemSelected(this, tableList);
		// getTableListFor(this);
	}
}



// // Table-3
function onTableItemSelected(tableSelected, tableList) {
	
	// **Saving the currently selected table
	currSelectedTable = tableSelected.innerHTML;

	// resetting all the others
	let tableListElemLength = tableList.getElementsByTagName('li').length;

	for (let i=0; i<tableListElemLength; i++) {

		tableList.getElementsByTagName('li')[i].style.color = '';
		tableList.getElementsByTagName('li')[i].style.backgroundColor = '';
	}
	
	
	// Now applying selected indicator the currently selected element
	tableSelected.style.backgroundColor = 'rgba(0,0,0,0.2)';
	tableSelected.style.color = 'green';

	// getTableListFor(tableList.innerHTML)

	document.getElementById('go-to-form-btn').disabled = false;
}












// Redirecting to generated form page.
function rtGeneratedFormPage() {


	// saving stuff in localstorage or session
	window.localStorage.dbName = currSelectedDB;
	window.localStorage.tableName = currSelectedTable;


	window.location.href = "generatedForm/";

}