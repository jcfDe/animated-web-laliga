const circulo = document.querySelector('.circulo');
const logo = document.querySelector('.logo');
const gradiente = document.querySelector('.gradiente');
const intro = document.querySelector('.intro')



gsap.set([circulo, logo], { opacity: 0, scale: 0.5 });

gsap.to([circulo, logo], {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: 'power2.out',
});

gsap.set([gradiente], { background: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgb(0 0 0) 0%)" });
gsap.to([gradiente], {
    background: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgb(0 0 0) 400%)",
    duration: 3,
    ease: 'power2.out',
    delay: 0,
    onComplete: () => {
        // Esta función se ejecutará una vez que la animación termine
        gradiente.style.display = "none";
    },
});

gsap.registerPlugin(ScrollTrigger)


gsap.set('.nav-bar', {
    opacity: 0,
    y: -80
})

gsap.set('.hero-title', {
    opacity: 0,
    y: 80
})
gsap.set('.sec1', {
    opacity: 0,
    y: 0
})

//--------------------------Animacion automática--------------------

setTimeout(function () {
    gsap.to('.circulo', {
        scale: 7,
        rotation: 360,
        duration: 2,

    })
    gsap.to('.logo', {
        y: -1000,
        opacity: 0,
        duration: 2,

    }, 0)
    gsap.to('.intro', {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        duration: 2.5,
        ease: 'power2.out',
        onComplete: () => {
            document.getElementById('sec-intro').remove();
            gsap.to('.sec1', { // Animación para hacer aparecer la sección sec1
                opacity: 1,
                duration: 0.5,
                y: 0,
            })
            gsap.to('.nav-bar', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power1.out'
            })
            gsap.to('.hero-title', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power1.out'
            });
        },
    }, 0)
},1000)

/* 
//--------------------------------------------Animacion controlada-------------------------------
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.intro',
        start: '1px top',
        end: '100% 80%',
        //scrub: 2, //Scrub: usuario controla animacion
        ease: 'power1.out',
        pin: '.intro',
        pinSpacing: false,
        toggleActions: 'play none none none',
        markers: true,
    }
})



tl.to('.circulo', {
    scale: 7,
    rotation: 360,
    duration: 1,

})
tl.to('.logo', {
    y: -1000,
    opacity: 0,
    duration: 1,

}, 0).to('.intro', {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    duration: 1,
    ease: 'power2.out',
    onComplete: () => {
        document.getElementById('sec-intro').remove();
        gsap.to('.sec1', { // Animación para hacer aparecer la sección sec1
            opacity: 1,
            duration: 0.5,
            y: 0,
        })
        gsap.to('.nav-bar', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power1.out'
        })
        gsap.to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power1.out'
        });
    },
}, 0)


// Agregamos la animación que deseamos a .sec1 cuando esté fijo
gsap.to('.sec1', {
    scrollTrigger: {
        trigger: '.sec1',
        start: '1px top', // Comienza cuando la parte superior de .sec1 alcanza la parte superior de la ventana gráfica
        end: '1000px', // Termina después de desplazar 100vh hacia abajo
        pin: true, // Fija el elemento en la pantalla
        pinSpacing: true, // Fija el elemento sin espacio adicional
        markers: true, // Puedes quitar esto en producción; son marcadores para depurar
    },
    duration: 1,
    ease: 'power1.out'
});
*/

// ---------------------------- section 2 -------------------------------

let text;

function runSplit() {
    if (text) {
        text.revert();
    }
    let currentElement = document.getElementById("target");
    text = new SplitType(currentElement, { types: "lines, words" });
    const linesEl = document.querySelectorAll(".line");
    linesEl.forEach((item) => {
        item.innerHTML += '<div class="line-mask"></div>';
        item.style.letterSpacing = "-2px";
    });
}

runSplit();


const myEl = document.querySelectorAll(".line");
let yOffset = 0; // Inicializa el desplazamiento vertical en 0
let yOffsetB = 200; // Inicializa el desplazamiento vertical en 0

