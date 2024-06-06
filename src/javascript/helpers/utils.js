export const isEqualKeys = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());

export const arrayHasAllElementsOfArr = (arr, target) => target.every(v => arr.includes(v));

// export function throttle(fn, wait = 1000) {
//     let timeout;
//     let shouldThrottle = false;
//     return function (...args) {
//         if (!shouldThrottle) {
//             fn.apply(this, args);
//             shouldThrottle = true;
//             clearTimeout(timeout);
//
//             timeout = setTimeout(() => {
//                 shouldThrottle = false;
//             }, wait);
//         }
//     };
// }

export function throttle(fn, wait = 1000) {
    let timeout;
    let shouldThrottle;
    return (...args) => {
        if (shouldThrottle) return;
        shouldThrottle = true;
        timeout = setTimeout(() => {
            fn.apply(this, args);

            shouldThrottle = false;
            clearTimeout(timeout);
        }, wait);
    };
}
export const canCriticalHit = criticalHitTime => {
    const now = Date.now();
    if (now - criticalHitTime > 10000) {
        return true;
    }
    return false;
};
