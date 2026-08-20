const isText = value => typeof value === 'string' && value.trim().length > 0;

export function validateLesson(lesson) {
  const errors = [];
  if (!lesson || typeof lesson !== 'object') return ['lesson must be an object'];
  for (const field of ['id', 'chapter', 'title', 'pageReference']) {
    if (!isText(lesson[field])) errors.push(`${field} must be a non-empty string`);
  }
  if (![1, 2, 3].includes(lesson.book)) errors.push('book must be 1, 2, or 3');
  if (!Array.isArray(lesson.steps) || lesson.steps.length < 4 || lesson.steps.length > 7) {
    errors.push('steps must contain 4 to 7 items');
  } else {
    lesson.steps.forEach((step, index) => {
      if (![step.label, step.heading, step.narration].every(isText)) errors.push(`steps[${index}] has empty text`);
      if (!Array.isArray(step.lines) || !step.lines.length || !step.lines.every(isText)) errors.push(`steps[${index}].lines is invalid`);
    });
  }
  if (!Array.isArray(lesson.quiz) || lesson.quiz.length < 3) {
    errors.push('quiz must contain at least 3 items');
  } else {
    lesson.quiz.forEach((question, index) => {
      if (!isText(question.question) || !isText(question.explanation)) errors.push(`quiz[${index}] has empty text`);
      if (!Array.isArray(question.options) || question.options.length < 2 || !question.options.every(isText)) {
        errors.push(`quiz[${index}].options is invalid`);
      } else if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
        errors.push(`quiz[${index}].answer is out of range`);
      }
    });
  }
  return errors;
}

export function scoreQuiz(quiz, answers) {
  const wrong = [];
  quiz.forEach((item, index) => {
    if (answers[index] !== item.answer) wrong.push(index);
  });
  return { correct: quiz.length - wrong.length, total: quiz.length, wrong };
}

export function calculateProgress(lessons, records = {}) {
  const completed = lessons.filter(({ id }) => records[id]?.completed).length;
  return { completed, total: lessons.length, percent: lessons.length ? Math.round(completed / lessons.length * 100) : 0 };
}
