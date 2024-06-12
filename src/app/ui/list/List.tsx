'use client'
import { formatDate } from 'date-fns'
import ListHeader from './ListHeader'
import ListBody from './ListBody'
import { Button } from '../button/Button'
import { FaAngleRight } from 'react-icons/fa6'

import styles from './list.module.scss'
import { EventType } from '@/app/lib/events'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ListProps {
    initialEventList: EventType[]
    isHeader: boolean
    setEvent: (stream: EventType) => void
    onClick: () => void
}
const List = ({ initialEventList, isHeader, onClick, setEvent }: ListProps) => {
    const [eventList, setEventList] = useState<EventType[]>(initialEventList)
    const [page, setPage] = useState(1)
    const observer = useRef<IntersectionObserver | null>(null)
    const lastElementRef = useRef<HTMLTableRowElement | null>(null)

    const fetchMoreData = useCallback(async () => {
        const limit = 10
        const offset = page * limit

        // Fetch next set of data
        const response = await fetch(
            `/api/events/list?limit=${limit}&offset=${offset}`
        )
        const newEvents: EventType[] = await response.json()
        console.log('🚀 ~ fetchMoreData ~ newEvents:', newEvents)

        setEventList((prev) => [...prev, ...newEvents])
        setPage((prev) => prev + 1)
    }, [page])

    useEffect(() => {
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchMoreData()
            }
        })

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current)
        }

        return () => {
            if (observer.current) observer.current.disconnect()
        }
    }, [fetchMoreData])
    return (
        <div className={styles.list}>
            <table>
                {isHeader && (
                    <ListHeader
                        columns={[
                            'No',
                            'Title',
                            'Type',
                            'Member',
                            'Start Date',
                            'End Date',
                            'URL',
                        ]}
                    />
                )}
                <tbody>
                    {eventList.map((stream, index) => (
                        <ListBody
                            key={index}
                            ref={
                                index === eventList.length - 1
                                    ? lastElementRef
                                    : null
                            }
                            data={[
                                stream.title,
                                formatDate(stream.start_dt, 'yyyy.MM.dd'),
                                <a href={stream.url} target="_blank">
                                    <FaAngleRight fill={'var(--gray-300)'} />
                                </a>,
                            ]}
                            onClick={() => {
                                console.log(stream)
                                onClick()
                                setEvent(stream)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List
