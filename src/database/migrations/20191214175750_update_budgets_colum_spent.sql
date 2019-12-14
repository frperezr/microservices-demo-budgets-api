-- +goose Up
-- +goose StatementBegin
ALTER TABLE budgets ALTER COLUMN spent SET DEFAULT 0;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE budgets ALTER COLUMN spent DROP DEFAULT 0;
-- +goose StatementEnd
