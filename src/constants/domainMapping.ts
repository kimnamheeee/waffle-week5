export const DOMAIN_MAPPING = {
  전체: '',
  핀테크: 'FINTECH',
  헬스테크: 'HEALTHTECH',
  교육: 'EDUCATION',
  이커머스: 'ECOMMERCE',
  푸드테크: 'FOODTECH',
  모빌리티: 'MOBILITY',
  컨텐츠: 'CONTENTS',
  B2B: 'B2B',
  기타: 'OTHERS',
} as const;

export type DomainKey = keyof typeof DOMAIN_MAPPING;

export const mapDomainToApiValue = (domain: string): string | undefined => {
  return DOMAIN_MAPPING[domain as DomainKey] || undefined;
};
