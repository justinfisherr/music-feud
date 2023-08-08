export class Question {
  private question: string;
  private answers: string[];
  private board: string[];
  private info: string;
  private answersRemanining: number;

  constructor(question: string, answers: string[], info: string) {
    this.question = question;
    this.answers = answers;
    this.info = info;
    this.board = [];
    this.answersRemanining = answers.length;
  }

  displayAnswers() {
    let i = 1;
    this.answers.forEach((answer) => {
      console.log(`${i}: ${answer}`);
      i += 1;
    });
    return this.answers;
  }

  getNumOfAnswersRemanining() {
    return this.answersRemanining;
  }

  display(): void {
    console.log(`${this.question} \n ${this.info}`);
  }

  onBoard(userAns: string) {
    return this.board.includes(userAns);
  }

  checkAnswer(userAns: string) {
    const correctAnswer = this.answers.includes(userAns);
    if (correctAnswer) {
      this.board.push(userAns);
      this.answersRemanining -= 1;
    }
    return correctAnswer;
  }
  getPoints(userAns: string) {
    let points = 0;
    if (this.answers.includes(userAns)) {
      const index = this.answers.indexOf(userAns);
      points = 5 - index;
    }
    return points;
  }
}
