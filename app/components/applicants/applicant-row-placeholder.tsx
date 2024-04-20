import { FaEye, FaTrashCan } from 'react-icons/fa6';
import styles from './applicant-table.module.scss';

export default function ApplicantRowPlaceholder() {
  return (
    <div className={styles.row_placeholder}>
      <p>Name</p>
      <p>Applied as</p>
      <p>Applied on</p>
      <div style={{ visibility: 'hidden' }}>
        <button className='btn'>
          <FaEye />
        </button>
      </div>
      <div style={{ visibility: 'hidden' }}>
        <button className='btn'>
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
}
