import type { SVGProps } from 'react';

const CompanyLogoIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 48, height = 48, ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect width="48" height="48" rx="8" fill="#E5E7EB" />
      <path d="M24 16L28 20L24 24L20 20L24 16Z" fill="#9CA3AF" />
      <path d="M24 24L28 28L24 32L20 28L24 24Z" fill="#9CA3AF" />
    </svg>
  );
};

export default CompanyLogoIcon;
