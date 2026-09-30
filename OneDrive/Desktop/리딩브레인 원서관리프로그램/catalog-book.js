/* 장서 책(Book No.) 하나를 books/<slug>.js 와 같은 모양의 window.BOOK 으로 만들어 준다.
   worksheets.html · teacher-guide.html 이 ?no=S0011 로 열릴 때 쓴다.
   ?book=<slug> 로 열리는 기존 17권은 이 파일을 쓰지 않는다 (무거운 catalog.js 를 받지 않도록).

   쓰는 법:
     RBCat.load("S0011", function (B) { if (!B) ...책 없음...; else 그리기(); });
   부르고 나면 window.BOOK 이 놓여 있다.

   주의 — 이 BOOK 에는 vocabulary · comprehension · grammar · summaryMap · mindMap · essay · quiz 가 없다.
   우리가 읽지 않은 책이라 그 내용을 지어내지 않기 때문이다. 있는 것은 아래뿐이다:
     summary(장서 한 줄 요약) · questions/hints(생각 질문 세 개) · videos(유튜브 낭독 영상)
   그래서 이 책을 그리는 쪽은 "아이가 채우는 빈 칸"으로 만들어야 한다.
*/
window.RBCat = (function () {
  function inject(src, done) {
    var t = document.createElement("script");
    t.src = src;
    t.onload = t.onerror = done;                       // 없는 묶음이어도 그냥 넘어간다
    document.head.appendChild(t);
  }
  function chain(list, done) {
    (function next(i) { i >= list.length ? done() : inject(list[i], function () { next(i + 1); }); })(0);
  }

  function load(no, done) {
    if (!no) return done(null);
    var tag = String(no).slice(0, 3);                  // 질문·영상은 Book No. 앞 세 글자로 쪼개 두었다
    chain(["catalog.js", "catalog-covers.js", "act/" + tag + ".js", "vid/" + tag + ".js"], function () {
      var C = window.CATALOG;
      var i = C ? C.books.findIndex(function (b) { return b[0] === no; }) : -1;
      if (i < 0) return done(null);
      var b = C.at(i);
      var cid = (window.CATALOG_COVERS || {})[no];
      var a = (window.ACT || {})[no] || null;
      window.BOOK = {
        catalog: true,                                 // 장서 책이라는 표시 — 그리는 쪽이 이것으로 갈라선다
        slug: no, bookNo: no,
        title: b.title, author: b.author,
        series: b.series === "No series" ? "" : b.series,
        level: { ar: b.bl.toFixed(1), lexile: b.lexile ? b.lexile + "L" : "", rb: "" },
        cover: cid ? "https://covers.openlibrary.org/b/id/" + cid + "-M.jpg" : "",
        awards: b.award ? [b.award] : [],
        nf: !!b.nf, genre: b.genre, theme: b.theme,
        summary: a && a.s ? a.s : "",
        questions: a ? a.q : [], hints: a ? a.h : [],
        videos: (window.VID || {})[no] || []           // [[영상번호, 제목], ...]
      };
      done(window.BOOK);
    });
  }
  return { load: load };
})();
