export default class Score {
  constructor(user, score = 100) {
    this.user = user;
    this.score = score;
  }

  getName = () => this.user;

  getScore = () => this.score;

  setName = (user) => {
    if (this.#isNameValid(user) === 1) {
      this.user = user;
    } else if (this.#isNameValid(user) === 0) {
      throw new Error('ERROR: NAME CAN NOT BE EMPTY');
    } else if (this.#isNameValid(user) === -1) {
      throw new Error('ERROR: NAME IS NOT A STRING');
    }
  };

  setScore = (score) => {
    if (this.#isScoreValid(score) === 1) {
      this.score = score;
    } else {
      throw new Error('ERROR: SCORE IS NOT INTEGER');
    }
  };

  #isScoreValid = (score) => {
    let res = 1;
    if (Number.isInteger(score)) {
      res = 1;
    } else {
      res = -1;
    }
    return res;
  };

  #isNameValid = (user) => {
    let res = 1;
    if (typeof user !== 'string') {
      res = -1;
    } else if (user.length === 0) {
      res = 0;
    } else {
      res = 1;
    }
    return res;
  };
}
