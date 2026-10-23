(() => {
    const spotlight = document.querySelector(".cursor-spotlight");
    if (!spotlight) return;

    const capability = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    function paint() {
        frame = 0;
        if (!capability.matches) return;
        spotlight.style.setProperty("--spotlight-x", `${pointerX}px`);
        spotlight.style.setProperty("--spotlight-y", `${pointerY}px`);
        spotlight.style.setProperty("--spotlight-opacity", "1");
    }

    function hide() {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        spotlight.style.setProperty("--spotlight-opacity", "0");
    }

    window.addEventListener("pointermove", (event) => {
        if (!capability.matches) return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!frame) frame = requestAnimationFrame(paint);
    }, { passive: true });

    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    capability.addEventListener("change", hide);
})();
