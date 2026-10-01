-- 학원설문조사 (리딩브레인 학부모·학생·강사 웹설문)
-- 원서 프로젝트(readingbrain 조직) → SQL Editor 에 통째로 붙여 넣고 Run.
-- ★ 맨 아래 '여기에-비밀번호' 한 곳만 원장님 비밀번호로 바꾸세요. 다시 실행하면 비밀번호만 바뀝니다.
-- 원서 웹앱 표에는 손대지 않습니다. 이 칸(academy_survey)은 바깥에 직접 열리지 않고,
-- 설문 화면은 아래 함수 두 개로만 드나듭니다.

create extension if not exists pgcrypto with schema extensions;

create schema if not exists academy_survey;
comment on schema academy_survey is '학원설문조사 — 리딩브레인 학부모·학생·강사 만족도 설문';
revoke all on schema academy_survey from public, anon, authenticated;

create table if not exists academy_survey.responses (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  survey     text not null check (survey in ('parent', 'student', 'teacher')),
  answers    jsonb not null check (jsonb_typeof(answers) = 'object')
);
comment on table academy_survey.responses is '설문 응답 (무기명, 한 번 제출에 한 줄)';
create index if not exists responses_survey_idx on academy_survey.responses (survey, created_at);

create table if not exists academy_survey.settings (
  id            int primary key default 1 check (id = 1),
  password_hash text not null
);

-- 응답 넣기: 누구나 부를 수 있지만 넣기만 한다.
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
  if p_survey not in ('parent', 'student', 'teacher') then
    raise exception 'unknown survey';
  end if;
  if jsonb_typeof(p_answers) <> 'object' or length(p_answers::text) > 20000 then
    raise exception 'bad answers';
  end if;
  -- 문항 수 상한, 글은 2000자로 자른다
  if (select count(*) from jsonb_object_keys(p_answers)) > 60 then
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

-- 결과 읽기: 비밀번호가 맞을 때만. 틀리면 null.
create or replace function public.survey_results(p_password text, p_survey text)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  ok boolean;
begin
  select s.password_hash = extensions.crypt(coalesce(p_password, ''), s.password_hash)
    into ok from academy_survey.settings s where s.id = 1;
  if not coalesce(ok, false) then
    perform pg_sleep(0.5); -- 비밀번호 마구 넣어 보기 늦추기
    return null;
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object('created_at', r.created_at, 'answers', r.answers) order by r.created_at)
    from academy_survey.responses r where r.survey = p_survey), '[]'::jsonb);
end;
$$;

revoke all on function public.survey_submit(text, jsonb) from public;
revoke all on function public.survey_results(text, text) from public;
grant execute on function public.survey_submit(text, jsonb) to anon, authenticated;
grant execute on function public.survey_results(text, text) to anon, authenticated;

-- ★ 결과 화면 비밀번호 (8자 이상 권장)
insert into academy_survey.settings (id, password_hash)
values (1, extensions.crypt('여기에-비밀번호', extensions.gen_salt('bf')))
on conflict (id) do update set password_hash = excluded.password_hash;
