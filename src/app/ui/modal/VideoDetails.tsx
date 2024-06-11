'use client'
import { formatDate } from 'date-fns'
import { useEffect, useState } from 'react'

type VideoDetailsProps = {
    videoId: string
    url: string
}

interface Thumbnail {
    url: string
    width: number
    height: number
}

type VideoDetails = {
    id: string
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
const VideoDetails = ({ videoId, url }: VideoDetailsProps) => {
    const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null)

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios.get(`/api/youtube/${videoId}`)
                setVideoDetails(response.data)
            } catch (error) {
                console.error('Error fetching video details:', error)
            }
        }

        fetchVideoDetails()
    }, [videoId])

    if (!videoDetails) {
        return <div>Loading...</div>
    }

    return (
        <div className={'modal-video-detail'}>
            <img
                src={videoDetails.thumbnail.url}
                width={videoDetails.thumbnail.width}
                height={videoDetails.thumbnail.height}
                alt="thumbnail"
                onClick={() => {
                    window.open(url)
                }}
            />
            <div>
                <h4>{videoDetails.title}</h4>
                <p>
                    게시날짜:
                    {formatDate(
                        videoDetails.publishedAt,
                        'yyyy.MM.dd HH:mm:ss'
                    )}
                </p>
                {videoDetails.actualStartTime && (
                    <p>
                        라이브 실제 시작일:
                        {formatDate(
                            videoDetails.actualStartTime,
                            'yyyy.MM.dd HH:mm:ss'
                        )}
                    </p>
                )}
                {videoDetails.actualEndTime && (
                    <p>
                        라이브 실제 종료일:
                        {formatDate(
                            videoDetails.actualEndTime,
                            'yyyy.MM.dd HH:mm:ss'
                        )}
                    </p>
                )}
                {videoDetails.scheduledStartTime && (
                    <p>
                        라이브 공식 시작일:{' '}
                        {formatDate(
                            videoDetails.scheduledStartTime,
                            'yyyy.MM.dd HH:mm:ss'
                        )}
                    </p>
                )}
                {videoDetails.scheduledEndTime && (
                    <p>
                        영상 종료일:{' '}
                        {formatDate(
                            videoDetails.scheduledEndTime,
                            'yyyy.MM.dd HH:mm:ss'
                        )}
                    </p>
                )}
            </div>
        </div>
    )
}

export default VideoDetails
