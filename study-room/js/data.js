/* ─────────────────────────────────────────────
 * 관리형 독서실 · 모의 데이터
 * 실제 서비스에서는 서버 API/웹소켓으로 대체되는 부분입니다.
 * ───────────────────────────────────────────── */

// 상태: studying(학습중) | sleeping(수면중) | out(외출중) | outLate(외출지각) | left(하원) | absent(미등원)
// AI 감지: null | 'drowsy'(졸음 감지) | 'away'(자리 이탈)

const STUDENTS = [
  {
    id: 1, name: '강서아', school: '신화여고', grade: '2학년',
    mode: '스파르타', plan: 'Free', branch: 'maseok',
    status: 'left', ai: null,
    tablet: 6, room: '연결 끊김', battery: null, cameraOn: false,
    days: [1,1,1,1,1,1,1],
    inTime: '', outTime: 'PM 05:01', timeLabel: '등하원(예정)',
    progress: 52, achieve: 0, eff: 0,
    tStudy: 80, tPure: 55, tOut: 10, tEtc: 2,   // 분 단위
    mood: 'sad', hair: 'shortBlack',
  },
  {
    id: 2, name: '김민우', school: '단대부고', grade: '3학년',
    mode: '집중', plan: 'Free', branch: 'maseok',
    status: 'studying', ai: 'drowsy',
    tablet: 1, room: '방금', battery: 57, cameraOn: true,
    days: [1,1,1,1,1,1,1],
    inTime: 'PM 05:10', outTime: 'PM 06:40', timeLabel: '등하원(예정)',
    progress: 57, achieve: 35, eff: 43,
    tStudy: 83, tPure: 50, tOut: 25, tEtc: 8,
    mood: 'sad', hair: 'bowlBlack',
  },
  {
    id: 3, name: '박준민', school: '보광고', grade: '3학년',
    mode: '스파르타', plan: 'Free', branch: 'maseok',
    status: 'studying', ai: null,
    tablet: 3, room: '방금', battery: 41, cameraOn: true,
    days: [1,1,1,1,1,1,1],
    inTime: 'PM 06:16', outTime: 'PM 07:18', timeLabel: '등하원(예정)',
    progress: 92, achieve: 71, eff: 112,
    tStudy: 155, tPure: 129, tOut: 20, tEtc: 6,
    mood: 'happy', hair: 'brownRound',
  },
  {
    id: 4, name: '서지원', school: '대치고', grade: '2학년',
    mode: '스파르타', plan: 'Free', branch: 'maseok',
    status: 'sleeping', ai: 'drowsy',
    tablet: 9, room: '방금', battery: 55, cameraOn: true,
    days: [1,1,1,1,1,1,1],
    inTime: 'PM 03:20', outTime: 'PM 08:18', timeLabel: '등하원(예정)',
    progress: 61, achieve: 0, eff: 1,
    tStudy: 62, tPure: 50, tOut: 9, tEtc: 2,
    mood: 'sad', hair: 'brownShort',
  },
  {
    id: 5, name: '윤도세', school: '세종고', grade: '2학년',
    mode: '집중', plan: 'Free', branch: 'maseok',
    status: 'studying', ai: 'away',
    tablet: 7, room: '방금', battery: 71, cameraOn: true,
    days: [1,1,1,1,1,1,1],
    inTime: 'PM 02:14', outTime: 'PM 10:40', timeLabel: '등하원(예정)',
    progress: 95, achieve: 23, eff: 52,
    tStudy: 155, tPure: 129, tOut: 20, tEtc: 6,
    mood: 'sad', hair: 'shortBlack',
  },
  {
    id: 6, name: '이하서', school: '경기여고', grade: '2학년',
    mode: '자율', plan: 'Free', branch: 'maseok',
    status: 'studying', ai: null,
    tablet: 2, room: '방금', battery: 80, cameraOn: true,
    days: [1,1,1,1,1,1,1],
    inTime: 'PM 05:02', outTime: 'PM 06:35', timeLabel: '등하원(예정)',
    progress: 84, achieve: 18, eff: 39,
    tStudy: 122, tPure: 100, tOut: 21, tEtc: 1,
    mood: 'sad', hair: 'headband',
  },
  {
    id: 7, name: '정우훈', school: '영동고', grade: '3학년',
    mode: '자율', plan: 'Free', branch: 'maseok',
    status: 'out', ai: null,
    tablet: 5, room: '방금', battery: 87, cameraOn: true,
    days: [1,1,1,1,1,1,1],
    inTime: 'PM 02:36', outTime: 'PM 09:38', timeLabel: '등하원(예정)',
    progress: 101, achieve: 0, eff: 0,
    tStudy: 100, tPure: 70, tOut: 30, tEtc: 1,
    mood: 'neutral', hair: 'brownRound',
  },
  {
    id: 8, name: '조유빈', school: '휘문고', grade: '1학년',
    mode: '집중', plan: 'Free', branch: 'maseok',
    status: 'studying', ai: null,
    tablet: 10, room: '방금', battery: 78, cameraOn: true,
    days: [1,1,1,1,1,1,1],
    inTime: 'PM 02:14', outTime: 'PM 10:40', timeLabel: '등하원(예정)',
    progress: 130, achieve: 78, eff: 63,
    tStudy: 155, tPure: 129, tOut: 20, tEtc: 6,
    mood: 'neutral', hair: 'shortBlack',
  },
  {
    id: 9, name: '최윤지', school: '현대부고', grade: '3학년',
    mode: '집중', plan: 'Free', branch: 'maseok',
    status: 'outLate', ai: null,
    tablet: 4, room: '방금', battery: 64, cameraOn: true,
    days: [1,1,1,1,1,1,1],
    inTime: 'PM 04:24', outTime: 'PM 07:43', timeLabel: '등하원(예정)',
    progress: 61, achieve: 0, eff: 0,
    tStudy: 122, tPure: 100, tOut: 21, tEtc: 1,
    mood: 'sad', hair: 'headband',
  },
  {
    id: 10, name: '한아림', school: '분당고', grade: '3학년',
    mode: '자율', plan: 'Premium+', branch: 'maseok',
    status: 'left', ai: null,
    tablet: 8, room: '연결 끊김', battery: null, cameraOn: false,
    days: [1,1,1,1,1,1,1],
    inTime: 'PM 03:50', outTime: 'PM 06:51', timeLabel: '등하원(예정)',
    progress: 86, achieve: 0, eff: 0,
    tStudy: 100, tPure: 70, tOut: 30, tEtc: 1,
    mood: 'sad', hair: 'bowlBlack',
  },
];

const STATUS_META = {
  studying: { label: '학습중',   cls: 'st-studying' },
  sleeping: { label: '수면중',   cls: 'st-sleeping' },
  out:      { label: '외출중',   cls: 'st-out' },
  outLate:  { label: '외출지각', cls: 'st-outlate' },
  left:     { label: '하원',     cls: 'st-left' },
  absent:   { label: '미등원',   cls: 'st-absent' },
};

const MODE_CLS = { '스파르타': 'mode-sparta', '집중': 'mode-focus', '자율': 'mode-free' };

const DAY_NAMES = ['월', '화', '수', '목', '금', '토', '일'];
