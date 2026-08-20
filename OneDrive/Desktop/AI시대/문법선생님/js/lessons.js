import { ALL_UNITS } from './curriculum.js';

const guides = [
  [/be동사|There is/, ['주어의 상태와 존재를 연결해요.', 'I [[am]] calm.', '주어에 맞는 be동사를 고르는 것이 핵심이에요.']],
  [/일반동사|현재형|과거형/, ['동작이나 습관을 동사의 형태로 나타내요.', 'Mina [[walks]] to school.', '시제와 주어에 따라 동사의 모양을 확인해요.']],
  [/진행형/, ['be동사와 -ing로 진행 중인 동작을 나타내요.', 'They [[are studying]] now.', 'be동사를 빠뜨리지 않도록 주의해요.']],
  [/미래|will/, ['앞으로의 일은 will이나 be going to로 표현해요.', 'We [[will meet]] tomorrow.', 'will 뒤에는 동사원형을 써요.']],
  [/완료/, ['have와 과거분사로 과거와 현재의 연결을 나타내요.', 'I [[have finished]] my work.', 'have/has/had와 과거분사를 한 묶음으로 봐요.']],
  [/조동사|can|may|must|should|had better|used to/, ['조동사는 능력, 허가, 의무, 조언 같은 뜻을 더해요.', 'You [[should drink]] water.', '조동사 뒤에는 동사원형을 써요.']],
  [/수동태/, ['행동을 받는 대상을 주어로 세워요.', 'The room [[was cleaned]] yesterday.', 'be동사와 과거분사를 함께 써요.']],
  [/부정사|to부정사/, ['to와 동사원형이 문장에서 여러 역할을 해요.', 'I hope [[to travel]] someday.', 'to 다음에는 동사원형이 와요.']],
  [/동명사/, ['동사에 -ing를 붙여 명사처럼 사용해요.', '[[Reading]] helps me relax.', '문장에서 주어, 목적어, 보어가 될 수 있어요.']],
  [/분사/, ['현재분사와 과거분사가 명사나 상태를 설명해요.', 'The [[smiling]] child waved.', '능동은 -ing, 수동·완료는 p.p.를 먼저 떠올려요.']],
  [/비교|원급|최상급/, ['둘 이상의 성질이나 정도를 비교해요.', 'This path is [[safer than]] that one.', '비교 대상과 형태를 함께 확인해요.']],
  [/관계/, ['관계사는 두 문장을 연결하며 앞의 명사를 설명해요.', 'I met a singer [[who writes songs]].', '선행사와 뒤 절에서 빠진 성분을 확인해요.']],
  [/가정법|wish|as if/, ['사실과 다른 상상이나 아쉬움을 시제를 바꾸어 표현해요.', 'If I [[were]] free, I would join you.', '현재 반대는 과거형, 과거 반대는 had p.p.를 써요.']],
  [/접속사|and|but|or/, ['단어, 구, 절을 논리적으로 이어 줘요.', 'I stayed home [[because]] it rained.', '원인, 대조, 조건 등 연결 관계를 먼저 판단해요.']],
  [/전치사/, ['명사 앞에서 시간, 장소, 방향의 관계를 보여 줘요.', 'The keys are [[on]] the desk.', '뒤에 명사나 대명사가 오는지 확인해요.']],
  [/대명사|it|one|some|any/, ['앞에서 나온 명사를 대신해 반복을 줄여요.', 'Jisu taught [[herself]] guitar.', '가리키는 대상과 수·인칭을 일치시켜요.']],
  [/형용사/, ['형용사는 명사의 성질이나 상태를 설명해요.', 'It was a [[quiet]] morning.', '명사 앞이나 보어 자리에 올 수 있어요.']],
  [/부사/, ['부사는 동사, 형용사, 다른 부사, 문장 전체를 꾸며요.', 'The train moved [[slowly]].', '무엇을 꾸미는지 찾으면 위치가 보여요.']],
  [/SVC|SVOO|SVOC|문장/, ['동사 뒤에 오는 성분의 역할로 문장 형식을 구분해요.', 'The news made us [[happy]].', '목적어와 보어의 관계를 확인해요.']],
  [/명사|관사/, ['명사의 수와 관사의 쓰임을 함께 판단해요.', 'She bought [[an]] umbrella.', '셀 수 있는지와 특정한 대상인지 확인해요.']],
  [/의문|명령|제안|감탄/, ['말하는 목적에 따라 어순과 문장 부호가 달라져요.', '[[What a bright day]] it is!', '문장 종류마다 정해진 어순을 익혀요.']],
  [/일치|화법/, ['주어·시제·인칭의 관계를 문장 전체에서 맞춰요.', 'He said that he [[was]] tired.', '기준 시점과 전달하는 사람을 확인해요.']],
  [/강조|도치|생략|동격|부정/, ['특별한 의미를 위해 기본 어순이나 표현을 바꾸어요.', 'Never [[have I seen]] such a view.', '강조되는 요소와 원래 문장 구조를 함께 살펴요.']]
];

