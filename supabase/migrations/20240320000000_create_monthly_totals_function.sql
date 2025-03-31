-- Create a function to get monthly totals
CREATE OR REPLACE FUNCTION get_monthly_totals(
  p_user_id UUID,
  p_month DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_expenses DECIMAL,
  total_income DECIMAL,
  total_transfers DECIMAL
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
  SELECT 
    COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expenses,
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
    COALESCE(SUM(CASE WHEN type = 'transfer' THEN amount ELSE 0 END), 0) as total_transfers
  FROM transactions
  WHERE user_id = p_user_id
    AND date BETWEEN v_start_date AND v_end_date;
END;
$$; 