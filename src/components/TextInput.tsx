import { type ChangeEvent, type FocusEvent, useState } from 'react';
import '../styles/TextInput.css';

interface TextInputProps {
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  validate?: (value: string) => string | undefined;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  disabled?: boolean;
  name?: string;
  id?: string;
}

const TextInput = ({
  label,
  required = false,
  value = '',
  onChange,
  onBlur,
  validate,
  placeholder,
  type = 'text',
  disabled = false,
  name,
  id,
}: TextInputProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [touched, setTouched] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);

    if (touched && validate) {
      const validationError = validate(newValue);
      setError(validationError);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.();

    if (validate) {
      const validationError = validate(e.target.value);
      setError(validationError);
    } else if (required && !e.target.value.trim()) {
      setError('필수 입력 항목입니다.');
    }
  };

  return (
    <div className="text-input-container">
      {label && (
        <label htmlFor={id} className="text-input-label">
          {label}
          {required && <span className="text-input-required">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`text-input ${error ? 'text-input-error' : ''}`}
      />
      {error && <p className="text-input-error-message">{error}</p>}
    </div>
  );
};

export default TextInput;

