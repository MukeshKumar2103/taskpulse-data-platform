from shared.db import get_clean_connection


def extract_tasks_with_task_assignees():
    conn = get_clean_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT 
            ta.user_id as user_id,
            t.id as task_id,
            t.workspace_id,
            t.status,
            t.estimated_hours,
            t.actual_hours,
            t.created_at,
            t.completed_at
        FROM task_assignees ta
        JOIN tasks t ON t.id = ta.task_id
        """
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows
