import type {
  NewspaperContent,
  BlogContent,
  InstaContent,
  NewsletterContent,
  SmsContent,
} from "./types";

function today(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function demoNewspaper(params: {
  topic: string;
  level: string;
  levelLabel: string;
  academyName: string;
}): NewspaperContent {
  const topic = params.topic || "Our Amazing Ocean";
  return {
    masthead: "THE READING BRAIN TIMES",
    date: today(),
    issueNo: `Vol. 1 · No. ${Math.floor(Math.random() * 90) + 10}`,
    levelLabel: params.levelLabel,
    articles: [
      {
        headline: `${topic}: What Young Readers Should Know`,
        subhead: "Students explore this week's big topic together",
        byline: `By the ${params.academyName} News Team`,
        body: [
          `This week, our classroom turned into a newsroom. Students picked "${topic}" as the story everyone wanted to read about, and reporters got to work right away.`,
          "First, we collected facts. We read short articles, watched a video clip, and wrote down the most surprising things we learned. Every student added one fact to our big idea board.",
          "Then we asked questions. Why does this matter to us? How does it change our town, our school, or our future? Good reporters always ask questions before they write.",
          "Finally, we shared our stories with the class. Some students drew pictures, and others read their paragraphs out loud. Everyone agreed: learning is more fun when you become the reporter.",
        ],
        imageCaption: "Students present their findings during newspaper class.",
      },
      {
        headline: "Reading Tip of the Week",
        subhead: "Small habits make strong readers",
        byline: "By Ms. Kim, Head Teacher",
        body: [
          "Do you want to read faster and remember more? Try the 3-2-1 habit. Read for three minutes, write two new words, and tell one person what you read.",
          "Students who practice the 3-2-1 habit every day say English books feel easier after just two weeks. Start tonight with any book you like!",
        ],
      },
    ],
    vocabulary: [
      {
        word: "reporter",
        pos: "n.",
        meaningKo: "기자, 취재하는 사람",
        example: "The young reporter asked three good questions.",
      },
      {
        word: "fact",
        pos: "n.",
        meaningKo: "사실",
        example: "Write down one fact you learned today.",
      },
      {
        word: "surprising",
        pos: "adj.",
        meaningKo: "놀라운",
        example: "The most surprising fact was about the deep sea.",
      },
      {
        word: "habit",
        pos: "n.",
        meaningKo: "습관",
        example: "Reading every night is a healthy habit.",
      },
      {
        word: "share",
        pos: "v.",
        meaningKo: "공유하다, 나누다",
        example: "We share our stories with the class.",
      },
    ],
    quiz: [
      {
        question: "What did the students do FIRST in newspaper class?",
        options: [
          "They shared stories out loud.",
          "They collected facts.",
          "They drew pictures.",
          "They went home.",
        ],
        answer: 1,
        explanation: "본문에서 'First, we collected facts.'라고 했어요.",
      },
      {
        question: "What is the 3-2-1 habit? Read for three minutes, write two new words, and ___.",
        options: [
          "watch one video",
          "eat one snack",
          "tell one person what you read",
          "sleep for one hour",
        ],
        answer: 2,
        explanation: "'tell one person what you read'가 3-2-1 습관의 마지막 단계예요.",
      },
      {
        question: "Which word means '놀라운'?",
        options: ["reporter", "habit", "surprising", "fact"],
        answer: 2,
        explanation: "surprising은 '놀라운'이라는 뜻의 형용사입니다.",
      },
    ],
    teacherTip:
      "수업 활용 팁: 기사 낭독 → 단어장 따라 쓰기 → 퀴즈 풀이 순서로 진행하면 25~30분 수업으로 구성할 수 있습니다. 마지막 5분은 학생이 직접 한 줄 기사 쓰기로 마무리해 보세요.",
  };
}

export function demoBlog(params: { topic: string; academyName: string; keywords: string }): BlogContent {
  const topic = params.topic || "초등 영어 리딩 습관 만들기";
  return {
    title: `${topic} — ${params.academyName}이 알려드리는 진짜 방법`,
    sections: [
      {
        heading: "학부모님, 이런 고민 있으시죠?",
        body: `"우리 아이가 영어책만 펴면 지루해해요." 상담에서 가장 많이 듣는 이야기입니다. 사실 아이가 문제가 아니라, 아이 수준에 맞지 않는 텍스트가 문제인 경우가 대부분입니다. ${params.academyName}에서는 레벨 진단부터 시작해 아이가 '읽어낼 수 있는' 텍스트를 골라줍니다.`,
      },
      {
        heading: "영자신문 수업이 효과적인 이유",
        body: "교과서 지문은 아이의 일상과 멀지만, 신문 기사는 '지금 세상 이야기'입니다. 시사 주제를 아이 눈높이의 영어로 다시 쓴 기사를 읽으면 배경지식과 어휘가 동시에 자랍니다. 읽고 끝나는 것이 아니라 단어장 정리, 이해도 퀴즈, 한 줄 기사 쓰기까지 이어지는 것이 핵심입니다.",
      },
      {
        heading: "집에서 바로 시작하는 3-2-1 습관",
        body: "3분 읽기, 새 단어 2개 쓰기, 읽은 내용 1가지 말하기. 하루 10분이면 충분합니다. 2주만 꾸준히 해도 아이가 영어 텍스트를 대하는 태도가 달라지는 것을 확인하실 수 있습니다.",
      },
      {
        heading: "리딩브레인 무료 레벨테스트 안내",
        body: `${params.academyName}에서는 매주 무료 리딩 레벨테스트를 진행합니다. 아이의 현재 위치를 정확히 알고 시작하세요. 상담 예약은 프로필 링크 또는 전화로 가능합니다.`,
      },
    ],
    hashtags: [
      "#리딩브레인", "#영어학원", "#초등영어", "#영자신문", "#영어리딩",
      "#영어독서", "#레벨테스트", "#영어공부법", "#초등영어학원", "#영어습관",
    ],
    seoKeywords: (params.keywords || "초등 영어 리딩, 영자신문 수업, 영어 학원")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  };
}

export function demoInsta(params: { topic: string; academyName: string }): InstaContent {
  const topic = params.topic || "이번 주 영자신문 수업 현장";
  return {
    caption: `📰 ${topic}\n\n아이들이 직접 기자가 되어 만든 이번 주 영자신문! 기사 읽기부터 단어 정리, 퀴즈까지 아이들 스스로 해냈어요 👏\n\n${params.academyName}의 영자신문 수업이 궁금하다면 프로필 링크를 확인해 주세요 ✨`,
    slides: [
      { title: "이번 주 뉴스룸 오픈 📰", body: "아이들이 직접 고른 주제로 영자신문을 만들었어요." },
      { title: "STEP 1. 기사 읽기", body: "내 레벨에 딱 맞는 영어 기사, 그래서 끝까지 읽어요." },
      { title: "STEP 2. 단어장 만들기", body: "기사에서 만난 새 단어 5개, 예문과 함께 정리!" },
      { title: "STEP 3. 퀴즈 풀기", body: "읽기만 하고 끝? NO! 이해했는지 퀴즈로 확인해요." },
      { title: "우리 아이도 할 수 있어요", body: "무료 레벨테스트로 시작하세요. 예약은 프로필 링크!" },
    ],
    hashtags: [
      "#리딩브레인", "#영어학원스타그램", "#초등영어", "#영자신문",
      "#영어리딩", "#학원일상", "#영어수업", "#레벨테스트",
    ],
  };
}

export function demoNewsletter(params: { month: string; academyName: string }): NewsletterContent {
  const month = params.month || `${new Date().getMonth() + 1}월`;
  return {
    title: `${params.academyName} ${month} 소식지`,
    greeting: `학부모님, 안녕하세요. 아이들의 웃음소리로 가득했던 한 달을 돌아보며 ${month} 소식을 전해드립니다.`,
    sections: [
      {
        heading: `${month} 학습 하이라이트`,
        body: "이번 달에는 영자신문 프로젝트를 진행했습니다. 아이들이 직접 주제를 정하고, 기사를 읽고, 자신만의 한 줄 기사를 써 보았습니다. 완성된 신문은 수업 시간에 함께 낭독했으며, 가정으로도 보내드릴 예정입니다.",
      },
      {
        heading: "이달의 리딩 스타",
        body: "꾸준한 3-2-1 리딩 습관을 실천한 학생들을 소개합니다. 매일 3분 읽기, 단어 2개 쓰기, 1가지 말하기를 4주 연속 달성한 학생들에게 리딩 스타 배지를 수여했습니다.",
      },
      {
        heading: "다음 달 일정 안내",
        body: "· 무료 리딩 레벨테스트: 매주 토요일 오전\n· 원어민 특강: 둘째 주 수요일\n· 학부모 상담 주간: 넷째 주 (개별 안내 예정)",
      },
    ],
    closing: "아이들의 성장을 가장 가까이에서 응원하겠습니다. 궁금하신 점은 언제든 편하게 연락 주세요. 감사합니다.",
  };
}

export function demoSms(params: { purpose: string; academyName: string; studentName: string }): SmsContent {
  const name = params.studentName || "OO";
  return {
    variants: [
      `[${params.academyName}] 안녕하세요, ${name} 학생 학부모님. 이번 주 영자신문 수업에서 ${name} 학생이 직접 쓴 기사가 학급 신문에 실렸습니다. 가정에서도 많이 칭찬해 주세요 :) 신문은 금요일에 보내드립니다.`,
      `[${params.academyName}] 학부모님, 안녕하세요. ${name} 학생의 이번 달 리딩 레벨 결과가 나왔습니다. 상담을 통해 자세히 안내드리고 싶습니다. 편하신 시간 회신 부탁드립니다. 감사합니다.`,
      `[${params.academyName}] ${name} 학생 학부모님, 이번 주 토요일 무료 리딩 레벨테스트가 진행됩니다. 친구와 함께 참여 가능하니 관심 있는 지인분께 소개해 주셔도 좋습니다 :)`,
    ],
  };
}
