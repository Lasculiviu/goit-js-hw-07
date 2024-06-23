
import { galleryItems } from './gallery-items.js';


const lightboxCSS = document.createElement('link');
lightboxCSS.rel = 'stylesheet';
lightboxCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.1.3/simple-lightbox.min.css';
document.head.appendChild(lightboxCSS);


const lightboxScript = document.createElement('script');
lightboxScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.1.3/simple-lightbox.min.js';
document.body.appendChild(lightboxScript);

const galleryMarkup = galleryItems.map(({ preview, original, description }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
  </li>
`).join('');


const galleryContainer = document.querySelector('.gallery');
galleryContainer.innerHTML = galleryMarkup;


lightboxScript.onload = () => {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',  
    captionDelay: 250   
  });
};
