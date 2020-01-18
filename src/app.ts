import express, { Application } from 'express';
import { getAllRepo } from './githubapi';
import { addDBUser,repoReturn } from './db';
import cors from 'cors';
require('console-stamp')(console, 'mm/dd HH:MM');

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
	console.log('✅ Start dimi-tranding-repo api server✅');
});

app.get('/', function(req, res) {
	res.status(200).send('Welcome to dimi-tranding-repo api server!');
});

app.get('/api/v1/get/rankedrepo', async function(req,res) {
	res.status(200).send(await(repoReturn()));
});

app.get('/api/v1/get/rankeduser', function(req, res) {
	res.status(400).send({ error: 'is still develop..OTL i will dev ASAP :D' });
});

app.post('/api/v1/useradd', function(req, res) {
	let name  = req.query.name;
	let department = req.query.department;
	let year = req.query.year;

  let githubid = req.query.githubid;
  console.info("[👤 useradd req]" + name + "(" + githubid + ")");
	try {
		addDBUser(name,department,year,githubid,'1');
		res.status(200).send('user add success');
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
  }
  
  getAllRepo(githubid);
  console.info("[👤 useradd done]" + name + "(" + githubid + ")");

});

