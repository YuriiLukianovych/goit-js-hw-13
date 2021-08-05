// функция, которая делает запрос на сервер и возвращает промис с ответом
function fetchImages(name) {
   const API_KEY = '1719842-829ac206ae49bf14fe6b0938c';
   const BASE_URL = 'https://pixabay.com/api/';
   return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`,
   ).then(response => {
      if (!response.ok) {
         throw new Error(response.status);
      }
      return response.json();
   });
}
export { fetchImages };
