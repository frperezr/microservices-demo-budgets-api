-- +goose Up
-- +goose StatementBegin
ALTER TABLE budgets ALTER COLUMN spent SET NOT NULL;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE budgets ALTER COLUMN spent DROP NOT NULL;
-- +goose StatementEnd
