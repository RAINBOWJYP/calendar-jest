import { IoClose } from 'react-icons/io5'
import styles from './modal.module.scss'

interface ModalProps {
    onClick: () => void
    children: React.ReactNode
}

const Modal = ({ onClick, children }: ModalProps) => {
    return (
        <div className={styles.modal} onClick={onClick}>
            <div
                className={styles['modal-content']}
                onClick={(e) => e.stopPropagation()}
            >
                <IoClose className="modal-close" onClick={onClick} />
                {children}
            </div>
        </div>
    )
}

export default Modal
