let emailError = new RegExp('sa+r','i');

let regexEmail = (/^[^\S@]+@[^\S@]+\.[^\S@]+$/);


let boton = document.getElementById("boton");
boton.addEventListener("click", validarEmail);
/*let boton2 = document.getElementById("boton");
boton.addEventListener("click", validarContra);*/

 var patronEmail = (/^[^\S@]+@[^\S@]+\.[^\S@]+$/);
function validarEmail() {
   /* if(!patronEmail.test(email)){
        return patronEmail.test(email); 
    }else{
        alert("no funca");
    }*/
   
        if(!patronEmail.test(email)){
            emailError.textContent="mo che";
            return;
        }
}

 var patronContra = (/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[$@$!%?&])[A-Za-z\d$@$!%?&]{8,15}[^'\s]/);
function validarContra(contra) {
    if(!patronContra.test(contra)){
        return patronContra.test(contra); 
    }else{
        alert(`no funca CONTRA
                Minimo 8 caracteres
                Maximo 15
                Al menos una letra mayúscula
                Al menos una letra minucula
                Al menos un dígito
                No espacios en blanco
                Al menos 1 caracter especial`);
    }
   
}