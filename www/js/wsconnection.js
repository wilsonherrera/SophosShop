function retrieveData(type, callback){
	waitingDialog.show();
 	var url ="http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=retrieveData&type=".concat(type);
    var http_request = new XMLHttpRequest();
    http_request.open("POST", url, true);
    http_request.send("");
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                var jsonResponse = JSON.parse(http_request.responseText);
				callback(jsonResponse);
            }
            http_request = null;
        }
    };
}

function addNewProduct(newProduct, callback, data){
	waitingDialog.show();
 	var url ="http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=createProduct&product=".concat(newProduct);
    var http_request = new XMLHttpRequest();
    http_request.open("POST", url, true);
	http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");
	var postData = JSON.parse("{}");
	postData.data = data;
    http_request.send("product="+JSON.stringify(postData));
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
				callback(http_request.responseText);
            }
            http_request = null;
        }
    };
}

function updateProduct(newProduct, callback, data){
	waitingDialog.show();
 	var url ="http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=updateProduct&product=".concat(newProduct);
    var http_request = new XMLHttpRequest();
    http_request.open("POST", url, true);
	http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");
	var postData = JSON.parse("{}");
	postData.data = data;
    http_request.send("product="+JSON.stringify(postData));
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
				callback(http_request.responseText);
            }
            http_request = null;
        }
    };
}


function validateLogin(username, password, callback){
	waitingDialog.show();
	var url ="http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=login&user="+username+"&password="+password+"";
    var http_request = new XMLHttpRequest();
    http_request.open("GET", url, true);
    http_request.send(null);
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
				callback(http_request.responseText);
            }
            http_request = null;
        }
    };
}

function makeProductOffer(idProduct, callback){
	waitingDialog.show();
	var url ="http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=offer&user="+localStorage.userName+"&product="+idProduct;
    var http_request = new XMLHttpRequest();
    http_request.open("GET", url, true);
    http_request.send(null);
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
				callback(http_request.responseText);
            }
            http_request = null;
        }
    };
}


function getDataUser(username, password, callback){

	var url ="http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=dataUser&user="+username+"&password="+password+"";
    var http_request = new XMLHttpRequest();
    http_request.open("GET", url, true);
    http_request.send(null);
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
				 var jsonResponse = JSON.parse(http_request.responseText);
                 callback(jsonResponse);
            }
            http_request = null;
        }
    };
}


//recibe los productos del usuario logeado
function getProductsUser(username,callback){
	waitingDialog.show();
 	var url ="http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=productsPerUser&user="+username;
    var http_request = new XMLHttpRequest();
    http_request.open("POST", url, true);
    http_request.send("");
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                var jsonResponse = JSON.parse(http_request.responseText);
				callback(jsonResponse);
            }
            http_request = null;
        }
    };
}

function sendEmail(idProduct, emailBody, callback){
	waitingDialog.show();
	var url ="http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=mailQuestion&body="+emailBody+"&product="+idProduct+"&user="+localStorage.userName;
    var http_request = new XMLHttpRequest();
    http_request.open("GET", url, true);
    http_request.send(null);
    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
				callback(http_request.responseText);
            }
            http_request = null;
        }
    };
}