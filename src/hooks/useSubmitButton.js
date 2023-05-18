import React from "react";
const useSubmitButton = ({initialText, inputsValidity}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonText, setButtonText] = React.useState(initialText);
  const isSubmitDisabled = inputsValidity.some(isValid => !isValid) || isLoading

  return {
    setIsLoading,
    buttonText,
    setButtonText,
    isSubmitDisabled
  }
}

export default useSubmitButton