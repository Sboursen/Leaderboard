import { alertElement, submitButton } from './utils';

function onTransitionComplete(resolve) {
  alertElement.removeEventListener(
    'transitionend',
    onTransitionComplete,
  );
  resolve();
}

export default function showAlert() {
  return new Promise((resolve) => {
    alertElement.addEventListener(
      'transitionend',
      () => onTransitionComplete(resolve),
      false,
    );

    alertElement.classList.add('.alert');
  });
}

submitButton.addEventListener('click', (e) => showAlert(e).then(() => alertElement.classList.remove('.alert')));
