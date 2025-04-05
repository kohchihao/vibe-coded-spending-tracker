-- Create a function to get monthly totals
CREATE OR REPLACE FUNCTION get_monthly_totals(
  p_user_id UUID,
  p_month DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_expenses DECIMAL,
  total_income DECIMAL,
  total_transfers DECIMAL,
  account_expenses JSON
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_start_date DATE;
  v_end_date DATE;
BEGIN
  -- Calculate the first and last day of the specified month
  v_start_date := DATE_TRUNC('month', p_month);
  v_end_date := (v_start_date + INTERVAL '1 month - 1 day')::DATE;

  RETURN QUERY
  WITH monthly_totals AS (
    -- Calculate overall totals
    SELECT 
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expenses,
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
      COALESCE(SUM(CASE WHEN type = 'transfer' THEN amount ELSE 0 END), 0) as total_transfers
    FROM transactions t
    WHERE t.user_id = p_user_id
      AND t.date BETWEEN v_start_date AND v_end_date
  ),
  account_totals AS (
    -- Calculate per-account expense totals, including accounts with zero expenses
    SELECT 
      a.id,
      a.name,
      COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) as total
    FROM accounts a
    LEFT JOIN transactions t ON t.account_id = a.id 
      AND t.date BETWEEN v_start_date AND v_end_date
    WHERE a.user_id = p_user_id
      AND (a.archived = false OR a.archived IS NULL)
    GROUP BY a.id, a.name
    ORDER BY a.name
  )
  SELECT 
    mt.total_expenses,
    mt.total_income,
    mt.total_transfers,
    COALESCE(
      (SELECT json_agg(
        json_build_object(
          'id', at.id,
          'name', at.name,
          'total', at.total
        )
      )
      FROM account_totals at),
      '[]'::json
    ) as account_expenses
  FROM monthly_totals mt;
END;
$$; 