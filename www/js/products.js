var jsonProductArray;

function fillProductsList() {
	retrieveData('products', messageHandler);
}

function messageHandler(jsonResponse){
	waitingDialog.hide();
	jsonProductArray = jsonResponse.products;
	var listId = 0;
	$.each(jsonProductArray, function (key, value) {
		var idImage = value.id_default_image;
	$('#productListView').append('<li onclick="productDetail('+listId+')" class="topcoat-list__item widget uib_w_4" data-uib="topcoat/list_item" data-ver="0"> <a> <img class="list-image" src="http://190.143.91.138:9191/prestashop/img/p/'+idImage+'/'+idImage+'-cart_default.jpg"> <div class="list-text"><b>'+value.name+'</b> <br/><b>Price: $'+parseFloat(value.price).toFixed(2)+'</b> </div> </a> </li>');
	listId++;	
	});
	$('#productListView').listview('refresh');
}

function messageHandlerCreateProduct(response){
	waitingDialog.hide();
	if(response === '1'){
		alert("Producto Creado");
	}else{
		alert("Error - " + response);
	}
}

function mailHandler(response){
	waitingDialog.hide();
	if(response === '1'){
		alert("Correo Enviado");
	}else{
		alert("Error");
	}
}


function productDetail(productId){
	localStorage.productID = productId;
	localStorage.jsonArray = "{\"products\":"+JSON.stringify(jsonProductArray)+"}";
	location.href = 'productDetail.html';
}
 
function setProductDetail(){
	selectedProductId = localStorage.productID;
	jsonProductArray = JSON.parse(localStorage.jsonArray).products;
	localStorage.productIDToBuy = jsonProductArray[selectedProductId].id;
	var idImage = jsonProductArray[selectedProductId].id_default_image;
	var imgFolder = "";
	for(var i = 0;i<idImage.length;i++){
		imgFolder += idImage.charAt(i);
		imgFolder += "/";		
	}
	document.getElementById('product_img').src = "http://190.143.91.138:9191/prestashop/img/p/"+imgFolder+idImage+".jpg";
	document.getElementById('product_name').innerHTML = jsonProductArray[selectedProductId].name;
	document.getElementById('product_price').innerHTML = "Price: $"+jsonProductArray[selectedProductId].price;
	document.getElementById('product_desc').innerHTML = (jsonProductArray[selectedProductId].description===null)?jsonProductArray[selectedProductId].description_short:jsonProductArray[selectedProductId].description;
     
     localStorage.productName = jsonProductArray[selectedProductId].name;
	localStorage.productPrice = document.getElementById('product_price').innerHTML;
	localStorage.imgSrc = document.getElementById('product_img').src;
}

function setProductEdit(){
	selectedProductId = localStorage.productID;
	jsonProductArray = JSON.parse(localStorage.jsonArray).products;
	localStorage.productID = jsonProductArray[selectedProductId].id;
	var idImage = jsonProductArray[selectedProductId].id_default_image;
	var imgFolder = "";
	for(var i = 0;i<idImage.length;i++){
		imgFolder += idImage.charAt(i);
		imgFolder += "/";		
	}
	document.getElementById('product_img').src = "http://190.143.91.138:9191/prestashop/img/p/"+imgFolder+idImage+".jpg";
  	document.getElementById('product_name').value = jsonProductArray[selectedProductId].name;
	document.getElementById('product_price').value = jsonProductArray[selectedProductId].price;
	document.getElementById('product_quantity').value = jsonProductArray[selectedProductId].quantity;
     document.getElementById('product_shortdesc').value = jsonProductArray[selectedProductId].description_short;
     document.getElementById('product_longdesc').innerHTML = jsonProductArray[selectedProductId].description;
     document.getElementById('create').innerHTML = "Actualizar";
}

function createProduct(){
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
     if(localStorage.edit==="false"){
	addNewProduct(JSON.stringify(jsonProductToCreate), messageHandlerCreateProduct, localStorage.imgData);
     }else{
          alert("editar");
     }
}

function getPhoto() {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: 1 });
}

function onPhotoURISuccess(imageData){
	alert(imageData);
	localStorage.imgData = imageData;
	var image = document.getElementById('product_img');
    image.src = "data:image/jpeg;base64," + imageData;
	alert("success");
}

function onFail(message){
	alert("Error al cargar la imagen " + message); 
}

function isOfferDone(response){
	waitingDialog.hide();
	switch(response){
		case "1": 
			alert("La oferta se ha realizado exitosamente");
			break;
		default:
			break;
	}
}

function setProductEmail(){	
	document.getElementById('product_name').innerHTML = localStorage.productName;
	document.getElementById('product_price').innerHTML = localStorage.productPrice;
	document.getElementById('product_img').src = localStorage.imgSrc;
}
