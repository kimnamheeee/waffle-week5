import '../styles/LoginRequiredModal.css';

interface LoginRequiredModalProps {
  onLogin: () => void;
  onGoBack: () => void;
}

const LoginRequiredModal = ({ onLogin, onGoBack }: LoginRequiredModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">찜하기를 하려면 로그인이 필요해요</h2>
        <div className="modal-content">
          <p className="modal-subtitle">계정이 없으시다면</p>
          <p className="modal-description">지금 바로 회원가입해보세요</p>
        </div>
        <div className="modal-actions">
          <button className="modal-button-primary" onClick={onLogin}>
            로그인하기
          </button>
          <button className="modal-button-secondary" onClick={onGoBack}>
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
