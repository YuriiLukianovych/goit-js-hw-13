import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { getCountriesList, getCountryCard } from './js/renderMarkup';
import _throttle from 'lodash.throttle';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 3000;

// получить ссылки на элементы DOM
const refs = {
   searchInput: document.querySelector('#search-box'),
   countryList: document.querySelector('.country-list'),
   countryInfoBlock: document.querySelector('.country-info'),
};
export { refs };

refs.searchInput.addEventListener(
   'input',
   _throttle(onInputChange, DEBOUNCE_DELAY),
);

function onInputChange(e) {
   const filter = e.target.value.toLowerCase().trim();
   if (filter.length === 0) {
      return;
   }
   fetchCountries(filter)
      .then(countries => {
         if (countries.length > 10) {
            clearList();
            Notify.info(
               'Too many matches found. Please enter a more specific name.',
            );
         } else if (countries.length === 1) {
            getCountryCard(countries);
         } else {
            getCountriesList(countries);
         }
      })
      .catch(() => {
         clearList();
         Notify.failure('Oops, there is no country with that name');
      });
}

function clearList() {
   refs.countryList.innerHTML = '';
   refs.countryInfoBlock.innerHTML = '';
}
