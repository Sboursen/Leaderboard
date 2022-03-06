import LeaderBoard from './leaderboard-api';
import Score from './score';
import {
  scoreList,
  sortArrayByProperty,
  refreshButton,
  submitButton,
  nameInput,
  scoreInput,
  totalScores,
  alertElement,
} from './utils';

import {
  savingAnimation,
  animateRefreshButton,
} from './animations';

export default class Application {
  constructor() {
    this.leaderboard = new LeaderBoard();
    this.scoreData = [];
    this.scoreList = scoreList;
    this.maxDisplayed = 1000;

    // dom operations
    this.refreshButton = refreshButton;
    this.submitButton = submitButton;
    this.nameInput = nameInput;
    this.scoreInput = scoreInput;
    this.totalScores = totalScores;
    this.alertElement = alertElement;
  }

  #registerEvents = () => {
    this.refreshButton.addEventListener(
      'click',
      this.#refreshScoreList,
    );
    this.submitButton.addEventListener(
      'click',
      this.#submitScore,
    );
  };

  initialize = () => {
    this.#clearInputElements();
    this.getAllScores();
    this.#registerEvents();
  };

  #isValid = () => {
    let res = true;
    if (
      this.nameInput.value.trim() === ''
      || Number.isNaN(this.scoreInput.value)
    ) {
      res = false;
    } else if (
      this.nameInput.value.length > 20
      || this.scoreInput.value > 100000
      || this.scoreInput.value <= 0
    ) {
      return false;
    }
    return res;
  };

  #refreshScoreList = () => {
    const newScores = this.#sortAndSliceByScores(
      this.scoreData,
    );
    this.refreshButton.innerHTML = animateRefreshButton(false);
    this.#displayScores(newScores);
  };

  #submitScore = async () => {
    const user = this.nameInput.value;
    const score = Number(this.scoreInput.value);

    if (this.#isValid()) {
      const newUserScore = {
        user,
        score,
      };

      this.#updateScoreData(newUserScore);
      this.#clearInputElements();
    } else {
      alertElement.textContent = 'INVALID INPUT';
      setTimeout(() => {
        alertElement.textContent = '';
      }, 2000);
      this.#clearInputElements();
    }
  };

  #updateScoreData = ({ user, score }) => {
    alertElement.innerHTML = savingAnimation;
    this.leaderboard
      .addData(this.leaderboard.scoresEndpoint, {
        user,
        score,
      })
      .then(() => {
        alertElement.textContent = 'SUCCESS';
        this.scoreData.push({ user, score });
        this.#updateLeaderboardLength();
        this.refreshButton.innerHTML = animateRefreshButton(true);
        setTimeout(() => {
          alertElement.textContent = '';
        }, 3000);
      })
      .catch(() => {
        alertElement.textContent = 'FAILURE';
        setTimeout(() => {
          alertElement.textContent = '';
        }, 3000);
      });
  };

  getAllScores = () => this.leaderboard
    .getData()
    .then((data) => [...data.result])
    .then((result) => {
      this.scoreData = result;
      const toBeDisplayed = this.#sortAndSliceByScores(
        this.scoreData,
      );
      this.#displayScores(toBeDisplayed);
    });

  #sortAndSliceByScores = (
    scores,
    maxDisplayed = this.maxDisplayed,
  ) => sortArrayByProperty(this.scoreData, 'score').slice(
    0,
    maxDisplayed,
  );

  #createScoreElement = (score) => `
          <li>
          <div>
            <i class="fas fa-medal"></i>
          </div>
          <div class="name-score">${score.getName()}: ${score.getScore()}</div>
          <div>
          </div>
        </li>`;

  #clearList = () => {
    this.scoreList.innerHTML = '';
  };

  #clearInputElements = () => {
    this.nameInput.value = '';
    this.scoreInput.value = '';
  };

  #displayScores = (toBeDisplayed) => {
    this.#clearList();
    const ulContent = toBeDisplayed.reduce(
      (content, userScore) => {
        const score = new Score(
          userScore.user,
          userScore.score,
        );
        const scoreElement = this.#createScoreElement(score);
        return `${content}\n${scoreElement}`;
      },
      '',
    );
    this.#updateLeaderboardLength();
    this.scoreList.innerHTML = ulContent;
  };

  #updateLeaderboardLength = () => {
    this.totalScores.textContent = this.scoreData.length;
  };
}
