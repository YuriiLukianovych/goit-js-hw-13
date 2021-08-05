import './css/styles.css';
import PixabayApi from './js/api-service';
import { renderImagesList } from './js/renderMarkup';
import throttle from 'lodash.throttle';
import { Notify } from 'notiflix';

const THROTTLE_DELAY = 1000;

// получить ссылки на элементы DOM
const refs = {
   searchInput: document.querySelector('#search-box'),
   searchForm: document.querySelector('#search-form'),
   submitBtn: document.querySelector('.btn'),
   galleryBox: document.querySelector('.gallery'),
   loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener(
   'submit',
   throttle(onSubmitClick, THROTTLE_DELAY),
);
refs.loadMoreBtn.addEventListener(
   'click',
   throttle(onLoadMore, THROTTLE_DELAY),
);

const pixabayApi = new PixabayApi();

function onSubmitClick(e) {
   e.preventDefault();
   clearList();
   const form = e.currentTarget;
   pixabayApi.query = form.elements.searchQuery.value.toLowerCase().trim();
   pixabayApi.resetPage();
   // if (pixabayApi.query.length === 0) {
   //    clearList();
   //    return;
   // }
   pixabayApi
      .fetchImages()
      .then(imgs => {
         if (imgs.length === 0) {
            clearList();
            Notify.failure(
               'Sorry, there are no images matching your search query. Please try again.',
            );
            return;
         }
         renderImagesList(imgs);
         refs.loadMoreBtn.style.display = 'inline-block';
      })
      .catch(error => {
         clearList();
         Notify.failure(error.message);
      })
      .finally(() => form.reset());
}

function onLoadMore(e) {
   pixabayApi.fetchImages().then(renderImagesList);
}

function clearList() {
   refs.loadMoreBtn.style.display = 'none';
   refs.galleryBox.innerHTML = '';
}

export { refs, clearList };
