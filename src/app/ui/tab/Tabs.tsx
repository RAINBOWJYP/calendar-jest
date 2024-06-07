'use client'

import React, { useState, ReactElement } from 'react'
import styles from './tab.module.scss'

interface TabsProps {
    lists: string[]
    setActiveTab: (label: string) => void
}

const Tabs: React.FC<TabsProps> = ({ lists, setActiveTab }) => {
    const [focusIndex, setFocusIndex] = useState<number>(0)

    const handleTabClick = (label: string, index: number) => {
        setActiveTab(label)
        setFocusIndex(index)
    }
    return (
        <div className={styles.tabs}>
            <ul className={styles['tab-list']}>
                {lists.map((list, index) => {
                    return (
                        <li
                            key={index}
                            className={`${styles['tab-item']} ${focusIndex === index && styles['focused']}`}
                            onClick={() => {
                                handleTabClick(list, index)
                            }}
                        >
                            {list}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Tabs
