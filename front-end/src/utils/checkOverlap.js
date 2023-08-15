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

const checkOverlap = (elementId) => {
    const targetElement = document.getElementById(elementId);
    const character = document.getElementById("character");
    if (!targetElement || !character) return false;

    const targetRect = targetElement.getBoundingClientRect();
    const characterRect = character.getBoundingClientRect();

    return !(
        targetRect.right < characterRect.left ||
        targetRect.left > characterRect.right ||
        targetRect.bottom < characterRect.top ||
        targetRect.top > characterRect.bottom
    );
    // return (
    //     targetRect.right >= characterRect.left &&
    //     targetRect.left <= characterRect.right &&
    //     targetRect.bottom >= characterRect.top &&
    //     targetRect.top <= characterRect.bottom
    // );
};

export default checkOverlap;