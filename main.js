// main.js

window.addEventListener("load", () => {
    const loaderWrapper = document.querySelector(".loader-wrapper");
    const sprite = document.querySelector(".loader");
    const text = document.querySelector(".loading-text");
    const body = document.body;

    // Función que inicia la secuencia de salida
    const startTransition = () => {
        // Evitar que se ejecute dos veces
        if (loaderWrapper.classList.contains("transition-started")) return;
        loaderWrapper.classList.add("transition-started");

        // PASO 1: Ocultar el texto inmediatamente
        if(text) text.classList.add("text-hidden");

        // PASO 2: Iniciar el agrandamiento del sprite (Zoom)
        sprite.classList.add("loader-grow");

        // PASO 3: Esperar a que termine el zoom (0.8s = 800ms) para quitar el fondo
        setTimeout(() => {
    
    // Ocultar el loader
    loaderWrapper.classList.add("loader-hidden");
    
    // Reactivar scroll
    body.classList.remove("no-scroll");

    // --- NUEVO: Hacemos que el header baje ---
    const header = document.querySelector("header");
    if (header) header.classList.add("header-drop-in");
    // ----------------------------------------

    // Animaciones del resto del contenido (textos subiendo)
    const elementsToAnimate = document.querySelectorAll('.animate-on-load');
    elementsToAnimate.forEach(el => el.classList.add('animated-in'));

}, 800);

        // PASO 4: Limpieza final del DOM
        loaderWrapper.addEventListener("transitionend", (e) => {
            // Solo removemos si es el wrapper el que terminó la transición (no el sprite)
            if (e.target === loaderWrapper && body.contains(loaderWrapper)) {
                body.removeChild(loaderWrapper);
            }
        });
    };

    // Ejecutar cuando carga todo
    startTransition();
    
    // Fallback de seguridad (por si tarda mucho)
    setTimeout(startTransition, 5000);
});