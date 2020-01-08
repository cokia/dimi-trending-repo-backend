import mongoose, { Types } from "mongoose"

const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
});

mongoose.connect('mongodb://docker.cloudus.io/dimi-tranding-repo-test');

// const repoSchema = new Schema({
//   rank: {type: String, required: true},
//   username: {type: String, required: true},
//   department: {type: String, required: true},
//   year: {type:String, required:true},
//   githubid : {type:String, required:true},
//   reponame: {type: String, required: true},
//   repourl: {type: String, required: true},
//   description:{type: String, required: true},
//   stargazer: {type: Array, required: true},
//   stargazer_count:{type: String, required: true},
//   forkazger: {type: String, required: true},
//   language: {type: String, required: true},
// });
// module.exports = mongoose.model('repo', repoSchema);

const userSchema = new Schema({
  name: {type: String, required: true},
  department: {type: String, required: true},
  year:{type: String, required: true},
  githubid:{type: String, required: true}
});


export async function addDBUser(name: string, department: string, year: string, githubid: string){
  const User = mongoose.model('user', userSchema);

  let user = new User({
    name: name,
    department: department,
    year: year,
    githubid: githubid
});
 
user.save()
}


// export async function addDBUser(name: string, department: string, year: string, githubid: string){
//   const repo: RequestParams.Index = {
//     index: 'dimi-tranding-repo-user-test',
//     body: {
//       doc:{
//         "name": name,
//         "department": department,
//         "year":year,
//         "githubid":githubid
//     }
//   }
//   }
//   await client.index(repo)
// }



