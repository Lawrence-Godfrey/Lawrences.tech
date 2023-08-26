
/**
 * Prevents scroll chaining on a scrollable element.
 * @param {Object} event
 */
function preventScrollChaining(event) {
    const target = event.currentTarget;
    const atTop = target.scrollTop === 0;
    const atBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

    if (atTop && event.deltaY < 0) {
        event.preventDefault();
    }
    if (atBottom && event.deltaY > 0) {
        event.preventDefault();
    }
}

export { preventScrollChaining };
