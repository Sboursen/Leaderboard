import { sortArrayByProperty } from '../../components/utils';
import leaderBoard from '../__mocks__/leaderboard';

describe('sortArrayByProperty', () => {
  it('sorts a small scores array', () => {
    const scoresArr = leaderBoard.slice(0, 3);
    const expectedSortedArr = [
      { user: 'Name9', score: '300' },
      { user: 'Name3', score: '200' },
      { user: 'Name2', score: '100' },
    ];

    const sortedScoresArr = sortArrayByProperty(
      scoresArr,
      'score',
    );

    expect(sortedScoresArr).toEqual(expectedSortedArr);
  });

  it('sorts a larger scores array', () => {
    const scoresArr = leaderBoard;
    const expectedSortedArr = [
      { user: 'Name1', score: '900' },
      { user: 'Name6', score: '800' },
      { user: 'Name7', score: '700' },
      { user: 'Name5', score: '600' },
      { user: 'Name4', score: '500' },
      { user: 'Name8', score: '400' },
      { user: 'Name9', score: '300' },
      { user: 'Name3', score: '200' },
      { user: 'Name2', score: '100' },
    ];

    const sortedScoresArr = sortArrayByProperty(
      scoresArr,
      'score',
    );

    expect(sortedScoresArr).toEqual(expectedSortedArr);
  });
});
