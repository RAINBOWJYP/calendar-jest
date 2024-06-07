'use client'
import { formatDate } from 'date-fns'
import { EventType } from '../calendar/Calendar'
import ListHeader from './ListHeader'
import ListBody from './ListBody'
import { Button } from '../button/Button'
import { FaAngleRight } from 'react-icons/fa6'

import styles from './list.module.scss'

interface ListProps {
    event: EventType[]
    isHeader: boolean
    onClick: () => void
}
const List = ({ event, isHeader, onClick }: ListProps) => {
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
                            onClick={onClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List
