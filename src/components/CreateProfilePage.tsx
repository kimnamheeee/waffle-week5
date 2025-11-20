import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import NavigationBar from './NavigationBar';
import TextInput from './TextInput';
import '../styles/common.css';
import '../styles/CreateProfilePage.css';

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [additionalDepartments, setAdditionalDepartments] = useState<
    Array<{ id: number; value: string }>
  >([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const nextIdRef = useRef(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCvFile(file);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    // TODO: API 호출
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddDepartment = () => {
    if (additionalDepartments.length < 6) {
      setAdditionalDepartments([
        ...additionalDepartments,
        { id: nextIdRef.current++, value: '' },
      ]);
    }
  };

  const handleRemoveDepartment = (id: number) => {
    setAdditionalDepartments(
      additionalDepartments.filter((dept) => dept.id !== id)
    );
  };

  const handleAdditionalDepartmentChange = (id: number, value: string) => {
    setAdditionalDepartments(
      additionalDepartments.map((dept) =>
        dept.id === id ? { ...dept, value } : dept
      )
    );
  };

  return (
    <div className="page-container">
      <NavigationBar isAuthenticated={true} />
      <main className="create-profile-main">
        <div className="create-profile-content">
          <h1 className="create-profile-title">프로필 생성</h1>

          <div className="create-profile-section">
            <h2 className="create-profile-section-title">필수 작성 항목</h2>
            <p className="create-profile-section-description">
              아래 항목은 필수로 작성해주세요.
            </p>

            <div className="create-profile-form">
              <div className="text-input-with-suffix">
                <TextInput
                  label="학번"
                  required
                  value={studentId}
                  onChange={setStudentId}
                  placeholder="25"
                  validate={() => undefined}
                />
                <span className="text-input-suffix">학번</span>
              </div>

              <div className="department-input-row">
                <TextInput
                  label="학과"
                  required
                  value={department}
                  onChange={setDepartment}
                  placeholder="주전공 학과명을 입력해주세요."
                  validate={() => undefined}
                />
                <Button
                  variant="secondary"
                  onClick={handleAddDepartment}
                  type="button"
                  disabled={additionalDepartments.length >= 6}
                >
                  추가
                </Button>
              </div>

              {additionalDepartments.map((dept) => (
                <div key={dept.id} className="department-input-row">
                  <TextInput
                    value={dept.value}
                    onChange={(value) =>
                      handleAdditionalDepartmentChange(dept.id, value)
                    }
                    placeholder="다전공 학과명을 입력해주세요."
                    validate={() => undefined}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => handleRemoveDepartment(dept.id)}
                    type="button"
                  >
                    삭제
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="create-profile-section">
            <label className="cv-section-label">
              이력서 (CV) <span className="text-input-required">*</span>
            </label>
            <div className="file-upload-area" onClick={handleFileClick}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="file-input-hidden"
              />
              <div className="file-upload-content">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="upload-icon"
                >
                  <path
                    d="M12 4V20M4 12H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="file-upload-text">PDF 파일만 업로드 가능해요.</p>
                {cvFile && (
                  <p className="file-upload-filename">{cvFile.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="create-profile-actions">
            <Button
              variant="primary"
              onClick={handleSave}
              fullWidth
              type="button"
            >
              저장
            </Button>
            <Button
              variant="secondary"
              onClick={handleGoBack}
              fullWidth
              type="button"
            >
              뒤로가기
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProfilePage;
