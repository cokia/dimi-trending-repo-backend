const Octokit = require("@octokit/rest");
const octokit = new Octokit();

export enum EReturnType {
  Both,
  UserImage,
  UserName
}

interface IRepoStargazer {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean
}

export async function getRepoStargazers(owner: string, repo: string, returnType: EReturnType) {
  const { data }: { data: IRepoStargazer[] } =
    await octokit.activity.listStargazersForRepo({ owner, repo });
if(returnType ==EReturnType.Both){
  data.forEach((repoStargazer: IRepoStargazer) => {
      console.log(repoStargazer.login);
      console.log(repoStargazer.avatar_url);
  });
}

else if(returnType ==EReturnType.UserImage){
    data.forEach((repoStargazer: IRepoStargazer) => {
        console.log(repoStargazer.avatar_url);
    });
  }
else if(returnType ==EReturnType.UserName){
    data.forEach((repoStargazer: IRepoStargazer) => {
        console.log(repoStargazer.login);
    });
  }

}



getRepoStargazers("cokia", "dimi-tranding-repo", EReturnType.UserName);

