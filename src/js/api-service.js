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

      // const response = await fetch(url);
      const response = await axios.get(url);
      // const imagesObj = await response.json();
      const imagesObj = response.data;
      this.page += 1;
      return imagesObj;
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
