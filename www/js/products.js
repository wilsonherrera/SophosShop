var jsonProductArray;

function fillProductsList() {
	retrieveData('products', messageHandler);
}

function messageHandler(jsonResponse) {
	waitingDialog.hide();
	jsonProductArray = jsonResponse.products;
	var listId = 0;
	$.each(jsonProductArray, function (key, value) {
		var idImage = value.id_default_image;
		var name = value.name;
		if (value.name.length > 25) {
			name = value.name.substring(0, 25) + "...";
		}
		$('#productListView').append('<a class="list-group-item allow-badge widget uib_w_11" data-uib="twitter%20bootstrap/list_item" data-ver="1" onclick="productDetail(' + listId + ')" ><div class="grid grid-pad urow uib_row_1 row-height-1" data-uib="layout/row" data-ver="0"><div class="col uib_col_3 col-0_4-12" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="widget uib_w_12 scale-image d-margins" data-uib="media/img" data-ver="0"><figure class="figure-align"><img src="http://190.143.91.138:9191/prestashop/img/p/' + idImage + '/' + idImage + '-cart_default.jpg"><figcaption data-position="bottom"></figcaption></figure></div><span class="uib_shim"></span></div></div><div class="col uib_col_2 col-0_8-12" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><span class="widget uib_w_13 label label-warning" data-uib="twitter%20bootstrap/badge_and_label" data-ver="1">Producto</span><span class="widget uib_w_14 label label-default" data-uib="twitter%20bootstrap/badge_and_label" data-ver="1" id="product">' + name + '</span><span class="widget uib_w_15 label label-warning margintop" data-uib="twitter%20bootstrap/badge_and_label" data-ver="1">Precio</span><span class="widget uib_w_16 label label-default" data-uib="twitter%20bootstrap/badge_and_label" data-ver="1" id="price">$' + parseFloat(value.price).toFixed(2) + '</span><span class="uib_shim"></span></div></div><span class="uib_shim"></span></div></div></a>');
		listId++;
	});
	$('#productListView').listview('refresh');
}


function messageHandlerCreateProduct(response) {
	waitingDialog.hide();
	if (response === '1') {
		alert("Producto Creado");
	} else {
		alert("Error - " + response);
	}
}

function messageHandlerUpdateProduct(response) {
	waitingDialog.hide();
	if (response === '1') {
		alert("Producto actualizado");
	} else {
		alert("Error - " + response);
	}
}


function mailHandler(response) {
	waitingDialog.hide();
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
	var jsonProductToCreate = JSON.parse('{}');
	jsonProductToCreate.userName = (localStorage.userName);
	jsonProductToCreate.name = (document.getElementById('product_name').value);
	jsonProductToCreate.price = (document.getElementById('product_price').value);
	jsonProductToCreate.quantity = (document.getElementById('product_quantity').value);
	jsonProductToCreate.description = (document.getElementById('product_longdesc').value);
	jsonProductToCreate.description_short = (document.getElementById('product_shortdesc').value);
	//TODO agregar campo para condicion, categoria y otros.
	jsonProductToCreate.condition = "new";
	localStorage.imgData = localStorage.imgData.replace(/[+ ]/g, '%2B');
	if (localStorage.edit === "false") {
		addNewProduct(JSON.stringify(jsonProductToCreate), messageHandlerCreateProduct, localStorage.imgData);
	} else {
		var jsonProductToEdit = JSON.parse('{}');
		jsonProductToEdit.id = (localStorage.productID);
		jsonProductToEdit.idDefaultImage = localStorage.idDefaultImage;
		jsonProductToEdit.price = (document.getElementById('product_price').value);
		jsonProductToEdit.quantity = (document.getElementById('product_quantity').value);
		jsonProductToEdit.name = (document.getElementById('product_name').value);
		jsonProductToEdit.desc = (document.getElementById('product_longdesc').value);
		jsonProductToEdit.desc_short = (document.getElementById('product_shortdesc').value);
		updateProduct(JSON.stringify(jsonProductToEdit), messageHandlerUpdateProduct, localStorage.imgData);
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

function onPhotoURISuccess(imageData) {
	localStorage.imgData = imageData;
	var image = document.getElementById('product_img');
	image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
	alert("Error al cargar la imagen " + message);
}

function isOfferDone(response) {
	waitingDialog.hide();
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