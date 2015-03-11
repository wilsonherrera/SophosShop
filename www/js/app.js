
function initApp(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
     
	document.getElementById("login").onclick = function () {
        validateLogin(document.getElementById("username").value,document.getElementById("password").value, authHandler);
          };
}

function onProductsInit(){
    
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