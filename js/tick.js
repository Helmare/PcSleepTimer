function tick() {
    postMessage(null);
    setTimeout(tick, 1000);
}
tick();