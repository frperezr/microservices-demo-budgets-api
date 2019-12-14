-- +goose Up
-- +goose StatementBegin
ALTER TABLE budgets
ADD COLUMN remaining int NOT NULL DEFAULT 0;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE budgets
DROP COLUMN IF EXISTS remaining;
-- +goose StatementEnd
