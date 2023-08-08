import * as admin from "firebase-admin";
import { Question } from "../classes/question";
import { QuestionDoc } from "../interface/questionDoc";

export class QuestionRepository {
  private db = admin.firestore();
  private rap = this.db.collection("Rap Questions");

  async getRapDocs() {
    const snap = await this.rap.get();
    const snapSize = snap.size;

    const randomIndices = new Set<number>();
    while (randomIndices.size < 5) {
      const randomIndex = Math.floor(Math.random() * snapSize);
      randomIndices.add(randomIndex);
    }

    let docSnaps: admin.firestore.QueryDocumentSnapshot[] = [];

    snap.forEach((doc) => {
      docSnaps.push(doc);
    });

    let randomQuestions: QuestionDoc[] = [];
    randomIndices.forEach((index) => {
      if (docSnaps[index] !== undefined) {
        //@ts-ignore
        randomQuestions.push(docSnaps[index].data() as QuestionDoc);
      }
    });

    return randomQuestions;
  }
}

export class QuestionService {
  constructor(private readonly _questionRepo: QuestionRepository) {}
  async getRapQuestions() {
    const questionDocs = await this._questionRepo.getRapDocs();
    const questionArray = questionDocs.map((doc) => {
      return new Question(doc.question, doc.answers, doc.info);
    });
    return questionArray;
  }
}
