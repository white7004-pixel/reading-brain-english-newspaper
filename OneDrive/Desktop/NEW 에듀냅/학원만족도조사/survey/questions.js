// 리딩브레인 설문 문항 — 설문 화면과 결과 화면이 함께 읽는다.
// 문항을 고치려면 여기만 고친다. 이미 받은 답과 짝이 맞도록 id 는 바꾸지 않는다.
(function () {
  var SAT = [ // 학부모 5점: 구글폼 순서(매우 만족이 먼저)
    { v: 5, label: '매우 만족' }, { v: 4, label: '만족' }, { v: 3, label: '보통' },
    { v: 2, label: '불만족' }, { v: 1, label: '매우 불만족' }];
  var AGREE = [ // 학생 5점: ① 전혀 아니다 ~ ⑤ 매우 그렇다
    { v: 1, label: '전혀 아니다' }, { v: 2, label: '아니다' }, { v: 3, label: '보통이다' },
    { v: 4, label: '그렇다' }, { v: 5, label: '매우 그렇다' }];
  var HW = [
    { v: 1, label: '너무 적어요' }, { v: 2, label: '조금 적어요' }, { v: 3, label: '적당해요' },
    { v: 4, label: '조금 많아요' }, { v: 5, label: '너무 많아요' }];
  var YNM = ['그렇다', '보통이다', '아니다'];

  var SURVEYS = {
    parent: {
      id: 'parent',
      once: true, // 같은 폰에서 두 번 내지 않게 (학생은 태블릿을 돌려 쓰니 막지 않는다)
      title: '아이의 올바른 성장 방향을 묻다',
      kicker: '2027 리딩브레인 학부모 설문',
      intro: [
        '안녕하세요, 리딩브레인영어학원입니다.',
        '2027년에도 우리 아이들에게 더 나은 교육을 제공하기 위해 간단한 설문을 마련하였습니다.',
        '아래 문항에 솔직한 의견을 남겨주시면, 내년 교육 프로그램 운영과 학습 관리에 적극 반영하겠습니다.',
        '바쁜 시간 내주시어 소중한 의견 주셔서 감사합니다.'],
      notice: '본 설문은 무기명으로 진행되며, 답변 내용은 수업 운영 개선을 위한 참고 자료로만 활용됩니다. 솔직한 의견을 부탁드립니다.',
      sections: [
        { title: '학생 레벨',
          desc: '커리큘럼별, 학년별 수업 난이도 및 학습량, 숙제량 등의 적정도를 파악하기 위하여 학생의 커리큘럼과 학년 선택 부탁드립니다.',
          items: [
            { id: 'grade', type: 'single', required: true, filter: true, label: '현재 자녀 학년',
              options: ['초등 1학년', '초등 2학년', '초등 3학년', '초등 4학년', '초등 5학년', '초등 6학년', '중등 1학년', '중등 2학년', '중등 3학년', '고등 1학년', '고등 2학년', '고등 3학년'] },
            { id: 'curricula', type: 'multi', required: true, filter: true, label: '현재 자녀가 수강중인 커리큘럼',
              options: ['기초원서(파닉스)', '원서정독', '중고등특목관(문법/단어/독해)', '미국교과', '영자신문/논픽션리딩', '스터디포스'] }] },
        { title: '교수팀 & 수업 관련 만족도',
          desc: '리딩브레인 수업에 대한 의견을 부탁드려요! 우리 아이들의 소중한 수업 시간이 더 값지고 알차게 쓰일 수 있도록, 공유해 주신 의견 적극 반영 하겠습니다.',
          items: [
            { id: 't_deliver', type: 'scale', required: true, options: SAT, label: '담당 선생님의 수업 전달력에 만족하시나요?' },
            { id: 't_curr', type: 'scale', required: true, options: SAT, label: '담당 선생님의 수업 커리큘럼과 학생 관리에 만족하시나요?' },
            { id: 'rel', type: 'single', required: true, options: YNM, label: '자녀가 선생님과 긍정적인 관계를 형성하고 있나요?' },
            { id: 'diff', type: 'single', required: true, options: ['쉽다', '적절하다', '어렵다'], label: '현재 수업 난이도는 자녀에게 적절하다고 느끼시나요?' },
            { id: 'load', type: 'single', required: true, options: ['부담된다', '적절하다', '부족하다'], label: '수업 학습량(수업 중 처리 분량)은 자녀에게 부담되지 않나요?' },
            { id: 'hw', type: 'single', required: true, options: ['많다', '적절하다', '적다'], label: '주어지는 숙제량은 자녀에게 적절하다고 느끼시나요?' },
            { id: 'hw_diligence', type: 'single', required: true, label: '자녀가 숙제를 얼마나 성실하게 하고 있나요?',
              options: ['숙제를 매우 잘해가고 성실한 편이다', '숙제를 그런대로 성실하게 해가고 지적을 받지 않는다', '숙제를 가끔 못해갈 때가 있다', '거의 숙제를 하지 못한다'] },
            { id: 'growth', type: 'single', required: true, options: YNM, label: '수업을 통해 자녀의 영어 실력 또는 표현력 향상을 체감하고 계신가요?' }] },
        { title: '운영팀 관련 만족도',
          desc: '학부모님들의 소중한 의견으로 더 나은 리딩브레인이 되겠습니다 ^^',
          items: [
            { id: 'o_notice', type: 'scale', required: true, options: SAT, label: '학원 안내사항(공지, 일정 등)이 정확하게 전달되었나요?' },
            { id: 'o_reply', type: 'scale', required: true, options: SAT, label: '학원 응답(전화, 문자, 상담 등)이 신속하게 처리되었나요?' },
            { id: 'o_admin', type: 'scale', required: true, options: SAT, label: '행정 처리(수업 등록, 결석/보강 안내, 수강료 납부 등)가 원활하다고 느끼시나요?' }] },
        { title: '자유의견',
          desc: '수업이나 운영에 대해 특별히 만족하셨던 부분, 그리고 기타 전하고 싶은 말씀을 자유롭게 적어주세요.',
          items: [
            { id: 'good', type: 'text', required: true, label: '리딩브레인 수업 중 특히 만족하신 부분이 있다면 알려주세요.' },
            { id: 'etc', type: 'text', required: false, label: '기타 전하고 싶은 의견이 있으시다면 자유롭게 남겨주세요.' }] }]
    },

    student: {
      id: 'student',
      big: true,
      title: '리딩브레인 친구들의 솔직한 이야기',
      kicker: '리딩브레인 학생 설문',
      intro: [
        '안녕하세요, 리딩브레인 친구들!',
        '리딩브레인 영어학원에서는 여러분이 더 즐겁고 효과적으로 공부할 수 있도록 의견을 듣고자 합니다.',
        '여러분의 생각을 솔직하게 적어주세요. 여러분의 답변은 수업 개선에 큰 도움이 됩니다.'],
      notice: '이름은 묻지 않아요. 누가 썼는지 아무도 모르니 마음 편히 솔직하게 답해 주세요.',
      sections: [
        { title: '나는 몇 학년?', desc: '',
          items: [
            { id: 'grade', type: 'single', required: true, filter: true, label: '현재 학년',
              options: ['초등 1학년', '초등 2학년', '초등 3학년', '초등 4학년', '초등 5학년', '초등 6학년', '중등 1학년', '중등 2학년', '중등 3학년', '고등 1학년', '고등 2학년', '고등 3학년'] }] },
        { title: '수업과 선생님', desc: '나와 가장 가까운 칸을 골라 주세요.',
          items: [
            { id: 's_fun', type: 'scale', required: true, options: AGREE, label: '나는 리딩브레인 수업이 재미있다고 느낀다.' },
            { id: 's_come', type: 'scale', required: true, options: AGREE, label: '학원에 오는 것이 즐겁다.' },
            { id: 's_kind', type: 'scale', required: true, options: AGREE, label: '선생님이 친절하고 따뜻하게 대해주신다.' },
            { id: 's_explain', type: 'scale', required: true, options: AGREE, label: '선생님이 설명을 이해하기 쉽게 해주신다.' },
            { id: 's_know', type: 'scale', required: true, options: AGREE, label: "선생님이 나의 '진짜 실력과 현재 학습 목표'를 잘 알고 계신다." },
            { id: 's_respect', type: 'scale', required: true, options: AGREE, label: '선생님이 나의 의견을 존중해 주신다고 느낀다.' },
            { id: 's_talk', type: 'scale', required: true, options: AGREE, label: '질문이나 고민이 있을 때 선생님께 편하게 이야기할 수 있다.' },
            { id: 's_clear', type: 'scale', required: true, options: AGREE, label: "수업 후 '오늘 배운 내용을 확실히 알겠다!'는 기분이 자주 든다." },
            { id: 's_grow', type: 'scale', required: true, options: AGREE, label: '수업을 통해 내 영어 실력이 좋아지고 있다고 느낀다.' },
            { id: 's_books', type: 'scale', required: true, options: AGREE, label: '학원에서 읽는 원서와 활동이 나에게 도움이 된다.' },
            { id: 's_mood', type: 'scale', required: true, options: AGREE, label: '학원 분위기(교실, 선생님, 친구들)가 편안하다.' },
            { id: 's_hw', type: 'scale', required: true, options: HW, noAvg: true, label: '숙제나 과제의 양은 어떤가요?' }] },
        { title: '내 생각 적기', desc: '쓰고 싶은 것만 적어도 괜찮아요.',
          items: [
            { id: 's_best', type: 'text', label: '수업 시간에 가장 재미있었던(시간 가는 줄 몰랐던) 활동은 무엇인가요?' },
            { id: 's_hard', type: 'text', label: '수업 내용 중 이해가 덜 되거나 너무 어렵다고 느끼는 부분이 있나요?' },
            { id: 's_want', type: 'text', label: '앞으로 학원에서 하고 싶은 활동이나 배우고 싶은 내용은 무엇인가요?' },
            { id: 's_wish', type: 'text', label: '선생님께 바라는 점이 있나요?' },
            { id: 's_good', type: 'text', label: '리딩브레인 학원에서 가장 좋은 점은 무엇인가요?' },
            { id: 's_change', type: 'text', label: '수업이 더 재미있어지려면, 또는 학원에서 바뀌면 좋겠다고 생각하는 점은 무엇인가요?' },
            { id: 's_trouble', type: 'text', flag: true, label: '공부 말고(친구 관계, 환경 등) 학원에서 불편한 상황이 있나요? 있다면 어떤 때인가요?' },
            { id: 's_etc', type: 'text', label: '기타 하고 싶은 말이 있으면 자유롭게 적어 주세요.' }] }]
    }
    // teacher: 강사 설문은 문항을 받으면 여기에 더한다.
  };

  if (typeof module !== 'undefined') module.exports = SURVEYS;
  else window.SURVEYS = SURVEYS;
})();
