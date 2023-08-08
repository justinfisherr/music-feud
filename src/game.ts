import { player } from "./classes/player";
import { Question } from "./classes/question";
import promptSync from "prompt-sync";
const prompt = promptSync();

function playQuestion(players: player[], question: Question) {
  let playerTurn = 0;
  let player1 = players[0];
  let player2 = players[1];
  if (!player1 || !player2) return 0;
  while (
    (player1.attemptsRemaining || player2.attemptsRemaining) &&
    question.getNumOfAnswersRemanining()
  ) {
    let currPlayer = players[playerTurn];
    while (!currPlayer?.attemptsRemaining) {
      playerTurn = playerTurn + 1 === players.length ? 0 : playerTurn + 1;
      currPlayer = players[playerTurn];
    }
    if (currPlayer) {
      playerTurn = playerTurn + 1 === players.length ? 0 : playerTurn + 1;

      console.log(`${currPlayer.username}'s turn`);
      question.display();
      let ans = prompt("Answer: ");
      while (question.onBoard(ans)) {
        console.log("answer already on board");
        question.display();
        ans = prompt("Answer: ");
      }
      const correctAnswer = question.checkAnswer(ans);

      if (correctAnswer) {
        console.log("Correct!");
        currPlayer.points += question.getPoints(ans);
      } else {
        console.log("Wrong!");
        currPlayer.attemptsRemaining -= 1;
      }
    }
    console.log("SCOREBOARD: ");
    players.forEach((player) => {
      console.log(player.username, " : ", player.points);
    });
  }
  console.log("Round Finished!! ");
  console.log("Final Answers: ");
  question.displayAnswers();
  console.log("Current Score: ");
  players.forEach((player) => {
    player.attemptsRemaining = 1;
    console.log(player.username, " : ", player.points);
  });
}

export function musicFeud(players: player[], questions: Question[]) {
  while (questions.length) {
    const question = questions.shift();
    if (question) playQuestion(players, question);
  }

  console.log("GAME OVER");

  console.log("Final Scores: ");

  players.forEach((player) => {
    console.log(player.username, " : ", player.points);
  });

  return 0;
}
