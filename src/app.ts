import express, { Application } from "express"
import {getRepoStargazers, getRepoLanguage} from "./githubapi"
import {addDBUser} from "./db"
import cors from "cors"


class App {
  public application: Application;

  constructor(){
    this.application = express();
  }
}

const app = new App().application;
app.use(cors());
// app.get("/", (req: express.Request, res: express.Response) =>{

app.listen(443,() => {
  console.log("✅Start dimi-tranding-repo api server✅")
});

app.get('/', function(req, res) {
  res.status(200).send('Welcome to dimi-tranding-repo api server!');
});

app.get('/api/v1/get/rankedrepo', function(req, res) {
  res.status(400).send({ error: "is still develop..OTL i will dev ASAP :D" });
});

app.get('/api/v1/get/rankeduser', function(req, res) {
  res.status(400).send({ error: "is still develop..OTL i will dev ASAP :D" });

});


app.post('/api/v1/useradd', function(req, res) {
  let name  = req.query.name;
  console.log(name)
  let department = req.query.department;
  let year = req.query.year; 
  let githubid = req.query.githubid;
  try {
    addDBUser(name,department,year,githubid)
    res.status(200).send("success");
} catch (err) {
    console.error(err)
    res.status(500).send(err);
  }
  //getRepoNewUser(githubid);
})