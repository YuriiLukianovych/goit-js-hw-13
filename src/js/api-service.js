import axios from 'axios';

export default class PixabayApi {
   constructor() {
      this.searchQuery = '';
      this.page = 1;
      this.perPage = 40;
   }
   async fetchImages() {
      const API_KEY = '1719842-829ac206ae49bf14fe6b0938c';
      const BASE_URL = 'https://pixabay.com/api/';
      const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;

      const response = await fetch(url);
      const imagesObj = await response.json();
      this.page += 1;
      return imagesObj;
      // fetch(url)
      //    .then(response => {
      //       if (!response.ok) {
      //          throw new Error(response.status);
      //       }
      //       return response.json();
      //    })
      //    .then(data => {
      //       this.page += 1;
      //       return data;
      //    });
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
