import { formatDate } from 'date-fns'
import { EventType } from '../calendar/Calendar'

interface ListProps {
    event: EventType[]
}
const List = ({ event }: ListProps) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Member</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {event.slice(0, 10).map((stream, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{stream.title}</td>
                            <td>{'1'}</td>
                            <td>{'abcde'}</td>
                            <td>
                                {formatDate(
                                    stream.start_dt,
                                    'yyyy:MM:dd HH:mm:ss'
                                )}
                            </td>
                            <td>
                                {formatDate(
                                    stream.end_dt,
                                    'yyyy:MM:dd HH:mm:ss'
                                )}
                            </td>
                            <td>
                                <a
                                    href={stream.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Link
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List
