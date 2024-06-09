import { NextResponse } from 'next/server'
import axios from 'axios'

interface Thumbnail {
    url: string
    width: number
    height: number
}

type VideoDetails = {
    title: string
    description: string
    publishedAt: string
    isLive: boolean
    isShort: boolean
    thumbnail: Thumbnail
    actualStartTime: string | null
    actualEndTime: string | null
    scheduledStartTime: string | null
    scheduledEndTime: string | null
}
const API_KEY = process.env.YOUTUBE_API_KEY

export async function GET(
    req: Request,
    { params }: { params: { videoId: string } }
) {
    const { videoId } = params

    if (!API_KEY) {
        return NextResponse.json(
            { error: 'YouTube API key is missing' },
            { status: 500 }
        )
    }

    try {
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos`,
            {
                params: {
                    part: 'snippet,contentDetails,liveStreamingDetails',
                    id: videoId,
                    key: API_KEY,
                },
            }
        )

        if (response.data.items.length === 0) {
            return NextResponse.json(
                { error: 'Video not found' },
                { status: 404 }
            )
        }

        const video = response.data.items[0]

        const title = video.snippet.title
        const description = video.snippet.description
        const publishedAt = video.snippet.publishedAt
        const liveBroadcastContent = video.snippet.liveBroadcastContent
        const isLive = liveBroadcastContent === 'live'
        const isShort = video.snippet.categoryId === '22' // You may need to adjust this logic
        const thumbnail = video.snippet.thumbnails.default

        let actualStartTime = null
        let actualEndTime = null
        let scheduledStartTime = null
        let scheduledEndTime = null

        if (video.liveStreamingDetails) {
            actualStartTime = video.liveStreamingDetails.actualStartTime
            actualEndTime = video.liveStreamingDetails.actualEndTime
            scheduledStartTime = video.liveStreamingDetails.scheduledStartTime
            scheduledEndTime = video.liveStreamingDetails.scheduledEndTime
        }

        const videoDetails: VideoDetails = {
            title,
            description,
            publishedAt,
            isLive,
            isShort,
            thumbnail,
            actualStartTime,
            actualEndTime,
            scheduledStartTime,
            scheduledEndTime,
        }

        return NextResponse.json(videoDetails)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching video details' },
            { status: 500 }
        )
    }
}
