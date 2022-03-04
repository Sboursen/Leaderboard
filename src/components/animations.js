import {
  alertElement,
  submitButton,
} from './utils';

function onAnimationComplete(resolve) {
  alertElement.removeEventListener(
    'transitionend',
    onAnimationComplete,
  );
  resolve();
}

export default function showAlert(e) {
  return new Promise((resolve, reject) => {
    alertElement.addEventListener(
      'transitionend',
      (e) => onAnimationComplete(alertElement, resolve),
      false,
    );

    alertElement.classList.add('.alert');
  });
}

submitButton.addEventListener('click', (e) =>
  showAlert(e).then(() =>
    alertElement.classList.remove('.alert'),
  ),
);
