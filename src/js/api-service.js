import axios from 'axios';

export default class PixabayApi {
   constructor() {
      this.searchQuery = '';
      this.page = 1;
   }
   fetchImages() {
      const API_KEY = '1719842-829ac206ae49bf14fe6b0938c';
      const BASE_URL = 'https://pixabay.com/api/';
      const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
      return fetch(url)
         .then(response => {
            if (!response.ok) {
               throw new Error(response.status);
            }
            return response.json();
         })
         .then(data => {
            this.page += 1;
            return data;
         });
   }
   get query() {
      return this.searchQuery;
   }
   set query(newQuery) {
      this.searchQuery = newQuery;
   }
}

// функция, которая делает запрос на сервер и возвращает промис с ответом
// function fetchImages(name) {
//    const API_KEY = '1719842-829ac206ae49bf14fe6b0938c';
//    const BASE_URL = 'https://pixabay.com/api/';
//    const url = `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;
//    return fetch(url).then(response => {
//       if (!response.ok) {
//          throw new Error(response.status);
//       }
//       return response.json();
//    });
// }

// function fetchImages(name) {
//    const API_KEY = '1719842-829ac206ae49bf14fe6b0938c';
//    const BASE_URL = 'https://pixabay.com/api/';
//    return axios
//       .get(BASE_URL, {
//          params: {
//             key: API_KEY,
//             q: name,
//             image_type=photo,
//             orientation=horizontal,
//             safesearch=true,
//             per_page=40,
//          },
//       })
//       .then(response => {
//          if (!response.ok) {
//             throw new Error(response.status);
//          }
//          return response.json();
//       });
// }

// export { fetchImages };
