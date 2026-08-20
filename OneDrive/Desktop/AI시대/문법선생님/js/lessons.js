import { BOOK1_LESSONS } from './content/book1.js';
import { BOOK2_LESSONS } from './content/book2.js';
import { BOOK3_LESSONS } from './content/book3.js';

export const LESSONS = Object.freeze({ ...BOOK1_LESSONS, ...BOOK2_LESSONS, ...BOOK3_LESSONS });
export const getLesson = id => LESSONS[id] ?? null;
