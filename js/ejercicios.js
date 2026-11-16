
"use strict";

// Ejercicio 1: Detectar si una cadena es palindromo.

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]/gu, "");
}

function esPalindromo(texto) {
    const limpio = normalizarTexto(texto);

    if (limpio.length === 0) {
        return false;
    }

    const invertido = [...limpio].reverse().join("");

    return limpio === invertido;
}

document.getElementById("form-palindromo")
    .addEventListener("submit", function (evento) {
        evento.preventDefault();

        const texto = document
            .getElementById("texto-palindromo")
            .value;

        const resultado = document
            .getElementById("resultado-palindromo");

        if (normalizarTexto(texto).length === 0) {
            resultado.textContent =
                "Introduce una palabra o frase valida.";
            resultado.className = "resultado error";
            return;
        }

        if (esPalindromo(texto)) {
            resultado.textContent =
                `"${texto}" SI es un palindromo.`;
            resultado.className = "resultado correcto";
        } else {
            resultado.textContent =
                `"${texto}" NO es un palindromo.`;
            resultado.className = "resultado error";
        }
    });


// ===========================================
// Ejercicio 2: Comparar dos numeros
// ===========================================

function compararNumeros(numero1, numero2) {
    if (numero1 > numero2) {
        return `El numero mayor es ${numero1}.`;
    }

    if (numero2 > numero1) {
        return `El numero mayor es ${numero2}.`;
    }

    return `Ambos numeros son iguales: ${numero1}.`;
}

document.getElementById("form-comparar")
    .addEventListener("submit", function (evento) {
        evento.preventDefault();

        const campo1 = document.getElementById("numero1");
        const campo2 = document.getElementById("numero2");
        const resultado = document.getElementById(
            "resultado-comparar"
        );

        if (campo1.value.trim() === "" ||
            campo2.value.trim() === "") {
            resultado.textContent =
                "Debes introducir ambos numeros.";
            resultado.className = "resultado error";
            return;
        }

        const numero1 = Number(campo1.value);
        const numero2 = Number(campo2.value);

        if (!Number.isFinite(numero1) ||
            !Number.isFinite(numero2)) {
            resultado.textContent =
                "Introduce numeros validos.";
            resultado.className = "resultado error";
            return;
        }

        resultado.textContent = compararNumeros(
            numero1,
            numero2
        );
        resultado.className = "resultado correcto";
    });


// ===========================================
// Ejercicio 3: Identificar vocales
// ===========================================

function identificarVocales(frase) {
    const vocales = frase.match(/[aeiouáéíóúü]/gi) || [];
    return vocales.map(vocal => vocal.toLowerCase());
}

document.getElementById("form-vocales")
    .addEventListener("submit", function (evento) {
        evento.preventDefault();

        const frase = document.getElementById(
            "frase-vocales"
        ).value;

        const resultado = document.getElementById(
            "resultado-vocales"
        );

        const vocales = identificarVocales(frase);

        if (vocales.length === 0) {
            resultado.textContent =
                "No se encontraron vocales.";
        } else {
            resultado.textContent =
                `Vocales encontradas: ${vocales.join(", ")}`;
        }

        resultado.className = "resultado correcto";
    });


// ===========================================
// Ejercicio 4: Contar vocales
// ===========================================

function contarVocales(frase) {
    const conteo = {
        a: 0,
        e: 0,
        i: 0,
        o: 0,
        u: 0
    };

    const texto = frase
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    for (const caracter of texto) {
        if (Object.prototype.hasOwnProperty.call(
            conteo, caracter
        )) {
            conteo[caracter]++;
        }
    }

    return conteo;
}

document.getElementById("form-contar-vocales")
    .addEventListener("submit", function (evento) {
        evento.preventDefault();

        const frase = document.getElementById(
            "frase-contar"
        ).value;

        const resultado = document.getElementById(
            "resultado-contar"
        );

        const conteo = contarVocales(frase);

        const texto = Object.entries(conteo)
            .map(([vocal, cantidad]) =>
                `${vocal}: ${cantidad}`
            )
            .join(" | ");

        resultado.textContent = texto;
        resultado.className = "resultado correcto";
    });
