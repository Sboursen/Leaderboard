import LeaderBoard from './leaderboard-api';
import Score from './score';
import { scoreList, sortArrayByProperty } from './utils';

export default class Application {
  constructor() {
    this.leaderboard = new LeaderBoard();
    this.scoreData = [];
    this.scoreList = scoreList;
    this.getAllScores();
    this.maxDisplayedScores = 10;
  }

  getAllScores = () =>
    this.leaderboard
      .getData()
      .then((data) => [...data.result])
      .then((result) => {
        this.scoreData = result;
        this.#sortLeaderboardByScore();
        console.log(this.scoreData);
        const toBeDisplayedScores = this.scoreData.slice(
          0,
          this.maxDisplayedScores,
        );
        this.#displayScores(toBeDisplayedScores);
      });

  #createScoreElement = (score) =>
    `<li>${score.getName()}: ${score.getScore()}</li>`;

  #clearList = () => {
    this.scoreList.innerHTML = '';
  };

  #displayScores = (scores) => {
    this.#clearList();
    const ulContent = scores.reduce(
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

  #sortLeaderboardByScore = () => {
    this.scoreData = sortArrayByProperty(
      this.scoreData,
      'score',
    );
  };
}
