'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './calendar.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'
import { formatDate } from 'date-fns'
import { EventType } from '@/app/lib/events'
import VideoDetails from '../modal/VideoDetails'
import Modal from '../modal/Modal'

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
                <Modal onClick={handleCloseModal}>
                    <VideoDetails
                        videoId={selectedEvent.url.split('v=')[1]}
                        url={selectedEvent.url}
                    />
                </Modal>
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
