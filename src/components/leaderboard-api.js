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
    });
  }

  #createNewGame = async (
    url = this.gameEndpoint,
    data = { name: this.gameName },
  ) => {
    let result;
    if (
      url
        !== 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/'
      || data.name !== 'the game of life'
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
      result = new Promise((resolve, reject) => {
        resolve(this.defaultGameId);
      });
    }
    return result;
  };
}
