//Server will be here. For now it will just start the app

import { initializeDatabase } from "./config/databaseInit";
import { musicFeud } from "./game";
import { player } from "./classes/player";
import { QuestionRepository, QuestionService } from "./repository/data";
initializeDatabase();
const repo = new QuestionRepository();
const questionService = new QuestionService(repo);

questionService.getRapQuestions().then((res) => {
  const questions = res;
  if (questions[0])
    musicFeud([new player("justin"), new player("fred")], questions);
});
