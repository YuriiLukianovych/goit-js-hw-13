import './css/styles.css';
import { fetchImages } from './js/api-service';
import { renderImagesList } from './js/renderMarkup';
import throttle from 'lodash.throttle';
import { Notify } from 'notiflix';

const THROTTLE_DELAY = 300;

// получить ссылки на элементы DOM
const refs = {
   searchInput: document.querySelector('#search-box'),
   searchForm: document.querySelector('#search-form'),
   submitBtn: document.querySelector('.btn'),
   galleryBox: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener(
   'submit',
   throttle(onSubmitClick, THROTTLE_DELAY),
);

function onSubmitClick(e) {
   e.preventDefault();
   const form = e.currentTarget;
   const searchQuery = form.elements.searchQuery.value.toLowerCase().trim();

   if (searchQuery.length === 0) {
      clearList();
      return;
   }
   fetchImages(searchQuery)
      .then(imgs => {
         const { hits } = imgs;
         if (hits.length === 0) {
            Notify.failure(
               'Sorry, there are no images matching your search query. Please try again.',
            );
         }
         renderImagesList(hits);
      })
      .catch(error => {
         clearList();
         Notify.failure(error.message);
      })
      .finally(() => form.reset());
}

function clearList() {
   refs.galleryBox.innerHTML = '';
}

export { refs, clearList };
