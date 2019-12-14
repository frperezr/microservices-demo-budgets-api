-- +goose Up
-- +goose StatementBegin
ALTER TABLE budgets ALTER COLUMN budget_limit SET DEFAULT 0;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE budgets ALTER COLUMN budget_limit DROP DEFAULT 0;
-- +goose StatementEnd
