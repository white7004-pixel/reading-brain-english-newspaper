// 학원 정보 기본값 — 원장 결정 10/1: 일단 리딩브레인영어학원. 시작 화면 "학원 정보"에서 저장하면 그것을 쓴다.
export const DEFAULT_ACADEMY = { name: '리딩브레인영어학원', phone: '02-2135-8311', color: '#092E49', logo: 'brand/rb-mark.png' };

export const academyOf = (saved) => (saved?.name ? saved : { ...DEFAULT_ACADEMY });

// 결과지 로고: 올린 그림(data:) 또는 기본 로고 경로만 쓴다. 결과에는 로고를 빼고 저장하므로 리딩브레인이면 기본 로고로 채운다.
export function logoOf(academy) {
  const logo = academy?.logo || (academy?.name === DEFAULT_ACADEMY.name ? DEFAULT_ACADEMY.logo : '');
  return /^data:image\//.test(logo) || logo === DEFAULT_ACADEMY.logo ? logo : '';
}
