export default class LeaderBoard {
  constructor(
    gameName = 'the game of life',
    url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/',
  ) {
    this.gameName = gameName;
    this.gameEndpoint = `${url}games/`;
    this.defaultGameId = 'kybUuoT0GHauBW6cK4us';

    this.#createNewGame().then((json) => {
      [, , , this.defaultGameId] = json.result.split(' ');
      console.log(this.defaultGameId);
    });

    this.scoresEndpoint = `${url}games/${this.defaultGameId}/scores/`;

    this.getData(this.scoresEndpoint).then((data) =>
      console.log(data),
    );

    this.addData(this.scoresEndpoint, {
      user: 'Soufiane',
      score: 100,
    }).then((data) => console.log(data));
  }

  #createNewGame = async (
    url = this.gameEndpoint,
    data = { name: this.gameName },
  ) => {
    let result;
    if (
      url !==
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/' ||
      data.name !== 'the game of life'
    ) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const newGameId = await response.json();
      result = newGameId;
    } else {
      result = new Promise((resolve) => {
        const emulateResponse = {
          result: [
            null,
            null,
            null,
            this.defaultGameId,
          ].join(' '),
        };
        resolve(emulateResponse);
      });
    }
    return result;
  };

  getData = async (url = this.scoresEndpoint) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  addData = async (
    url = this.scoresEndpoint,
    { user, score },
  ) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ user, score }),
    });

    const data = await response.json();
    return data;
  };
}
