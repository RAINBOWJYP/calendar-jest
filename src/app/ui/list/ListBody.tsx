import { TableHTMLAttributes } from 'react'
import styles from './list.module.scss'

interface Props extends TableHTMLAttributes<HTMLTableElement> {
    data: React.ReactNode[]
    onClick: () => void
}

const ListBody = ({ data, onClick }: Props) => {
    return (
        <tr className={styles['list-body']} onClick={onClick}>
            {data.map((value, index) => {
                return <td key={index}>{value}</td>
            })}
        </tr>
    )
}

export default ListBody
