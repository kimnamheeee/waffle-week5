import type { SVGProps } from 'react';
import BookmarkIcon from './BookmarkIcon';
import ChevronDownIcon from './ChevronDownIcon';
import ChevronDownLargeIcon from './ChevronDownLargeIcon';
import CompanyLogoIcon from './CompanyLogoIcon';
import RefreshIcon from './RefreshIcon';

export type IconName =
  | 'chevron-down'
  | 'chevron-down-large'
  | 'refresh'
  | 'company-logo'
  | 'bookmark'
  | 'bookmark-filled';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
}

const iconMap = {
  'chevron-down': ChevronDownIcon,
  'chevron-down-large': ChevronDownLargeIcon,
  refresh: RefreshIcon,
  'company-logo': CompanyLogoIcon,
  bookmark: BookmarkIcon,
  'bookmark-filled': BookmarkIcon,
};

export const Icon = ({
  name,
  size = 24,
  color = 'none',
  ...props
}: IconProps) => {
  const IconComponent = iconMap[name];

  const forwarded: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    fill: name === 'bookmark-filled' ? 'currentColor' : color,
    ...props,
  };

  return <IconComponent {...forwarded} />;
};

export default Icon;
