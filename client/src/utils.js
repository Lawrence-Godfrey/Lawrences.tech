
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


/**
 * Creates an object that maps line numbers (from a text field for example)
 * to the id of the corresponding line element.
 * @param {string} text
 * @param {Object} lineToIdMapRef
 */
function populateLineToIdMap(text, lineToIdMapRef) {
    const lines = text.split('\n');
    const newMap = {};
    lines.forEach((line, index) => {
        newMap[index + 1] = `line-${index + 1}`;
    });
    lineToIdMapRef.current = newMap;
}


/**
 * Scrolls an element to a specific line.
 * @param {string} targetId
 */
function scrollToLine(targetId) {
    if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 0);
        }
    }
}


export { preventScrollChaining, populateLineToIdMap, scrollToLine };
