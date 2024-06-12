import { TableHTMLAttributes, forwardRef } from 'react'
import styles from './list.module.scss'

interface Props extends TableHTMLAttributes<HTMLTableRowElement> {
    data: React.ReactNode[]
    onClick: () => void
}

const ListBody = forwardRef<HTMLTableRowElement, Props>(
    ({ data, onClick }, ref) => {
        return (
            <tr className={styles['list-body']} onClick={onClick} ref={ref}>
                {data.map((value, index) => {
                    return <td key={index}>{value}</td>
                })}
            </tr>
        )
    }
)

export default ListBody
