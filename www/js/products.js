var jsonProductArray;

function fillProductsList() {
	retrieveData('products', messageHandler);
}

function messageHandler(jsonResponse) {
	hideDialog();
	jsonProductArray = jsonResponse.products;
	var listId = 0;
	$.each(jsonProductArray, function (key, value) {
		var idImage = value.id_default_image;
		var name = value.name;
		if (value.name.length > 25) {
			name = value.name.substring(0, 25) + "...";
		}
		$('#productListView').append('<li><a onclick="productDetail(' + listId + ')"><img src="images/loading.gif" width="100%" height="100%" id="imageProduct' + listId + '"/><h3>' + name + '</h3><p>Precio: $' + parseFloat(value.price).toFixed(2) + '</p></a></li>'); 
		listId++;
	});
	$('#productListView').listview('refresh');
	listId = 0;
	$.each(jsonProductArray, function (key, value) {
		var idImage = value.id_default_image;
		var image = document.getElementById('imageProduct' + listId);
		image.src = ' http://190.143.91.138:9191/prestashop/img/p/' + idImage + '/' + idImage + '-cart_default.jpg';
		listId++;
	});
}


function messageHandlerCreateProduct(response) {
	hideDialog();
	if (response === '1') {
		alert("Producto Creado");
	} else {
		alert("Error - " + response);
	}
}

function messageHandlerUpdateProduct(response) {
	hideDialog();
	if (response === '1') {
		alert("Producto actualizado");
	} else {
		alert("Error - " + response);
	}
}


function mailHandler(response) {
	hideDialog();
	if (response === '1') {
		alert("Correo Enviado");
	} else {
		alert("Error");
	}
}


function productDetail(productId) {
	localStorage.productID = productId;
	localStorage.jsonArray = "{\"products\":" + JSON.stringify(jsonProductArray) + "}";
	location.href = 'productDetail.html';
}

function setProductDetail() {
	selectedProductId = localStorage.productID;
	jsonProductArray = JSON.parse(localStorage.jsonArray).products;
	localStorage.productIDToBuy = jsonProductArray[selectedProductId].id;
	var idImage = jsonProductArray[selectedProductId].id_default_image;
	var imgFolder = "";
	for (var i = 0; i < idImage.length; i++) {
		imgFolder += idImage.charAt(i);
		imgFolder += "/";
	}
	document.getElementById('product_img').src = "http://190.143.91.138:9191/prestashop/img/p/" + imgFolder + idImage + ".jpg";
	document.getElementById('product_name').innerHTML = jsonProductArray[selectedProductId].name;
	document.getElementById('product_price').innerHTML = "Price: $" + jsonProductArray[selectedProductId].price;
	document.getElementById('product_desc').innerHTML = (jsonProductArray[selectedProductId].description === null) ? jsonProductArray[selectedProductId].description_short : jsonProductArray[selectedProductId].description;

	localStorage.productName = jsonProductArray[selectedProductId].name;
	var name = jsonProductArray[selectedProductId].name;
	if (jsonProductArray[selectedProductId].name.length > 25) {
		name = jsonProductArray[selectedProductId].name.substring(0, 25);
	}
	document.getElementById('product_img').src = "http://190.143.91.138:9191/prestashop/img/p/" + imgFolder + idImage + ".jpg";
	document.getElementById('product_name').innerHTML = name;
	document.getElementById('product_price').innerHTML = "Price: $" + jsonProductArray[selectedProductId].price;
	document.getElementById('product_desc').innerHTML = (jsonProductArray[selectedProductId].description === null) ? jsonProductArray[selectedProductId].description_short : jsonProductArray[selectedProductId].description;

	localStorage.productName = jsonProductArray[selectedProductId].name;
	localStorage.productPrice = document.getElementById('product_price').innerHTML;
	localStorage.imgSrc = document.getElementById('product_img').src;
}

