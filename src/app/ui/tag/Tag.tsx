import styles from './tag.module.scss'

interface TagProps {
    label: string
    type: 'primary' | 'secondary' | 'teritory'
}
const Tag = ({ label, type = 'primary' }: TagProps) => {
    return <div className={`${styles.tag} ${styles[type]}`}>{label}</div>
}

export default Tag
