'use client'
import { getDaysInMonth } from '@/app/utils/dateUtils'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styles from './calendar.module.css'
import { useRef } from 'react'

const Calendar = () => {
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
                bgColor = '#fffafa'
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
                <b>{eventInfo.timeText}</b>
                <span style={{ color: '#000' }}>{eventInfo.event.title}</span>
            </div>
        )
    }

    return (
        <>
            <button onClick={() => goNext()}>dd</button>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={'ko'}
                events={[
                    {
                        title: 'Event 1',
                        date: '2024-05-25',
                        id: 'youtube',
                        borderColor: '#ffffffff',
                    },
                    {
                        title: 'Event 2',
                        date: '2024-05-25',
                        id: 'radio',
                        borderColor: '#ffffffff',
                    },
                    {
                        title: 'Event 3',
                        date: '2024-05-25',
                        id: 'md',
                        borderColor: '#ffffffff',
                    },
                    {
                        title: 'Event 2',
                        date: '2024-05-26',
                        id: 'birth',
                        borderColor: '#ffffffff',
                    },
                ]}
                eventContent={renderEventContent}
            />
        </>
    )
}

export default Calendar
