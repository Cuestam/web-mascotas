
/* <---- FORMULARIO POSTULACIONES ---> */

const form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault();

  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      Swal.fire(
        'Formulario enviado con exito!',
        'Nos prondremos en contacto a la brevedad',
        'success'
      )
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", ")) 
        } else {
        alert("Hubo un problema al enviar el fomulario")
        }
      })
    }
  }).catch(error => {
    alert("Hubo un problema al enviar el fomulario")
  });
  
}
form.addEventListener("submit", handleSubmit)


