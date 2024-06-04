import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    const { _id: id, name, health, attack, defense, source } = fighter;
    // todo: show fighter info (image, name, health, etc.)

    const nameElement = createElement({
        tagName: 'div'
        // className: `fighter-preview___root ${positionClassName}`
    });
    nameElement.innerText = `${id}. - ${name}`;
    const healthElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`,
        attributes: {
            style: 'font-size: 32px; color: red;'
        }
    });
    healthElement.innerText = `${health} level`;

    fighterElement.innerHTML = '';

    fighterElement.append(nameElement, healthElement);

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
