import { CURRICULUM, ALL_UNITS } from './curriculum.js';
import { getLesson } from './lessons.js';
import { scoreQuiz, calculateProgress } from './domain.js';
import { createStore } from './storage.js';
import { createSpeechController } from './speech.js';
import { createRecorder } from './recorder.js';

const $ = id => document.getElementById(id);
const store = createStore(localStorage);
const speech = createSpeechController();
const recorder = createRecorder();
let saved = store.load();
let recordingResult = null;
const state = { mode: 'home', lesson: null, step: 0, answers: [], quizIndex: 0, autoTimer: null };

const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const highlight = text => escapeHtml(text).replace(/\[\[(.*?)\]\]/g, '<mark>$1</mark>');

function fillBooks() {
  $('book-select').innerHTML = CURRICULUM.map(book => `<option value="${book.book}">${book.title}</option>`).join('');
  fillChapters();
}
function currentBook() { return CURRICULUM.find(book => book.book === Number($('book-select').value)); }
function currentChapter() { return currentBook().chapters.find(chapter => chapter.id === $('chapter-select').value); }
function fillChapters() {
  $('chapter-select').innerHTML = currentBook().chapters.map((chapter,index) => `<option value="${chapter.id}">CHAPTER ${String(index+1).padStart(2,'0')} · ${chapter.title}</option>`).join('');
  fillUnits();
}
function fillUnits() {
  $('unit-select').innerHTML = currentChapter().units.map((unit,index) => `<option value="${unit.id}">Unit ${index+1} · ${unit.title}</option>`).join('');
}
function renderProgress() {
  saved = store.load();
  const progress = calculateProgress(ALL_UNITS, saved.records);
  $('progress-text').textContent = `${progress.completed} / ${progress.total} 단원`;
  $('progress-bar').style.width = `${progress.percent}%`;
  $('progress-bar').parentElement.setAttribute('aria-valuenow', String(progress.percent));
  $('recent-button').hidden = !saved.recentUnit;
}
function openLesson(unitId) {
  const lesson = getLesson(unitId);
  if (!lesson) return toast('수업 데이터를 찾지 못했습니다.');
  stopAuto();
  Object.assign(state, { mode:'lesson', lesson, step:0, answers:[], quizIndex:0 });
  store.setRecentUnit(unitId);
  $('home-view').hidden = true;
  $('class-view').hidden = false;
  $('quiz-panel').hidden = true;
  renderLesson();
  $('lesson-stage').focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function renderLesson() {
  const { lesson, step } = state;
  const item = lesson.steps[step];
  $('book-label').textContent = `GRAMMAR ${lesson.book} · ${lesson.chapter.toUpperCase()}`;
  $('unit-title').textContent = lesson.title;
  $('page-reference').textContent = lesson.pageReference;
  $('lesson-stage').innerHTML = `<span class="label">${escapeHtml(item.label)}</span><h2>${escapeHtml(item.heading)}</h2>${item.lines.map(line=>`<p class="lesson-line">${highlight(line)}</p>`).join('')}`;
  $('teacher-bubble').textContent = saved.settings.subtitles ? item.narration : '';
  $('step-pins').innerHTML = lesson.steps.map((_,index)=>`<button type="button" data-step="${index}" class="${index===step?'current':index<step?'done':''}" aria-label="${index+1}단계">${index+1}</button>`).join('');
  $('lesson-flow').innerHTML = lesson.steps.map((part,index)=>`<li class="${index===step?'current':index<step?'done':''}"><button type="button" data-step="${index}">${index+1}. ${escapeHtml(part.label)} · ${escapeHtml(part.heading)}</button></li>`).join('') + `<li><button type="button" data-quiz="true">✓ 확인 문제</button></li>`;
  $('print-content').innerHTML = `<header><p>문법 AI 선생님 · GRAMMAR ${lesson.book}</p><h1>${escapeHtml(lesson.title)}</h1><small>${escapeHtml(lesson.pageReference)}</small></header>${lesson.steps.map((part,index)=>`<article class="print-step"><h2>${index+1}. ${escapeHtml(part.label)} · ${escapeHtml(part.heading)}</h2>${part.lines.map(line=>`<p>${highlight(line)}</p>`).join('')}<p class="print-note">선생님 설명: ${escapeHtml(part.narration)}</p></article>`).join('')}<section><h2>확인 문제</h2>${lesson.quiz.map((question,index)=>`<article class="print-question"><p><strong>${index+1}. ${escapeHtml(question.question)}</strong></p><p>${question.options.map((option,optionIndex)=>`${String.fromCharCode(65+optionIndex)}. ${escapeHtml(option)}`).join('　')}</p><p class="print-answer">정답 ${String.fromCharCode(65+question.answer)} · ${escapeHtml(question.explanation)}</p></article>`).join('')}</section>`;
  $('prev-button').disabled = step === 0;
  $('next-button').textContent = step === lesson.steps.length-1 ? '문제 풀기 →' : '다음 →';
}
function goStep(index) {
  if (index >= state.lesson.steps.length) return showQuiz();
  state.step = Math.max(0,index); renderLesson();
}
function showQuiz() {
  stopAuto(); state.mode='quiz'; state.answers=[];
  $('quiz-panel').hidden=false; renderQuiz();
  $('quiz-panel').scrollIntoView({behavior:'smooth'});
}
function renderQuiz() {
  const quiz=state.lesson.quiz;
  $('quiz-panel').innerHTML=`<h2 id="quiz-title">${escapeHtml(state.lesson.title)} 확인 문제</h2><p>각 문제의 답을 고르고 결과를 확인하세요.</p>${quiz.map((q,i)=>`<article class="quiz-question"><h3>${i+1}. ${escapeHtml(q.question)}</h3><div class="quiz-options">${q.options.map((o,k)=>`<button type="button" data-question="${i}" data-answer="${k}" ${state.answers[i]!==undefined?'disabled':''} class="${state.answers[i]===undefined?'':k===q.answer?'correct':k===state.answers[i]?'wrong':''}">${String.fromCharCode(65+k)}. ${escapeHtml(o)}</button>`).join('')}</div>${state.answers[i]===undefined?'':`<p class="explanation">${state.answers[i]===q.answer?'정답이에요!':'다시 확인해 봐요.'} ${escapeHtml(q.explanation)}</p>`}</article>`).join('')}<button id="finish-quiz" class="primary-button" type="button" ${state.answers.length<quiz.length||state.answers.some(v=>v===undefined)?'disabled':''}>결과 확인하기 →</button>`;
}
function finishQuiz() {
  const result=scoreQuiz(state.lesson.quiz,state.answers);
  store.recordResult(state.lesson.id,{score:result.correct,total:result.total});
  saved=store.load();
  $('quiz-panel').innerHTML=`<div class="result-card"><p class="eyebrow">수업 완료</p><h2>${result.correct} / ${result.total} 정답</h2><p>${result.correct===result.total?'모든 문제를 정확히 이해했어요!':`${result.wrong.length}문제를 다시 살펴보면 더 탄탄해져요.`}</p><button id="retry-quiz" class="primary-button" type="button">다시 풀기</button><button id="choose-unit" class="text-button" type="button">다른 단원 선택</button></div>`;
  renderProgress();
}
function showHome(){stopAuto();$('class-view').hidden=true;$('home-view').hidden=false;state.mode='home';renderProgress();window.scrollTo({top:0,behavior:'smooth'})}
function startAuto(){if(state.autoTimer)return stopAuto();$('play-button').textContent='Ⅱ 일시정지';state.autoTimer=setInterval(()=>{if(state.step<state.lesson.steps.length-1)goStep(state.step+1);else{stopAuto();showQuiz()}},4500)}
function stopAuto(){clearInterval(state.autoTimer);state.autoTimer=null;if($('play-button'))$('play-button').textContent='▶ 자동 수업'}
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function downloadScript(){const text=[state.lesson.title,'',...state.lesson.steps.flatMap((s,i)=>[`[${i+1}] ${s.label} · ${s.heading}`,...s.lines.map(l=>l.replaceAll('[[','').replaceAll(']]','')),`선생님: ${s.narration}`,''])].join('\n');const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`${state.lesson.title}_수업대본.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}

$('book-select').addEventListener('change',fillChapters);$('chapter-select').addEventListener('change',fillUnits);
$('lesson-picker').addEventListener('submit',event=>{event.preventDefault();openLesson($('unit-select').value)});
$('recent-button').addEventListener('click',()=>openLesson(saved.recentUnit));$('home-button').addEventListener('click',showHome);
$('prev-button').addEventListener('click',()=>goStep(state.step-1));$('next-button').addEventListener('click',()=>goStep(state.step+1));$('play-button').addEventListener('click',startAuto);
$('step-pins').addEventListener('click',event=>{const button=event.target.closest('[data-step]');if(button)goStep(Number(button.dataset.step))});
$('lesson-flow').addEventListener('click',event=>{const button=event.target.closest('button');if(button?.dataset.step!==undefined)goStep(Number(button.dataset.step));if(button?.dataset.quiz)showQuiz()});
$('quiz-panel').addEventListener('click',event=>{const answer=event.target.closest('[data-answer]');if(answer){state.answers[Number(answer.dataset.question)]=Number(answer.dataset.answer);renderQuiz()}if(event.target.closest('#finish-quiz'))finishQuiz();if(event.target.closest('#retry-quiz'))showQuiz();if(event.target.closest('#choose-unit'))showHome()});
$('settings-button').addEventListener('click',()=>{const panel=$('settings-panel');panel.hidden=!panel.hidden;$('settings-button').setAttribute('aria-expanded',String(!panel.hidden))});
$('subtitle-toggle').addEventListener('change',event=>{store.updateSettings({subtitles:event.target.checked});saved=store.load();if(state.lesson)renderLesson()});
$('font-scale').addEventListener('input',event=>{document.documentElement.style.setProperty('--scale',event.target.value);store.updateSettings({fontScale:Number(event.target.value)})});
$('reset-progress').addEventListener('click',()=>{if(confirm('저장된 진도와 설정을 모두 지울까요?')){store.reset();saved=store.load();renderProgress();toast('진도가 초기화되었습니다.')}});
$('download-script').addEventListener('click',downloadScript);$('print-lesson').addEventListener('click',()=>window.print());

$('speech-rate').addEventListener('input', event => {
  $('rate-output').textContent = `${Number(event.target.value).toFixed(1)}×`;
  store.updateSettings({ rate: Number(event.target.value) });
});
$('speak-button').addEventListener('click', () => {
  if (!speech.supported) return toast('이 브라우저에서는 음성 읽기를 지원하지 않아요.');
  const step = state.lesson?.steps[state.step];
  if (step) speech.speak(`${step.heading}. ${step.lines.join(' ')}. ${step.narration}`, { rate: Number($('speech-rate').value) });
});
$('record-button').addEventListener('click', async () => {
  try {
    if (!recorder.active) {
      await recorder.start();
      $('record-button').textContent = '■ 녹음 끝내기';
      $('record-status').textContent = '녹음 중이에요. 또렷하게 설명해 주세요.';
    } else {
      recordingResult = await recorder.finish();
      $('record-button').textContent = '● 교사 음성 녹음';
      $('record-play').disabled = false;
      $('record-download').disabled = false;
      $('record-status').textContent = '녹음이 준비됐어요. 재생하거나 파일로 저장하세요.';
    }
  } catch (error) {
    $('record-status').textContent = error.name === 'NotAllowedError' ? '마이크 권한이 거부됐어요. 주소창의 권한을 확인하세요.' : error.message;
  }
});
$('record-play').addEventListener('click', () => { if (recordingResult) new Audio(recordingResult.url).play(); });
$('record-download').addEventListener('click', () => {
  if (!recordingResult) return;
  const a = document.createElement('a'); a.href = recordingResult.url;
  a.download = `${state.lesson?.title || '문법수업'}_${state.step + 1}.${recordingResult.extension}`; a.click();
});

function init(){
  fillBooks();
  $('subtitle-toggle').checked=saved.settings.subtitles;
  $('font-scale').value=saved.settings.fontScale;
  $('speech-rate').value=saved.settings.rate;
  $('rate-output').textContent=`${Number(saved.settings.rate).toFixed(1)}×`;
  document.documentElement.style.setProperty('--scale',saved.settings.fontScale);
  if(!speech.supported){$('speech-status').textContent='음성 읽기를 지원하지 않는 브라우저예요.';$('speak-button').disabled=true}
  if(!recorder.supported){$('record-status').textContent=recorder.supportMessage;$('record-button').disabled=true}
  renderProgress();
}
init();
