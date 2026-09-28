// 간이 학습 질문 — Book No. M00 묶음. 사람이 아니라 AI 가 한 번 쓰고 굳힌 파일이다.
window.ACT = window.ACT || {};
var ACT = window.ACT;   // catalog.js 와 같은 다리: Node(check-act.js)의 Function 가짜 window 에서는 window.ACT 를 쓰고 그냥 ACT 는 못 쓴다
ACT["M0001"] = { s: "This book introduces different jobs around us. ( a / am / I )",
  q: ["이 책에 나온 직업 중에 가장 해 보고 싶은 것은 무엇인가요?",
      "그 일을 하는 사람을 가까이에서 본 적이 있나요? 어디에서 보았나요?",
      "내가 어른이 되면 하고 싶은 일을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0002"] = { s: "This book introduces the weather and the things in the sky. ( a / is / it )",
  q: ["이 책에 나온 하늘의 것들 중 가장 기억에 남는 것은 무엇인가요?",
      "오늘 하늘을 보았을 때 무엇이 보였나요?",
      "내가 가장 좋아하는 날씨는 무엇인지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0003"] = { s: "What do you like? Answer the question using the words ( I / like / my ).",
  q: ["이 책은 내가 좋아하는 것을 말해 보는 책이에요. 책 속 그림 중 어떤 것이 좋아 보였나요?",
      "나는 평소에 무엇을 가장 좋아하나요?",
      "내가 좋아하는 것 한 가지와 그 이유를 적어 보세요."],
  h: ["", "", ""] };
ACT["M0004"] = { s: "What does your mom do for a living? Answer the question using the words ( a / is / mom / my ).",
  q: ["이 책은 '엄마는 무슨 일을 하세요?' 하고 물어요. 너라면 뭐라고 답하고 싶나요?",
      "우리 엄마는 어떤 일을 하시나요?",
      "엄마가 하는 일 중에서 멋지다고 생각하는 점을 적어 보세요."],
  h: ["", "", ""] };
ACT["M0005"] = { s: "What do we see in the picture? Answer the question using the words ( see / we ).",
  q: ["이 책 속 그림에서 무엇을 보았나요?",
      "오늘 내가 본 것 중에 기억에 남는 것이 있나요?",
      "내가 가장 보고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0006"] = { s: "What is it? Look at the picture and answer the question using the words ( a / is / it / of ).",
  q: ["이 책은 그림을 보고 '이게 뭘까?' 하고 물어요. 너는 무엇이라고 답했나요?",
      "나는 무언가를 보고 무엇인지 맞혀 본 적이 있나요?",
      "내가 맞히기 어려웠던 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0007"] = { s: "Find out a variety of types of home. ( a / home / is / this )",
  q: ["이 책에 나온 집들 중에 가장 신기했던 집은 어떤 것이었나요?",
      "우리 집은 어떤 모습인가요?",
      "내가 살고 싶은 집은 어떤 집인지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0008"] = { s: "Can you hear the sound? Make a sentence with the words ( can / the / you ).",
  q: ["이 책에서 어떤 소리를 들을 수 있었나요?",
      "오늘 들은 소리 중에 기억에 남는 소리가 있나요?",
      "내가 좋아하는 소리를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0009"] = { s: "What sports do you like to do? Answer the question using the words ( like / play / to / we ).",
  q: ["이 책에 나온 운동 중에 가장 하고 싶은 것은 무엇인가요?",
      "나는 평소에 어떤 운동을 하며 노나요?",
      "내가 좋아하는 운동을 한 가지 적고 이유를 써 보세요."],
  h: ["", "", ""] };
ACT["M0010"] = { s: "This book shows different machines around us. ( a / can / go / in / it )",
  q: ["이 책에 나온 기계 중에 가장 신기했던 것은 무엇인가요?",
      "우리 주변에서 본 기계 중 기억나는 것이 있나요?",
      "내가 갖고 싶은 기계를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0011"] = { s: "What does your dad have? Answer the question using the words ( dad / had / my ).",
  q: ["이 책은 '아빠는 무엇을 가지고 있나요?' 하고 물어요. 너라면 무엇이라고 답하고 싶나요?",
      "우리 아빠가 가지고 있는 것 중에 기억나는 것이 있나요?",
      "아빠가 가진 것 중에 부러운 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0012"] = { s: "Come and see what's here. Look at the picture and make a sentence with the words ( and / come / see / the ).",
  q: ["이 책은 와서 무엇을 보라고 초대해요. 책장을 넘기며 너는 무엇을 발견했나요?",
      "누군가에게 와서 보여 주고 싶은 것이 있나요?",
      "내가 친구에게 보여 주고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0013"] = { s: "This book introduces creatures in the ocean. ( in / is / the / this )",
  q: ["이 책에 나온 바다 생물 중에 가장 신기했던 것은 무엇인가요?",
      "바다에 가서 본 적이 있는 생물이 있나요?",
      "내가 좋아하는 바다 생물을 한 가지 적고 이유를 써 보세요."],
  h: ["", "", ""] };
ACT["M0014"] = { s: "What kind of food are there? Look at the picture and make a sentence with the words ( are / for / here / the ).",
  q: ["이 책에 나온 음식 중에 무엇이 있었나요?",
      "나는 그 음식을 먹어 본 적이 있나요?",
      "내가 가장 좋아하는 음식을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0015"] = { s: "Find different patterns around us. ( look / on / see / the )",
  q: ["이 책에서 찾은 무늬 중에 기억에 남는 것은 무엇인가요?",
      "우리 주변에서 본 무늬 중에 기억나는 것이 있나요?",
      "내가 좋아하는 무늬나 모양을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0016"] = { s: "This book introduces the vehicles we use. ( a / an / in / is / it / man )",
  q: ["이 책에 나온 탈것 중에 가장 타 보고 싶은 것은 무엇인가요?",
      "나는 어떤 탈것을 타 본 적이 있나요?",
      "내가 타 보고 싶은 탈것을 한 가지 적고 이유를 써 보세요."],
  h: ["", "", ""] };
ACT["M0017"] = { s: "This book shows some animals near the water. ( a / an / did / go / in )",
  q: ["이 책에 나온 물가의 동물 중에 기억에 남는 동물은 무엇인가요?",
      "물가에서 동물을 본 적이 있나요? 어디에서 보았나요?",
      "내가 보고 싶은 물가 동물을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0018"] = { s: "What's in your backpack? Make a sentence with the words ( in / is / my ).",
  q: ["이 책은 가방 속에 무엇이 있는지 맞혀 보는 책이에요. 책을 읽으며 너는 무엇을 보았나요?",
      "내 가방 안에는 무엇이 들어 있나요?",
      "내 가방에 새로 넣고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0019"] = { s: "Where is he? Answer the question using the words ( at / he / is / the ).",
  q: ["이 책은 '그는 어디에 있을까요?' 하고 물어요. 책을 보며 너는 그를 찾아보았나요?",
      "나는 오늘 어디에 있었나요?",
      "내가 가장 좋아하는 장소를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0020"] = { s: "Are they going up or down? Learn the expression 'going up' and 'going down' with the words ( a / going / is / man ).",
  q: ["이 책에서 올라가고 내려가는 모습을 본 것은 무엇이었나요?",
      "나는 올라가거나 내려가는 것을 타 본 적이 있나요? 무엇이었나요?",
      "내가 타 보고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0021"] = { s: "Who is up in the tree? Look at the picture and answer the question with the words ( in / is / the / up ).",
  q: ["이 책에서 나무 위에 있던 것은 무엇이었나요?",
      "나무 위에서 동물을 본 적이 있나요?",
      "내가 나무 위에서 보고 싶은 동물을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0022"] = { s: "This book introduces the animals in the zoo. ( see / the / to / we / when )",
  q: ["이 책에 나온 동물원의 동물 중에 가장 기억에 남는 동물은 무엇인가요?",
      "동물원에 가 본 적이 있나요? 무엇을 보았나요?",
      "내가 동물원에서 가장 보고 싶은 동물을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0023"] = { s: "Who are you? Look at the picture and make a sentence with the words ( a / am / I / is / it ).",
  q: ["이 책은 '너는 누구니?' 하고 물어요. 책 속 그림을 보며 너는 무엇이라고 답해 보았나요?",
      "누군가 나에게 '너는 누구야?'라고 물으면 나는 어떻게 답할까요?",
      "나를 소개하는 문장을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0024"] = { s: "This book contains different insects and their homes. ( a / in / is / it )",
  q: ["이 책에 나온 곤충 중에 어떤 곤충의 집이 신기했나요?",
      "곤충을 본 적이 있나요? 어디에서 보았나요?",
      "내가 좋아하는 곤충을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0025"] = { s: "Where are you? Answer the question with the picture using the words ( a / am / I / it / not / on ).",
  q: ["이 책은 '너는 지금 어디에 있니?' 하고 물어요. 그림을 보며 너는 어디라고 답해 보았나요?",
      "나는 무언가 위에 올라가 본 적이 있나요?",
      "내가 올라가 보고 싶은 곳을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0026"] = { s: "This book introduces four shapes and foods with the shapes.",
  q: ["이 책에 나온 네 가지 모양 중에 어떤 모양이 가장 기억에 남나요?",
      "그 모양과 닮은 음식을 먹어 본 적이 있나요?",
      "내가 좋아하는 모양을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0027"] = { s: "What can you see? Answer the question using the words ( and / can / I / me / see / the ).",
  q: ["이 책에서 무엇을 볼 수 있었나요?",
      "나는 오늘 무엇을 보았나요?",
      "내가 보고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0028"] = { s: "This book shows various sea creatures. ( a / an / big / is / not / so )",
  q: ["이 책에 나온 바다 생물 중에 가장 큰 것은 무엇이었나요?",
      "크기가 큰 바다 생물을 본 적이 있나요?",
      "내가 궁금한 바다 생물을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0029"] = { s: "When do you feel happy? Talk about when you feel happy with the words ( a / am / at / I / if / in / on ).",
  q: ["이 책은 '너는 언제 행복하니?' 하고 물어요. 책 속 그림을 보며 어떤 순간이 행복해 보였나요?",
      "나는 언제 가장 행복한가요?",
      "나를 행복하게 하는 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0030"] = { s: "Let's learn about the tools we use every day. ( a / and / can / do / his / I / it / man / with )",
  q: ["이 책에 나온 도구 중에 가장 신기했던 것은 무엇인가요?",
      "집에서 본 도구 중에 기억나는 것이 있나요?",
      "내가 써 보고 싶은 도구를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0031"] = { s: "Let's see where the cat is and what she can do. ( at / can / get / look / my / on / the / she )",
  q: ["이 책에서 고양이가 할 수 있는 일은 무엇이었나요?",
      "나는 고양이를 본 적이 있나요? 무엇을 하고 있었나요?",
      "내가 고양이에게 시켜 보고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0032"] = { s: "What does he get for baseball game? See the picture with the words ( a / get / go / I / on / see / to / the / will ).",
  q: ["이 책은 '야구 경기를 위해 무엇을 가져갈까요?' 하고 물어요. 너라면 무엇을 챙기겠나요?",
      "나는 야구를 해 보거나 본 적이 있나요?",
      "내가 야구에서 가장 하고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0033"] = { s: "This book introduces the vegetables we can get from market. ( a / and / got / home / to / we / went )",
  q: ["이 책에서 시장에서 사 온 채소는 무엇이었나요?",
      "시장이나 마트에 가 본 적이 있나요? 무엇을 샀나요?",
      "내가 좋아하는 채소를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0034"] = { s: "This book shows colors. What color do you like? ( are / here / is / like / we )",
  q: ["이 책에 나온 색깔 중에 가장 마음에 든 색은 무엇인가요?",
      "내가 가장 좋아하는 색은 무엇인가요?",
      "그 색으로 무엇을 만들거나 그리고 싶은지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0035"] = { s: "On rainy day, where do we go? ( a / am / at / do / go / home / I / is / it / not / to )",
  q: ["이 책은 '비 오는 날 우리는 어디로 갈까요?' 하고 물어요. 책 속 그림을 보며 너는 어디라고 생각했나요?",
      "비가 오는 날 나는 주로 어디에 있나요?",
      "비 오는 날 내가 하고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0036"] = { s: "What's in the gift box? Will it make the girl happy? (a / be / is / it / no / the / will / with )",
  q: ["이 책은 '선물 상자 안에 무엇이 있을까요?' 하고 물어요. 너라면 무엇이 들어 있으면 좋겠나요?",
      "나는 선물을 받아 본 적이 있나요? 무엇을 받았나요?",
      "내가 받고 싶은 선물을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0037"] = { s: "This book introduces how to make a mudpie.",
  q: ["이 책에서 진흙 파이를 만드는 방법 중에 기억나는 것은 무엇인가요?",
      "나는 흙이나 모래로 무언가를 만들어 본 적이 있나요?",
      "내가 만들어 보고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0038"] = { s: "This book helps the reader identify colors and read color words.",
  q: ["이 책에서 배운 색깔 이름 중에 기억나는 것은 무엇인가요?",
      "오늘 내 옷이나 물건 중에 어떤 색이 많았나요?",
      "내가 좋아하는 색 이름을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0039"] = { s: "This book introduces things you can do to make yourself special.",
  q: ["이 책에서 나를 특별하게 만드는 방법으로 무엇이 나왔나요?",
      "나를 특별하게 만들어 주는 것은 무엇인가요?",
      "내가 잘하는 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0040"] = { s: "Look closely to discover shapes from everyday objects.",
  q: ["이 책에서 찾은 모양 중에 어떤 물건에서 나온 모양이 신기했나요?",
      "우리 집에서 모양을 찾아본 적이 있나요?",
      "내가 찾은 모양을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0041"] = { s: "This book tells that there are words you can read everywhere.",
  q: ["이 책에서 어디에서 글자를 읽을 수 있다고 했나요?",
      "나는 오늘 어디에서 글자를 읽었나요?",
      "내가 읽고 싶은 글자나 간판을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0042"] = { s: "We can find various types of buttons all around us. Let's count them all.",
  q: ["이 책에 나온 단추 중에 몇 개나 세어 보았나요?",
      "내 옷이나 물건에도 단추가 있나요?",
      "내가 좋아하는 단추 모양을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0043"] = { s: "Read and discover the ways to share at school!",
  q: ["이 책에서 학교에서 나누는 방법으로 무엇이 나왔나요?",
      "나는 학교에서 친구와 무언가를 나눠 본 적이 있나요?",
      "내가 친구와 나누고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0044"] = { s: "There are many places to write other than a blank piece of paper.",
  q: ["이 책에서 글씨를 쓸 수 있는 곳으로 무엇이 나왔나요?",
      "나는 종이 말고 어디에 글씨를 써 본 적이 있나요?",
      "내가 글씨를 써 보고 싶은 곳을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0045"] = { s: "Can you predict what the weather will be like today?",
  q: ["이 책에서 오늘 날씨를 어떻게 예상해 보았나요?",
      "오늘 날씨는 어땠나요?",
      "내일 날씨가 어떨지 내가 예상해 보고 적어 보세요."],
  h: ["", "", ""] };
ACT["M0046"] = { s: "Find lots of ways you can help get things done!",
  q: ["이 책에서 도움을 주는 방법으로 무엇이 나왔나요?",
      "나는 누군가를 도와준 적이 있나요?",
      "내가 도와주고 싶은 일을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0047"] = { s: "Do you see patterns all around us? Where do you see them?",
  q: ["이 책에서 찾은 무늬는 어디에 있었나요?",
      "우리 주변에서 무늬를 본 적이 있나요? 어디였나요?",
      "내가 좋아하는 무늬를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0048"] = { s: "What are the ten little pigs doing?",
  q: ["열 마리 아기 돼지들이 무엇을 하고 있을지 그림을 보며 상상해서 적어 보세요.",
      "나는 돼지를 본 적이 있나요?",
      "내가 돼지에게 해 주고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0049"] = { s: "Read and find out how things grow.",
  q: ["이 책에서 자라는 것으로 무엇이 나왔나요?",
      "나는 자라는 것을 키워 본 적이 있나요?",
      "내가 키워 보고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0050"] = { s: "Read and discover how Mr. Noisy builds a house.",
  q: ["노이지 아저씨는 집을 짓고 있어요. 내가 집을 짓는다면 어떤 순서로 지을지 생각해 보세요.",
      "나는 무언가를 만들어 본 적이 있나요?",
      "내가 짓고 싶은 집은 어떤 모습인지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0051"] = { s: "Barney Bear always gets his clothes messy! Luckily, he has lots of outfits.",
  q: ["이 책에서 바니 베어는 왜 옷을 자주 갈아입었나요?",
      "나는 옷을 더럽혀 본 적이 있나요?",
      "내가 입고 싶은 옷을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0052"] = { s: "This book introduces lots of things that live under the sky.",
  q: ["이 책에서 하늘 아래 사는 것으로 무엇이 나왔나요?",
      "하늘 아래에서 내가 본 것 중 기억나는 것이 있나요?",
      "내가 좋아하는 하늘의 모습을 적어 보세요."],
  h: ["", "", ""] };
ACT["M0053"] = { s: "Read and learn more about what different things each season brings along!",
  q: ["이 책에서 계절마다 있는 것으로 무엇이 나왔나요?",
      "내가 가장 좋아하는 계절은 무엇인가요?",
      "그 계절에 하고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0054"] = { s: "In this book, you can learn that people and dogs need some of the same things!",
  q: ["이 책에서 사람과 강아지가 똑같이 필요로 하는 것은 무엇이었나요?",
      "나는 강아지를 키우거나 본 적이 있나요?",
      "내가 강아지에게 필요하다고 생각하는 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0055"] = { s: "Count to see how many of your favorite stories have three characters.",
  q: ["이 책에서 등장인물이 세 명인 이야기로 무엇을 찾았나요?",
      "내가 아는 이야기 중에 등장인물이 세 명인 것이 있나요?",
      "내가 좋아하는 이야기 속 인물을 한 명 적어 보세요."],
  h: ["", "", ""] };
ACT["M0056"] = { s: "Have fun counting all the legs on the animals and bugs!",
  q: ["이 책에서 다리를 세어 본 동물이나 벌레는 무엇이었나요?",
      "나는 동물의 다리를 세어 본 적이 있나요?",
      "내가 궁금한 동물의 다리 수를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0057"] = { s: "Read and discover what is alive and what isn't!",
  q: ["이 책에서 살아 있는 것으로 나온 것 중에 기억나는 것이 있나요?",
      "나는 살아 있는 것과 살아 있지 않은 것을 구별해 본 적이 있나요?",
      "내가 생각하는 살아 있는 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0058"] = { s: "Where are the foods we eat every day grown?",
  q: ["이 책에 나온, 우리가 매일 먹는 음식 중에 기억나는 것이 있나요?",
      "나는 음식이 자라는 곳을 본 적이 있나요?",
      "내가 좋아하는 음식이 어디에서 왔을지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0059"] = { s: "Scaredy Cat is running away from the bear. Read and find out why?",
  q: ["이 책에서 겁쟁이 고양이는 왜 도망쳤나요?",
      "나는 무서워서 도망친 적이 있나요?",
      "내가 무서워하는 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0060"] = { s: "This book introduces the things that can melt.",
  q: ["이 책에 나온 녹는 것 중에 기억나는 것은 무엇인가요?",
      "나는 무언가 녹는 것을 본 적이 있나요?",
      "내가 본 적 있는 녹는 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0061"] = { s: "The bear goes traveling around the mountain. What will he see and do?",
  q: ["곰은 산을 넘어가며 여행을 해요. 곰이 산에서 무엇을 보았을지 내가 상상해서 적어 보세요.",
      "나는 산에 가 본 적이 있나요?",
      "내가 산을 여행한다면 무엇을 하고 싶은지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0062"] = { s: "Read and discover how your five senses help you figure out what's going on.",
  q: ["이 책에서 다섯 가지 감각 중 어떤 것이 나왔나요?",
      "나는 다섯 가지 감각 중에 어떤 것을 가장 많이 쓰나요?",
      "내가 좋아하는 냄새나 소리를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0063"] = { s: "This book introduces how people say hello all over the world.",
  q: ["이 책에서 다른 나라 사람들은 인사를 어떻게 한다고 했나요?",
      "나는 사람들에게 어떻게 인사하나요?",
      "내가 배우고 싶은 인사법을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0064"] = { s: "Did you know that graphs can be made to track things?",
  q: ["이 책에 나온 그래프를 보며 무엇을 알 수 있었나요?",
      "나는 그래프나 표를 본 적이 있나요?",
      "내가 그래프로 만들어 보고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0065"] = { s: "Have fun singing along to this fun skip count song!",
  q: ["이 책의 노래에서는 숫자를 어떻게 세었나요?",
      "나는 숫자 세는 노래를 불러 본 적이 있나요?",
      "내가 좋아하는 노래를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0066"] = { s: "Where did a little boy's tooth go? Will he ever find it?",
  q: ["이 책에서 남자아이는 무엇을 잃어버렸나요?",
      "나는 이가 빠진 적이 있나요?",
      "이가 빠졌을 때 기분이 어땠는지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0067"] = { s: "Read and learn many ways to travel.",
  q: ["이 책에 나온 여행 방법 중에 가장 타 보고 싶은 것은 무엇인가요?",
      "나는 어떤 방법으로 여행해 보았나요?",
      "내가 가 보고 싶은 곳을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0068"] = { s: "Clocks help you notice when it's time to do lots of things!",
  q: ["이 책에서 시계는 우리에게 무엇을 알려 준다고 했나요?",
      "나는 시계를 보고 시간을 확인해 본 적이 있나요?",
      "내가 시계를 보고 하는 일을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0069"] = { s: "Learn about many parts of a plant people can eat.",
  q: ["이 책에서 우리가 먹을 수 있는 식물의 부분은 무엇이었나요?",
      "나는 채소나 과일을 먹어 본 적이 있나요?",
      "내가 좋아하는 채소나 과일을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0070"] = { s: "Unless you stay under an umbrella, the rain gets you wet.",
  q: ["이 책에서 우산이 없으면 어떻게 된다고 했나요?",
      "나는 비를 맞아 본 적이 있나요?",
      "비 오는 날 내가 챙기고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0071"] = { s: "Do you know that everyone belongs in the forest?",
  q: ["이 책에서 숲은 누구의 것이라고 했나요?",
      "나는 숲에 가 본 적이 있나요?",
      "내가 숲에서 만나고 싶은 동물을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0072"] = { s: "Read and guess who will win a prize in the costume parade.",
  q: ["이 책의 옷차림 행진에서 누가 상을 받을지 궁금했나요?",
      "나는 특별한 옷을 입어 본 적이 있나요?",
      "내가 입고 싶은 옷차림을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0073"] = { s: "Silly Willy loves to get dressed in a topsy-turvy way. He wears gloves on his head, socks on his ears.",
  q: ["실리 윌리는 옷을 어떻게 거꾸로 입었나요?",
      "나는 옷을 거꾸로 입거나 실수로 입어 본 적이 있나요?",
      "내가 재미있게 입어 보고 싶은 옷차림을 적어 보세요."],
  h: ["", "", ""] };
ACT["M0074"] = { s: "Benny is an expert at blowing bubbles. He blows one enormous bubble that takes off on an airborne trip around the neighborhood.",
  q: ["베니가 분 커다란 비눗방울은 어디로 날아갔나요?",
      "나는 비눗방울을 불어 본 적이 있나요?",
      "내가 만들어 보고 싶은 가장 큰 비눗방울을 상상해서 적어 보세요."],
  h: ["", "", ""] };
ACT["M0075"] = { s: "It is time for a birthday party for cats! Unexpectedly, a dog shows up for the party, too. The cats and the dog get along well. They play with yarn, drink milk, and eat birthday cake.",
  q: ["고양이들의 생일 파티에 뜻밖에 누가 나타났나요?",
      "나는 생일 파티에 가 본 적이 있나요?",
      "내가 생일 파티에서 하고 싶은 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0076"] = { s: "A baby is in a deep sleep. He finally wakes up when a tiny fly buzzes by. A kiss from his big sister gets him back to sleep.",
  q: ["아기는 무엇 때문에 잠에서 깼나요?",
      "나는 잠에서 깬 뒤 다시 잠든 적이 있나요?",
      "내가 잠들기 전에 하는 일을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0077"] = { s: "A pig family plans to go on a picnic. They get a basket and put lots of food in it until it is full.",
  q: ["돼지 가족은 소풍 바구니에 무엇을 가득 담았나요?",
      "나는 소풍을 가 본 적이 있나요?",
      "내가 소풍 바구니에 담고 싶은 음식을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0078"] = { s: "A dog moves in and takes over everything that belongs to Otto. The dog sleeps in Otto's bed. The dog takes over his water and his favorite chair. Otto is not amused.",
  q: ["강아지는 오토의 무엇들을 차지했나요?",
      "나는 내 물건을 다른 사람이 쓴 적이 있나요?",
      "내가 오토라면 어떤 기분이었을지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0079"] = { s: "Find out what lurks in a dark, dark house, up the dark, dark stairs, in a dark, dark chest.",
  q: ["어둡고 어두운 집 안, 계단, 상자 안에는 무엇이 있었을까요?",
      "나는 어두운 곳을 무서워한 적이 있나요?",
      "내가 상상하는 어두운 집 속 이야기를 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0080"] = { s: "It's Valentine's Day. A little girl makes Valentines for her mom and dad. But the cards disappear.",
  q: ["이 책에서 여자아이가 만든 카드는 누구를 위한 것이었나요?",
      "나는 카드를 만들어 본 적이 있나요?",
      "내가 카드를 만들어 주고 싶은 사람을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0081"] = { s: "It's a dog wash day. The kids get everything ready then they wash all sorts of dogs.",
  q: ["이 책에는 여러 종류의 강아지가 나와요. 그중에 내가 가장 씻겨 주고 싶은 강아지는 어떤 모습일까요?",
      "나는 강아지나 다른 동물을 씻겨 본 적이 있나요?",
      "강아지를 목욕시키려면 무엇이 필요할지 내 생각을 적어 보세요."],
  h: ["", "", ""] };
ACT["M0082"] = { s: "Nicky is a picky eater. She refuses to eat peas and carrots. Her family comes up with a clever plan to overcome her finicky habits.",
  q: ["니키는 어떤 음식을 먹지 않으려 했나요?",
      "나는 먹기 싫은 음식이 있나요?",
      "니키의 가족처럼 나라면 편식하는 친구를 위해 어떤 좋은 방법을 생각해 볼 수 있을까요? 적어 보세요."],
  h: ["", "", ""] };
ACT["M0083"] = { s: "An old man is unhappy with a house of creaky floors, squeaky doors, and windows that go bang. But he learns to be thankful after a goat, cow, and donkey come to stay with him.",
  q: ["할아버지는 시끄러운 집의 어떤 소리들을 싫어했나요?",
      "나는 시끄러운 소리 때문에 불편했던 적이 있나요?",
      "내가 감사하게 생각하는 것을 한 가지 적어 보세요."],
  h: ["", "", ""] };
ACT["M0084"] = { s: "The clown gets a bike for his birthday. The Little Engine helps him ride it.",
  q: ["생일 선물로 자전거를 받은 것은 누구였나요?",
      "나는 자전거를 처음 배울 때 누가 도와주었나요?",
      "내가 누군가를 도와준 경험을 한 가지 적어 보세요."],
  h: ["", "", ""] };
