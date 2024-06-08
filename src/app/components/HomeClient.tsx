'use client'
import { FaAngleDown } from 'react-icons/fa6'
import EventList from '../[lng]/EventList'
import Calendar from '../ui/calendar/Calendar'
import { useState } from 'react'
import Tabs from '../ui/tab/Tabs'
import { EventType } from '../lib/db'

interface HomeProps {
    i18nTrans: { [key: string]: string }
    events: EventType[]
}

const HomeClient = ({ i18nTrans, events }: HomeProps) => {
    const lists = [i18nTrans.cal, i18nTrans.list]
    const [activeTab, setActiveTab] = useState<string>(lists[0])
    return (
        <>
            <Tabs lists={lists} setActiveTab={setActiveTab} />
            {activeTab === i18nTrans.cal ? (
                <Calendar event={events} />
            ) : (
                <>
                    <EventList events={events} />
                    <FaAngleDown fill={'var(--divider)'} />
                </>
            )}
        </>
    )
}

export default HomeClient