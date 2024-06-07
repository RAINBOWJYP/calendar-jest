// SwitchButton.tsx
'use client'
import { useState } from 'react'
import styles from './switch.module.scss'

const Switch = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const handleToggle = () => {
        setIsChecked(!isChecked)
    }

    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
            />
            <span className={styles.slider}></span>
        </label>
    )
}

export default Switch
