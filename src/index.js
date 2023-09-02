import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchCatByBreed } from './cat-api';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  divPicIt: document.querySelector('.cat-info-pic'),
  divDescIt: document.querySelector('.cat-info-desc'),
  loader: document.querySelector('.loader'),
};

const fetchBreeds = () => {
  return fetch(`${url1}?api_key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

const renderBreedDesc = breed => {
  const markupPicture = `<img class="cat-picture" src="${breed.url}" alt="${breed.id}">`;
  const markupDescript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
    <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
    <p class="cat-info-desc-temp"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
  elements.divPicIt.insertAdjacentHTML('beforeend', markupPicture);
  elements.divDescIt.insertAdjacentHTML('beforeend', markupDescript);
};

const renderBreedsSelect = breeds => {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
    })
    .join('');
  elements.breedSelect.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#main',
  });
};

function onChangeSelect(event) {
  elements.loader.classList.remove('unvisible');
  elements.divPicIt.innerHTML = '';
  elements.divDescIt.innerHTML = '';
  const breedId = event.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId)
    .then(breed => renderBreedDesc(breed))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      elements.loader.classList.add('unvisible');

      const colors = [
        '#47d147',
        '#ff8080',
        'pink',
        '#80b3ff',
        'orchid',
        '#1ad1ff',
        '#ffcc5c',
        '#b19cd9',
        '#4caf50',
        '#ff6f61',
        '#ffeb3b',
        '#00bcd4',
        '#e91e63',
        '#9c27b0',
        '#795548',
      ];
      const max = colors.length - 1;
      const min = 0;
      const index = Math.round(Math.random() * (max - min) + min);
      const color = colors[index];
      console.log(color);
      document.body.style.backgroundColor = color;
    });
}

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

const KEY =
  'live_SuxLaeL5ZwQ8jCf9HLGaCILAmryULP7zAomPmG0UGGJU0M3xHqLTfFbcVBurOAq8';
const url1 = 'https://api.thecatapi.com/v1/breeds';

elements.breedSelect.addEventListener('change', onChangeSelect);

fetchAndRenderBreeds();

const colors = ['#47d147', '#ff8080', 'pink', '#80b3ff', 'orchid', '#1ad1ff'];
const max = colors.length - 1;
const min = 0;
const index = Math.round(Math.random() * (max - min) + min);
const color = colors[index];
console.log(color);
document.body.style.backgroundColor = color;
