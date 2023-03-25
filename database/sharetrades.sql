drop table if exists sharetrades cascade;

create table sharetrades(
  id int generated always as identity primary key,
  brokeraccount_id int not null references brokeraccounts(id),
  trade_date date not null,
  ticker text,
  shares float, -- positive means buy, negative means sell
  currency text,
  proceeds float,
  commission float
);

create index idx_sharetrades_brokeraccount_id on sharetrades(brokeraccount_id);