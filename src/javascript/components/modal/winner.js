import showModal from './modal';
import createElement from '../../helpers/domHelper';
// eslint-disable-next-line import/no-cycle
// import App from '../../app';

export default function showWinnerModal(fighter) {
    const bodyElement = createElement({ tagName: 'div', className: 'modal-body' });
    const fighterName = createElement({ tagName: 'h1' });
    fighterName.innerText = `Our ${fighter.name}!`;

    const fighterImage = createElement({
        tagName: 'img',
        attributes: { src: fighter.source }
    });

    fighterImage.style.maxWidth = '100%';

    bodyElement.append(fighterName, fighterImage);

    showModal({
        title: `Winner is !!!`,
        bodyElement,
        onClose: () => {
            const root = document.getElementById('root');

            root.innerHTML = '';

            // App.startApplication(); // looks like circular dependency
            window.location.reload();
        }
    });
}
