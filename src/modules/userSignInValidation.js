const showErrorMessage = (message, element, isFormDisabled) => {
  if (isFormDisabled) {
    return (
      <p className="error" ref={element}>
        {message}
      </p>
    );
  } else {
    return null;
  }
};

export { showErrorMessage };
