import type { APIRoute } from 'astro'
import { Octokit } from '@octokit/rest'

interface Event {
  type: string
}

// 같은 Astro 서버 프로세스의 메모리에 캐시 저장
// 이 변수는 24시간 또는 서버가 재시작될 때까지 유지됩니다
let cache: {
  data: any[]
  timestamp: number
} | null = null

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24시간

export const GET: APIRoute = async () => {
  console.log('[API] /api/commits.json called')
  try {
    // 캐시 확인
    const now = Date.now()
    if (cache && now - cache.timestamp < CACHE_DURATION) {
      console.log(
        '[API] Returning cached data, commits count:',
        cache.data.length
      )
      return new Response(JSON.stringify(cache.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600', // 브라우저 캐싱 1시간
        },
      })
    }

    console.log('[API] Cache miss, fetching from GitHub...')
    // 토큰 없이 일반 요청으로 Octokit 인스턴스 생성
    const octokit = new Octokit()

    const res = await octokit.request('GET /orgs/poapper/events?per_page=10')
    console.log('[API] GitHub events fetched, total events:', res.data.length)
    
    // 모든 이벤트 타입 로그 출력
    const eventTypes = res.data.map((event: any) => event.type)
    console.log('[API] All event types:', eventTypes)

    // PushEvent만 필터링 (PullRequestEvent는 커밋 정보가 없음)
    const pushEvents = res.data.filter((event: any) => event.type === 'PushEvent')

    console.log('[API] PushEvents count:', pushEvents.length)
    if (pushEvents.length > 0) {
      console.log('[API] First PushEvent repo:', pushEvents[0].repo?.name)
    }

    if (pushEvents.length === 0) {
      console.log('[API] No PushEvent found')
      console.log('[API] Available event types:', [...new Set(eventTypes)])
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // 첫 번째 PushEvent 사용
    const pushEvent = pushEvents[0] as any
    console.log('[API] Using PushEvent from repo:', pushEvent.repo?.name)
    console.log(
      '[API] PushEvent payload keys:',
      Object.keys(pushEvent.payload || {})
    )

    let commits = pushEvent.payload?.commits || []
    console.log('[API] Initial commits from payload:', commits.length)

    // payload.commits가 없으면 head와 before를 사용해서 커밋 가져오기
    if (commits.length === 0 && pushEvent.repo) {
      const { head, before } = pushEvent.payload as {
        head?: string
        before?: string
      }

      if (head && before && pushEvent.repo.name) {
        try {
          const repoName = pushEvent.repo.name // "PoApper/homepage-renewal"
          const [owner, repo] = repoName.split('/')

          // before와 head 사이의 커밋들 가져오기
          const compareRes = await octokit.request(
            'GET /repos/{owner}/{repo}/compare/{base}...{head}',
            {
              owner,
              repo,
              base: before,
              head: head,
            }
          )

          // 커밋 데이터를 원하는 형식으로 변환
          commits = compareRes.data.commits.map((commit: any) => ({
            sha: commit.sha.substring(0, 7),
            fullSha: commit.sha,
            message: commit.commit.message.split('\n')[0],
            author: {
              name: commit.commit.author.name,
              email: commit.commit.author.email,
            },
          }))

          console.log(
            `[API] Fetched ${commits.length} commits from compare API`
          )
        } catch (compareError: any) {
          console.error(
            '[API] Failed to fetch commits from compare API:',
            compareError.message
          )
          commits = []
        }
      } else {
        console.log(
          '[API] Cannot fetch from compare API - missing head, before, or repo name'
        )
      }
    }

    console.log('[API] Final commits count:', commits.length)

    // 서버 캐시 업데이트
    cache = {
      data: commits,
      timestamp: now,
    }

    return new Response(JSON.stringify(commits), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // 브라우저 캐싱 1시간
      },
    })
  } catch (error: any) {
    const isRateLimitError =
      error?.status === 403 || error?.message?.includes('rate limit')

    if (isRateLimitError) {
      console.error('[API] GitHub API rate limit exceeded:', error.message)
      console.log('[API] Checking for cached data...')
    } else {
      console.error('[API] Failed to fetch commit data:', error.message)
    }

    // 에러 발생 시 캐시가 있으면 캐시 반환
    if (cache) {
      console.log(
        '[API] Returning cached data due to error, commits count:',
        cache.data.length
      )
      return new Response(JSON.stringify(cache.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Cache-Used': 'true',
          'X-Rate-Limit-Error': isRateLimitError ? 'true' : 'false',
        },
      })
    }

    // 캐시도 없고 rate limit 에러인 경우
    if (isRateLimitError) {
      console.error('[API] Rate limit exceeded and no cache available')
      return new Response(
        JSON.stringify({
          error: 'GitHub API rate limit exceeded. Please try again later.',
          rateLimitExceeded: true,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '3600', // 1시간 후 재시도
          },
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Failed to fetch commit data' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
