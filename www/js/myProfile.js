//recibe los datos del usuario logeado nombres, ventas imagen etc y las asigna a la vista
function profileHandler(jsonResponse){
	waitingDialog.hide();
	document.getElementById('userName').innerHTML = jsonResponse.firstName;
    document.getElementById('sales').innerHTML = jsonResponse.sales;
    document.getElementById('purchases').innerHTML = jsonResponse.purchases;
    document.getElementById('ranking').innerHTML = jsonResponse.lastName;
     var image = document.getElementById('profile_img');
	image.src = "http://190.143.91.138:9191/Prestashop/img/userprofile/"+localStorage.userName+"/profile.jpg" ;
}

//funcion para tomar una foto con la camara
function getPhotoProfile() {
	navigator.camera.getPicture(onPhotoURISuccessProfile, onFailProfile, {
		quality: 50,
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType: 1
	});
}

//toma la imagen en base 64 que retorno la camara, la signa a la vista y la envia al servidor
function onPhotoURISuccessProfile(imageData) {
	localStorage.imgData = imageData;
	var image = document.getElementById('profile_img');
	image.src = "data:image/jpeg;base64," + imageData;
     updateProfilePhoto() ;
}

//lanzado cuando falla la captura de la camara
function onFailProfile(message) {
	alert("Error al cargar la imagen " + message);
}

//toma una imagen existente en el celular
function getPhotoFromGallery2(){
navigator.camera.getPicture(onSuccess, onFailProfile, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });
}

//toma la ruta de la imagen que se tomo del celular, la asigna a la vista y la envia al servidor
function onSuccess(imageURI) {
    var image = document.getElementById('profile_img');
    image.src = imageURI;
     var c = document.createElement('canvas');
     var ctx = c.getContext("2d");
    ctx.drawImage(image,5, 5);
      var imagen=c.toDataURL("image/jpeg");
      localStorage.imgData = imagen.substring(22);
     updateProfilePhoto() ;
}

//envia la foto al servidor
function updateProfilePhoto() {
	localStorage.imgData = localStorage.imgData.replace(/[+ ]/g, '%2B');
     addProfilePhoto(localStorage.userName, messageHandlerProfilePhoto, localStorage.imgData);
}

//muestra si la foto fue guardada en el servidor o no. Recibe la respuesta del servicio
function messageHandlerProfilePhoto(response) {
	waitingDialog.hide();
	if (response === '1') {
		alert("Foto almacenada");
	} else {
		alert("Error - " + response);
	}
}


//toma la uri de la imagen y retorna su equivalente en base 64
function encodeImageUri2(imageUri)
{
     var c=document.createElement('canvas');
     var ctx=c.getContext("2d");
     var img=new Image();
     img.onload = function(){
       c.width=this.width;
       c.height=this.height;
       ctx.drawImage(img, 0,0);
     };
     img.src=imageUri;
     var dataURL = c.toDataURL("image/jpeg");
     return dataURL;
}