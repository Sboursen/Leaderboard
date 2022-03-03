import LeaderBoard from './leaderboard-api';
import Score from './score';
import { scoreList } from './utils';

export default class Application {
  constructor() {
    this.leaderboard = new LeaderBoard();
    this.scoreData = [];
    this.scoreList = scoreList;
    this.getAllScores();
  }

  getAllScores = () =>
    this.leaderboard
      .getData()
      .then((data) => [...data.result])
      .then((result) => {
        this.scoreData = result;
        console.log(result);
        this.#displayScores();
      });

  #createScoreElement = (score) =>
    `<li>${score.getName()}: ${score.getScore()}</li>`;

  #clearList = () => {
    this.scoreList.innerHTML = '';
  };

  #displayScores = () => {
    this.#clearList();
    const ulContent = this.scoreData.reduce(
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
