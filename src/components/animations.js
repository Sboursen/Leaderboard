import {totalScores } from './utils';
export const savingAnimation = ` <i class="animate-spin fad fa-spinner-third"></i>
                          SAVING ....`;

export function animateRefreshButton(bool) {
  if (bool) {
    return `Refresh
              <span
              class="absolute -top-1 -right-1 inline-flex h-3 w-3 rounded-full bg-st opacity-75"></span>
            <span
              class="animate-ping absolute -top-1 -right-1 inline-flex h-3 w-3 rounded-full bg-sky-500  opacity-75"></span>`;
  } else {
    return 'Refresh';
  }
}
