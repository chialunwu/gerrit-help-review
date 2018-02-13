function handleInputKeyDown({ target, key }) {
  if (key === 'Enter') {
    target.blur();
  }
}

export default { handleInputKeyDown };
