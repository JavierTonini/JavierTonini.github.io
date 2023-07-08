
const getContenedorPelicula = async (pelicula) => {
    console.log(pelicula)
    const key = await getTrailerKey(pelicula.id)
    return `<div class="contenedorPeliculasFavoritas" id="contenedorPeliculasFavoritas">
    <div class="centrarimg">
        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="imagen">
    </div>
    <h3 class="titulo">${pelicula.title}</h3>
    <p><b>Código:</b> ${pelicula.id}<br>
    <p><b>Título original:</b> ${pelicula.original_title}<br>
    <b>Idioma original:</b> ${pelicula.original_language}<br>
    <b>Resumen:</b> ${pelicula.overview}</p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
   <div class="botones">
    <button class="boton" onclick="quitarfavoritos(${pelicula.id});">Quitar de favoritos</button>
   </div>
   </div>`
}

function mostrarpeliculas() {
    var resultados = document.getElementById('sec-favorities-list');
    var mensaje = document.getElementById("sec-messages")
    var body = ""
    let ltfavoritos = localStorage.getItem("Favoritos");
    if (ltfavoritos) {
        ltfavoritos = JSON.parse(ltfavoritos);
        for (var i = 0; i < ltfavoritos.length; i++) {
            let url = `https://api.themoviedb.org/3/movie/${ltfavoritos[i]}?api_key=efd50a2e67c9aad12da707e41cdf0736&language=es`;
            fetch(url)
                .then(response => response.json())
                .then(pelicula => getContenedorPelicula(pelicula))
                .then(pelicula2 => {
                    body += pelicula2
                    resultados.innerHTML = body

                })
                .catch(error => console.log(error))


        }
    }
    else {
        body += `<p id="warning">No tiene peliculas seleccionadas en favoritos</p>`
        mensaje.innerHTML = body
    }

}

mostrarpeliculas()

function quitarfavoritos(codigo) {
    let ltfavoritos = localStorage.getItem("Favoritos");
    ltfavoritos = JSON.parse(ltfavoritos);
    if (ltfavoritos.length != 1) {
        ltfavoritos = ltfavoritos.filter(v => v !== codigo);
        localStorage.setItem("Favoritos", JSON.stringify(ltfavoritos));
    } else {
        localStorage.removeItem("Favoritos");
    }
    location.reload();
}


async function getTrailerKey(id) {
    console.log({ id })
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=efd50a2e67c9aad12da707e41cdf0736&language=en-US`;
    const response = await fetch(url)
    const resultados = await response.json()
    const trailer = resultados.results.find((resultado) => {
        return resultado.type === "Trailer"
    })
    console.log({ resultados, trailer })
    return trailer.key
}