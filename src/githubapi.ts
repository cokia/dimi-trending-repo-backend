import { addDBRepo } from './db';
const Octokit = require('@octokit/rest');
const octokit = new Octokit({
  auth: '772cdf29b49f3fc14f56a611b100b03f6075423e'
});
let user_starcount: number = 0;

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
  site_admin: boolean;
}
interface IUserInformation {
  login: string;
  id: Number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string; // apiurl
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
  site_admin: Boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  public_repos: Number;
  public_gists: Number;
  followers: Number;
  following: Number;
  created_at: string;
  updated_at: string;
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
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
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
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
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
  stargazers_count: number;
  watchers_count: string;
  language: string;
  has_issues: string;
  has_projects: string;
  has_downloads: string;
  has_wiki: string;
  has_pages: string;
  forks_count: Number;
  mirror_url: string;
  archived: string;
  disabled: string;
  open_issues_count: string;
  license: string;
  forks: string;
  open_issues: string;
  watchers: string;
  default_branch: string;
}

export async function getRepoStargazers(owner: string, repo: string): Promise<string[] | undefined>  {
  const value: string[] = [];
  try {
    const { data }: {data: IRepoStargazer[] } = await octokit.activity.listStargazersForRepo({ owner, repo });
    for (const { login } of data) value.push(login);
  } catch (error) {
// console.log(owner,repo)
  }
  return value;
}
/*
//get repo language information function
export async function getRepoLanguage(owner: string, repo: string): Promise<string | undefined> {
	try {
		const { data } = await octokit.repos.listLanguages({ owner , repo });
		const languageList: string = Object.keys(data)[0];
		return(languageList);```````````
	} catch (error) {

		// console.log("this2")
	}
}
*/
export async function getAllRepo(githubid: string,name: string) {
  const username = githubid;
  user_starcount = 0;
  const { data }: { data: IRepoInformation[] } = await octokit.repos.listForUser({ username ,per_page: 100 });
  // // let a  = data.forEach(async (_data: IRepoInformation) => {
  let a = data.map(async function(_data) {
  // let a = data.map(async _data => async () => {
    const _name = _data.name;
    const _url = 'https://github.com/' + githubid + '/' + _data.name;
    const _description = _data.description;
    const _stargazer_count = _data.stargazers_count;
    const _stargazer = await getRepoStargazers(githubid, _data.name);
    // const _language =  await getRepoLanguage(username, _data.name);
    const _language =  _data.language;
    const _forkagzer_count = _data.forks_count;
    addDBRepo(githubid,_name,_url,_description,_stargazer,_stargazer_count,_forkagzer_count,_language);
    user_starcount += _stargazer_count;
  }
  );
  await Promise.all(a);
  return user_starcount;
//   return (await Promise.all(
//     data.map(async user => {
//       const {
//             name,
//             url,
//             description,
//             stargazers_count,
//             language,
//             forks_count
//         } = user;
//       const stargazer = await getRepoStargazers(githubid, name);

//       addDBRepo(
//             githubid,
//             name,
//             url,
//             description,
//             stargazer,
//             stargazers_count,
//             forks_count,
//             language
//         );
//       return stargazers_count;
//     })
// )).reduce((a, b) => a + b);
}

export async function getUserDetailInformation(githubid: string) {
  const username = githubid;
  const { data }: {data: IUserInformation} = await(octokit.users.getByUsername({ username }));
  const _bio: string = data.bio;
  const _email: string = data.email;
  const _followers: Number = data.followers;
  const _public_repos: Number = data.public_repos;
  return [_bio,_email,_followers,_public_repos];
}
