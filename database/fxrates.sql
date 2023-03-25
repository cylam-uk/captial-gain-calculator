drop table if exists fxrates cascade;

create table fxrates(
  id int generated always as identity primary key,
  year int not null,
  month int not null,
  currency text,
  rate float
);