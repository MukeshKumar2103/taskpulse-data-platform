import pandas as pd
from shared.db import get_clean_connection

conn = get_clean_connection()

query = """
SELECT
  *
FROM tasks
WHERE deleted_at IS NULL;
"""

df = pd.read_sql(query, conn)

df['created_at'] = pd.to_datetime(df['created_at'], errors='coerce')

print(df)

conn.close()