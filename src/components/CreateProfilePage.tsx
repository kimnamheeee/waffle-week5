import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from './Button';
import NavigationBar from './NavigationBar';
import TextInput from './TextInput';
import '../styles/common.css';
import '../styles/CreateProfilePage.css';

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('mode') === 'edit';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [additionalDepartments, setAdditionalDepartments] = useState<
    Array<{ id: number; value: string }>
  >([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string | undefined }>({});
  const nextIdRef = useRef(0);

  // Fetch existing profile to pre-populate form ONLY when editing
  useEffect(() => {
    if (!isEditMode) return;
    import('../api/applicant/getApplicant')
      .then((m) => m.getApplicant())
      .then((data) => {
        if (data.enrollYear) {
          const twoDigit = String(data.enrollYear % 100).padStart(2, '0');
          setStudentId(twoDigit);
        }
        if (data.department) {
          const depts = data.department
            .split(',')
            .map((d) => d.trim())
            .filter(Boolean);
          if (depts.length > 0) {
            setDepartment(depts[0]);
            if (depts.length > 1) {
              setAdditionalDepartments(
                depts.slice(1).map((d, i) => ({ id: i, value: d }))
              );
              nextIdRef.current = depts.length - 1;
            }
          }
        }
      })
      .catch(() => {
        // no profile yet, leave fields empty
      });
  }, [isEditMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate extension and size <= 5MB
    const isPdf =
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setErrors((s) => ({ ...s, cv: 'PDF 파일만 업로드 가능합니다.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((s) => ({
        ...s,
        cv: '5MB 이하의 PDF 파일만 업로드 가능합니다.',
      }));
      return;
    }
    setErrors((s) => ({ ...s, cv: undefined }));
    setCvFile(file);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    // Validation
    const newErrors: { [k: string]: string | undefined } = {};

    // studentId must be exactly 2 digits
    if (!/^[0-9]{2}$/.test(studentId)) {
      newErrors.studentId = '두 자리 수 숫자로 작성해주세요.';
    }

    // primary major required
    if (!department || department.trim() === '') {
      newErrors.department = '주전공을 입력해주세요.';
    }

    // additional majors must not duplicate primary or each other
    const extras = additionalDepartments
      .map((d) => d.value.trim())
      .filter(Boolean);
    const duplicates =
      extras.some((v, i) => extras.indexOf(v) !== i) ||
      extras.includes(department.trim());
    if (duplicates) {
      newErrors.departmentExtras = '다전공은 중복될 수 없습니다.';
    }

    // CV required
    if (!cvFile) {
      newErrors.cv = '이력서(PDF)를 업로드해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Transform studentId to full year
    const num = parseInt(studentId, 10);
    const fullYear = num >= 80 ? 1900 + num : 2000 + num;

    // Build department string: primary first, then extras separated by comma
    const deptList = [department.trim(), ...extras];
    const uniqueDeptList = Array.from(new Set(deptList));
    const deptString = uniqueDeptList.join(',');

    // Build cvKey as: static/private/CV/{rand10}_{YYYYMMDD}/{filename}.pdf
    const rand = Math.random().toString(36).slice(2, 12);
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const datePart = `${yyyy}${mm}${dd}`;
    const safeFilename = (cvFile as File).name.replace(/\s+/g, '_');
    const cvKey = `static/private/CV/${rand}_${datePart}/${safeFilename}`;

    // send PUT request
    import('../api/applicant/putApplicant')
      .then((m) =>
        m.putApplicant({ enrollYear: fullYear, department: deptString, cvKey })
      )
      .then(() => {
        // navigate back to my-page so user can see profile
        navigate('/my-page');
      })
      .catch(() => {
        setErrors((s) => ({
          ...s,
          submit: '서버 요청 중 오류가 발생했습니다.',
        }));
      });
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
              {errors.studentId && (
                <div className="error-text">{errors.studentId}</div>
              )}

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
              {errors.department && (
                <div className="error-text">{errors.department}</div>
              )}
              {errors.departmentExtras && (
                <div className="error-text">{errors.departmentExtras}</div>
              )}

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
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <p className="file-upload-filename">{cvFile.name}</p>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setCvFile(null);
                        setErrors((s) => ({ ...s, cv: undefined }));
                      }}
                      type="button"
                    >
                      삭제
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {errors.cv && <div className="error-text">{errors.cv}</div>}
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
