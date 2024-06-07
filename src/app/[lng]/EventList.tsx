'use client'
import { EventType } from '../ui/calendar/Calendar'
import List from '../ui/list/List'

interface EventProps {
    events: EventType[]
}

const EventList = ({ events }: EventProps) => {
    return (
        <List
            event={events}
            isHeader={false}
            onClick={() => {
                alert('hello')
            }}
        />
    )
}

export default EventList
