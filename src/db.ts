import mongoose, { Types, Document } from "mongoose"

const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
});

mongoose.connect('mongodb://docker.cloudus.io/dimi-tranding-repo-test');

interface IRepo extends Document {
  rank: string;
  username: string;
  department: string;
  year: string;
  githubid : string;
  reponame: string;
  repourl: string;
  description:string;
  stargazer: string;
  stargazer_count:string;
  forkazger: string;
  language: string;
}

const repoSchema = new Schema({
  rank: {type: String, required: true},
  username: {type: String, required: true},
  department: {type: String, required: true},
  year: {type:String, required:true},
  githubid : {type:String, required:true},
  reponame: {type: String, required: true},
  repourl: {type: String, required: true},
  description:{type: String, required: true},
  stargazer: {type: Array, required: true},
  stargazer_count:{type: String, required: true},
  forkazger: {type: String, required: true},
  language: {type: String, required: true},
});

const Repo = mongoose.model<IRepo>('repo', repoSchema);

interface IUser extends Document {
  name: string;
  department: string,
  year: string,
  githubid: string
}

const userSchema = new Schema({
  name: {type: String, required: true},
  department: {type: String, required: true},
  year:{type: String, required: true},
  githubid:{type: String, required: true}
});

const User = mongoose.model<IUser>('user', userSchema);
export async function addDBUser(name: string, department: string, year: string, githubid: string){
  let user = new User({
    name: name,
    department: department,
    year: year,
    githubid: githubid
});
 
user.save()
}

export async function addDBRepo(rank:string, username:string, reponame:string, repourl:string, description:string, stargazer:[string], stargazer_count:string, forkazger:string, language:string){
  const Repo = mongoose.model('repo', repoSchema);
  const userInfo = await callFromUserDB(username);
  if(!userInfo) return;
  const { department, year, githubid } = userInfo;
  let repo = new Repo({
    rank,
    username,
    department, 
    year,
    githubid,
    reponame,
    description,
    stargazer,
    stargazer_count,
    forkazger,
    language,
});
repo.save();
}

export async function callFromUserDB(username:string){
  return await User.findOne({ username });
}