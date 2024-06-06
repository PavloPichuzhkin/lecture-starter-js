import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    const { _id: id, name, health, attack, defense, source } = fighter;
    // todo: show fighter info (image, name, health, etc.)
    const attributes = {
        style: 'font-size: 32px; color: #470303; font-weight: 700;'
    };

    const imgElement = createFighterImage(fighter);
    fighterElement.appendChild(imgElement);

    const nameElement = createElement({
        tagName: 'span',
        className: ``,
        attributes
    });
    nameElement.innerText = ` ${name}`;
    fighterElement.appendChild(nameElement);

    const healthElement = createElement({
        tagName: 'span',
        className: `${positionClassName}`,
        attributes
    });
    healthElement.innerText = `Health ${health}`;
    fighterElement.appendChild(healthElement);

    const attackElement = createElement({
        tagName: 'span',
        className: `${positionClassName}`,
        attributes
    });
    attackElement.innerText = `Attack: ${attack}`;
    fighterElement.appendChild(attackElement);

    const defenseElement = createElement({
        tagName: 'span',
        className: `${positionClassName}`,
        attributes
    });
    defenseElement.innerText = `Defense: ${defense}`;
    fighterElement.appendChild(defenseElement);

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
