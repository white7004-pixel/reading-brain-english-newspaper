import test from 'node:test';
import assert from 'node:assert/strict';
import { createSpeechController } from '../js/speech.js';
import { recordingSupportMessage, preferredMimeType } from '../js/recorder.js';

test('speech controller degrades safely without browser synthesis', () => {
  const speech = createSpeechController(null, null);
  assert.equal(speech.supported, false);
  assert.equal(speech.speak('hello'), false);
});

test('speech controller forwards start and end events for lip sync', () => {
  const spoken = [];
  class Utterance { constructor(text) { this.text = text; } }
  const synth = { cancel() {}, getVoices: () => [], speak: utterance => spoken.push(utterance) };
  const onstart = () => {};
  const onend = () => {};
  const speech = createSpeechController(synth, Utterance);
  speech.speak('설명', { onstart, onend });
  assert.equal(spoken[0].onstart, onstart);
  assert.equal(spoken[0].onend, onend);
});

test('recording support explains missing capabilities', () => {
  assert.match(recordingSupportMessage({ mediaDevices: null, MediaRecorderCtor: null, secure: true }), /마이크/);
  assert.match(recordingSupportMessage({ mediaDevices: {}, MediaRecorderCtor: class {}, secure: false }), /로컬 서버/);
});

test('preferredMimeType selects the first supported browser format', () => {
  const Recorder = { isTypeSupported: type => type === 'audio/mp4' };
  assert.equal(preferredMimeType(Recorder), 'audio/mp4');
});
