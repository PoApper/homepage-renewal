import {useEffect, useState} from "react";
import { Octokit } from "@octokit/rest";

const MemberNum = () => {
    const [MemberNum, setMemberNum] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = import.meta.env.PUBLIC_GITTOKEN;
            const octokit = new Octokit({ auth: token});
            const res = await octokit.request('GET /orgs/poapper/public_members');
            setMemberNum(res.data.length);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

    return (
        <div>
            {MemberNum}
        </div>
    );

}

export default MemberNum;