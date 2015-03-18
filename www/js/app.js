

function initApp(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	document.getElementById("login").onclick = function () {
        validateLogin(document.getElementById("username").value,document.getElementById("password").value, authHandler);
          };
}

function onProductsInit(){
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
function onMyProducts(){
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
      getProductsUser(localStorage.userName,myProductsHandler);
}

function onMyProfile(){
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
    
      getDataUser(localStorage.userName,localStorage.password, profileHandler);
}
function onQuestions(){
      writeHtmlComments("3");
      document.getElementById("products").onclick = function () {
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
     document.getElementById("btnSend").onclick = function () {
		sendEmail(localStorage.productIDToBuy, document.getElementById("txtEmail").value, mailHandler);
	};
	setProductEmail();
}

function onProductDetailInit(){
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

function onCreateProductInit(){
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
	document.getElementById("create").onclick = function () {
        createProduct();
    };
	document.getElementById("btnImage").onclick = function () {
        getPhoto();
    };
     document.getElementById("sale").onclick = function () {
        navigation(this.id);
    };
    
     if(localStorage.edit==="true"){
          setProductEdit();
     }
          
}

function navigation (e){
    var page = null;
    switch(e){
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
              localStorage.edit="false";
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
               case 'avansar':
			page = 'myProfile.html';
			break;
              case 'btnAsk':
		page = 'questions.html';
		break;
               
             
	}
	location.href = page;
}


//coloca el codigo del dialogo para enviar comentarios al div commentsDialigDiv
function writeHtmlComments(num){
   $( "#commentsDialigDiv" ).html( ' <div class="modal outer-element uib_w_12" data-uib="twitter%20bootstrap/modal" data-ver="1" data-backdrop="true" data-keyboard="true" id="comments"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button class="close" data-dismiss="modal">x</button><h4 class="modal-title">Comentarios</h4></div><div class="modal-body"><div class="col uib_col_'+num+' single-col" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="widget uib_w_13 d-margins" data-uib="media/text" data-ver="0"><div class="widget-container left-receptacle"></div><div class="widget-container right-receptacle"></div><div><p>Envianos tus comentarios, quejas, sugerencias o el reporte de algun error.</p></div></div><div class="table-thing widget uib_w_14 d-margins" data-uib="twitter%20bootstrap/text_area" data-ver="1"><label class="narrow-control"></label><textarea rows="4" class="wide-control form-control" wrap="soft" id="taComment"></textarea></div><button class="btn widget uib_w_15 d-margins btn-danger" data-uib="twitter%20bootstrap/button" data-ver="1" data-dismiss="modal" onclick="sendComment()">Enviar<i class="glyphicon glyphicon-info-sign button-icon-right" data-position="right"></i></button><span class="uib_shim"></span></div></div></div><div class="modal-footer"></div></div></div></div>' );    
}






var waitingDialog = (function (cash) {

    // Creating modal dialog's DOM
 var $dialog = $(
  '<div class="modal fade" data-backdrop="false" data-keyboard="true" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
  '<div class="modal-dialog modal-m">' +
  '<div class="modal-content">' +
   '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
   '<div class="modal-body">' +
    '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
   '</div>' +
  '</div></div></div>');

 return {
  /**
   * Opens our dialog
   * @param message Custom message
   * @param options Custom options:
   *       options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
   *       options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
   */
  show: function (message, options) {
   // Assigning defaults
   var settings = $.extend({
    dialogSize: 'm',
    progressType: ''
   }, options);
   if (typeof message === 'undefined') {
    message = 'Cargando...';
   }
   if (typeof options === 'undefined') {
    options = {};
   }
   // Configuring dialog
   $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
   $dialog.find('.progress-bar').attr('class', 'progress-bar');
   if (settings.progressType) {
    $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
   }
   $dialog.find('h3').text(message);
   // Opening dialog
   $dialog.modal();
  },
  /**
   * Closes dialog
   */
  hide: function () {
   $dialog.modal('hide');
  }
 }

})(jQuery);