function guideFor(title, chapterTitle) {
  const text = `${chapterTitle} ${title}`;
  return guides.find(([pattern]) => pattern.test(text))?.[1] ?? [
    '문장 속 형태와 의미를 함께 살펴보는 문법 주제예요.',
    'We [[practice]] one clear pattern at a time.',
    '핵심 형태를 찾고 문장 안에서 역할을 확인해요.'
  ];
}

function createLesson(unit) {
  const [summary, example, caution] = guideFor(unit.title, unit.chapterTitle);
  const cleanExample = example.replaceAll('[[', '').replaceAll(']]', '');
  return {
    id: unit.id,
    book: unit.book,
    chapter: unit.chapter,
    title: unit.title,
    pageReference: unit.pageReference,
    hook: summary,
    analogy: `${unit.title}은 문장에서 알맞은 자리를 찾는 표지판과 같아요. 뜻과 형태를 함께 보면 길을 잃지 않아요.`,
    formula: `${unit.title} → 뜻 확인 → 형태 확인 → 문장 속 역할 확인`,
    examples: [
      { en: example, ko: `${unit.title}의 핵심 형태를 보여 주는 문장입니다.`, focus: caution },
      { en: `We [[practice]] ${unit.id} carefully.`, ko: '우리는 이 문법 형태를 주의 깊게 연습한다.', focus: `${unit.title}의 쓰임을 문장 안에서 확인하세요.` }
    ],
    trap: {
      wrong: `${unit.title}: 뜻을 보지 않고 형태만 고르기`,
      correct: `${unit.title}: 뜻·형태·역할을 함께 확인하기`,
      reason: caution
    },
    memory: `뜻 → 형태 → 역할, 이 순서로 ${unit.title}을 확인하세요.`,
    visualKey: 'sentence-stage',
    steps: [
      { label: '도입', heading: `${unit.title}, 왜 배울까요?`, lines: [summary], narration: `${unit.title}은 문장의 뜻을 정확히 전달하는 데 꼭 필요한 표현이에요. 오늘은 형태와 쓰임을 차근차근 확인해 봐요.` },
      { label: '핵심', heading: '한 줄 핵심', lines: [summary, caution], narration: `${summary} ${caution}` },
      { label: '형태', heading: '문장 속 자리를 찾아요', lines: [`핵심 주제: [[${unit.title}]]`, caution], narration: `문장을 볼 때 ${unit.title}의 표시와 주변 단어를 함께 확인하세요.` },
      { label: '예문', heading: '예문으로 확인해요', lines: [example, '소리 내어 읽고 강조된 부분을 바꾸어 새 문장을 만들어 보세요.'], narration: `${cleanExample} 강조된 부분이 오늘 배운 문법의 핵심이에요.` },
      { label: '정리', heading: '세 가지만 기억해요', lines: ['① 의미를 먼저 파악하기', '② 핵심 형태 표시하기', '③ 주어·시제·문장 성분 확인하기'], narration: `뜻, 형태, 문장 속 역할의 순서로 확인하면 ${unit.title} 문제를 안정적으로 풀 수 있어요.` }
    ],
    quiz: [
      { question: `${unit.title}을 공부할 때 가장 먼저 확인할 것은?`, options: ['문장의 의미와 상황', '단어의 글자 수', '문장의 색상', '페이지 여백'], answer: 0, explanation: '문법 형태를 고르기 전에 문장이 전달하려는 의미와 상황을 먼저 파악해야 해요.' },
      { question: `다음 중 오늘의 예문으로 제시된 문장은?`, options: [cleanExample, 'Blue quickly three.', 'Because and but.', 'The page is seven.'], answer: 0, explanation: `오늘의 예문은 “${cleanExample}”예요. 핵심 표현의 위치를 다시 확인해 보세요.` },
      { question: `${unit.title}을 점검하는 좋은 방법은?`, options: ['뜻·형태·역할을 함께 본다', '끝 단어만 본다', '항상 첫 보기를 고른다', '해석 없이 외운다'], answer: 0, explanation: '문장의 뜻, 문법 형태, 문장 속 역할을 함께 확인하면 실수가 줄어요.' }
    ]
  };
}

export const LESSONS = Object.fromEntries(ALL_UNITS.map(unit => [unit.id, createLesson(unit)]));
export const getLesson = id => LESSONS[id] ?? null;
