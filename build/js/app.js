document.addEventListener('DOMContentLoaded', function(){
    eventlistener();
});

function eventlistener(){
    barranav();
    scrollnav();
    darkMode();
    ocultarNavegacion();
}

function barranav(){
    const barranav = document.querySelector('.header');
    const acerca = document.querySelector('.perfil');
    const body = document.querySelector('body');

    if(acerca.getBoundingClientRect().top > 0){
        barranav.classList.add('nav-fijo');
        body.classList.add('body-esp');
    }else{
        barranav.classList.remove('nav-fijo');
        body.classList.remove('body-esp');
    }
    
}

function scrollnav(){
    const enlaces = document.querySelectorAll('.navegacion a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            console.log(enlace);
            const secciones = e.target.attributes.href.value;
            const seccion = document.querySelector(secciones);
            seccion.scrollIntoView({behavior: 'smooth'});
        })
    });

}

function darkMode(){
    const darkmode = document.querySelector('.modo-dark');

    darkmode.addEventListener('click', modoOscuro);

    function modoOscuro(){
        document.body.classList.toggle('oscuro')
    }
}

function ocultarNavegacion(){
    const barras = document.querySelector('.barras');
    const navegacion = document.querySelector('.navegacion')
    
    barras.addEventListener('click', ocultarNav);

    function ocultarNav(){
        navegacion.classList.toggle('ocultar');
    }
}