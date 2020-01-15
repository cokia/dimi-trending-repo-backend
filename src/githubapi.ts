import { addDBRepo } from "./db"
const Octokit = require("@octokit/rest");
const octokit = new Octokit({
  auth: "772cdf29b49f3fc14f56a611b100b03f6075423e"
});

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

interface IRepoInformation {
      id: string;
      node_id: string;
      name: string;
      full_name: string;
      private: string;
      owner: string;
      html_url: string;
      description: string;
      fork: string;
      url: string;
      forks_url: string;
      keys_url: string;
      collaborators_url:string;
      teams_url:string;
      hooks_url: string;
      issue_events_url:string;
      events_url: string;
      assignees_url: string;
      branches_url: string;
      tags_url: string;
      blobs_url: string;
      git_tags_url: string;
      git_refs_url: string;
      trees_url: string;
      statuses_url: string;
      languages_url: string;
      stargazers_url: string;
      contributors_url: string;
      subscribers_url: string;
      subscription_url: string;
      commits_url: string;
      git_commits_url: string;
      comments_url: string;
      issue_comment_url: string;
      contents_url: string;
      compare_url:  string;
      merges_url: string;
      archive_url: string;
      downloads_url: string;
      issues_url: string;
      pulls_url: string;
      milestones_url: string;
      notifications_url:string;
      labels_url: string;
      releases_url:string;
      deployments_url: string;
      created_at: string;
      updated_at: string;
      pushed_at: string;
      git_url: string;
      ssh_url: string;
      clone_url: string;
      svn_url: string;
      homepage: string;
      size: string;
      stargazers_count: string;
      watchers_count: string;
      language: string;
      has_issues:string;
      has_projects: string;
      has_downloads: string;
      has_wiki:string;
      has_pages:string;
      forks_count:string;
      mirror_url:string;
      archived: string;
      disabled:string;
      open_issues_count:string;
      license: string;
      forks: string;
      open_issues: string;
      watchers: string;
      default_branch:string;
}

  export async function getRepoStargazers(owner: string, repo: string): Promise<string[]> {
    const value: string[] = [];
    try{
    const { data }: { data: IRepoStargazer[] } =
  await octokit.activity.listStargazersForRepo({ owner, repo });
  let i = 0;
  data.forEach((repoStargazer: IRepoStargazer) => {
  value[i] = repoStargazer.login
  i++;
  });
return value;
} catch (error) {}
return value;
}


export async function getRepoLanguage(owner: string, repo: string): Promise<string | undefined> {
  try{ 
    const { data } = await octokit.repos.listLanguages({owner , repo});
    const languageList:string = Object.keys(data)[0];
    if(!languageList) {
      console.log("no language")
      return '';
  }
    return(languageList);
  } catch(error){
    // console.log("this2")
    }
    finally{
    }
  }

export async function getAllRepo(username: string){
  try{
  const { data }: { data: IRepoInformation[] } = await octokit.repos.listForUser({username})
  // console.log("test");
  data.forEach(async (_data: IRepoInformation) => {
  const _name = _data.name
  const _url = _data.url
  const _description = _data.description
  const _stargazer_count = _data.stargazers_count
  const _stargazer = await getRepoStargazers(_data.owner, _data.name)
  const _language =  await getRepoLanguage(_data.owner, _data.name)

  const _forkagzer_count = _data.forks_count
  addDBRepo(username,_name,_url,_description,_stargazer,_stargazer_count,_forkagzer_count,_language)
  });
} catch (error) {
  }
}