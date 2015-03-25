//recibe los datos del usuario logeado nombres, ventas imagen etc y las asigna a la vista
function profileHandler(jsonResponse){
	hideDialog();
     var image = document.getElementById('profile_img');
	//image.src = "http://190.143.91.138:9191/Prestashop/img/userprofile/"+localStorage.userName+"/profile.jpg";
	image.src = "images/loading.gif";
	document.getElementById('userName').innerHTML = jsonResponse.firstName;
    document.getElementById('sales').innerHTML = jsonResponse.sales;
    document.getElementById('purchases').innerHTML = jsonResponse.purchases;
    document.getElementById('ranking').innerHTML = jsonResponse.lastName;
    image.src = "http://190.143.91.138:9191/Prestashop/img/userprofile/"+localStorage.userName+"/profile.jpg";
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
function getImage()
{
    navigator.camera.getPicture(onCapturePhotoSuccess, onCapturePhotoError,{ quality: 80, 
        destinationType: navigator.camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
}

//toma la ruta de la imagen que se tomo del celular, la asigna a la vista y la envia al servidor
function onCapturePhotoSuccess(imageURI) 
{   
    var smallImage = document.getElementById('profile_img');
        smallImage.src = "data:image/jpeg;base64," + imageURI;
        localStorage.imgData=imageURI;
        updateProfilePhoto() ;
}

//captura del error
function onCapturePhotoError(message) 
{
    alert('Fallo: ' + message); 
}


//envia la foto al servidor
function updateProfilePhoto() {
	localStorage.imgData = localStorage.imgData.replace(/[+ ]/g, '%2B');
     addProfilePhoto(localStorage.userName, messageHandlerProfilePhoto, localStorage.imgData);
}

//muestra si la foto fue guardada en el servidor o no. Recibe la respuesta del servicio
function messageHandlerProfilePhoto(response) {
	hideDialog();
	if (response === '1') {
		alert("Foto almacenada");
	} else {
		alert("Error - " + response);
	}
}


