const KEY =
  'live_SuxLaeL5ZwQ8jCf9HLGaCILAmryULP7zAomPmG0UGGJU0M3xHqLTfFbcVBurOAq8';
const url2 = 'https://api.thecatapi.com/v1/images';

const fetchCatByBreed = breedId => {
  return fetch(`${url2}/${breedId}?api_key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export { fetchCatByBreed };
