import React, {useEffect, useState} from "react";
import { Octokit } from "@octokit/rest";

interface Event {
  type: string;
}

const fetchCommitData = async (setCommitLog: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const token = import.meta.env.PUBLIC_GITTOKEN;
    const octokit = new Octokit({ auth: token });
    const res = await octokit.request('GET /orgs/poapper/events?per_page=10');
    const commits = res.data
      .filter((event: Event) => event.type === "PushEvent" || event.type === "PullRequestEvent")
      .slice(0)[0].payload.commits;
    setCommitLog(commits);
  } catch (error) {
    console.log(error);
  }
};


const CommitLog = () => {
  const [commitLog, setCommitLog] = useState<any[]>([]);

  useEffect(() => {
    fetchCommitData(setCommitLog);
  }, []);

  return (
    <div>
      {commitLog.length > 0 ? (
        <div>
          {commitLog.map((commit, index) => (
            <div key={index}>
              <div>commit {commit.sha}</div>
              <div>Author: {commit.author.name} ({commit.author.email})</div>
              <div>{commit.message}</div>
              <div>poapper@postech ~ $ git log HEAD~1..HEAD</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CommitLog;