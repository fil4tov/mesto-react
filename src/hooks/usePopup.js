import React from "react";
const usePopup = ({initialIsOpen}) => {
  const [isOpen, setIsOpen] = React.useState(initialIsOpen);

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {isOpen, open, close}
}

export default usePopup