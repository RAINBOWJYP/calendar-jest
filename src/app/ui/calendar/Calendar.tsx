'use client'
import { getDaysInMonth } from '@/app/utils/dateUtils'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styles from './calendar.module.css'
import { useState } from 'react'
interface Events {
    [date: string]: string
}

const Calendar = ({ year, month }: { year: number; month: number }) => {
    const [events, setEvents] = useState<Events>({})

    const handleDateClick = (date: string) => {
        const event = prompt(`Enter event for ${date}`)
        if (event) {
            setEvents({ ...events, [date]: event })
        }
    }

    const renderCalendar = () => {
        const daysInMonth = new Date(year, month, 0).getDate() //일자를 가져옵니다. ex) 2024년 2월 일자는 29
        const firstDayOfMonth = new Date(year, month, 1).getDay() //1일자의 요일을 가져옵니다. 수요일은 3
        console.log('🚀 ~ renderCalendar ~ firstDayOfMonth:', firstDayOfMonth)
        const rows = []
        let cells = []

        // 빈 셀 추가 (첫 번째 요일 이전)
        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push(<td key={`empty-${i}`} className="empty-cell"></td>)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${month}-${String(day).padStart(2, '0')}`
            cells.push(
                <td
                    key={date}
                    onClick={() => handleDateClick(date)}
                    className="cell"
                >
                    <div className="date">{day}</div>
                    <div className="event">{events[date]}</div>
                </td>
            )
            if ((day + firstDayOfMonth) % 7 === 0 || day === daysInMonth) {
                rows.push(<tr key={day}>{cells}</tr>)
                cells = []
            }
        }
        return rows
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={'ko'}
            events={[
                { title: 'Event 1', date: '2024-05-25' },
                { title: 'Event 2', date: '2024-05-26' },
            ]}
        />
    )
}

export default Calendar
