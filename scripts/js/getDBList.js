(function() {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {


			let rawDBListData = JSON.parse(this.responseText);

			rawDBListData.forEach (function (currentVal, index) {
				listOfDB[index] = currentVal['Database'];
			});
			// console.log(listOfDB)

			displayDBListData(listOfDB);
		}
	};
	xhttp.open("POST", "../scripts/server/showSql.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("query=" + showDBList_query);
})();
