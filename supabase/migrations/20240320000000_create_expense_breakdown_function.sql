-- Create a function to get expense breakdown by category for the current month
CREATE OR REPLACE FUNCTION get_expense_breakdown(p_user_id UUID)
RETURNS TABLE (
  category_name TEXT,
  amount DECIMAL,
  percentage DECIMAL
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_expenses DECIMAL;
BEGIN
  -- First get the total expenses for the current month
  SELECT COALESCE(SUM(t.amount), 0)  -- Specify the table alias here
  INTO total_expenses
  FROM transactions t
  WHERE t.user_id = p_user_id
    AND t.type = 'expense'
    AND t.date >= DATE_TRUNC('month', CURRENT_DATE)
    AND t.date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';

  -- If there are no expenses, return empty result
  IF total_expenses = 0 THEN
    RETURN;
  END IF;

  -- Return the breakdown by category
  RETURN QUERY
  SELECT 
    c.name as category_name,
    COALESCE(SUM(t.amount), 0) as amount,
    ROUND(COALESCE(SUM(t.amount), 0) * 100.0 / total_expenses, 1) as percentage
  FROM categories c
  LEFT JOIN transactions t ON t.category_id = c.id
  WHERE t.user_id = p_user_id
    AND t.type = 'expense'
    AND t.date >= DATE_TRUNC('month', CURRENT_DATE)
    AND t.date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
  GROUP BY c.id, c.name
  HAVING COALESCE(SUM(t.amount), 0) > 0
  ORDER BY COALESCE(SUM(t.amount), 0) DESC;
END;
$$;

-- Create a function to get expense breakdown by category for a specific month
CREATE OR REPLACE FUNCTION get_expense_breakdown_with_date(p_user_id UUID, p_target_date DATE)
RETURNS TABLE (
  category_name TEXT,
  amount DECIMAL,
  percentage DECIMAL
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_expenses DECIMAL;
BEGIN
  -- First get the total expenses for the specified month
  SELECT COALESCE(SUM(t.amount), 0)
  INTO total_expenses
  FROM transactions t
  WHERE t.user_id = p_user_id
    AND t.type = 'expense'
    AND t.date >= DATE_TRUNC('month', p_target_date)
    AND t.date < DATE_TRUNC('month', p_target_date) + INTERVAL '1 month';

  -- If there are no expenses, return empty result
  IF total_expenses = 0 THEN
    RETURN;
  END IF;

  -- Return the breakdown by category
  RETURN QUERY
  SELECT 
    c.name as category_name,
    COALESCE(SUM(t.amount), 0) as amount,
    ROUND(COALESCE(SUM(t.amount), 0) * 100.0 / total_expenses, 1) as percentage
  FROM categories c
  LEFT JOIN transactions t ON t.category_id = c.id
  WHERE t.user_id = p_user_id
    AND t.type = 'expense'
    AND t.date >= DATE_TRUNC('month', p_target_date)
    AND t.date < DATE_TRUNC('month', p_target_date) + INTERVAL '1 month'
  GROUP BY c.id, c.name
  HAVING COALESCE(SUM(t.amount), 0) > 0
  ORDER BY COALESCE(SUM(t.amount), 0) DESC;
END;
$$;

CREATE OR REPLACE FUNCTION get_expense_breakdown_with_date(p_user_id UUID, p_target_date DATE)
RETURNS TABLE (
  category_id BIGINT,
  category_name TEXT,
  category_icon TEXT,
  category_color TEXT,
  amount DECIMAL,
  percentage DECIMAL
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_expenses DECIMAL;
BEGIN
  -- First get the total expenses for the specified month
  SELECT COALESCE(SUM(t.amount), 0)
  INTO total_expenses
  FROM transactions t
  WHERE t.user_id = p_user_id
    AND t.type = 'expense'
    AND t.date >= DATE_TRUNC('month', p_target_date)
    AND t.date < DATE_TRUNC('month', p_target_date) + INTERVAL '1 month';

  -- If there are no expenses, return empty result
  IF total_expenses = 0 THEN
    RETURN;
  END IF;

  -- Return the breakdown by category
  RETURN QUERY
  SELECT 
    c.id as category_id,
    c.name as category_name,
    c.icon as category_icon,
    c.color as category_color,
    COALESCE(SUM(t.amount), 0) as amount,
    ROUND(COALESCE(SUM(t.amount), 0) * 100.0 / total_expenses, 1) as percentage
  FROM categories c
  LEFT JOIN transactions t ON t.category_id = c.id
  WHERE t.user_id = p_user_id
    AND t.type = 'expense'
    AND t.date >= DATE_TRUNC('month', p_target_date)
    AND t.date < DATE_TRUNC('month', p_target_date) + INTERVAL '1 month'
  GROUP BY c.id, c.name, c.color, c.icon
  HAVING COALESCE(SUM(t.amount), 0) > 0
  ORDER BY COALESCE(SUM(t.amount), 0) DESC;
END;
$$;