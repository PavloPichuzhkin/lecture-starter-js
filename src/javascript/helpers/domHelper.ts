export default function createElement({
    tagName,
    className,
    attributes = {}
}: {
    tagName: keyof HTMLElementTagNameMap;
    className: string;
    attributes?: any;
}) {
    const element = document.createElement<keyof HTMLElementTagNameMap>(tagName);

    if (className) {
        const classNames = className.split(' ').filter(Boolean); // Include only not empty className values after the splitting
        element.classList.add(...classNames);
    }

    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
}
