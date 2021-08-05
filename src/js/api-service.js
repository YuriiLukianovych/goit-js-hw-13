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
            return data.hits;
         });
   }
   resetPage() {
      this.page = 1;
   }
   get query() {
      return this.searchQuery;
   }
   set query(newQuery) {
      this.searchQuery = newQuery;
   }
}
