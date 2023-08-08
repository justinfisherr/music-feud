import * as admin from "firebase-admin";

//@ts-ignore
import serviceAccount from "../../musicKey.json";

export function initializeDatabase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
  console.log("Connected to firestore");
}
