import { sortArrayByProperty } from '../../components/utils';
import leaderBoard from '../__mocks__/leaderboard';

describe('sortArrayByProperty', () => {
  it('sorts a scores array', () => {
    const scoresArr = leaderBoard.slice(0, 3);
    const expectedSortedArr = [
      { user: 'Name5', score: '300' },
      { user: 'Name4', score: '200' },
      { user: 'Name1', score: '100' },
    ];

    const sortedScoresArr = sortArrayByProperty(
      scoresArr,
      'score',
    );

    expect(sortedScoresArr).toEqual(expectedSortedArr);
  });
});
