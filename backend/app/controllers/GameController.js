import GameService from "../services/Game.service.js";

class GameController {
  static async finish(request, response) {
    try {
      const { gameId, winnerName, isDraw } = request.body;

      const game = await GameService.finishGame({
        gameId,
        winnerName,
        isDraw,
      });

      return response.json({
        message: `O jogador ${winnerName} venceu a partida!`,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao finalizar jogo",
      });
    }
  }

  static async addLog(request, response) {
    try {
      const log = await GameService.addLog(request.body);

      return response.json(log);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao adicionar log",
      });
    }
  }
}

export default GameController;
