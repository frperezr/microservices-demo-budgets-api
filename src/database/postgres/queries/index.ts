export const listQuery = (): string => `
SELECT array_to_json(array_agg(row_to_json(t)))
FROM (
    SELECT id, user_id, budget_limit, spent, created_at, updated_at,
    (
        SELECT array_to_json(array_agg(row_to_json(d)))
        FROM (
         SELECT id, city, traveling_cost, staying_cost, created_at, updated_at
         FROM budgets_items
         WHERE budget_id=budgets.id AND deleted_at IS NULL
        )d
    ) AS items
    FROM budgets
    WHERE deleted_at IS NULL
)t
`

export const getQuery = (id: string): string => `
SELECT row_to_json(t)
FROM (
    SELECT id, user_id, budget_limit, spent, created_at, updated_at,
    (
        SELECT array_to_json(array_agg(row_to_json(d)))
        FROM (
         SELECT id, city, traveling_cost, staying_cost, created_at, updated_at
         FROM budgets_items
         WHERE budget_id=budgets.id AND deleted_at IS NULL
        )d
    ) AS items
    FROM budgets
    WHERE deleted_at is null AND id='${id}'
)t
`
