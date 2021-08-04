import countriesListTpl from '../templates/list-template.hbs';
import countryCardTpl from '../templates/country-card-template.hbs';
import { refs } from '../index';

function getCountriesList(resp) {
   refs.countryList.innerHTML = '';
   refs.countryInfoBlock.innerHTML = '';
   const markup = countriesListTpl(resp);
   refs.countryList.innerHTML = markup;
}
function getCountryCard(resp) {
   refs.countryList.innerHTML = '';
   refs.countryInfoBlock.innerHTML = '';
   const markup = countryCardTpl(resp);
   refs.countryInfoBlock.innerHTML = markup;
}

export { getCountriesList, getCountryCard };
