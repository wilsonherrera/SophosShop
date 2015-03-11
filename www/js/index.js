function authHandler(response){
	waitingDialog.hide();
	switch(response){
		case '1':
			localStorage.userName = document.getElementById("username").value;
              localStorage.password=document.getElementById("password").value;
			//alert("Bienvenido "+ document.getElementById("username").value);
			setTimeout(function(){
			navigation('login')},0);
		break;//as
		case '0':
			alert("El usuario o contraseña ingresados son incorrectos");
		break;
		case '-1':
			alert("Sucedio un error no esperado, por favor intentelo mas tarde o comuniquese con el            administrador");
		break;
	}     
}