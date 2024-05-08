gsap.registerPlugin(ScrollTrigger)

gsap.to('.square', {
    scale: 10,
    duration: 6,
    scrollTrigger: {
        trigger: '.square',
        start: 'top top',
        end: 'bottom+=200 top',
        scrub: 3,
        pin: '.section2',
        pinSpacing: true,
        toggleActions: 'play reverse play reverse',
        markers: true
    }
})
