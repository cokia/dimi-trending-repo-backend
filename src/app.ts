import express, { Application } from "express"
import {getRepoStargazers, getRepoLanguage} from "./githubapi"
import {addDBUser} from "./db"

class App {
  public application: Application;

  constructor(){
    this.application = express();
  }
}

const app = new App().application;
app.get("/", (req: express.Request, res: express.Response) =>{
  res.send("start");
})

app.listen(3000,() => {
  console.log("✅Start app server✅")
});

app.get('/', function(req, res) {
  res.status(200).send('Welcome to dimi-tranding-repo api server!');
});

app.get('/useradd', function(req, res) {
  res.status(400).send({ error: "is still develop..OTL i will dev ASAP :D" });
});

app.get('/get/rankedrepo', function(req, res) {
  res.status(400).send({ error: "is still develop..OTL i will dev ASAP :D" });
});

app.get('/get/rankeduser', function(req, res) {
  res.status(400).send({ error: "is still develop..OTL i will dev ASAP :D" });
});


app.post('/useradd', function(req, res) {
  let name:string = req.body.name
  let department:string = req.body.department
  let year:number = req.body.year
  let githubid:string = req.body.githubid
  try {
    addDBUser(name,department,year,githubid)
    res.status(200);

} catch (err) {
    console.error(err)
    res.status(500).send(err);
  }
});

