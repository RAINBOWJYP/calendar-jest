interface ListHeaderProps {
    columns: string[]
}
const ListHeader = ({ columns }: ListHeaderProps) => {
    return (
        <thead>
            <tr>
                {columns.map((column) => {
                    return <th>{column}</th>
                })}
            </tr>
        </thead>
    )
}

export default ListHeader
