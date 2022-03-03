export const scoreList = document.querySelector('.list');
export const nameInput = document.querySelector('#name-input');
export const scoreInput = document.querySelector('#score-input');
export const submitButton = document.querySelector(
  '.submit-button',
);
export const refreshButton = document.querySelector(
  '.refresh-button',
);
export function sortArrayByProperty(array, property) {
  return array.sort((a, b) => b[property] - a[property]);
}
