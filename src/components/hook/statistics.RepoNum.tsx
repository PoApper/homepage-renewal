import {useEffect, useState} from "react";
import { Octokit } from "@octokit/rest";

const RepoNum = () => {
    const [RepoNum, setRepoNum] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = import.meta.env.PUBLIC_GITTOKEN;
            const octokit = new Octokit({ auth: token});
            const res = await octokit.request('GET /orgs/poapper/repos');
            setRepoNum(res.data.length);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

    return (
        <div>
            {RepoNum}
        </div>
    );

}

export default RepoNum;