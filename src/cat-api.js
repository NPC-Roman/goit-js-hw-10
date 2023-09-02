const KEY =
  'live_SuxLaeL5ZwQ8jCf9HLGaCILAmryULP7zAomPmG0UGGJU0M3xHqLTfFbcVBurOAq8';
/*const url1 = 'https://api.thecatapi.com/v1/breeds';*/
const url2 = 'https://api.thecatapi.com/v1/images';
/*
const fetchBreeds = () => {
  return fetch(`${url1}?api_key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

const fetchAndRenderBreeds = () => {
  elements.loader.classList.remove('unvisible');
  fetchBreeds()
    .then(breeds => renderBreedsSelect(breeds))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      elements.loader.classList.add('unvisible');
      elements.breedSelect.classList.remove('unvisible');
    });
};
*/
const fetchCatByBreed = breedId => {
  return fetch(`${url2}/${breedId}?api_key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export { fetchCatByBreed };
