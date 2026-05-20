export const origins = () => {
  const allowedOrigins = [
    // Colocar o domínio de produção!
    "http://localhost:5173",
  ];

  const options = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const message = "Não está autorizado a acessar esta API.";
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };

  return options;
};
