drop table if exists brokeraccounts cascade;

create table brokeraccounts(
  id int generated always as identity primary key,
  name text
);