import LeaderBoard from './leaderboard-api';
import Score from './score';
import {
  scoreList,
  sortArrayByProperty,
  refreshButton,
  submitButton,
  nameInput,
  scoreInput,
} from './utils';

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
    this.getAllScores();
    this.#registerEvents();
  };

  #refreshScoreList = () => {
    const newScores = this.#sortAndSliceByScores(
      this.scoreData,
    );
    this.#displayScores(newScores);
  };

  #submitScore = (e) => {
    e.preventDefault();
    const user = this.nameInput.value;
    const score = Number(this.scoreInput.value);
    const newUserScore = {
      user,
      score,
    };

    this.#updateScoreData(newUserScore);
    this.#clearInputElements();
  };

  #updateScoreData = ({ user, score }) => {
    this.scoreData.push({ user, score });

    this.leaderboard.addData(
      this.leaderboard.scoresEndpoint,
      {
        user,
        score,
      },
    );
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
    this.scoreList.innerHTML = ulContent;
  };
}
