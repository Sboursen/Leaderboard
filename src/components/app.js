import leaderBoard from './api';
import Score from './score';
import { scoreList } from './utils';
export default class Application {
  constructor() {
    this.leaderBoard = leaderBoard;
    this.scoreList = scoreList;
  }

  #getScoreFromAPI = (score) => {
    const scoreObj = new Score(score.name, score.score);
    return scoreObj;
  };

  #createScoreElement = (score) =>
    `<li>${score.getName()}: ${score.getScore()}</li>`;

  #clearList = () => {
    this.scoreList.innerHTML = '';
  };

  displayScores = () => {
    this.#clearList();
    let allScores = '';
    this.leaderBoard.forEach((s) => {
      const score = this.#getScoreFromAPI(s);
      allScores += this.#createScoreElement(score);
    });
    this.scoreList.innerHTML = allScores;
  };
}
