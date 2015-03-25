function initApp() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	document.getElementById("login").onclick = function () {
		$('input#username').blur(); 
		$('input#password').blur(); 
         var user=document.getElementById("username").value;
         var pass=document.getElementById("password").value;
         if(user!=""&&user!=null&&pass!=""&&pass!=null){
		validateLogin(document.getElementById("username").value, document.getElementById("password").value, authHandler);
         }else{
            alert("Se deben diligenciar los campos Usuario y Contraseña");  
         }
         };
}
function onProductsInit() {
	writeHtmlComments("1");
	fillProductsList();
	document.getElementById("myproducts").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("logout").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("sale").onclick = function () {
		navigation(this.id);
	};

}

function onMyProducts() {
	writeHtmlComments("3");
	document.getElementById("products").onclick = function () {
		navigation(this.id);
	};

	document.getElementById("logout").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("myproducts").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("sale").onclick = function () {
		navigation(this.id);
	};
	getProductsUser(localStorage.userName, myProductsHandler);
}

function onMyProfile() {
	writeHtmlComments("3");

	document.getElementById("btnImage").onclick = function () {
		getPhotoProfile();
	};

	document.getElementById("products").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("seemyproducts").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("myproducts").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("logout").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("sale").onclick = function () {
		navigation(this.id);
	};
	getDataUser(localStorage.userName, localStorage.password, profileHandler);
}

function onQuestions() {
	writeHtmlComments("3");
	document.getElementById("products").onclick = function () {
		$('input#txtEmail').blur(); 
		navigation(this.id);
	};

	document.getElementById("myproducts").onclick = function () {
		$('input#txtEmail').blur(); 
		navigation(this.id);
	};
	document.getElementById("logout").onclick = function () {
		$('input#txtEmail').blur(); 
		navigation(this.id);
	};
	document.getElementById("sale").onclick = function () {
		$('input#txtEmail').blur(); 
		navigation(this.id);
	};
	document.getElementById("btnSend").onclick = function () {
         var bodyEmail=document.getElementById("txtEmail").value;
         if(bodyEmail.trim() !="" && bodyEmail !=null){
           sendEmail(localStorage.productIDToBuy, bodyEmail, mailHandler);
         }else{
              alert("Porfavor describa su pregunta antes de enviar"); 
         }
		$('input#txtEmail').blur(); 
	};
	setProductEmail();
}

function onProductDetailInit() {
	writeHtmlComments("3");
	document.getElementById("myproducts").onclick = function () {
		navigation(this.id);
	};

	document.getElementById("products").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("logout").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("sale").onclick = function () {
		navigation(this.id);
	};
	document.getElementById("btnofertar").onclick = function () {
		makeProductOffer(localStorage.productIDToBuy, isOfferDone);
	};
	document.getElementById("btnAsk").onclick = function () {
		navigation(this.id);
	};
	setProductDetail();
}

function onCreateProductInit() {
	writeHtmlComments("3");
	document.getElementById("myproducts").onclick = function () {
		blurCreationInput();
		navigation(this.id);
	};
	document.getElementById("products").onclick = function () {
		blurCreationInput();
		navigation(this.id);
	};
	document.getElementById("logout").onclick = function () {
		blurCreationInput();
		navigation(this.id);
	};
	document.getElementById("create").onclick = function () {
		blurCreationInput();
		createProduct();
	};
	document.getElementById("btnImage").onclick = function () {
		blurCreationInput();
		getPhoto();
	};
	document.getElementById("sale").onclick = function () {
		blurCreationInput();
		navigation(this.id);
	};

	if (localStorage.edit === "true") {
		setProductEdit();
	}

}

function blurCreationInput(){
	$('input#product_name').blur(); 
	$('input#product_price').blur(); 
	$('input#product_shortdesc').blur(); 
	$('input#product_longdesc').blur(); 
	$('input#product_quantity').blur(); 
}

function navigation(e) {
	var page = null;
	switch (e) {
	case 'products':
		page = 'products.html';
		break;
	case 'login':
		page = 'products.html';
		break;
	case 'logout':
		page = 'index.html';
		break;
	case 'sale':
		localStorage.edit = "false";
		page = 'createProduct.html';
		break;
	case 'myproducts':
		page = 'myProfile.html';
		break;
	case 'seemyproducts':
		page = 'myProducts.html';
		break;
		questions
	case 'questions':
		page = 'questions.html';
		break;
	case 'btnAsk':
		page = 'questions.html';
		break;


	}
	location.href = page;
}


//coloca el codigo del dialogo para enviar comentarios al div commentsDialigDiv
function writeHtmlComments(num) {
	$("#commentsDialigDiv").html(' <div class="modal outer-element uib_w_12" data-uib="twitter%20bootstrap/modal" data-ver="1" data-backdrop="true" data-keyboard="true" id="comments"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button class="close" data-dismiss="modal">x</button><h4 class="modal-title">Comentarios</h4></div><div class="modal-body"><div class="col uib_col_' + num + ' single-col" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="widget uib_w_13 d-margins" data-uib="media/text" data-ver="0"><div class="widget-container left-receptacle"></div><div class="widget-container right-receptacle"></div><div><p>Envianos tus comentarios, quejas, sugerencias o el reporte de algun error.</p></div></div><div class="table-thing widget uib_w_14 d-margins" data-uib="twitter%20bootstrap/text_area" data-ver="1"><label class="narrow-control"></label><textarea rows="4" class="wide-control form-control" wrap="soft" id="taComment"></textarea></div><button class="btn widget uib_w_15 d-margins btn-danger" data-uib="twitter%20bootstrap/button" data-ver="1" data-dismiss="modal" onclick="sendComment()">Enviar<i class="glyphicon glyphicon-info-sign button-icon-right" data-position="right"></i></button><span class="uib_shim"></span></div></div></div><div class="modal-footer"></div></div></div></div>');
}