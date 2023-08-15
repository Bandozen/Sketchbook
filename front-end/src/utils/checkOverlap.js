// const checkOverlap = (elementId) => {
//     const targetElement = document.getElementById(elementId);
//     if (!targetElement) return false;

//     const targetRect = targetElement.getBoundingClientRect();

//     return !(
//         targetRect.right < characterRect.left ||
//         targetRect.left > characterRect.right ||
//         targetRect.bottom < characterRect.top ||
//         targetRect.top > characterRect.bottom
//     );
//     // return (
//     //     targetRect.right >= characterRect.left &&
//     //     targetRect.left <= characterRect.right &&
//     //     targetRect.bottom >= characterRect.top &&
//     //     targetRect.top <= characterRect.bottom
//     // );
// };

// export default checkOverlap;

const checkOverlap = (elementId, LhLeft, LhTop, RhLeft, RhTop) => {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return false;

    const targetRect = targetElement.getBoundingClientRect();

    return ((
        LhLeft <= targetRect.right &&
        LhLeft >= targetRect.left &&
        LhTop >= targetRect.bottom &&
        LhTop <= targetRect.top
    ) || (
        RhLeft <= targetRect.right &&
        RhLeft >= targetRect.left &&
        RhTop >= targetRect.bottom &&
        RhTop <= targetRect.top
    ));
};

export default checkOverlap;