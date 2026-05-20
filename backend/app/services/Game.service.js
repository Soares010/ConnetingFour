import prisma from "../database/prisma.js";

class GameService {
  async finishGame({ gameId, winnerName, isDraw }) {
    const game = await prisma.game.update({
      where: { id: gameId },

      data: {
        winnerName: isDraw ? null : winnerName,
        status: isDraw ? "DRAW" : "FINISHED",
      },
    });

    await prisma.gameLog.create({
      data: {
        gameId,
        action: isDraw ? "DRAW_GAME" : "PLAYER_WIN",
        message: isDraw
          ? "Jogo terminou em empate"
          : `${winnerName} venceu a partida`,
      },
    });

    if (!isDraw && winnerName) {
      await this.updateRanking(winnerName, true);
    }

    return game;
  }

  async addLog({ gameId, action, message }) {
    return await prisma.gameLog.create({
      data: {
        gameId,
        action,
        message,
      },
    });
  }

  async updateRanking(username, isWin) {
    const player = await prisma.player.findUnique({
      where: { username },
    });

    if (!player) return;

    await prisma.ranking.update({
      where: { playerId: player.id },

      data: {
        wins: isWin
          ? {
              increment: 1,
            }
          : undefined,
        losses: !isWin
          ? {
              increment: 1,
            }
          : undefined,
        points: isWin
          ? {
              increment: 3,
            }
          : {
              increment: 0,
            },
      },
    });
  }
}

export default new GameService();
