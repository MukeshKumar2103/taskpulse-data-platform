from shared.db import get_clean_connection


def extract_tasks():

    conn = get_clean_connection()

    cursor = conn.cursor()


    cursor.execute("""
        SELECT
            id,
            workspace_id,
            project_id,
            status,
            priority,
            estimated_hours,
            actual_hours,
            created_at
        FROM tasks
    """)


    rows = cursor.fetchall()


    cursor.close()
    conn.close()


    return rows

if __name__ == "__main__":
  
  tasks = extract_tasks()

  print(
        f"Extracted {len(tasks)} tasks"
    )

  print(tasks[:5])