function setProductEdit() {
	selectedProductId = localStorage.productID;
	jsonProductArray = JSON.parse(localStorage.jsonArray).products;
	localStorage.productID = jsonProductArray[selectedProductId].id;
	localStorage.idDefaultImage = jsonProductArray[selectedProductId].id_default_image;
	var idImage = jsonProductArray[selectedProductId].id_default_image;
	var imgFolder = "";
	for (var i = 0; i < idImage.length; i++) {
		imgFolder += idImage.charAt(i);
		imgFolder += "/";
	}
	document.getElementById('product_img').src = "http://190.143.91.138:9191/prestashop/img/p/" + imgFolder + idImage + ".jpg";
	document.getElementById('product_name').value = jsonProductArray[selectedProductId].name;
	document.getElementById('product_price').value = jsonProductArray[selectedProductId].price;
	document.getElementById('product_quantity').value = jsonProductArray[selectedProductId].quantity;
	document.getElementById('product_shortdesc').value = jsonProductArray[selectedProductId].description_short;
	document.getElementById('product_longdesc').innerHTML = jsonProductArray[selectedProductId].description;
	document.getElementById('create').innerHTML = "Actualizar";
}

function createProduct() {
    var pname = (document.getElementById('product_name').value);
    var pprice = (document.getElementById('product_price').value);
    var quant = (document.getElementById('product_quantity').value);
    var ldesc = (document.getElementById('product_longdesc').value);
    var sdesc = (document.getElementById('product_shortdesc').value);
    if (pname != "" && pname != null &&
        pprice != "" && pprice != null &&
        quant != "" && quant != null &&
        ldesc != "" && ldesc != null &&
        sdesc != "" && sdesc != null) {

        if (isNaN(pprice)) {
            alert("El precio debe ser númerico");
            return;
        }
        if (isNaN(quant)) {
            alert("La cantidad debe ser númerica");
            return;
        }

        var jsonProductToCreate = JSON.parse('{}');
        jsonProductToCreate.name = pname;
        jsonProductToCreate.price = pprice;
        jsonProductToCreate.quantity = quant;
        jsonProductToCreate.description = ldesc;
        jsonProductToCreate.description_short = sdesc;
        //TODO agregar campo para condicion, categoria y otros.
        localStorage.imgData = localStorage.imgData.replace(/[+ ]/g, '%2B');
        if (localStorage.edit === "false") {
            jsonProductToCreate.userName = (localStorage.userName);
            jsonProductToCreate.condition = "new";
            addNewProduct(JSON.stringify(jsonProductToCreate), messageHandlerCreateProduct, localStorage.imgData);
        } else {
            jsonProductToCreate.id = (localStorage.productID);
            jsonProductToCreate.idDefaultImage = localStorage.idDefaultImage;
            updateProduct(JSON.stringify(jsonProductToCreate), messageHandlerUpdateProduct, localStorage.imgData);
        }
    } else {
        alert("Se deben diligenciar todos los campos");
    }
}





function getPhoto() {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality: 50,
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType: 1
	});
}


function getImage() {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onCapturePhotoSuccess, onCapturePhotoError, {
		quality: 80,
		destinationType: navigator.camera.DestinationType.DATA_URL,
		sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
	});
}

function onCapturePhotoSuccess(imageURI) {
	var smallImage = document.getElementById('product_img');
	smallImage.src = "data:image/jpeg;base64," + imageURI;
	//document.getElementById('product_longdesc').innerHTML = imageURI;
	localStorage.imgData = imageURI;
}


function onCapturePhotoError(message) {
	console.log('Captured Failed because: ' + message);
}



function onPhotoURISuccess(imageData) {
	localStorage.imgData = imageData;
	var image = document.getElementById('product_img');
	image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
	alert("Error al cargar la imagen " + message);
}

function isOfferDone(response) {
	hideDialog();
	switch (response) {
	case "1":
		alert("La oferta se ha realizado exitosamente");
		break;
	default:
		break;
	}
}

function setProductEmail() {
	document.getElementById('product_name').innerHTML = localStorage.productName;
	document.getElementById('product_price').innerHTML = localStorage.productPrice;
	document.getElementById('product_img').src = localStorage.imgSrc;
}