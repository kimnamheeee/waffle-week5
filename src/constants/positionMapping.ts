const POSITION_TYPE_MAPPING: Record<string, string> = {
  FRONT: '프론트엔드 개발',
  APP: '앱 개발',
  BACKEND: '서버 · 백엔드 개발',
  DATA: '데이터',
  OTHERS: '기타 분야',
  DESIGN: '디자인',
  PLANNER: '기획',
  MARKETING: '마케팅',
};

export const mapApiPositionTypeToKorean = (apiPositionType: string): string => {
  return POSITION_TYPE_MAPPING[apiPositionType] ?? apiPositionType;
};
