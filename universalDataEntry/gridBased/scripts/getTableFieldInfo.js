function getTableFieldInfo () {
	
	// Needed in the selectColNameAndType query 
	tableSchema = localStorage.dbName;     // basically database name.
	tableName   = localStorage.tableName;

	selectColNameAndType = `SELECT column_name, column_type
		from information_schema.columns 
		where table_schema = '` + tableSchema + `' and table_name = '` + tableName + `'`;


	// let selectAllFromTable_final_query = selectAllFromTable_query + localStorage.tableName;
	// let selectAllFromTable_final_query = selectAllFromTable_query;


	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
				
				
			let rawTableData = JSON.parse(this.responseText);
			
			generateGrid(rawTableData);
		}
	};
	xhttp.open("POST", "../../scripts/server/selectSql.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("query=" + selectColNameAndType + "&dbname=" + localStorage.dbName);
}