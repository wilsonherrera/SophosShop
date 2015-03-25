function retrieveData(type, callback) {
	// if(seeConnection()==="false"){alert("No hay coneccion a internet");return;}
	showLoadDialog();
	var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=retrieveData&type=".concat(type);
	var http_request = new XMLHttpRequest();
	http_request.open("POST", url, true);
	http_request.send("");
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				var jsonResponse = JSON.parse(http_request.responseText);
				callback(jsonResponse);
			}
			http_request = null;
		}
	};
}

function addNewProduct(newProduct, callback, data) {
	//  if(seeConnection()==="false"){alert("No hay coneccion a internet");return;}
	showLoadDialog();
	var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=createProduct&product=".concat(newProduct);
	var http_request = new XMLHttpRequest();
	http_request.open("POST", url, true);
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	var postData = JSON.parse("{}");
	postData.data = data;
	http_request.send("product=" + JSON.stringify(postData));
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				callback(http_request.responseText);
			}
			http_request = null;
		}
	};
}

function addProfilePhoto(idUser, callback, data) {
	//   if(seeConnection()==="false"){alert("No hay coneccion a internet");return;}
	showLoadDialog();
	var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=loadImageForUser&user=".concat(idUser);
	var http_request = new XMLHttpRequest();
	http_request.open("POST", url, true);
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	var postData = JSON.parse("{}");
	postData.data = data;
	http_request.send("product=" + JSON.stringify(postData));
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				callback(http_request.responseText);
			}
			http_request = null;
		}
	};
}


function updateProduct(newProduct, callback, data) {
	//  if(seeConnection()==="false"){alert("No hay coneccion a internet");return;}
	showLoadDialog();
	var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=updateProduct&product=".concat(newProduct);
	var http_request = new XMLHttpRequest();
	http_request.open("POST", url, true);
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	var postData = JSON.parse("{}");
	postData.data = data;
	http_request.send("product=" + JSON.stringify(postData));
	// http_request.send(null);
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				document.getElementById("product_name").value = http_request.responseText;
				callback(http_request.responseText);
			}
			http_request = null;
		}
	};
}


function validateLogin(username, password, callback) {
	if (seeConnection() === "false") {
		alert("No hay coneccion a internet");
		return;
	}
	showLoadDialog();
	var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=login&user=" + username + "&password=" + password + "";
	var http_request = new XMLHttpRequest();
	http_request.open("GET", url, true);
	http_request.send(null);
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				callback(http_request.responseText);
			}
			http_request = null;
		}
	};
}

function makeProductOffer(idProduct, callback) {
	//  if(seeConnection()==="false"){alert("No hay coneccion a internet");return;}
	showLoadDialog();
	var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=offer&user=" + localStorage.userName + "&product=" + idProduct;
	var http_request = new XMLHttpRequest();
	http_request.open("GET", url, true);
	http_request.send(null);
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				callback(http_request.responseText);
			}
			http_request = null;
		}
	};
}

//coloca la informacion del usuario en la vista
function getDataUser(username, password, callback) {
	// if(seeConnection()==="false"){alert("No hay coneccion a internet");return;}
	//  waitingDialog.show();
	var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=dataUser&user=" + username + "&password=" + password + "";
	var http_request = new XMLHttpRequest();
	http_request.open("GET", url, true);
	http_request.send(null);
	http_request.onreadystatechange = function () {
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
function getProductsUser(username, callback) {
	if (seeConnection() === "false") {
		alert("No hay coneccion a internet");
		return;
	}
	showLoadDialog();
	var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=productsPerUser&user=" + username;
	var http_request = new XMLHttpRequest();
	http_request.open("POST", url, true);
	http_request.send("");
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				var jsonResponse = JSON.parse(http_request.responseText);
				callback(jsonResponse);
			}
			http_request = null;
		}
	};
}

function sendEmail(idProduct, emailBody, callback) {
	//   if(seeConnection()==="false"){alert("No hay coneccion a internet");return;}
	showLoadDialog();
	var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=mailQuestion&body=" + emailBody + "&product=" + idProduct + "&user=" + localStorage.userName;
	var http_request = new XMLHttpRequest();
	http_request.open("GET", url, true);
	http_request.send(null);
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				callback(http_request.responseText);
			}
			http_request = null;
		}
	};
}



//envia los comentarios de los usuarios
function sendComment() {
    //  if(seeConnection()==="false"){alert("No hay coneccion a internet");return;}
    var coment = document.getElementById('txComments').value;
    if (coment != null && coment != "") {
        document.getElementById('popComments').hide;
        showLoadDialog();
        var url = "http://190.143.91.138:9191/prestashop/PrestaShopWebService.php?method=sendReport&body=" + coment;
        var http_request = new XMLHttpRequest();
        http_request.open("GET", url, true);
        http_request.send(null);
        http_request.onreadystatechange = function() {
            if (http_request.readyState == 4) {
                if (http_request.status == 200) {
                    hideDialog();
                    document.getElementById('popComments').hide;
                    if (http_request.responseText === "1") {
                        alert("Enviado correctamente");
                    } else {
                        alert("Ocurrio un error intentelo mas tarde");
                    }
                }
                http_request = null;
            }
        };
    } else {
        alert("Por favor anote su sugerencia antes de enviarla");
    }
}


//valida si hay conexion a internet
function seeConnection() {
	var networkState = navigator.network.connection.type;
	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.NONE] = 'No network connection';
	if (states[networkState] == 'No network connection' || states[networkState] == 'Unknown connection') {
		return "false";
	} else {
		return "true";
	}
}

function showLoadDialog() {
	$.mobile.loading("show", {
		text: "Cargando...",
		textVisible: true,
		theme: "b",
		textonly: false,
		html: "<span class='ui-bar ui-shadow ui-overlay-d ui-corner-all'><center><img src='images/cargando.gif' height='100' width='100'><h2>Cargando...</h2></center></span>"
	});
}

function hideDialog(){
$.mobile.loading( "hide" );
}