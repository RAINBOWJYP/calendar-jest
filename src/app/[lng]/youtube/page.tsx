import { useTranslation } from '@/app/i18n'
import { fetchLiveStreamingDetails, fetchVideoList } from '../test'
import { format, formatDate } from 'date-fns'

type Props = {
    params: {
        lng: string
    }
}

export type TranslationFunction = (key: string) => string

export interface Stream {
    id: {
        videoId: string
    }
    snippet: {
        title: string
        description: string
        thumbnails: {
            default: {
                url: string
            }
        }
    }
}

export default async function Home({ params: { lng } }: Props) {
    const { t }: { t: TranslationFunction } = await useTranslation(lng)

    // Fetch live streams
    const streams: any[] = await fetchVideoList()
    // console.log('🚀 ~ Home ~ streams:', streams[0])
    // console.log('🚀 ~ Home ~ streams:', streams[400])
    const live = await fetchLiveStreamingDetails()

    return (
        <>
            <h1>{t('Live Streams')}</h1>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Live</th>
                        <th>Type</th>
                        <th>Member</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {streams.map((stream, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{stream.snippet.title}</td>
                            <td>{stream.snippet.title.includes('Live')}</td>
                            <td>{'1'}</td>
                            <td>{'abcde'}</td>
                            <td>
                                {formatDate(
                                    stream.snippet.publishedAt,
                                    'yyyy:MM:dd HH:mm:ss'
                                )}
                            </td>
                            <td>
                                {formatDate(
                                    stream.snippet.publishTime,
                                    'yyyy:MM:dd HH:mm:ss'
                                )}
                            </td>
                            <td>
                                <a
                                    href={
                                        'https://www.youtube.com/watch?v=' +
                                        stream.id.videoId
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.youtube.com/watch?v=
                                    {stream.id.videoId}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
