
var mensajes = document.getElementById('mensajes')
var body = ""


const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'service_79q09cs';
   const templateID = 'template_ggf7l8p';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      body+=`<p id="success">Email enviado con exito</p>`        
      mensajes.innerHTML = body
    }, (err) => {
      btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
});

  function validarEmail() {
    var mensajes = document.getElementById('mensajes')
    var body = ""
    var email = document.getElementById('email').value
    // Expresión regular para validar el formato del correo electrónico
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email = re.test(email);
    console.log(email)
    if (email) {
        body+=`<p id="success">Email Valido</p>`        
        mensajes.innerHTML = body
    } else {
        body+=`<p class="error">Ingrese un Email válido</p>`        
        mensajes.innerHTML = body
    }
  }

  function limpiar(){
    document.getElementById("form").reset();
  }
