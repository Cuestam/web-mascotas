
/*----------ANIMACION NAVBAR------------- */

let ubicacionPrincipal = window.pageYOffset;

window.addEventListener("scroll", function () {
    let desplazamientoActual = window.pageYOffset;
    if (ubicacionPrincipal >= desplazamientoActual) {
        document.getElementsByTagName("nav")[0].style.top = "0px"
        
    } else {
        document.getElementsByTagName("nav")[0].style.transition = ".4s"
        document.getElementsByTagName("nav")[0].style.top = "-150px"
        
    }
    ubicacionPrincipal = desplazamientoActual;
})

/* ------------TEMPLATE FOOTER---------------*/

document.getElementById('footer').innerHTML = `
<div class="contacto">
<h3 class="contactoh3">Contacto</h3>
<p class="textoF">Como organización sabemos que cada mascota cuenta, seguinos en nuestras redes y participa activamente.</p>
<ul>
    <a href="https://www.instagram.com"><img src="/imagenes/instagram.png" alt="logo instagram"></a>
    <a href="https://es-la.facebook.com"><img src="/imagenes/facebook.png" alt="logo facebook"></a>
    <a href "https://linkedin.com" ><img src="/imagenes/linkedin.png" alt="logo linkedin"></a>
    <a href="https://twitter.com"><img src="/imagenes/twitter.png" alt="logo twitter"></a>
</ul>
</div>
<div class="divForm">
<h3 class="contactoh3">Dejanos un mensaje</h3>
<form class="formFooter" id="formF" action="https://formspree.io/f/xknezwev" method="POST">
    <input type="text" required name= "Nombre y apellido" placeholder="Nombre y apellido">
    <input type="email" required  name="Email" placeholder="Email">
    <textarea required name="Mensaje" placeholder= "Mensaje.." cols="30" rows="8"></textarea>
    <button id="btnF" class="btnF2">Enviar</button>
</form>
</div>
<div class="iframeC">
<h3 class="contactoh3">Ubicación</h3>
<iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2763.4549089622583!2d-58.70772162255647!3d-34.54544631244493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbd08e1288033%3A0x549270e7cba7c494!2sAv.%20Pte.%20J.%20D.%20Per%C3%B3n%201010%2C%20B1662ASX%20Mu%C3%B1iz%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1663540193434!5m2!1ses-419!2sar"
     style="border:0;" allowfullscreen="" loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>`



    /*<--- FORMULARIO MENSAJES ---> */

    let formulario = document.getElementById("formF");

    async function handleSubmit(event) {
      event.preventDefault();
     
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: formulario.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }

      }).then(response => {
        if (response.ok) {
          Swal.fire(
            'Mensaje enviado!',
            'Nos prondremos en contacto a la brevedad',
            'success'
          )
          formulario.reset()
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
    formulario.addEventListener("submit", handleSubmit)
    


/* ---------------- TEMPLATE CARDS MASCOTAS ------------- */

for (let elemento of mascotas) {
    let card = document.createElement("div");
    card.innerHTML = ` <div class="containerCard" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
    <div>
        <img class= "imageCard" src=${elemento.imagePath} alt="perro 6">
        <h3>${elemento.nombre}</h3>
        <p>${elemento.descripcion}
        </p>
    </div>
     <button class="btnCard" id="${elemento.modal}"> <img src="/imagenes/mas.png" alt="icono más"></button>
</div>`

    let contenedor = document.getElementById("contenedorCard")

    contenedor.appendChild(card)
}
/* ----------  MODAL ------------ */

// Añadir un objeto de atributos a un elemento
const addAttributes = (element, attrObj) => {
    for (let attr in attrObj) {
        if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr])
    }
};

// Crear elementos con atributos e hijo
const createCustomElement = (element, attributes, children) => {
    let customElement = document.createElement(element);
    if (children !== undefined) children.forEach(el => {
        if (el.nodeType) {
            if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
        } else {
            customElement.innerHTML += el;
        }
    });
    addAttributes(customElement, attributes);
    return customElement;
};

// Imprimir modal
const printModal = content => {
    // crear contenedor interno
    const modalContentEl = createCustomElement('div', {
        id: 'ed-modal-content',
        class: 'ed-modal-content'
    }, [content]),

        // crear contenedor principal
        modalContainerEl = createCustomElement('div', {
            id: 'ed-modal-container',
            class: 'ed-modal-container'
        }, [modalContentEl]);

    // Imprimir el modal
    document.body.appendChild(modalContainerEl);

    // Remover el modal
    const removeModal = () => document.body.removeChild(modalContainerEl);

    modalContainerEl.addEventListener('click', e => {
        if (e.target === modalContainerEl) removeModal();
    })
}

mascotas.forEach((elemento) => {

    const saludo = `
                    <img class= "imageModal" src=${elemento.imagePath} alt="perro ${elemento.id}">
                    <div class="modal"> 
                     <h2 class="tituloM">${elemento.nombre} </h2>
                     <h4> Edad: ${elemento.edad}</h4>
                     <h4> Tamaño: ${elemento.tamanio}</h4>
                     <h4> Vacunas: ${elemento.vacunas}</h4>
                     <h4> Castrado: ${elemento.castrado}</h4>
                     <p class="pMod">${elemento.descripcion}</p>
                     <button class="btnPostulate"><a href="postulaciones.html">Postulate</a></button>
                     </div>
    `;

    document.getElementById(elemento.modal).addEventListener('click', () => {
        printModal(saludo);
    });
})



    
    

