export const errors = (error, setError) => {
  if (!error.response?.data) {
    setError("Erro de conexão com o servidor!");
    return;
  }

  const dataError = error.response.data;

  if (dataError.details && Array.isArray(dataError.details)) {
    setError(dataError.details[0]);
    return;
  }

  if (dataError.message) {
    setError(dataError.message);
    return;
  }

  setError("Ocorreu um erro inesperado!");
};
