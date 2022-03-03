import LeaderBoard from './leaderboard-api';
import Score from './score';
import {
  scoreList,
  sortArrayByProperty,
  refreshButton,
} from './utils';

export default class Application {
  constructor() {
    this.leaderboard = new LeaderBoard();
    this.scoreData = [];
    this.scoreList = scoreList;
    this.maxDisplayed = 10;
    this.getAllScores();

    // dom operations
    this.refreshButton = refreshButton;
    this.#registerEvents();
  }

  #registerEvents = () => {
    this.refreshButton.addEventListener(
      'click',
      this.#refreshScoreList,
    );
  };

  #refreshScoreList = (e) => {
    const newScores = this.#sortAndSliceByScores(
      this.scoreData,
    );
    console.log('refresh');
    this.#displayScores(newScores);
  };

  getAllScores = () =>
    this.leaderboard
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
  ) =>
    sortArrayByProperty(this.scoreData, 'score').slice(
      0,
      this.maxDisplayed,
    );

  #createScoreElement = (score) =>
    `<li>${score.getName()}: ${score.getScore()}</li>`;

  #clearList = () => {
    this.scoreList.innerHTML = '';
  };

  #displayScores = (toBeDisplayed) => {
    this.#clearList();
    const ulContent = toBeDisplayed.reduce(
      (content, userScore) => {
        const score = new Score(
          userScore.user,
          userScore.score,
        );
        const scoreElement =
          this.#createScoreElement(score);
        return `${content}\n${scoreElement}`;
      },
      '',
    );
    this.scoreList.innerHTML = ulContent;
  };
}
