var myProductsArray;

function myProductsHandler(jsonResponse){
	hideDialog();
     if(jsonResponse === 0){
      alert("El usuario no tiene productos");
		setTimeout(function(){
			location.href = "myProfile.html";},0);
     } else {
		myProductsArray = jsonResponse.products;
		
		var listId = 0;
		$.each(myProductsArray, function (key, value) {
			var idImage = value.id_default_image;
			 var idImage = value.id_default_image;
			  var name=value.name;
			 if(value.name.length>25){
			 name=value.name.substring(0,25)+"...";
			 }
			 $('#listProductsUser').append('<li><a><img src="images/loading.gif" width="100%" height="100%" id="imageProduct'+listId+'"/><h3>' + name + '</h3><p>Precio: $' + parseFloat(value.price).toFixed(2) + '</p> <a class="widget uib_w_11 d-margins  marginBoton" data-uib="jquery_mobile/button" data-ver="0" data-role="button" data-theme="a" data-iconpos="right" data-icon="edit" onclick="productEdit('+listId+')">Editar</a> </a></li>');
		listId++;	
		});
		$('#listProductsUser').listview('refresh');
		  listId = 0;
		$.each(myProductsArray, function (key, value) {
			 var idImage = value.id_default_image;
			 var image = document.getElementById('imageProduct'+listId);
		image.src = ' http://190.143.91.138:9191/prestashop/img/p/' + idImage + '/' + idImage + '-cart_default.jpg';
		listId++;
		});
	}
     
}


function productEdit(productId) {
	localStorage.productID = productId;
	localStorage.jsonArray = "{\"products\":" + JSON.stringify(myProductsArray) + "}";
	localStorage.edit = "true";
	location.href = 'createProduct.html';
}

function questions(productId) {
	localStorage.productID = productId;
	localStorage.jsonArray = "{\"products\":" + JSON.stringify(myProductsArray) + "}";
	location.href = 'questions.html';
}

function reactiveProduct(productId) {
	localStorage.productID = productId;
	alert("missing");
}