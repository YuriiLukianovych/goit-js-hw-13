import CardTpl from '../templates/card-template.hbs';
import { refs, clearList } from '../index';

function renderImagesList(arr) {
   clearList();
   const markup = arr.map(CardTpl).join('');
   refs.galleryBox.innerHTML = markup;
}

export { renderImagesList };
