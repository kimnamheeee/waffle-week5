import type { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) => {
  const getVariantStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      fontSize: '1rem',
      fontWeight: 'normal',
      width: fullWidth ? '100%' : 'auto',
    };

    const variantStyles: Record<string, CSSProperties> = {
      primary: {
        backgroundColor: '#2563eb',
        color: 'white',
      },
      secondary: {
        backgroundColor: 'white',
        color: '#333',
        border: '1px solid #ddd',
      },
      success: {
        backgroundColor: '#059669',
        color: 'white',
      },
      danger: {
        backgroundColor: '#dc2626',
        color: 'white',
      },
    };

    return { ...baseStyles, ...variantStyles[variant] };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={getVariantStyles()}
    >
      {children}
    </button>
  );
};

export default Button;
