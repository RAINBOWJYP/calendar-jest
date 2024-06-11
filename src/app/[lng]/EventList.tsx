'use client'
import { useState } from 'react'
import { EventType } from '../lib/events'
import List from '../ui/list/List'
import Modal from '../ui/modal/Modal'
import VideoDetails from '../ui/modal/VideoDetails'

interface EventProps {
    events: EventType[]
}

const EventList = ({ events }: EventProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [event, setEvent] = useState<EventType | null>(null)

    return (
        <>
            <List
                event={events}
                isHeader={false}
                onClick={() => {
                    setIsModalOpen(true)
                }}
                setEvent={setEvent}
            />
            {isModalOpen && event && (
                <Modal onClick={() => setIsModalOpen(false)}>
                    <VideoDetails
                        videoId={event.url.split('v=')[1]}
                        url={event.url}
                    />
                </Modal>
            )}
        </>
    )
}

export default EventList
