// 지금은 **로그인 없이 전부 보이게** 비워 둔 상태다 (원장 요청, 2026-09-16).
// 서버(Supabase) 주소와 키는 config.server.js 에 그대로 보관해 두었다.
// 다시 연결할 때: config.server.js 의 내용을 이 파일에 덮어쓰면 된다.
window.RB_CONFIG = {
  url: "",       // 예) https://abcdefgh.supabase.co
  anonKey: "",
// 카카오톡으로 리포트 보내기 — 카카오 디벨로퍼스의 **JavaScript 키**를 여기 적는다.
// 도메인으로 잠겨 있어 브라우저에 있어도 되는 공개용 키다 (Supabase anonKey 와 같은 성격).
// 비워 두면 카톡 단추 대신 지금처럼 "링크 복사" 로 움직인다.
// 받는 법: developers.kakao.com › 내 애플리케이션 › 앱 키 › JavaScript 키
//          그리고 [플랫폼 › Web] 에 https://readingbrain-books.vercel.app 을 등록한다.
  kakaoKey: ""
};
