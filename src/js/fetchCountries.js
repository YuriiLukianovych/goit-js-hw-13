// функция, которая делает запрос на сервер и возвращает промис с ответом
function fetchCountries(name) {
   return fetch(
      `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`,
   ).then(response => {
      if (!response.ok) {
         throw new Error(response.status);
      }
      return response.json();
   });
}
export { fetchCountries };
