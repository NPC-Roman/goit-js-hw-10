// Import сторонніх бібліотек
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

// Змінні для елементів DOM
const breedSelect = document.querySelector('.breed-select');
const divPictEl = document.querySelector('.cat-info-pict');
const divDescEl = document.querySelector('.cat-info-desc');
const loaderEl = document.querySelector('.loader');

// Функція, що фетчить список усіх порід котів
const fetchBreeds = () => {
  return fetch(`${url1}?api_key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

// Функція, що фетчить опис конкретної породи кота по breedId
const fetchCatByBreed = breedId => {
  return fetch(`${url2}/${breedId}?api_key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

// Функція, що генерує розмітку опису обраної породи кота (картинка та текст)
const renderBreedDesc = breed => {
  const markupPicture = `<img class="cat-picture" src="${breed.url}" alt="${breed.id}">`;
  const markupDescript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
    <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
    <p class="cat-info-desc-temp"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
  divPictEl.insertAdjacentHTML('beforeend', markupPicture);
  divDescEl.insertAdjacentHTML('beforeend', markupDescript);
};

// Функція, що генерує розмітку випадаючого списку
const renderBreedsSelect = breeds => {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  // Ініціалізація бібліотеки 'slim-select' на сгенерований select
  new SlimSelect({
    select: '#single',
  });
};

// Функція, яка виконується при виборі породи кота у списку (подія change на селекті)
// Функція, яка виконується при виборі породи кота у списку (подія change на селекті)
function onChangeSelect(event) {
  loaderEl.classList.remove('unvisible');
  divPictEl.innerHTML = '';
  divDescEl.innerHTML = '';
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
      loaderEl.classList.add('unvisible');

      // Генерація випадкового кольору та зміна кольору фону
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

// Функція, що фетчить дані та на їх основі створює розмітку випадаючого списку (працює відразу після завантаження сторінки)
const fetchAndRenderBreeds = () => {
  loaderEl.classList.remove('unvisible');
  fetchBreeds()
    .then(breeds => renderBreedsSelect(breeds))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loaderEl.classList.add('unvisible');
      breedSelect.classList.remove('unvisible');
    });
};

// Унікальний ключ доступу до Cat API
const KEY =
  'live_SuxLaeL5ZwQ8jCf9HLGaCILAmryULP7zAomPmG0UGGJU0M3xHqLTfFbcVBurOAq8';
const url1 = 'https://api.thecatapi.com/v1/breeds';
const url2 = 'https://api.thecatapi.com/v1/images';

// Додавання події на селект
breedSelect.addEventListener('change', onChangeSelect);

// Завантаження списку порід та рендеринг при завантаженні сторінки
fetchAndRenderBreeds();

const colors = ['#47d147', '#ff8080', 'pink', '#80b3ff', 'orchid', '#1ad1ff'];
const max = colors.length - 1;
const min = 0;
const index = Math.round(Math.random() * (max - min) + min);
const color = colors[index];
console.log(color);
document.body.style.backgroundColor = color;
