-- 학원설문조사 2단계: 설문 만들기 (문항을 서버에 둔다)
-- reading-brain 프로젝트 → SQL Editor 에 통째로 붙여 넣고 Run. 비밀번호는 1단계에서 정한 것을 그대로 쓴다.
-- 이미 받은 응답·이미 나간 링크(/parent, /student)는 그대로다. 다시 실행해도 된다.

create table if not exists academy_survey.forms (
  slug       text primary key check (slug ~ '^[a-z0-9][a-z0-9-]{1,39}$'),
  def        jsonb not null check (jsonb_typeof(def) = 'object'),
  status     text not null default 'open' check (status in ('open', 'closed')),
  sort       int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table academy_survey.forms is '설문지 (문항은 def 안에, 설문 화면과 대시보드가 함께 읽는다)';
alter table academy_survey.forms enable row level security;
alter table academy_survey.responses enable row level security;
alter table academy_survey.settings enable row level security;

-- 응답의 설문 이름은 이제 forms 에 있는 것이면 무엇이든 (넣기 함수가 확인한다)
alter table academy_survey.responses drop constraint if exists responses_survey_check;

-- 처음 값: 학부모·학생 설문 (questions.js 에서 만든 것)
insert into academy_survey.forms (slug, def, sort) values
  ('parent', $seed${"id":"parent","once":true,"greeting":"Dear parents,","thanks":"보내 주신 의견은 내년 교육 프로그램 운영과 학습 관리에 적극 반영하겠습니다.","title":"아이의 올바른 성장 방향을 묻다","kicker":"2027 리딩브레인 학부모 설문","intro":["안녕하세요, 리딩브레인영어학원입니다.","2027년에도 우리 아이들에게 더 나은 교육을 제공하기 위해 간단한 설문을 마련하였습니다.","아래 문항에 솔직한 의견을 남겨주시면, 내년 교육 프로그램 운영과 학습 관리에 적극 반영하겠습니다.","바쁜 시간 내주시어 소중한 의견 주셔서 감사합니다."],"notice":"본 설문은 무기명으로 진행되며, 답변 내용은 수업 운영 개선을 위한 참고 자료로만 활용됩니다. 솔직한 의견을 부탁드립니다.","sections":[{"title":"학생 레벨","desc":"커리큘럼별, 학년별 수업 난이도 및 학습량, 숙제량 등의 적정도를 파악하기 위하여 학생의 커리큘럼과 학년 선택 부탁드립니다.","items":[{"id":"grade","type":"multi","required":true,"filter":true,"label":"현재 자녀 학년","hint":"자녀가 둘 이상 다니면 모두 골라 주세요","options":["초등 1학년","초등 2학년","초등 3학년","초등 4학년","초등 5학년","초등 6학년","중등 1학년","중등 2학년","중등 3학년","고등 1학년","고등 2학년","고등 3학년"]},{"id":"curricula","type":"multi","required":true,"filter":true,"label":"현재 자녀가 수강중인 커리큘럼","options":["기초원서(파닉스)","원서정독","중고등특목관(문법/단어/독해)","미국교과","영자신문/논픽션리딩","스터디포스"]}]},{"title":"교수팀 & 수업 관련 만족도","desc":"리딩브레인 수업에 대한 의견을 부탁드려요! 우리 아이들의 소중한 수업 시간이 더 값지고 알차게 쓰일 수 있도록, 공유해 주신 의견 적극 반영 하겠습니다.","items":[{"id":"t_deliver","type":"scale","required":true,"options":[{"v":5,"label":"매우 만족"},{"v":4,"label":"만족"},{"v":3,"label":"보통"},{"v":2,"label":"불만족"},{"v":1,"label":"매우 불만족"}],"label":"담당 선생님의 수업 전달력에 만족하시나요?"},{"id":"t_curr","type":"scale","required":true,"options":[{"v":5,"label":"매우 만족"},{"v":4,"label":"만족"},{"v":3,"label":"보통"},{"v":2,"label":"불만족"},{"v":1,"label":"매우 불만족"}],"label":"담당 선생님의 수업 커리큘럼과 학생 관리에 만족하시나요?"},{"id":"t_report","type":"scale","required":true,"options":[{"v":5,"label":"매우 만족"},{"v":4,"label":"만족"},{"v":3,"label":"보통"},{"v":2,"label":"불만족"},{"v":1,"label":"매우 불만족"}],"label":"자녀의 진도와 부족한 부분에 대한 상담·학습 보고에 만족하시나요?"},{"id":"rel","type":"single","required":true,"options":["그렇다","보통이다","아니다"],"label":"자녀가 선생님과 긍정적인 관계를 형성하고 있나요?"},{"id":"diff","type":"single","required":true,"options":["쉽다","적절하다","어렵다"],"label":"현재 수업 난이도는 자녀에게 적절하다고 느끼시나요?"},{"id":"load","type":"single","required":true,"options":["부담된다","적절하다","부족하다"],"label":"수업 학습량(수업 중 처리 분량)은 자녀에게 부담되지 않나요?"},{"id":"hw","type":"single","required":true,"options":["많다","적절하다","적다"],"label":"주어지는 숙제량은 자녀에게 적절하다고 느끼시나요?"},{"id":"hw_diligence","type":"single","required":true,"label":"자녀가 숙제를 얼마나 성실하게 하고 있나요?","options":["숙제를 매우 잘해가고 성실한 편이다","숙제를 그런대로 성실하게 해가고 지적을 받지 않는다","숙제를 가끔 못해갈 때가 있다","거의 숙제를 하지 못한다"]},{"id":"growth","type":"single","required":true,"options":["그렇다","보통이다","아니다"],"label":"수업을 통해 자녀의 영어 실력 또는 표현력 향상을 체감하고 계신가요?"}]},{"title":"운영팀 관련 만족도","desc":"학부모님들의 소중한 의견으로 더 나은 리딩브레인이 되겠습니다 ^^","items":[{"id":"o_notice","type":"scale","required":true,"options":[{"v":5,"label":"매우 만족"},{"v":4,"label":"만족"},{"v":3,"label":"보통"},{"v":2,"label":"불만족"},{"v":1,"label":"매우 불만족"}],"label":"학원 안내사항(공지, 일정 등)이 정확하게 전달되었나요?"},{"id":"o_reply","type":"scale","required":true,"options":[{"v":5,"label":"매우 만족"},{"v":4,"label":"만족"},{"v":3,"label":"보통"},{"v":2,"label":"불만족"},{"v":1,"label":"매우 불만족"}],"label":"학원 응답(전화, 문자, 상담 등)이 신속하게 처리되었나요?"},{"id":"o_admin","type":"scale","required":true,"options":[{"v":5,"label":"매우 만족"},{"v":4,"label":"만족"},{"v":3,"label":"보통"},{"v":2,"label":"불만족"},{"v":1,"label":"매우 불만족"}],"label":"행정 처리(수업 등록, 결석/보강 안내, 수강료 납부 등)가 원활하다고 느끼시나요?"}]},{"title":"자유의견","desc":"수업이나 운영에 대해 특별히 만족하셨던 부분, 그리고 기타 전하고 싶은 말씀을 자유롭게 적어주세요.","items":[{"id":"good","type":"text","required":true,"label":"리딩브레인 수업 중 특히 만족하신 부분이 있다면 알려주세요."},{"id":"etc","type":"text","required":false,"label":"기타 전하고 싶은 의견이 있으시다면 자유롭게 남겨주세요."}]}]}$seed$::jsonb, 1),
  ('student', $seed${"id":"student","big":true,"greeting":"Dear friends,","thanks":"솔직하게 답해 줘서 고마워요! 더 즐거운 수업으로 보답할게요.","title":"리딩브레인 친구들의 솔직한 이야기","kicker":"리딩브레인 학생 설문","intro":["안녕하세요, 리딩브레인 친구들!","리딩브레인 영어학원에서는 여러분이 더 즐겁고 효과적으로 공부할 수 있도록 의견을 듣고자 합니다.","여러분의 생각을 솔직하게 적어주세요. 여러분의 답변은 수업 개선에 큰 도움이 됩니다."],"notice":"이름은 묻지 않아요. 누가 썼는지 아무도 모르니 마음 편히 솔직하게 답해 주세요.","sections":[{"title":"나는 몇 학년?","desc":"","items":[{"id":"grade","type":"single","required":true,"filter":true,"label":"현재 학년","options":["초등 1학년","초등 2학년","초등 3학년","초등 4학년","초등 5학년","초등 6학년","중등 1학년","중등 2학년","중등 3학년","고등 1학년","고등 2학년","고등 3학년"]}]},{"title":"수업과 선생님","desc":"나와 가장 가까운 칸을 골라 주세요.","items":[{"id":"s_fun","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"나는 리딩브레인 수업이 재미있다고 느낀다."},{"id":"s_come","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"학원에 오는 것이 즐겁다."},{"id":"s_kind","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"선생님이 친절하고 따뜻하게 대해주신다."},{"id":"s_explain","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"선생님이 설명을 이해하기 쉽게 해주신다."},{"id":"s_know","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"선생님이 나의 '진짜 실력과 현재 학습 목표'를 잘 알고 계신다."},{"id":"s_respect","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"선생님이 나의 의견을 존중해 주신다고 느낀다."},{"id":"s_talk","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"질문이나 고민이 있을 때 선생님께 편하게 이야기할 수 있다."},{"id":"s_clear","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"수업 후 '오늘 배운 내용을 확실히 알겠다!'는 기분이 자주 든다."},{"id":"s_grow","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"수업을 통해 내 영어 실력이 좋아지고 있다고 느낀다."},{"id":"s_books","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"학원에서 읽는 원서와 활동이 나에게 도움이 된다."},{"id":"s_mood","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"학원 분위기(교실, 선생님, 친구들)가 편안하다."},{"id":"s_recommend","type":"scale","required":true,"options":[{"v":1,"label":"전혀 아니다"},{"v":2,"label":"아니다"},{"v":3,"label":"보통이다"},{"v":4,"label":"그렇다"},{"v":5,"label":"매우 그렇다"}],"label":"친구에게 리딩브레인을 소개해 주고 싶다."},{"id":"s_hw","type":"scale","required":true,"options":[{"v":1,"label":"너무 적어요"},{"v":2,"label":"조금 적어요"},{"v":3,"label":"적당해요"},{"v":4,"label":"조금 많아요"},{"v":5,"label":"너무 많아요"}],"noAvg":true,"label":"숙제나 과제의 양은 어떤가요?"}]},{"title":"내 생각 적기","desc":"쓰고 싶은 것만 적어도 괜찮아요.","items":[{"id":"s_best","type":"text","label":"수업 시간에 가장 재미있었던(시간 가는 줄 몰랐던) 활동은 무엇인가요?"},{"id":"s_hard","type":"text","label":"수업 내용 중 이해가 덜 되거나 너무 어렵다고 느끼는 부분이 있나요?"},{"id":"s_want","type":"text","label":"앞으로 학원에서 하고 싶은 활동이나 배우고 싶은 내용은 무엇인가요?"},{"id":"s_wish","type":"text","label":"선생님께 바라는 점이 있나요?"},{"id":"s_good","type":"text","label":"리딩브레인 학원에서 가장 좋은 점은 무엇인가요?"},{"id":"s_change","type":"text","label":"수업이 더 재미있어지려면, 또는 학원에서 바뀌면 좋겠다고 생각하는 점은 무엇인가요?"},{"id":"s_trouble","type":"text","flag":true,"label":"공부 말고(친구 관계, 환경 등) 학원에서 불편한 상황이 있나요? 있다면 어떤 때인가요?"},{"id":"s_etc","type":"text","label":"기타 하고 싶은 말이 있으면 자유롭게 적어 주세요."}]}]}$seed$::jsonb, 2)
on conflict (slug) do nothing;

create or replace function academy_survey.pw_ok(p_password text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select s.password_hash = extensions.crypt(coalesce(p_password, ''), s.password_hash)
                   from academy_survey.settings s where s.id = 1), false);
$$;
revoke all on function academy_survey.pw_ok(text) from public;

-- 문항 목록 펼치기
create or replace function academy_survey.items_of(p_def jsonb)
returns setof jsonb
language sql
immutable
set search_path = ''
as $$
  select x from jsonb_path_query(p_def, '$.sections[*].items[*]') x;
$$;
revoke all on function academy_survey.items_of(jsonb) from public;

-- 설문 화면이 읽는다 (누구나): 없으면 null
create or replace function public.survey_form(p_slug text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object('slug', f.slug, 'status', f.status, 'def', f.def)
  from academy_survey.forms f where f.slug = p_slug;
$$;

-- 응답 넣기: 있는 설문, 열린 설문만
create or replace function public.survey_submit(p_survey text, p_answers jsonb)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  clean jsonb := '{}'::jsonb;
  k text;
  v jsonb;
begin
  if not exists (select 1 from academy_survey.forms f where f.slug = p_survey and f.status = 'open') then
    raise exception 'closed or unknown survey';
  end if;
  if jsonb_typeof(p_answers) <> 'object' or length(p_answers::text) > 20000 then
    raise exception 'bad answers';
  end if;
  if (select count(*) from jsonb_object_keys(p_answers)) > 80 then
    raise exception 'too many keys';
  end if;
  for k, v in select * from jsonb_each(p_answers) loop
    if length(k) > 40 then raise exception 'bad key'; end if;
    if jsonb_typeof(v) = 'string' then
      v := to_jsonb(left(v #>> '{}', 2000));
    end if;
    clean := clean || jsonb_build_object(k, v);
  end loop;
  insert into academy_survey.responses (survey, answers) values (p_survey, clean);
  return true;
end;
$$;

-- 결과 읽기 (1단계와 같음, 비밀번호 확인을 pw_ok 로)
create or replace function public.survey_results(p_password text, p_survey text)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not academy_survey.pw_ok(p_password) then
    perform pg_sleep(0.5);
    return null;
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object('created_at', r.created_at, 'answers', r.answers) order by r.created_at)
    from academy_survey.responses r where r.survey = p_survey), '[]'::jsonb);
end;
$$;

-- 설문 관리 목록 (비밀번호)
create or replace function public.survey_admin_forms(p_password text)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not academy_survey.pw_ok(p_password) then
    perform pg_sleep(0.5);
    return null;
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
      'slug', f.slug, 'def', f.def, 'status', f.status, 'sort', f.sort, 'updated_at', f.updated_at,
      'responses', (select count(*) from academy_survey.responses r where r.survey = f.slug))
      order by f.sort, f.created_at)
    from academy_survey.forms f), '[]'::jsonb);
end;
$$;

-- 설문 저장 (그림은 설문 안에 data URL 로 들어오므로 3MB 까지): 새로 만들기(p_new) 또는 고치기. 결과는 {ok:true} 또는 {error:'...'}
create or replace function public.survey_save_form(p_password text, p_slug text, p_def jsonb, p_new boolean)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  old jsonb;
  n_items int;
begin
  if not academy_survey.pw_ok(p_password) then perform pg_sleep(0.5); return '{"error":"password"}'; end if;
  if p_slug is null or p_slug !~ '^[a-z0-9][a-z0-9-]{1,39}$' or p_slug in ('s', 'results', 'dashboard', 'index') then
    return '{"error":"slug"}';
  end if;
  if jsonb_typeof(p_def) <> 'object' or length(p_def::text) > 3000000 then return '{"error":"bad"}'; end if;

  select count(*) into n_items from academy_survey.items_of(p_def);
  if n_items = 0 then return '{"error":"empty"}'; end if;
  if exists (select 1 from academy_survey.items_of(p_def) x
             where coalesce(x->>'type', '') not in ('single', 'multi', 'scale', 'text', 'info')
                or coalesce(x->>'id', '') !~ '^[A-Za-z0-9_]{1,40}$') then
    return '{"error":"bad"}';
  end if;
  if (select count(distinct x->>'id') from academy_survey.items_of(p_def) x) <> n_items then
    return '{"error":"dup"}';
  end if;

  select f.def into old from academy_survey.forms f where f.slug = p_slug;
  if p_new and old is not null then return '{"error":"exists"}'; end if;
  if not p_new and old is null then return '{"error":"missing"}'; end if;

  -- 응답이 있으면 (그림·안내 글 info 는 빼고): 옛 문항이 같은 id·종류·보기로 모두 남아 있어야 한다
  if old is not null and exists (select 1 from academy_survey.responses r where r.survey = p_slug)
     and exists (select 1 from academy_survey.items_of(old) o
                 where o->>'type' <> 'info'
                   and not exists (select 1 from academy_survey.items_of(p_def) n
                                   where n->>'id' = o->>'id' and n->>'type' = o->>'type'
                                     and coalesce(n->'options', 'null') = coalesce(o->'options', 'null'))) then
    return '{"error":"locked"}';
  end if;

  p_def := jsonb_set(p_def, '{id}', to_jsonb(p_slug));
  if old is null then
    insert into academy_survey.forms (slug, def) values (p_slug, p_def);
  else
    update academy_survey.forms set def = p_def, updated_at = now() where slug = p_slug;
  end if;
  return '{"ok":true}';
end;
$$;

-- 열기·닫기
create or replace function public.survey_set_status(p_password text, p_slug text, p_status text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not academy_survey.pw_ok(p_password) then perform pg_sleep(0.5); return '{"error":"password"}'; end if;
  if p_status not in ('open', 'closed') then return '{"error":"bad"}'; end if;
  update academy_survey.forms set status = p_status, updated_at = now() where slug = p_slug;
  if not found then return '{"error":"missing"}'; end if;
  return '{"ok":true}';
end;
$$;

-- 지우기: 응답이 없는 설문만
create or replace function public.survey_delete_form(p_password text, p_slug text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not academy_survey.pw_ok(p_password) then perform pg_sleep(0.5); return '{"error":"password"}'; end if;
  if exists (select 1 from academy_survey.responses r where r.survey = p_slug) then return '{"error":"has_responses"}'; end if;
  delete from academy_survey.forms where slug = p_slug;
  if not found then return '{"error":"missing"}'; end if;
  return '{"ok":true}';
end;
$$;

revoke all on function public.survey_form(text) from public;
revoke all on function public.survey_submit(text, jsonb) from public;
revoke all on function public.survey_results(text, text) from public;
revoke all on function public.survey_admin_forms(text) from public;
revoke all on function public.survey_save_form(text, text, jsonb, boolean) from public;
revoke all on function public.survey_set_status(text, text, text) from public;
revoke all on function public.survey_delete_form(text, text) from public;
grant execute on function public.survey_form(text) to anon, authenticated;
grant execute on function public.survey_submit(text, jsonb) to anon, authenticated;
grant execute on function public.survey_results(text, text) to anon, authenticated;
grant execute on function public.survey_admin_forms(text) to anon, authenticated;
grant execute on function public.survey_save_form(text, text, jsonb, boolean) to anon, authenticated;
grant execute on function public.survey_set_status(text, text, text) to anon, authenticated;
grant execute on function public.survey_delete_form(text, text) to anon, authenticated;
