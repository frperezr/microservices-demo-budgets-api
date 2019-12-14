-- +goose Up
-- +goose StatementBegin
create TABLE budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  budget_limit int,
  spent int,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create trigger update_budgets_update_at
before update on budgets for each row execute procedure update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE if exists budgets;
-- +goose StatementEnd
