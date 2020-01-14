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

  export async function getRepoStargazers(owner: string, repo: string) {
  const { data }: { data: IRepoStargazer[] } =
  await octokit.activity.listStargazersForRepo({ owner, repo });
  let value:string[] = new Array();
  let i = 0;
  data.forEach((repoStargazer: IRepoStargazer) => {
  value[i] = repoStargazer.login
  i++;
  })
return value
}


export async function getRepoLanguage(owner: string, repo: string){
    const { data } = await octokit.repos.listLanguages({owner , repo});
    const languageList = Object.keys(data)[0];
      return(languageList);
}

export async function getAllRepo(username: string){
  const { data }: { data: IRepoInformation[] } = await octokit.repos.listForUser({username})
  data.forEach(async (repoStargazer: IRepoInformation) => {
  const _name = Object.keys(data)[2]
  const _url = Object.keys(data)[6]
  const _description = Object.keys(data)[7]
  const _stargazer_count = Object.keys(data)[54]
  const _stargazer = await getRepoStargazers(username, _name)
  const _language = await getRepoLanguage(username, _name)
  const _forkagzer_count = Object.keys(data)[68]
  addDBRepo(username,_name,_url,_description,_stargazer,_stargazer_count,_forkagzer_count,_language)
});
}