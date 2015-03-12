var myProductsArray;

function myProductsHandler(jsonResponse){
	waitingDialog.hide();
	myProductsArray = jsonResponse.products;
	var listId = 0;
	$.each(myProductsArray, function (key, value) {
		var idImage = value.id_default_image;
         var idImage = value.id_default_image;
          var name=value.name;
         if(value.name.length>25){
         name=value.name.substring(0,25)+"...";
         }
	$('#listProductsUser').append('<a class="list-group-item allow-badge widget uib_w_15" data-uib="twitter%20bootstrap/list_item" data-ver="1"><div class="grid grid-pad urow uib_row_2 row-height-2" data-uib="layout/row" data-ver="0"><div class="col uib_col_2 col-0_4-12" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="widget uib_w_19 scale-image d-margins" data-uib="media/img" data-ver="0"><figure class="figure-align"><img src="http://190.143.91.138:9191/prestashop/img/p/'+idImage+'/'+idImage+'-cart_default.jpg"><figcaption data-position="bottom"></figcaption></figure></div><span class="uib_shim"></span></div></div><div class="col uib_col_1 col-0_8-12" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><span class="widget uib_w_16 label label-warning" data-uib="twitter%20bootstrap/badge_and_label" data-ver="1">Producto</span><span class="widget uib_w_17 label label-default" data-uib="twitter%20bootstrap/badge_and_label" data-ver="1">'+name+'</span><button class="btn widget uib_w_18 btn-danger sophoscolor marginButtons" data-uib="twitter%20bootstrap/button" data-ver="1" onclick="productEdit('+listId+')">Editar<i class="glyphicon glyphicon-pencil button-icon-right" data-position="right"></i></button><span class="uib_shim"></span></div></div><span class="uib_shim"></span></div></a>');
listId++;	
	});
	$('#listProductsUser').listview('refresh');
}


function productEdit(productId){
	localStorage.productID = productId;
	localStorage.jsonArray = "{\"products\":"+JSON.stringify(myProductsArray)+"}";
     localStorage.edit="true";
	location.href = 'createProduct.html';
}

function questions(productId){
	localStorage.productID = productId;
	localStorage.jsonArray = "{\"products\":"+JSON.stringify(myProductsArray)+"}";
	location.href = 'questions.html';
}
function reactiveProduct(productId){
	localStorage.productID = productId;
	alert("missing");
}