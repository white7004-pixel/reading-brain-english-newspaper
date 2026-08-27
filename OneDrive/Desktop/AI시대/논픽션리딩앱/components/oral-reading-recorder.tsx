"use client";

import { useEffect, useRef, useState } from "react";
import { buildOralReadingResult, type OralReadingResult } from "@/lib/oral-reading";

export function OralReadingRecorder({ enabled, limitSeconds, onComplete }: { enabled: boolean; limitSeconds: number; onComplete: (result: OralReadingResult) => void }) {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string>();
  const [error, setError] = useState("");
  const recorderRef = useRef<MediaRecorder | undefined>(undefined);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(0);

  useEffect(() => () => { if (audioUrl) URL.revokeObjectURL(audioUrl); }, [audioUrl]);
  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAtRef.current) / 1000)), 250);
    return () => window.clearInterval(timer);
  }, [recording]);

  const stop = () => recorderRef.current?.state === "recording" && recorderRef.current.stop();
  const start = async () => {
    try {
      setError(""); setElapsed(0); chunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const duration = Math.max(1, Math.ceil((Date.now() - startedAtRef.current) / 1000));
        const url = URL.createObjectURL(new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" }));
        setAudioUrl((old) => { if (old) URL.revokeObjectURL(old); return url; });
        setRecording(false); stream.getTracks().forEach((track) => track.stop());
        onComplete(buildOralReadingResult(duration, limitSeconds));
      };
      startedAtRef.current = Date.now(); setRecording(true); recorder.start();
    } catch { setError("마이크 권한을 허용해 주세요."); }
  };

  return <section className="oral-recorder" aria-labelledby="oral-recorder-heading">
    <h2 id="oral-recorder-heading">제한시간 낭독 녹음</h2>
    <p>{enabled ? `제한시간 ${limitSeconds}초 안에 본문을 소리 내어 읽어 보세요.` : "먼저 원어민 오디오를 끝까지 들어 주세요."}</p>
    {recording ? <><strong role="timer">{elapsed} / {limitSeconds}초</strong><button type="button" onClick={stop}>낭독 완료</button></> : <button type="button" disabled={!enabled} onClick={start}>{audioUrl ? "다시 녹음" : "낭독 녹음 시작"}</button>}
    {audioUrl && <audio controls src={audioUrl} aria-label="내 낭독 녹음 듣기" />}
    {error && <p role="alert">{error}</p>}
  </section>;
}
