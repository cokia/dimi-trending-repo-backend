import express, { Application } from 'express';
import { getAllRepo } from './githubapi';
import { addDBUser,repoReturn,userReturn,userStarCountUpdate,oneUserReturn } from './db';
import cors from 'cors';
require('console-stamp')(console, 'mm/dd HH:MM:ss.l');

class App {
  public application: Application;

  constructor() {
    this.application = express();
  }
}

const app = new App().application;
app.use(cors());
app.all('/*', function(req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.listen(3001,() => {
  console.info('✅ Start dimi-trending-repo api server✅');
});

app.get('/', function(req, res) {
  res.status(200).send('Welcome to dimi-tranding-repo api server!');
});

app.get('/api/v1/get/rankedrepo', async function(req,res) {
  res.status(200).send(await(repoReturn()));
});

app.get('/api/v1/get/rankeduser', async function(req, res) {
  res.status(200).send(await(userReturn()));
});
app.get('/api/v1/get/user', async function(req,res) {
  const githubid = req.query.githubid;
  let userinfo = await(oneUserReturn(githubid));
  console.log(userinfo);
  res.status(200).send({ userinfo });
});
app.post('/api/v1/useradd', async function(req, res) {
  let name  = req.query.name;
  let department = req.query.department;
  let year = req.query.year;
  let githubid = req.query.githubid;
  let dimigoinID = req.query.dimigoinID;
  console.log('[👤 useradd req]' + name + '(' + githubid + ')');
  try {
    if (dimigoinID === undefined) {
      addDBUser(name,undefined,department,year,githubid);
    } else if (dimigoinID = !undefined) {
      addDBUser(name,dimigoinID,department,year,githubid);
    }
    res.status(200).send('user add success');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  const starcount = await(getAllRepo(githubid,name));
  await userStarCountUpdate(starcount,githubid);
  console.log('[👤 useradd done]' + name + '(' + githubid + ')');

});
