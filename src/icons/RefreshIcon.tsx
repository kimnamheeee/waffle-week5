import type { SVGProps } from 'react';

const RefreshIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 16, height = 16, ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84821 2 11.5153 2.84285 12.6 4.2M12.6 4.2V2M12.6 4.2H10.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RefreshIcon;
