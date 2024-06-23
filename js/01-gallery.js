import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');
}

galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImageURL = event.target.dataset.source;
  openModal(largeImageURL);
}

function openModal(imageURL) {
  // Creăm elementele modalului dinamic
  const modal = document.createElement('div');
  modal.classList.add('modal');
  
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalImage = document.createElement('img');
  modalImage.src = imageURL;
  modalImage.style.display = 'block';
  modalImage.style.maxWidth = '100vw';
  modalImage.style.maxHeight = '100vh';
  modalImage.style.margin = 'auto';

  const closeModalBtn = document.createElement('span');
  closeModalBtn.classList.add('close');
  closeModalBtn.innerHTML = '&times;';
  
  modalContent.appendChild(modalImage);
  modal.appendChild(modalContent);
  modal.appendChild(closeModalBtn);
  document.body.appendChild(modal);
  
  modal.style.display = 'flex';
  modal.style.position = 'fixed';
  modal.style.zIndex = '1000';
  modal.style.left = '0';
  modal.style.top = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.overflow = 'auto';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';

  closeModalBtn.style.position = 'absolute';
  closeModalBtn.style.top = '20px';
  closeModalBtn.style.right = '35px';
  closeModalBtn.style.color = '#fff';
  closeModalBtn.style.fontSize = '40px';
  closeModalBtn.style.fontWeight = 'bold';
  closeModalBtn.style.transition = '0.3s';
  
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', onEscKeyPress);

  function closeModal() {
    modal.remove();
    window.removeEventListener('keydown', onEscKeyPress);
  }

  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }
}
