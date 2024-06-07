import { ReactNode } from 'react'

interface TabProps {
    label: string
    children: ReactNode
}

const Tab: React.FC<TabProps> = ({ children }) => {
    return <>{children}</>
}

export default Tab
