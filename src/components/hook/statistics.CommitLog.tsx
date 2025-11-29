import { useEffect, useState } from 'react'
import { Octokit } from '@octokit/rest'

interface Event {
  type: string
}

const CACHE_KEY = 'poapper_commit_log'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 1 day

interface CacheData {
  data: any[]
  timestamp: number
}

const getCachedData = (): any[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const { data, timestamp }: CacheData = JSON.parse(cached)
    const now = Date.now()

    // 캐시가 만료되지 않았으면 데이터 반환
    if (now - timestamp < CACHE_DURATION) {
      return data
    }

    // 만료된 캐시 삭제
    localStorage.removeItem(CACHE_KEY)
    return null
  } catch (error) {
    console.error('Failed to read cache:', error)
    return null
  }
}

const setCachedData = (data: any[]) => {
  try {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Failed to save cache:', error)
  }
}

const fetchCommitData = async (
  setCommitLog: React.Dispatch<React.SetStateAction<any[]>>
): Promise<void> => {
  try {
    // 토큰 없이 일반 요청으로 Octokit 인스턴스 생성
    const octokit = new Octokit()
    
    const res = await octokit.request('GET /orgs/poapper/events?per_page=10')
    
    const filteredEvents = res.data.filter(
      (event: Event) =>
        event.type === 'PushEvent' || event.type === 'PullRequestEvent'
    )
    
    if (filteredEvents.length === 0) {
      console.log('No PushEvent or PullRequestEvent found')
      setCommitLog([])
      return
    }

    const firstEvent = filteredEvents[0] as any
    const commits = firstEvent.payload?.commits || []

    if (commits.length === 0) {
      console.log('No commits found in payload')
      setCommitLog([])
      return
    }

    setCommitLog(commits)
    setCachedData(commits)
  } catch (error: any) {
    console.error('Failed to fetch commit data:', error)
    console.error('Error details:', {
      message: error?.message,
      status: error?.status,
      response: error?.response,
    })
    setCommitLog([])
    throw error // 에러를 다시 throw하여 컴포넌트에서 처리할 수 있도록
  }
}

const CommitLog = () => {
  const [commitLog, setCommitLog] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 먼저 캐시 확인
    const cachedData = getCachedData()
    if (cachedData) {
      setCommitLog(cachedData)
      setIsLoading(false)
      return
    }

    // 캐시가 없으면 API 호출
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
            <div key={index} className="pb-2 border-b border-white/20 last:border-b-0">
              <div>commit {commit.sha}</div>
              <div>
                Author: {commit.author?.name || 'Unknown'} ({commit.author?.email || 'Unknown'})
              </div>
              <div>{commit.message}</div>
              {index === commitLog.length - 1 && (
                <div className="mt-2">poapper@postech ~ $ git log HEAD~1..HEAD</div>
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
