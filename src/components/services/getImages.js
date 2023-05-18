const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '8586853-360208b22f98fbf99c050b060';

const getImages = (value, page = 1) => {
  return fetch(
    `${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Sorry, we couldn't find ${value} `));
  });
};

export const api = {
  getImages,
};
