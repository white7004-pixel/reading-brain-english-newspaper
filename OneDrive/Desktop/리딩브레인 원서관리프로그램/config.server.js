// 서버 주소. 둘 다 비워 두면 로그인 없이 이 브라우저에만 저장한다.
// Supabase 대시보드 › Project Settings › API Keys › Legacy 의 anon public 키.
// anonKey 는 누구나 봐도 되는 공개용 키다. service_role 키는 절대 여기 적지 않는다.
// 프로젝트: readingbrain 조직 › anxxfvazehbsbvkyuoqy (원서 전용)
window.RB_CONFIG = {
  url: "https://anxxfvazehbsbvkyuoqy.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFueHhmdmF6ZWhic2J2a3l1b3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzQ1NzMsImV4cCI6MjEwNDk1MDU3M30.9wcC-PYtw9iG7b4fdldEXuF_NhzIL3y15rIKW3U-6cc",
// 카카오톡으로 리포트 보내기 — 카카오 디벨로퍼스의 **JavaScript 키**를 여기 적는다.
// 도메인으로 잠겨 있어 브라우저에 있어도 되는 공개용 키다 (Supabase anonKey 와 같은 성격).
// 비워 두면 카톡 단추 대신 지금처럼 "링크 복사" 로 움직인다.
// 받는 법: developers.kakao.com › 내 애플리케이션 › 앱 키 › JavaScript 키
//          그리고 [플랫폼 › Web] 에 https://readingbrain-books.vercel.app 을 등록한다.
  kakaoKey: ""
};
