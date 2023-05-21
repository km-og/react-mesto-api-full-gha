function renderLoading(initialValue, isLoading, textSaveBtn) {
  // const saveBtn = popup.querySelector(".popup__save-button");
  if (isLoading) {
    textSaveBtn = "Сохранение...";
  } else {
    textSaveBtn = initialValue;
  }
}

export { renderLoading };
