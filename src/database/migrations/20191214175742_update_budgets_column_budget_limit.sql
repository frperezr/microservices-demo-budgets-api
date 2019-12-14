-- +goose Up
-- +goose StatementBegin
ALTER TABLE budgets ALTER COLUMN budget_limit SET NOT NULL;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE budgets ALTER COLUMN budget_limit DROP NOT NULL;
-- +goose StatementEnd
