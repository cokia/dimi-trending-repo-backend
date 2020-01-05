import { response } from "express";

const Octokit = require("@octokit/rest");
const octokit = new Octokit();

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

export async function getRepoStargazers(owner: string, repo: string) {
  const { data }: { data: IRepoStargazer[] } =
    await octokit.activity.listStargazersForRepo({ owner, repo });
    data.forEach((repoStargazer: IRepoStargazer) => {
        console.log(repoStargazer.login);
    });
  }


export async function getRepoLanguage(owner: string, repo: string){
    const { data } = await octokit.repos.listLanguages({owner , repo});
    const languageList = Object.keys(data)[0];
    if(languageList.length <= 0) {
      console.log('없음');
    } else {
      console.log(languageList);
    } 

}

getRepoLanguage("cokia","flask-login")