myEl.forEach((triggerElement) => {
    let targetElement = triggerElement.querySelector(".line-mask");
    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: triggerElement,
            // start: "top center",
            //end: "bottom center",

            start: `top+=${yOffset}px 30%`, // Inicio con yOffset
            end: `bottom+=${yOffsetB}px 30%`, // Final con yOffset

            pin: '.sec2',
            scrub: 1,
            pinSpacing: true,
            toggleActions: 'play none reverse none',
            markers: false
        }
    });
    tl2.to(targetElement, {
        width: "0%",
        duration: 2
    });

    yOffset += 200; // Aumenta el desplazamiento vertical en 200px para el próximo elemento
    yOffsetB += 200; // Aumenta el desplazamiento vertical en 200px para el próximo elemento
});

window.addEventListener("resize", async function() {
    //if (text) {
    //    text.revert();
    //}
    // Realiza otras operaciones de redimensionamiento si es necesario

    //runSplit(); // Vuelve a inicializar SplitText
    //await ScrollTrigger.refresh(); // Actualiza las animaciones de ScrollTrigger
    document.querySelector('#sec-intro').classList.add('delete');

});

// ---------------------------- section 3 -------------------------------

gsap.set('.card', {
    opacity: 0,
    y: 240,
});
gsap.set('.section-title', {
    opacity: 0,
    y: 200,
});

gsap.to('.card', {
    scrollTrigger: {
        trigger: '.sec3',
        start: 'top 60%',
        end: 'top 40%',
        ease: 'power1.out',
        markers: false,
        toggleActions: 'play none play none',
        onReverseComplete: () => {
            gsap.set('.card', { opacity: 0, y: 240 }); // Revierte la animación
        }
    },
    opacity: 1,
    y: 0,
    duration: 1,
});
gsap.to('.section-title', {
    scrollTrigger: {
        trigger: '.sec3',
        start: 'top 60%',
        end: 'top 40%',
        ease: 'power1.out',
        markers: false,
        toggleActions: 'play none play none',
        onReverseComplete: () => {
            gsap.set('.section-title', { opacity: 0, y: 200 }); // Revierte la animación
        }
    },
    opacity: 1,
    y: 0,
    duration: 1,
});

// ---------------------------- section 4 -------------------------------



//------------------------ Animaciones menos de 769px -----------------

