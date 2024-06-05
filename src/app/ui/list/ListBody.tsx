interface Props {
    data: React.ReactNode[]
}

const ListBody = ({ data }: Props) => {
    return (
        <tr>
            {data.map((value, index) => {
                return <td key={index}>{value}</td>
            })}
        </tr>
    )
}

export default ListBody
