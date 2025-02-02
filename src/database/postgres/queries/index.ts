export const listQuery = (userId: string): string => `
SELECT array_to_json(array_agg(row_to_json(t)))
FROM (
    SELECT id, user_id, budget_limit, spent, remaining, created_at, updated_at, name,
    (
        SELECT array_to_json(array_agg(row_to_json(d)))
        FROM (
         SELECT id, city, traveling_cost, staying_cost, created_at, updated_at
         FROM budgets_items
         WHERE budget_id=budgets.id AND deleted_at IS NULL
        )d
    ) AS items
    FROM budgets
    WHERE deleted_at IS NULL and user_id = '${userId}'
)t
`

export const getQuery = (id: string): string => `
SELECT row_to_json(t)
FROM (
    SELECT id, user_id, budget_limit, spent, remaining, created_at, updated_at, name,
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
