import { useEffect, useState } from 'react'

const fetchCommitData = async (
  setCommitLog: React.Dispatch<React.SetStateAction<any[]>>
): Promise<void> => {
  try {
    console.log('[Client] Fetching commits from /api/commits.json')
    // 서버 API route를 통해 데이터 가져오기
    const res = await fetch('/api/commits.json')

    console.log('[Client] Response status:', res.status, res.statusText)

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const commits = await res.json()

    // 배열 체크를 먼저 수행 (commits.length 접근 전)
    if (!Array.isArray(commits)) {
      console.error('[Client] Response is not an array:', commits)

      // Rate limit 에러 체크
      if (commits?.rateLimitExceeded) {
        console.error('[Client] Rate limit exceeded')
        throw new Error(
          'GitHub API rate limit exceeded. Please try again later.'
        )
      }

      // 에러 응답 체크
      if (commits?.error) {
        console.error('[Client] API returned error:', commits.error)
        throw new Error(commits.error)
      }

      setCommitLog([])
      return
    }

    console.log('[Client] Received commits:', commits.length, commits)

    if (commits.length === 0) {
      console.log('[Client] No commits found in response')
      setCommitLog([])
      return
    }

    setCommitLog(commits)
  } catch (error: any) {
    console.error('[Client] Failed to fetch commit data:', error)
    setCommitLog([])
    throw error
  }
}

const CommitLog = () => {
  const [commitLog, setCommitLog] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 서버 API 호출 (서버에서 캐싱 처리)
    setIsLoading(true)
    setError(null)
    fetchCommitData(setCommitLog)
      .catch((err) => {
        console.error('Error in fetchCommitData:', err)
        setError('Failed to load commit data')
        setCommitLog([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="space-y-3">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : commitLog.length > 0 ? (
        <div className="space-y-4">
          {commitLog.map((commit, index) => (
            <div
              key={index}
              className="pb-2 border-b border-white/20 last:border-b-0"
            >
              <div>commit {commit.sha}</div>
              <div>
                Author: {commit.author?.name || 'Unknown'} (
                {commit.author?.email || 'Unknown'})
              </div>
              <div>{commit.message}</div>
              {index === commitLog.length - 1 && (
                <div className="mt-2">
                  poapper@postech ~ $ git log HEAD~1..HEAD
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No commits found</div>
      )}
    </div>
  )
}

export default CommitLog
