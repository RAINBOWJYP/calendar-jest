'use client'
import { useState } from 'react'
import Tabs from '../ui/tab/Tabs'

interface EventTabProps {
    i18nTrans: { [key: string]: string }
}

const EventTab = ({ i18nTrans }: EventTabProps) => {
    const lists = [i18nTrans.cal, i18nTrans.list]
    const [activeTab, setActiveTab] = useState<string>(lists[0])
    return <Tabs lists={lists} setActiveTab={setActiveTab} />
}

export default EventTab
