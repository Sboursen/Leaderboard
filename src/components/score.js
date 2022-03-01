export default class Score {
  constructor(name, score = 100) {
    this.name = name;
    this.score = score;
  }

  getName = () => this.name;

  getScore = () => this.score;

  setName = (name) => {
    if (this.#isNameValid(name) === 1) {
      this.name = name;
    } else if (this.#isNameValid(name) === 0) {
      throw new Error('ERROR: NAME CAN NOT BE EMPTY');
    } else if (this.#isNameValid(name) === -1) {
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

  #isNameValid = (name) => {
    let res = 1;
    if (typeof name !== 'string') {
      res = -1;
    } else if (name.length === 0) {
      res = 0;
    } else {
      res = 1;
    }
    return res;
  };
}
