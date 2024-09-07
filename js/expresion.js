
let boton = document.getElementById("boton");
boton.addEventListener("click", verificar);
/*let boton2 = document.getElementById("boton");
boton.addEventListener("click", validarContra);*/


function verificar(){
    let email = document.getElementById('email');
    let contra = document.getElementById('contra');

    let emailPatron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let contraPatron = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    

    if(emailPatron.test(email.value)){
        alert('Correo valido.');
    }else{
        alert('correo invalido')   
    }

    if(contraPatron.test(contra.value)){
       alert('Contrseña valida')
    }else{
         alert('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.');
    }

    

}