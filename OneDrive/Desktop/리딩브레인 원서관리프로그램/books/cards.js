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
  "slug": "magic-tree-house-afternoon-on-the-amazon",
  "title": "Afternoon on the Amazon",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #6",
  "level": {
   "ar": "2.6",
   "lexile": "510L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/7283554-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-mummies-in-the-morning",
  "title": "Mummies in the Morning",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #3",
  "level": {
   "ar": "2.7",
   "lexile": "500L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/7283349-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-night-of-the-ninjas",
  "title": "Night of the Ninjas",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #5",
  "level": {
   "ar": "2.7",
   "lexile": "490L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/423891-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-pirates-past-noon",
  "title": "Pirates Past Noon",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #4",
  "level": {
   "ar": "2.8",
   "lexile": "490L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/12616282-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-midnight-on-the-moon",
  "title": "Midnight on the Moon",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #8",
  "level": {
   "ar": "2.8",
   "lexile": "490L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/423894-M.jpg",
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
  "slug": "magic-tree-house-sunset-of-the-sabertooth",
  "title": "Sunset of the Sabertooth",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #7",
  "level": {
   "ar": "3.0",
   "lexile": "520L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/423893-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-ghost-town-at-sundown",
  "title": "Ghost Town at Sundown",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #10",
  "level": {
   "ar": "3.0",
   "lexile": "510L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/424008-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-lions-at-lunchtime",
  "title": "Lions at Lunchtime",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #11",
  "level": {
   "ar": "3.0",
   "lexile": "550L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/424009-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-dolphins-at-daybreak",
  "title": "Dolphins at Daybreak",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #9",
  "level": {
   "ar": "3.1",
   "lexile": "540L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/424007-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-polar-bears-past-bedtime",
  "title": "Polar Bears Past Bedtime",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #12",
  "level": {
   "ar": "3.3",
   "lexile": "570L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/424010-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-vacation-under-the-volcano",
  "title": "Vacation Under the Volcano",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #13",
  "level": {
   "ar": "3.3",
   "lexile": "410L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/424167-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-day-of-the-dragon-king",
  "title": "Day of the Dragon King",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #14",
  "level": {
   "ar": "3.3",
   "lexile": "380L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/6978834-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-viking-ships-at-sunrise",
  "title": "Viking Ships at Sunrise",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #15",
  "level": {
   "ar": "3.3",
   "lexile": "570L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/424173-M.jpg",
  "awards": [],
  "tier": "A"
 },
 {
  "slug": "magic-tree-house-hour-of-the-olympics",
  "title": "Hour of the Olympics",
  "author": "Mary Pope Osborne",
  "series": "Magic Tree House #16",
  "level": {
   "ar": "3.3",
   "lexile": "380L",
   "rb": "정독 1단계"
  },
  "cover": "https://covers.openlibrary.org/b/id/424174-M.jpg",
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
 "S3248": "magic-tree-house-knight-at-dawn",
 "S3249": "magic-tree-house-mummies-in-the-morning",
 "S3250": "magic-tree-house-pirates-past-noon",
 "S3251": "magic-tree-house-night-of-the-ninjas",
 "S3252": "magic-tree-house-afternoon-on-the-amazon",
 "S3253": "magic-tree-house-sunset-of-the-sabertooth",
 "S3254": "magic-tree-house-midnight-on-the-moon",
 "M3038": "magic-tree-house-dolphins-at-daybreak",
 "S3255": "magic-tree-house-ghost-town-at-sundown",
 "S3256": "magic-tree-house-lions-at-lunchtime",
 "S3257": "magic-tree-house-polar-bears-past-bedtime",
 "S3258": "magic-tree-house-vacation-under-the-volcano",
 "S3259": "magic-tree-house-day-of-the-dragon-king",
 "S3260": "magic-tree-house-viking-ships-at-sunrise",
 "M3070": "magic-tree-house-hour-of-the-olympics"
};
