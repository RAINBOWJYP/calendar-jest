'use client'
import { formatDate } from 'date-fns'
import ListHeader from './ListHeader'
import ListBody from './ListBody'
import { Button } from '../button/Button'
import { FaAngleRight } from 'react-icons/fa6'

import styles from './list.module.scss'
import { EventType } from '@/app/lib/events'

interface ListProps {
    event: EventType[]
    isHeader: boolean
    setEvent: (stream: EventType) => void
    onClick: () => void
}
const List = ({ event, isHeader, onClick, setEvent }: ListProps) => {
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
                    {event.slice(0, 10).map((stream, index) => (
                        <ListBody
                            key={index}
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