// Función para verificar el ancho de la pantalla y ejecutar la acción correspondiente
function verificarAnchoDePantalla() {
    // Obtiene el ancho de la pantalla
    const anchoDePantalla = window.innerWidth;

    // Verifica si el ancho de la pantalla es menor que 769 píxeles
    if (anchoDePantalla < 769) {
        gsap.set(['.card2-1', '.card2-2', '.card2-3', '.section-title2'], {
            opacity: 0,
            y: 340,
        })

        gsap.to('.section-title2', {
            opacity: 1,
            y: 0,
            duration: 0.33,
            scrollTrigger: {
                trigger: '.sec4',
                start: 'top 60%', // Cambia esto para que inicie cuando está a un 60% de la pantalla
                end: 'bottom bottom',
                ease: 'power1.out',
                markers: false,
                toggleActions: 'play none play none',
            }
        })

        gsap.to('.card2-1', {
            opacity: 1,
            y: 0,
            duration: 0.33,
            scrollTrigger: {
                trigger: '.sec4',
                start: 'top 60%', // Cambia esto para que inicie cuando está a un 60% de la pantalla
                end: 'bottom 60%', // Cambia esto para que termine cuando está a un 60% de la pantalla
                ease: 'power1.out',
                markers: false,
                toggleActions: 'play none play none',
                onReverseComplete: () => {
                    gsap.set('.card2-1', { opacity: 0, y: 340 }); // Revierte la animación
                }
            }
        })

        gsap.to('.card2-2', {
            opacity: 1,
            y: 0,
            duration: 0.66,
            scrollTrigger: {
                trigger: '.card2-1',
                start: 'top 60%', // Cambia esto para que inicie cuando está a un 60% de la pantalla
                end: 'bottom 60%', // Cambia esto para que termine cuando está a un 60% de la pantalla
                ease: 'power1.out',
                markers: false,
                toggleActions: 'play none play none',
                onReverseComplete: () => {
                    gsap.set('.card2-2', { opacity: 0, y: 340 }); // Revierte la animación
                }
            }
        })

        gsap.to('.card2-3', {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.card2-2',
                start: 'top 60%', // Cambia esto para que inicie cuando está a un 60% de la pantalla
                end: 'bottom 60%', // Cambia esto para que termine cuando está a un 60% de la pantalla
                ease: 'power1.out',
                markers: false,
                toggleActions: 'play none play none',
                onReverseComplete: () => {
                    gsap.set('.card2-3', { opacity: 0, y: 340 }); // Revierte la animación
                }
            }
        })

    }
    else {

        gsap.set(['.card2-1', '.card2-2', '.card2-3', '.section-title2'], {
            opacity: 0,
            y: 340,
        })

        gsap.to('.section-title2', {
            opacity: 1,
            y: 0,
            duration: 0.33,
            scrollTrigger: {
                trigger: '.sec4',
                start: 'top 60%',
                end: 'top 40%',
                ease: 'power1.out',
                markers: false,
                toggleActions: 'play none play none',
                onReverseComplete: () => {
                    gsap.set('.card2-1', { opacity: 0, y: 340 }); // Revierte la animación
                }
            }
        })
        gsap.to('.card2-1', {
            opacity: 1,
            y: 0,
            duration: 0.33,
            scrollTrigger: {
                trigger: '.sec4',
                start: 'top 60%',
                end: 'top 40%',
                ease: 'power1.out',
                markers: false,
                toggleActions: 'play none play none',
                onReverseComplete: () => {
                    gsap.set('.card2-1', { opacity: 0, y: 340 }); // Revierte la animación
                }
            }
        })
        gsap.to('.card2-2', {
            opacity: 1,
            y: 0,
            duration: 0.66,
            scrollTrigger: {
                trigger: '.sec4',
                start: 'top 60%',
                end: 'top 40%',
                ease: 'power1.out',
                markers: false,
                toggleActions: 'play none play none',
                onReverseComplete: () => {
                    gsap.set('.card2-2', { opacity: 0, y: 340 }); // Revierte la animación
                }
            }
        })
        gsap.to('.card2-3', {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.sec4',
                start: 'top 60%',
                end: 'top 40%',
                ease: 'power1.out',
                markers: false,
                toggleActions: 'play none play none',
                onReverseComplete: () => {
                    gsap.set('.card2-3', { opacity: 0, y: 340 }); // Revierte la animación
                }
            }
        })
    }
}

// Llama a la función para verificar el ancho de pantalla cuando la página se carga
window.addEventListener('load', verificarAnchoDePantalla);

// Llama a la función para verificar el ancho de pantalla cuando se redimensiona la ventana
window.addEventListener('resize', verificarAnchoDePantalla);

//---------------------Sec5------------------------
gsap.set(['.sec5'], {
    opacity: 0,
    y: 140,
})

gsap.to('.sec5', {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '.sec5',
        start: 'top 80%',
        end: 'top 40%',
        ease: 'power1.out',
        markers: false,
        toggleActions: 'play none play none',
    }
})
gsap.set(['.sec6'], {
    opacity: 0,
    y: 140,
})

gsap.to('.sec6', {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '.sec6',
        start: 'top 80%',
        end: 'top 40%',
        ease: 'power1.out',
        markers: false,
        toggleActions: 'play none play none',
    }
})
//----------------------IFRAME RESIZE-------------------------------

let iframeDesktop = document.getElementById('iframeDesktop');
let iframeMobile = document.getElementById('iframeMobile');
