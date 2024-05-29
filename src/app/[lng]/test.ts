import axios from 'axios'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_API_LIVE_URL =
    'https://www.googleapis.com/youtube/v3/videos?part-liveStreamingDetails'
const channelId = 'UCPZIPuQPrfrUG9Xe_okEmQA'

export const fetchVideoList = async () => {
    try {
        let allVideos: any[] = []
        let nextPageToken = ''

        do {
            const response = await axios.get(YOUTUBE_API_URL, {
                params: {
                    part: 'snippet',
                    channelId: channelId,
                    type: 'video',
                    maxResults: 50, // Maximum results per page
                    pageToken: nextPageToken,
                    key: YOUTUBE_API_KEY,
                },
            })

            allVideos = [...allVideos, ...response.data.items]
            nextPageToken = response.data.nextPageToken
        } while (nextPageToken)

        return allVideos
    } catch (error) {
        console.error('Error fetching live streams:', error)
        return []
    }
}

export const fetchLiveStreamingDetails = async () => {
    try {
        const response = await axios
            .get(
                YOUTUBE_API_LIVE_URL + `&id=EvtvvsIByvw&key=${YOUTUBE_API_KEY}`
            )
            .then((res) => {
                const items = res.data.items
                if (items && items.length > 0) {
                    const liveDetails = items[0].liveStreamingDetails
                    console.log('🚀 ~ .then ~ liveDetails:', liveDetails)
                    // const actualStartTime = liveDetails.actualStartTime
                    // const actualEndTime = liveDetails.actualEndTime

                    // console.log(`Start Time: ${actualStartTime}`)
                    // console.log(`End Time: ${actualEndTime}`)
                } else {
                    console.log('No live streaming details found.')
                }
            })
    } catch (error) {
        console.error('Error fetching live streams:', error)
        return []
    }
}
