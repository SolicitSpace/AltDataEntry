var listOfDB = [];
var listOfTable = [];


var showDBList_query = "SHOW DATABASES";
var showTableList_query = "SHOW TABLES FROM ";
var selectAllFromTable_query = "SELECT column_name WHERE table_name='coords_log'";

// Will be filled later in getTableFieldInfo() in getTableFieldInfo.js
var tableSchema = '';
var tableName = '';
var selectColNameAndType = `SELECT column_name, column_type
		from information_schema.columns 
		where table_schema = '` + tableSchema + `' and table_name = '` + tableName + ` + '`;


var currSelectedDB = '';
var currSelectedTable = '';


