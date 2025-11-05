import type { SVGProps } from 'react';

const BookmarkIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 24, height = 24, fill = 'none', ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookmarkIcon;
