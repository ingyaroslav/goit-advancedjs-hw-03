'use strict';

import iziToast from 'izitoast';
import svgUrlX from '../src/img/x.svg';
import { fetchImages } from '../src/js/pixabay-api.js';
import { renderImages } from '../src/js/render-functions.js';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-wrapper span');

form.addEventListener('submit', event => {
  event.preventDefault();
  gallery.innerHTML = '';
  let userInput = form.elements['userinput'].value;
  if (!userInput) {
    iziToast.show({
      message: 'Search field can not be empty!',
      messageColor: '#ffffff',
      color: '#EF4040',
      position: 'topRight',
      displayMode: 1,
      iconUrl: `${svgUrlX}`,
    });
  } else {
    loader.classList.add('loader');
    fetchImages(userInput.trim())
      .then(images => {
        if (images['hits'].length === 0) {
          iziToast.show({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            messageColor: '#ffffff',
            color: '#EF4040',
            position: 'topRight',
            displayMode: 1,
            iconUrl: `${svgUrlX}`,
          });
        } else {
          renderImages(images['hits'], gallery);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        form.reset();
        loader.classList.remove('loader');
      });
  }
});