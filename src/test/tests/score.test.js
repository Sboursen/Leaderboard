import Score from '../../components/score';

describe('Score', () => {
  it('allows to create a new score object', () => {
    const name = 'soufiane';
    const score = 100;

    const myScore = new Score(name, score);

    expect(myScore.name).toEqual(name);
    expect(myScore.score).toEqual(score);
  });

  it('uses getters and setters to access properties', () => {
    const name = 'soufiane';
    const score = 100;
    const myScore = new Score(name, score);

    myScore.setName('Boursen');
    myScore.setScore(1000);
    const savedName = myScore.getName();
    const savedScore = myScore.getScore();

    expect(savedName).toEqual('Boursen');
    expect(savedScore).toEqual(1000);
  });

  it('throws an error with non string names and non number scores', () => {
    const name = 'soufiane';
    const score = 100;
    const myScore = new Score(name, score);

    expect(() => myScore.setName('')).toThrowError(
      'ERROR: NAME CAN NOT BE EMPTY',
    );
    expect(() => myScore.setScore('2.4')).toThrowError(
      'ERROR: SCORE IS NOT INTEGER',
    );
  });
});
