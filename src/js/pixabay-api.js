'use strict';

const pixabayApiUrl = 'https://pixabay.com/api/';

export function fetchImages(userInput) {
  const searchParams = new URLSearchParams({
    q: userInput,
    key: '45298002-4b3df346318b923a57726fdbd',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 9,
  });

  return fetch(`${pixabayApiUrl}?${searchParams.toString()}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}