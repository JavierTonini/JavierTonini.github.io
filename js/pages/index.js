
var nroPagina = 1;


function mostrarpeliculas(nroPagina) {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=efd50a2e67c9aad12da707e41cdf0736&language=es&page=${nroPagina}`;
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data.results))
        .catch(error => console.log(error))

    const mostrarData = (data) => {
        console.log(data)
        var body = ""
        var resultados = document.getElementById('sec_peliculas');
        for (var i = 0; i < data.length; i++) {
            body += `<div class="contenedorPeliculas" > 
               <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}">
               <h3 class="titulo">${data[i].title}</h3>
               <p><b>Código:</b> ${data[i].id}<br>
               <b>Título original:</b> ${data[i].original_title}<br>
               <b>Idioma original:</b> ${data[i].original_language}<br>
               <b>Año:</b> ${data[i].release_date}<br> 
               <div class="botones">
                <button class="boton" onclick="Guardarfavorito(${data[i].id});">Agregar a Favoritos</button>
               </div>
               </div>`
        }
        resultados.innerHTML = body
    }
}

mostrarpeliculas(1)

function btnAnterior() {
    if (nroPagina > 1) {
        nroPagina -= 1
        mostrarpeliculas(nroPagina)
    } else {
        mostrarpeliculas(nroPagina)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(nroPagina)
}

function btnSiguiente() {
    nroPagina += 1
    mostrarpeliculas(nroPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(nroPagina)
}

function Guardarfavorito(codigo) {

    mensajes = document.getElementById('sec-messages')
    let body = ""
    let ltfavoritos = localStorage.getItem("Favoritos");

    if (ltfavoritos) {
        ltfavoritos = JSON.parse(ltfavoritos);
    } else {
        ltfavoritos = [];
    }
    if (ltfavoritos.includes(codigo)) {
        body += `<p id="warning">La Película ingresada ya se encuentra almacenada</p>`
        mensajes.innerHTML = body
    } else {
        body += `<p id="success">Película agregada con éxito</p>`
        mensajes.innerHTML = body
        ltfavoritos.push(codigo);
        localStorage.setItem("Favoritos", JSON.stringify(ltfavoritos));
    }

}

function Agregarfavorito() {

    mensajes = document.getElementById('sec-messages')
    var codigo = document.getElementById("codigo").value;
    codigo = parseInt(codigo)
    let ltfavoritos = localStorage.getItem("Favoritos");

    let body = ""
    let url = `https://api.themoviedb.org/3/movie/${codigo}?api_key=efd50a2e67c9aad12da707e41cdf0736&language=es`;
    fetch(url)
        .then(response => response.json())
        .then(response => agregar(response))
        .catch(error => console.log(error))

    const agregar = (response) => {
        if (response.adult  != null) {
            console.log(response)
            if (ltfavoritos) {
                ltfavoritos = JSON.parse(ltfavoritos);
            } else {
                ltfavoritos = [];
            }
            if (ltfavoritos.includes(codigo)) {
                body += `<p id="warning">La Película ingresada ya se encuentra almacenada</p>`
                mensajes.innerHTML = body
            }
            else {
                body += `<p id="success">Película agregada con éxito</p>`
                mensajes.innerHTML = body
                ltfavoritos.push(codigo);
                localStorage.setItem("Favoritos", JSON.stringify(ltfavoritos));
            }
        } else {
            body += `<p id="error">Error: La Película seleccionada no se encuentra en la API o se produjo un error al consultar</p>`
            mensajes.innerHTML = body
        }
    }
}

