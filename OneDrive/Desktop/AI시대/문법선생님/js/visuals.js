export const VISUALS = Object.freeze({
  'state-action': { src: 'assets/grammar-visuals/state-action.png', alt: '가만히 상태를 보여 주는 학생과 힘차게 달리는 학생을 대비한 실사 장면' },
  timeline: { src: 'assets/grammar-visuals/timeline.png', alt: '아침부터 저녁까지 같은 학생이 이동하며 시간 흐름을 보여 주는 실사 장면' },
  'completion-result': { src: 'assets/grammar-visuals/completion-result.png', alt: '완성한 과제와 지금 확인되는 결과를 함께 보여 주는 실사 장면' },
  'modal-signs': { src: 'assets/grammar-visuals/modal-signs.png', alt: '가능과 허가와 의무와 조언의 선택지를 여러 문으로 나타낸 실사 장면' },
  'passive-focus': { src: 'assets/grammar-visuals/passive-focus.png', alt: '행동한 사람보다 행동을 받은 대상을 선명하게 강조한 실사 장면' },
  'infinitive-gerund': { src: 'assets/grammar-visuals/infinitive-gerund.png', alt: '앞으로의 계획과 지금 즐기는 활동을 나누어 보여 주는 실사 장면' },
  'participle-emotion': { src: 'assets/grammar-visuals/participle-emotion.png', alt: '감정을 일으키는 대상과 감정을 느끼는 학생을 대비한 실사 장면' },
  comparison: { src: 'assets/grammar-visuals/comparison.png', alt: '높이와 속도와 거리가 다른 대상을 한눈에 비교하는 실사 장면' },
  'conjunction-bridge': { src: 'assets/grammar-visuals/conjunction-bridge.png', alt: '두 생각을 잇는 다리와 선택을 나타내는 갈림길 실사 장면' },
  'relative-link': { src: 'assets/grammar-visuals/relative-link.png', alt: '사람과 사물에 추가 설명 카드가 연결된 실사 장면' },
  'conditional-split': { src: 'assets/grammar-visuals/conditional-split.png', alt: '현실의 길과 상상의 길이 두 갈래로 나뉜 실사 장면' },
  'sentence-stage': { src: 'assets/grammar-visuals/sentence-stage.png', alt: '문장 성분 역할을 맡은 학생들이 무대의 서로 다른 위치에 선 실사 장면' }
});

export const getVisual = key => VISUALS[key] ?? null;
