create extension if not exists "pgcrypto";

create table public.papers (
  id uuid primary key default gen_random_uuid(),

  course text not null,
  semester int not null check (semester > 0),
  subject text not null,

  exam_session text not null check (exam_session in ('Winter', 'Summer')),
  year int not null check (year >= 2010),

  file_url text not null,

  uploaded_by text,
  uploader_email text,

  approved boolean default false,

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_papers_approved on public.papers(approved);
create index idx_papers_course on public.papers(course);
create index idx_papers_subject on public.papers(subject);

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_papers_updated_at
before update on public.papers
for each row
execute function update_updated_at_column();
