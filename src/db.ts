import mongoose, { Types, Document } from "mongoose"

const Schema = mongoose.Schema;

mongoose.connection.on('error', console.error);
mongoose.connection.once('open', function(){
  console.log("✅  ㅈConnected to mongod server✅");
});

mongoose.connect('mongodb://docker.cloudus.io/dimi-tranding-repo-test',{useNewUrlParser: true,useUnifiedTopology: true});

interface IRepo extends Document {
  // rank: string;
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
  // rank: {type: String, required: true},
  username: {type: String, required: true},
  department: {type: String, required: true},
  year: {type:String, required:true},
  githubid : {type:String, required:true},
  reponame: {type: String, required: true},
  repourl: {type: String, required: true},
  description:{type: String, required: true},
  stargazer: {type: Array, required: true},
  stargazer_count:{type: String, required: true},
  forkazger_count: {type: String, required: true},
  language: {type: String, required: false},
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
export async function addDBUser(name: string, department: string, year: string, githubid: string, starcount: string){
  let user = new User({
    name: name,
    department: department,
    year: year,
    githubid: githubid,
    starcount: starcount
});
 
user.save()
}

export async function addDBRepo(username:string, reponame:string, repourl:string, description:string,  stargazer:string[],stargazer_count:string, forkazger_count:string, language:string|undefined){
  try {
  const Repo = mongoose.model('repo', repoSchema);
  const userInfo = await callFromUserDB(username);
  if(!userInfo) {
    console.log("no user info. user add error")
    return;
  }
  const { department, year, githubid } = userInfo;
  let repo = new Repo({
    username,
    department, 
    year,
    githubid,
    reponame,
    repourl,
    description,
    stargazer,
    stargazer_count,
    forkazger_count,
    language,
});
console.log(repo)
repo.save();
console.log("finish add")
}
catch(error){
console.log(error)
}
finally{
  return
}}

export async function callFromUserDB(username:string){
  return await User.findOne({ githubid:username });
}
export async function repoDBRank(){
try{
Repo.find(function(err, repos){
  console.log(repos);
  return(repos);
});
} catch (error) {
  console.log('this');
  }
}

// repoDBRank()