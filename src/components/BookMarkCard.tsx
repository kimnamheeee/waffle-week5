import '../styles/BookMarkCard.css';
import { mapApiPositionTypeToKorean } from '../constants/positionMapping';
import BookmarkIcon from '../icons/BookmarkIcon';

interface BookMarkCardProps {
  positionTitle: string;
  emplymentEndDate: string;
  positionType: string;
}

const BookMarkCard = ({
  positionTitle,
  emplymentEndDate,
  positionType,
}: BookMarkCardProps) => {
  const formatEmploymentEndDate = () => {
    try {
      const raw = emplymentEndDate as string | null | undefined;
      const normalized = raw == null ? '' : String(raw).trim();

      if (
        normalized === '' ||
        normalized === '0' ||
        normalized.toLowerCase() === 'null' ||
        normalized === '상시채용'
      ) {
        return <span>상시채용</span>;
      }

      const endDate = new Date(normalized);
      if (Number.isNaN(endDate.getTime()) || endDate.getTime() === 0) {
        return <span>상시채용</span>;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        return <span>마감</span>;
      }

      return <span>D-{diffDays}</span>;
    } catch {
      return <span>상시채용</span>;
    }
  };

  return (
    <div className="book-mark-card">
      <BookmarkIcon fill="currentColor" />
      <h3 className="book-mark-card-title">{positionTitle}</h3>
      <p className="book-mark-card-emplyment-end-date">
        {formatEmploymentEndDate()}
      </p>
      <p className="book-mark-card-position-type">
        {mapApiPositionTypeToKorean(positionType)}
      </p>
    </div>
  );
};

export default BookMarkCard;
