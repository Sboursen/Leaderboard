import LeaderBoard from './leaderboard-api';
import Score from './score';
import { scoreList, sortArrayByProperty } from './utils';

export default class Application {
  constructor() {
    this.leaderboard = new LeaderBoard();
    this.scoreData = [];
    this.scoreList = scoreList;
    this.maxDisplayed = 10;
    this.getAllScores();
  }

  getAllScores = () =>
    this.leaderboard
      .getData()
      .then((data) => [...data.result])
      .then((result) => {
        this.scoreData = result;
        const toBeDisplayed = this.#sortByScores(
          this.scoreData,
        );
        this.#displayScores(toBeDisplayed);
        console.log(this.scoreData);
      });

  #sortByScores = (scores) =>
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
