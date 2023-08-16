const checkOverlap = (elementId, LhLeft, LhTop, RhLeft, RhTop) => {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return false;

    const targetRect = targetElement.getBoundingClientRect();

    return ((
        LhLeft <= targetRect.right &&
        LhLeft >= targetRect.left &&
        LhTop <= targetRect.bottom &&
        LhTop >= targetRect.top
    ) || (
        RhLeft <= targetRect.right &&
        RhLeft >= targetRect.left &&
        RhTop <= targetRect.bottom &&
        RhTop >= targetRect.top
    ));
};

export default checkOverlap;