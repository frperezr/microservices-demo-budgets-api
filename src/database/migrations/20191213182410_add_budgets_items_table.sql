-- +goose Up
-- +goose StatementBegin
create TABLE budgets_items (
  id uuid primary key default gen_random_uuid(),
  budget_id uuid,
  city text,
  traveling_cost int,
  staying_cost int,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create trigger update_budgets_items_update_at
before update on budgets_items for each row execute procedure update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE if exists budgets_items;
-- +goose StatementEnd
