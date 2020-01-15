import mongoose, { Types, Document } from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connection.on('error', console.error);
mongoose.connection.once('open', function() {
	console.log('✅ Connected to mongod server✅');
});

mongoose.connect('mongodb://docker.cloudus.io/dimi-tranding-repo-test',{ useNewUrlParser: true,useUnifiedTopology: true });

interface IRepo extends Document {
	// rank: string;
	username: string;
	department: string;
	year: string;
	githubid: string;
	reponame: string;
	repourl: string;
	description: string;
	stargazer: string;
	stargazer_count: string;
	forkazger: string;
	language: string;
}

const repoSchema = new Schema({
	// rank: {type: String, required: true},
	username: { type: String, required: true },
	department: { type: String, required: true },
	year: { type: String, required: true },
	githubid : { type: String, required: true },
	reponame: { type: String, required: true },
	repourl: { type: String, required: true },
	description: { type: String, required: false },
	stargazer: { type: Array, required: true },
	stargazer_count: { type: String, required: true },
	forkazger_count: { type: String, required: true },
	language: { type: String, required: false }
});

const Repo = mongoose.model<IRepo>('repo', repoSchema);

interface IUser extends Document {
	name: string;
	department: string;
	year: string;
	githubid: string;
}

const userSchema = new Schema({
	name: { type: String, required: true },
	department: { type: String, required: true },
	year: { type: String, required: true },
	githubid: { type: String, required: true }
});

const User = mongoose.model<IUser>('user', userSchema);
export async function addDBUser(name: string, department: string, year: string, githubid: string, starcount: string) {
  const count =userdocsexist(githubid)
  if (!count) {
	let user = new User({ name,githubid,year,department,starcount });
} else if(count) {
  console.log('exist user' + name + githubid);
  }
}

export async function addDBRepo(username: string, reponame: string, repourl: string, description: string,  stargazer: string[] | undefined,stargazer_count: string, forkazger_count: string, language: string | undefined) {
//   try {
	const Repo = mongoose.model('repo', repoSchema);
	const userInfo = await callFromUserDB(username);
	if (!userInfo) {
	console.log('no user info. user add error');
	return;
  }
	if (!language) {
	console.log('No language info');
	language = '';
  }
	if (!description) {
	console.log('no description');
	description = '';
  }
  const { department, year, githubid } = userInfo;
  const count =repodocsexist(repourl)
	if (!count) {
	let repo = new Repo({ username, department, year, githubid, reponame, repourl, description, stargazer, stargazer_count, forkazger_count, language });
  repo.save();
  } else if(count) {
	Repo.update(
	{ githubid,reponame },
	{ $set: { description,stargazer,stargazer_count,forkazger_count,language } }, /* query */
	{ multi: true });
  }
}

export async function repodocsexist(repourl:string){
  Repo.countDocuments({repourl: repourl},function(err, count){
    if(count>0){
      return true;
    }
    else{
      return false;
    }
}
  )}
export async function userdocsexist(githubid:string){
  User.countDocuments({githubid: githubid}, function (count:number){ 
    if(count>0){
      return true;
    }
    else{
      return false;
    }
}
  )}
export async function callFromUserDB(username: string) {
	return User.findOne({ githubid: username });
}
export async function repoDBRank() {
	try {
	Repo.find(function(repos) {
	// console.log(repos);
	return(repos);
  });
  } catch (error) {
	console.log('Error!');
  }
}

// repoDBRank()
