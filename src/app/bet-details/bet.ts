export class Bet {
  id: number;
  time: string;
  team1: TeamData;
  team2: TeamData;
  player1: PlayerData;
  player2: PlayerData;
  canBet: boolean;
}

class TeamData {
  name: string;
  score: number;
}

class PlayerData {
  name: string;
  team1Bet: number;
  team2Bet: number;
  score: number;
}



