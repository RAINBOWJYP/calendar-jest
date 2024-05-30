'use client'
import { getDaysInMonth } from '@/app/utils/dateUtils'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styles from './calendar.module.css'
import { useRef } from 'react'
import { format, parseISO } from 'date-fns'

export type EventType = {
    id: number
    title: string
    type: string
    start_dt: string
    end_dt: string
    url: string
}

export interface EventProps {
    event: EventType[]
}

const Calendar = ({ event }: EventProps) => {
    const calendarRef = useRef<FullCalendar>(null)

    function goNext() {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi()
            calendarApi.next()
        }
    }

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
                color = '#000'
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
            <div
                className={styles.eventBox}
                style={{ backgroundColor: bgColor }}
            >
                <span style={circleStyle}></span>
                <span style={{ color: '#000' }}>{eventInfo.event.title}</span>
            </div>
        )
    }

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={'ko'}
            events={event.map((v) => {
                return {
                    title: v.title,
                    start: v.start_dt,
                    end: v.end_dt,
                    id: v.type == '1' ? 'youtube' : '',
                    borderColor: '#ffffffff',
                }
            })}
            eventContent={renderEventContent}
        />
    )
}

export default Calendar
