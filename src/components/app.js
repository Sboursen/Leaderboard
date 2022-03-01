import leaderBoard from './api';
import score from './score';
export default class Application {
  constructor() {
    this.leaderBoard = leaderBoard;
  }

  displayScores = () => {};

  #createScoreElement = (score) => `<li>${score.getName}: ${score.getScore}</li>`;
}
