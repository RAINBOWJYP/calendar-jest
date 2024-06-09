'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './calendar.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import { EventType } from '@/app/lib/db'
import { usePathname } from 'next/navigation'
import { IoClose } from 'react-icons/io5'
import Tag from '../tag/Tag'
import axios from 'axios'
import { formatDate } from 'date-fns'
import Image from 'next/image'

export interface EventProps {
    event: EventType[]
}

const Calendar = ({ event }: EventProps) => {
    const [calendarEvents, setCalendarEvents] = useState<EventType[]>(event)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)

    const calendarRef = useRef<FullCalendar>(null)
    const pathname = usePathname().slice(1, 3)

    useEffect(() => {
        setCalendarEvents(event)
    }, [event])

    function goNext() {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi()
            calendarApi.next()
        }
    }

    const eventDD = useMemo(() => {
        return calendarEvents.map((v) => {
            const normal = {
                title: v.title,
                start: v.start_dt,
                end: v.end_dt,
                id: typeList[v.type],
                borderColor: '#ffffffff',
            }
            const recurring = {
                title: v.title + ' 🎉',
                id: typeList[v.type],
                borderColor: '#ffffffff',
                rrule: {
                    freq: 'yearly',
                    dtstart: v.start_dt,
                },
            }

            return v.type == '4' ? recurring : normal
        })
    }, [event])

    const renderEventContent = (eventInfo: any) => {
        let color
        let bgColor
        switch (eventInfo.event.id) {
            case 'youtube':
                color = '#ff0000'
                bgColor = '#fef0f0'
                break
            case 'birth':
                color = '#ff9f01'
                bgColor = '#ff9f0110'
                break
            case 'md':
                color = '#ffdf00'
                bgColor = '#ffdf0010'
                break
            case 'radio':
                color = '#00ff9f'
                bgColor = '#00ff9d10'
                break
            default:
                color = '#000000'
                bgColor = '#ffffffff'
        }
        const circleStyle = {
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: color,
            marginRight: '8px',
        }

        return (
            <div className={'event-box'} style={{ backgroundColor: bgColor }}>
                <span style={circleStyle}></span>
                <span style={{ color: '#000' }}>{eventInfo.event.title}</span>
            </div>
        )
    }

    const handleEventClick = (clickInfo: any) => {
        const event = calendarEvents.find(
            (e) => e.title === clickInfo.event.title
        )
        setSelectedEvent(event || null)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedEvent(null)
    }

    return (
        <div className={'calendar'} style={{ width: '80%' }}>
            <FullCalendar
                ref={calendarRef}
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    rrulePlugin,
                ]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay',
                }}
                locale={pathname}
                events={eventDD}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                buttonText={{
                    today: pathname === 'ko' ? '오늘' : 'today',
                    month: pathname === 'ko' ? '월' : 'month',
                    week: pathname === 'ko' ? '주' : 'week',
                    day: pathname === 'ko' ? '일' : 'day',
                }}
            />
            {isModalOpen && selectedEvent && (
                <div className="modal" onClick={handleCloseModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IoClose
                            className="modal-close"
                            onClick={handleCloseModal}
                        />
                        <VideoDetails
                            videoId={selectedEvent.url.split('v=')[1]}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

const typeList: { [key: string]: string } = {
    '1': 'youtube',
    '3': 'radio',
    '4': 'birth',
}

export default Calendar

type VideoDetailsProps = {
    videoId: string
}

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

const VideoDetails = ({ videoId }: VideoDetailsProps) => {
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
        <div style={{ display: 'flex', gap: '16px' }}>
            <img
                src={videoDetails.thumbnail.url}
                width={videoDetails.thumbnail.width}
                height={videoDetails.thumbnail.height}
                alt="thumbnail"
            />
            <div>
                <h3>{videoDetails.title}</h3>
                <p>{videoDetails.description}</p>
                <p>
                    게시날짜:
                    {formatDate(
                        videoDetails.publishedAt,
                        'yyyy.MM.dd HH:mm:ss'
                    )}
                </p>
                {videoDetails.actualStartTime && (
                    <p>
                        라이브 실제 시작일:{' '}
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
