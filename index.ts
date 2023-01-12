import express, { Request, Response } from "express";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
} from "firebase/firestore";
import dotenv from "dotenv";

const app = express(); //앱이라는 변수로 express를 땡겨쓸거다!
app.use(express.json());
app.use(express.urlencoded());

dotenv.config();
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  appId: process.env.APP_ID,
};

let firebaseApp: FirebaseApp; //firebase 메인 서비스
let firebaseDB: Firestore; //firestore 객체를 include

export const initFirebase = () => {
  firebaseApp = initializeApp(firebaseConfig);
  firebaseDB = getFirestore();
};

initFirebase();

//get : 기본 http 함수, 받아올 때 & post : 보낼 때 쓰기
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

interface postData {
  postTitle: String;
  postContext: String;
  postWriter: String;
  postDate: Number;
  postTag: Array<String>;
}

//addPost
app.post("/addPost", async (req: Request, res: Response) => {
  let postID: string = req.body.postID;

  const NEW_DATA: postData = {
    postTitle: req.body.postTitle,
    postContext: req.body.postContext,
    postWriter: req.body.postWriter,
    postDate: req.body.postDate,
    postTag: req.body.postTag,
  };

  await setDoc(doc(firebaseDB, "Q&A", "assignment1"), NEW_DATA);
  res.send(postID);
});

//getPostList
app.post("/getPostList", async (req: Request, res: Response) => {
  let postType: string = req.body.postType;
  res.send("??");
});

//getPostData
app.post("/getPostData", async (req: Request, res: Response) => {
  const docRef = doc(firebaseDB, "about", "0001");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }

  res.send(docSnap.data());
});

app.listen(8080, () => {
  //백엔드 기본 포트8080 : 변경해도되는데 80을 주로 씀!
  console.log("Server is Listening on Port 8080!");
});
