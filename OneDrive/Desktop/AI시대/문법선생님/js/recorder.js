const MIME_TYPES = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];

export function preferredMimeType(Recorder = globalThis.MediaRecorder) {
  if (!Recorder?.isTypeSupported) return '';
  return MIME_TYPES.find(type => Recorder.isTypeSupported(type)) || '';
}

export function recordingSupportMessage({
  mediaDevices = globalThis.navigator?.mediaDevices,
  MediaRecorderCtor = globalThis.MediaRecorder,
  secure = globalThis.isSecureContext ?? true
} = {}) {
  if (!secure) return '녹음은 로컬 서버(http://localhost)에서 사용할 수 있어요.';
  if (!mediaDevices?.getUserMedia || !MediaRecorderCtor) return '이 브라우저에서는 마이크 녹음을 지원하지 않아요.';
  return '';
}

export function createRecorder({
  mediaDevices = globalThis.navigator?.mediaDevices,
  MediaRecorderCtor = globalThis.MediaRecorder,
  secure = globalThis.isSecureContext ?? true
} = {}) {
  let recorder = null;
  let stream = null;
  let chunks = [];
  let currentUrl = null;
  const supportMessage = recordingSupportMessage({ mediaDevices, MediaRecorderCtor, secure });
  return {
    supported: !supportMessage,
    supportMessage,
    get url() { return currentUrl; },
    get active() { return recorder?.state === 'recording'; },
    async start() {
      if (supportMessage) throw new Error(supportMessage);
      stream = await mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      chunks = [];
      const mimeType = preferredMimeType(MediaRecorderCtor);
      recorder = mimeType ? new MediaRecorderCtor(stream, { mimeType }) : new MediaRecorderCtor(stream);
      recorder.addEventListener('dataavailable', event => { if (event.data?.size) chunks.push(event.data); });
      recorder.start(200);
    },
    finish() {
      return new Promise((resolve, reject) => {
        if (!recorder || recorder.state === 'inactive') return reject(new Error('진행 중인 녹음이 없어요.'));
        recorder.addEventListener('stop', () => {
          const type = recorder.mimeType || 'audio/webm';
          const blob = new Blob(chunks, { type });
          stream?.getTracks().forEach(track => track.stop());
          if (currentUrl) URL.revokeObjectURL(currentUrl);
          currentUrl = URL.createObjectURL(blob);
          resolve({ blob, url: currentUrl, extension: type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm' });
        }, { once: true });
        recorder.addEventListener('error', () => reject(new Error('녹음 중 오류가 발생했어요.')), { once: true });
        recorder.stop();
      });
    },
    dispose() {
      stream?.getTracks().forEach(track => track.stop());
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      currentUrl = null;
    }
  };
}
