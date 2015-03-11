function profileHandler(jsonResponse){
	//waitingDialog.hide();
	document.getElementById('userName').innerHTML = jsonResponse.firstName;
    document.getElementById('sales').innerHTML = jsonResponse.sales;
    document.getElementById('purchases').innerHTML = jsonResponse.purchases;
    document.getElementById('ranking').innerHTML = jsonResponse.lastName;
}
