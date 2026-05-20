import prisma from "../database/prisma.js";

function generateGameToken() {
  return "GAME-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

class PlayerService {
  async create(data) {
    const { playerOne, playerTwo } = data;

    let firstPlayer = await prisma.player.findUnique({
      where: { username: playerOne },
    });

    if (!firstPlayer) {
      firstPlayer = await prisma.player.create({
        data: { username: playerOne },
      });

      await prisma.ranking.create({
        data: { playerId: firstPlayer.id },
      });
    }

    let secondPlayer = await prisma.player.findUnique({
      where: { username: playerTwo },
    });

    if (!secondPlayer) {
      secondPlayer = await prisma.player.create({
        data: { username: playerTwo },
      });

      await prisma.ranking.create({
        data: { playerId: secondPlayer.id },
      });
    }

    const gameToken = generateGameToken();

    const game = await prisma.game.create({
      data: {
        playerOneName: firstPlayer.username,
        playerTwoName: secondPlayer.username,

        gameToken,

        logs: {
          create: [
            {
              action: "START_GAME",
              message: `Partida iniciada (${gameToken}) entre ${firstPlayer.username} e ${secondPlayer.username}`,
            },
          ],
        },
      },

      include: {
        logs: true,
      },
    });

    return {
      playerOne,
      playerTwo,
      game,
      gameToken,
    };
  }
}

export default new PlayerService();
