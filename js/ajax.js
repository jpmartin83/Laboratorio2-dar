"use strict";

// Laboratorio AJAX - XMLHttpRequest

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-ajax");
    const urlInput = document.getElementById("url-ajax");

    const estados = document.getElementById("ajax-estados");
    const contenidos = document.getElementById("ajax-contenidos");
    const cabeceras = document.getElementById("ajax-cabeceras");
    const codigo = document.getElementById("ajax-codigo");

    // AJAX1: Mostrar la URL de la pagina actual.
    urlInput.value = window.location.href;

    const nombresEstados = {
        0: "No iniciada (UNSENT)",
        1: "Conexion establecida (OPENED)",
        2: "Cabeceras recibidas (HEADERS_RECEIVED)",
        3: "Cargando contenido (LOADING)",
        4: "Peticion completada (DONE)"
    };

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const url = urlInput.value.trim();

        estados.textContent = "No iniciada (UNSENT)";
        contenidos.textContent = "";
        cabeceras.textContent = "";
        codigo.textContent = "";
        codigo.className = "salida-ajax";

        const xhr = new XMLHttpRequest();

        function registrarEstado() {
            estados.textContent +=
                "\nEstado " + xhr.readyState +
                ": " + nombresEstados[xhr.readyState];
        }

        xhr.onreadystatechange = function () {
            registrarEstado();

            if (xhr.readyState === XMLHttpRequest.DONE) {
                contenidos.textContent =
                    xhr.responseText || "(Respuesta vacia)";

                cabeceras.textContent =
                    xhr.getAllResponseHeaders() ||
                    "(Sin cabeceras disponibles)";

                codigo.textContent =
                    xhr.status + " " + xhr.statusText;

                codigo.className =
                    xhr.status >= 200 && xhr.status < 300
                        ? "salida-ajax correcto"
                        : "salida-ajax error";
            }
        };

        xhr.onerror = function () {
            codigo.textContent =
                "Error de red, conexion o CORS.";
            codigo.className = "salida-ajax error";
        };

        xhr.ontimeout = function () {
            codigo.textContent =
                "La peticion supero el tiempo limite.";
            codigo.className = "salida-ajax error";
        };

        xhr.timeout = 10000;

        try {
            xhr.open("GET", url, true);
            xhr.send();
        } catch (error) {
            estados.textContent +=
                "\nERROR: No se pudo iniciar la peticion.";
            codigo.textContent = error.message;
            codigo.className = "salida-ajax error";
        }
    });
});
