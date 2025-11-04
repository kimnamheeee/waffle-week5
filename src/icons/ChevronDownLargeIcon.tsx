import type { SVGProps } from 'react';

const ChevronDownLargeIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 20, height = 20, ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDownLargeIcon;
