import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch'
const client = new Client({ node: 'http://ilsan-01.cloudus.io:9200' })

async function run (): Promise<void> {
  // Let's start by indexing some data
  const repo: RequestParams.Index = {
    index: 'dimi-tranding-repo-repo-test',
    body: {
        "name": "한우영",
        "department": "WP",
        "year":"19",
        "githubid":"cokia",
        "reponame":"dimi-tranding-repo",
        "starcount":"1",
        "forkcount":"1"
    }
  }
  await client.index(repo)

  const user: RequestParams.Index = {
    index: 'dimi-tranding-repo-user-test',
    body: {
        "name": "한우영",
        "department": "WP",
        "year":"19",
        "githubid":"cokia"
    }
  }
  await client.index(user)

  // Let's search!
  const params: RequestParams.Search = {
    index: 'game-of-thrones',
    body: {
      query: {
        match: {
          quote: 'winter'
        }
      }
    }
  }
  client
    .search(params)
    .then((result: ApiResponse) => {
      console.log(result.body.hits.hits)
    })
    .catch((err: Error) => {
      console.log(err)
    })
}