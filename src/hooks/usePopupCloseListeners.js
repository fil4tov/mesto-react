import React from "react";
const usePopupCloseListeners = (isOpen, handleClose) => {
  const handleCloseOnOverlay = e => {
    if (e.target.classList.contains('popup')) {
      handleClose()
    }
  }

  const handleCloseOnEsc = e => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  React.useEffect(() => {
    isOpen && document.addEventListener('keydown', handleCloseOnEsc)
    return () => document.removeEventListener('keydown', handleCloseOnEsc)
  }, [isOpen]);

  return {handleCloseOnOverlay}
}

export default usePopupCloseListeners