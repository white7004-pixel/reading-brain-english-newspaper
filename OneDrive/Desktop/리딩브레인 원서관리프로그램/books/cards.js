// 첫 화면용 책 목록. scripts/make-cards.mjs 가 books/*.js 에서 만든다 — 손으로 고치지 않는다.
window.BOOK_CARDS = [
 {
  "slug": "sam-and-the-cat",
  "title": "Sam and the Cat",
  "author": "E. J. Lewis · 그림 Kate Daubney",
  "series": "Story Phonics Level 1-1 · Storybook & Workbook",
  "level": {
   "ar": "0.3",
   "lexile": "",
   "rb": "파닉스 1단계 · 단모음 a (-ad -am -an -at)"
  },
  "cover": "assets/covers/sam-and-the-cat.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "hi-fly-guy",
  "title": "Hi! Fly Guy",
  "author": "Tedd Arnold",
  "series": "Fly Guy #1 · Scholastic Reader Level 2",
  "level": {
   "ar": "1.5",
   "lexile": "380L",
   "rb": "다독 1단계"
  },
  "cover": "assets/covers/hi-fly-guy.jpg",
  "awards": [
   "Theodor Seuss Geisel Honor 2006"
  ],
  "tier": "A"
 },
 {
  "slug": "green-eggs-and-ham",
  "title": "Green Eggs and Ham",
  "author": "Dr. Seuss",
  "series": "Beginner Books",
  "level": {
   "ar": "1.5",
   "lexile": "210L",
   "rb": "다독 1단계"
  },
  "cover": "assets/covers/green-eggs-and-ham.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "lets-celebrate-birthdays",
  "title": "Let's Celebrate Birthdays",
  "author": "Adele Corry",
  "series": "IB PYP Year 1 · Who We Are",
  "level": {
   "ar": "1.5",
   "lexile": "Green Band",
   "rb": "IB PYP Y1 · WOW 로드맵 AR 1.2~2.6"
  },
  "cover": "assets/covers/lets-celebrate-birthdays.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "nate-the-great",
  "title": "Nate the Great",
  "author": "Marjorie Weinman Sharmat",
  "series": "Nate the Great",
  "level": {
   "ar": "2.0",
   "lexile": "340L",
   "rb": "다독 2단계"
  },
  "cover": "assets/covers/nate-the-great.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "life-in-a-castle",
  "title": "Life in a Castle",
  "author": "Adele Corry",
  "series": "IB PYP Year 1 · Where We Are in Place and Time",
  "level": {
   "ar": "2.5",
   "lexile": "Orange Band",
   "rb": "IB PYP Y1 · WOW 로드맵 AR 2.5~3.3"
  },
  "cover": "assets/covers/life-in-a-castle.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "dinosaurs-before-dark",
  "title": "Dinosaurs Before Dark",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #1",
  "level": {
   "ar": "2.6",
   "lexile": "510L",
   "rb": "정독 1단계"
  },
  "cover": "assets/covers/dinosaurs-before-dark.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "frog-and-toad-are-friends",
  "title": "Frog and Toad Are Friends",
  "author": "Arnold Lobel",
  "series": "I Can Read Level 2",
  "level": {
   "ar": "2.9",
   "lexile": "400L",
   "rb": "다독 2단계"
  },
  "cover": "assets/covers/frog-and-toad-are-friends.jpg",
  "awards": [
   "Caldecott Honor 1971"
  ],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-knight-at-dawn",
  "title": "The Knight at Dawn",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #2",
  "level": {
   "ar": "2.9",
   "lexile": "500L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/4851256-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "sarah-plain-and-tall",
  "title": "Sarah, Plain and Tall",
  "author": "Patricia MacLachlan",
  "series": "Sarah, Plain and Tall #1",
  "level": {
   "ar": "3.4",
   "lexile": "560L",
   "rb": "정독 2단계"
  },
  "cover": "assets/covers/sarah-plain-and-tall.jpg",
  "awards": [
   "Newbery Medal 1986",
   "Scott O'Dell Award 1986"
  ],
  "tier": "A"
 },
 {
  "slug": "berenstain-bears-learn-about-strangers",
  "title": "The Berenstain Bears Learn about Strangers",
  "author": "Stan and Jan Berenstain",
  "series": "The Berenstain Bears",
  "level": {
   "ar": "3.6",
   "lexile": "500L",
   "rb": "다독 3단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/4196958-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "berenstain-bears-in-the-dark",
  "title": "The Berenstain Bears in the Dark",
  "author": "Stan and Jan Berenstain",
  "series": "The Berenstain Bears",
  "level": {
   "ar": "3.8",
   "lexile": "470L",
   "rb": "다독 3단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/4272635-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "flat-stanley",
  "title": "Flat Stanley: His Original Adventure!",
  "author": "Jeff Brown",
  "series": "Flat Stanley",
  "level": {
   "ar": "4.0",
   "lexile": "750L",
   "rb": "정독 2단계"
  },
  "cover": "assets/covers/flat-stanley.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "berenstain-bears-too-much-junk-food",
  "title": "The Berenstain Bears and Too Much Junk Food",
  "author": "Stan and Jan Berenstain",
  "series": "The Berenstain Bears",
  "level": {
   "ar": "4.0",
   "lexile": "550L",
   "rb": "다독 4단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/6378038-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "charlottes-web",
  "title": "Charlotte's Web",
  "author": "E.B. White",
  "series": "Classic Chapter Book",
  "level": {
   "ar": "4.4",
   "lexile": "680L",
   "rb": "정독 3단계"
  },
  "cover": "assets/covers/charlottes-web.jpg",
  "awards": [
   "Newbery Honor 1953"
  ],
  "tier": "A"
 },
 {
  "slug": "holes",
  "title": "Holes",
  "author": "Louis Sachar",
  "series": "",
  "level": {
   "ar": "4.6",
   "lexile": "660L",
   "rb": "정독 3단계"
  },
  "cover": "assets/covers/holes.jpg",
  "awards": [
   "Newbery Medal 1999",
   "National Book Award 1998"
  ],
  "tier": "A"
 },
 {
  "slug": "charlie-and-the-chocolate-factory",
  "title": "Charlie and the Chocolate Factory",
  "author": "Roald Dahl",
  "series": "",
  "level": {
   "ar": "4.8",
   "lexile": "810L",
   "rb": "정독 3단계"
  },
  "cover": "assets/covers/charlie-and-the-chocolate-factory.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "harry-potter-sorcerers-stone",
  "title": "Harry Potter and the Sorcerer's Stone",
  "author": "J. K. Rowling",
  "series": "Harry Potter",
  "level": {
   "ar": "5.5",
   "lexile": "880L",
   "rb": "정독 4단계"
  },
  "cover": "assets/covers/harry-potter-sorcerers-stone.jpg",
  "awards": [],
  "tier": "A"
 }
];
// Book No. → slug. 서재에서 [학습하기] 단추를 띄울 때 쓴다.
window.BOOK_BY_NO = {
 "S1624": "hi-fly-guy",
 "M3117": "sarah-plain-and-tall",
 "S4154": "charlottes-web",
 "S1212": "green-eggs-and-ham",
 "M2187": "nate-the-great",
 "M3013": "dinosaurs-before-dark",
 "S2040": "frog-and-toad-are-friends",
 "M3069": "flat-stanley",
 "S4191": "holes",
 "S4309": "charlie-and-the-chocolate-factory",
 "S5084": "harry-potter-sorcerers-stone",
 "S3788": "berenstain-bears-in-the-dark",
 "S3779": "berenstain-bears-learn-about-strangers",
 "S4441": "berenstain-bears-too-much-junk-food",
 "S3248": "magic-tree-house-knight-at-dawn"
};
