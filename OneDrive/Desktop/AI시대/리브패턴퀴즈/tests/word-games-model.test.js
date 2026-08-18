const assert = require("node:assert/strict");
const {
  parseWordList,
  getTeamOptions,
  scoreWordSort,
  buildSpeakingPrompt,
  createTeamScores,
  formatTimer,
  buildPhonicsQuestion,
  getPhonicsItems,
  getWritingTopic,
  normalizeAnswer,
  scorePhonicsAnswer,
  scoreSpeakingAnswer,
  scoreSpellingAnswer,
  scoreTextAnswer,
  shuffleSentenceWords,
  updateTeamScore,
  wordCount,
  WORD_GAME_BANK,
} = require("../word-games-model.js");

function run() {
  const parsed = parseWordList("apple, 사과\nbanana, 바나나\n courage , 용기\n\nbad row");
  assert.deepEqual(parsed, [
    { english: "apple", korean: "사과" },
    { english: "banana", korean: "바나나" },
    { english: "courage", korean: "용기" },
  ]);

  assert.deepEqual(getTeamOptions(), [
    { value: 1, label: "개인전" },
    { value: 2, label: "2팀" },
    { value: 3, label: "3팀" },
    { value: 4, label: "4팀" },
  ]);

  const nounScore = scoreWordSort({
    words: WORD_GAME_BANK.nounDefinition,
    placements: {
      book: "countable",
      rice: "uncountable",
      milk: "uncountable",
      apple: "countable",
    },
  });
  assert.equal(nounScore.correct, 4);
  assert.equal(nounScore.total, WORD_GAME_BANK.nounDefinition.length);

  const partScore = scoreWordSort({
    words: WORD_GAME_BANK.partsOfSpeech,
    placements: {
      school: "noun",
      run: "verb",
      kind: "adjective",
      slowly: "adverb",
      on: "preposition",
    },
  });
  assert.equal(partScore.correct, 5);

  const speaking = buildSpeakingPrompt({ english: "apple", korean: "사과", hints: ["fruit", "red", "sweet"] });
  assert.equal(speaking.starter, "It's a fruit. It's red. It's sweet.");
  assert.match(speaking.instruction, /영어로 설명/);

  const writing = getWritingTopic(0);
  assert.equal(writing.title, "My favorite food");
  assert.deepEqual(writing.helpers, ["like", "yummy", "eat", "pizza", "because"]);
  assert.match(writing.starter, /My favorite food is/);

  assert.deepEqual(createTeamScores(3), [
    { team: 1, label: "1팀", score: 0 },
    { team: 2, label: "2팀", score: 0 },
    { team: 3, label: "3팀", score: 0 },
  ]);
  assert.deepEqual(createTeamScores(1), [{ team: 1, label: "개인", score: 0 }]);

  const updatedScores = updateTeamScore(createTeamScores(2), 2, 3);
  assert.equal(updatedScores[0].score, 0);
  assert.equal(updatedScores[1].score, 3);

  assert.equal(formatTimer(0), "00:00");
  assert.equal(formatTimer(6), "00:06");
  assert.equal(formatTimer(75), "01:15");

  const speakingScore = scoreSpeakingAnswer("It is a red fruit and it is sweet.", ["fruit", "red", "sweet"]);
  assert.equal(speakingScore.correctHints, 3);
  assert.equal(speakingScore.percent, 100);
  assert.equal(speakingScore.passed, true);

  assert.equal(wordCount("My favorite food is pizza because it is yummy."), 9);

  assert.ok(WORD_GAME_BANK.nounDefinition.length >= 40, "noun definition bank should be class-sized");
  assert.ok(WORD_GAME_BANK.partsOfSpeech.length >= 64, "parts of speech bank should cover many rounds");
  assert.ok(WORD_GAME_BANK.speaking.length >= 24, "speaking bank should support repeated practice");
  assert.ok(WORD_GAME_BANK.writing.length >= 20, "writing bank should include many prompts");

  const partCounts = WORD_GAME_BANK.partsOfSpeech.reduce((counts, item) => {
    counts[item.answer] = (counts[item.answer] || 0) + 1;
    return counts;
  }, {});
  ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"].forEach((part) => {
    assert.ok(partCounts[part] >= 6, `${part} should have at least 6 words`);
  });

  assert.ok(WORD_GAME_BANK.sentences.length >= 20, "sentence builder should include many prompts");
  assert.ok(WORD_GAME_BANK.dictation.length >= 20, "dictation should include many prompts");
  assert.ok(WORD_GAME_BANK.spelling.length >= 30, "spelling should include many words");
  assert.ok(WORD_GAME_BANK.phonics.shortVowels.length >= 25, "short vowels should cover CVC reading");
  assert.ok(WORD_GAME_BANK.phonics.consonants.length >= 20, "single consonants should cover alphabet sounds");
  assert.ok(WORD_GAME_BANK.phonics.blends.length >= 20, "blends should support early readers");
  assert.ok(WORD_GAME_BANK.phonics.digraphs.length >= 16, "digraphs should cover sh/ch/th/wh/ph");
  assert.ok(WORD_GAME_BANK.phonics.longVowels.length >= 20, "long vowels should cover silent-e patterns");
  assert.ok(WORD_GAME_BANK.phonics.vowelTeams.length >= 20, "vowel teams should cover level-1 readers");
  assert.ok(WORD_GAME_BANK.phonics.rControlled.length >= 12, "r-controlled vowels should be included");
  assert.ok(WORD_GAME_BANK.sightWords.length >= 60, "sight words should support easy readers");
  assert.ok(WORD_GAME_BANK.basicWords.length >= 60, "basic words should support beginner reading");

  const shortVowelItems = getPhonicsItems("shortVowels");
  assert.equal(shortVowelItems[0].word, WORD_GAME_BANK.phonics.shortVowels[0].word);

  const phonicsQuestion = buildPhonicsQuestion({
    word: "cat",
    korean: "고양이",
    sound: "short a",
    pattern: "CVC",
    choices: ["cat", "cut", "cot"],
  });
  assert.equal(phonicsQuestion.answer, "cat");
  assert.equal(phonicsQuestion.sound, "short a");
  assert.deepEqual(phonicsQuestion.choices, ["cat", "cut", "cot"]);

  assert.equal(scorePhonicsAnswer("Cat", "cat").passed, true);
  assert.equal(scorePhonicsAnswer("cut", "cat").passed, false);

  assert.equal(normalizeAnswer("  It's   a Fruit! "), "its a fruit");
  assert.equal(scoreTextAnswer("My favorite food is pizza.", "my favorite food is pizza").passed, true);
  assert.equal(scoreTextAnswer("My food pizza", "my favorite food is pizza").passed, false);

  const sentence = WORD_GAME_BANK.sentences[0];
  const shuffledWords = shuffleSentenceWords(sentence.text);
  assert.equal(shuffledWords.slice().sort().join(" "), sentence.text.split(" ").slice().sort().join(" "));

  const spellingScore = scoreSpellingAnswer("appel", "apple");
  assert.equal(spellingScore.passed, false);
  assert.ok(spellingScore.hint.includes("_"));
}

run();
console.log("word-games-model tests passed");
