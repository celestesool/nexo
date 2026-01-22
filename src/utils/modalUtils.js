// Utility for managing modal open/close state
export const toggleBodyScroll = (isOpen) => {
  if (isOpen) {
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  } else {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
};

export const closeModalOnEscape = (callback) => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      callback();
    }
  };
  
  document.addEventListener('keydown', handleEscape);
  
  return () => {
    document.removeEventListener('keydown', handleEscape);
  };
};
