import PlayerService from "../services/Player.service.js";

class PlayerController {
  static async createPlayer(request, response) {
    try {
      const player = await PlayerService.create(request.body);

      return response.status(201).json({
        message: "Partida criada com sucesso",
        player,
      });
    } catch (error) {
      console.log(error);

      return response.status(500).json({
        message: "Erro de servidor",
      });
    }
  }
}

export default PlayerController;
