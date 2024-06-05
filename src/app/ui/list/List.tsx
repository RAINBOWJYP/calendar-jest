'use client'
import { formatDate } from 'date-fns'
import { EventType } from '../calendar/Calendar'
import ListHeader from './ListHeader'
import ListBody from './ListBody'
import { Button } from '../button/Button'

interface ListProps {
    event: EventType[]
}
const List = ({ event }: ListProps) => {
    return (
        <div>
            <table>
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
                <tbody>
                    {event.slice(0, 10).map((stream, index) => (
                        <ListBody
                            key={index}
                            data={[
                                index,
                                stream.title,
                                '1',
                                'abcde',
                                formatDate(
                                    stream.start_dt,
                                    'yyyy:MM:dd HH:mm:ss'
                                ),
                                formatDate(
                                    stream.end_dt,
                                    'yyyy:MM:dd HH:mm:ss'
                                ),
                                <Button
                                    onClick={() => {
                                        window.open(
                                            stream.url,
                                            '_blank',
                                            'noopener,noreferrer'
                                        )
                                    }}
                                    label="보기"
                                    size="small"
                                />,
                            ]}
                        />
                        // <tr key={index}>
                        //     <td>{index}</td>
                        //     <td>{stream.title}</td>
                        //     <td>{'1'}</td>
                        //     <td>{'abcde'}</td>
                        //     <td>
                        //         {formatDate(
                        //             stream.start_dt,
                        //             'yyyy:MM:dd HH:mm:ss'
                        //         )}
                        //     </td>
                        //     <td>
                        //         {formatDate(
                        //             stream.end_dt,
                        //             'yyyy:MM:dd HH:mm:ss'
                        //         )}
                        //     </td>
                        //     <td>
                        //         <a
                        //             href={stream.url}
                        //             target="_blank"
                        //             rel="noopener noreferrer"
                        //         >
                        //             Link
                        //         </a>
                        //     </td>
                        // </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List
