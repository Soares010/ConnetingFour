export const validate = (required, data) => {
  const emptyField = required.some((field) => {
    const value = data[field];

    if (value === null || value === undefined || !value) {
      return true;
    }

    if (value.trim() === "") {
      return true;
    }

    return false;
  });

  if (emptyField) {
    const message = "Precisa preencher todos os campos!";
    return message;
  }
  return null;
};
