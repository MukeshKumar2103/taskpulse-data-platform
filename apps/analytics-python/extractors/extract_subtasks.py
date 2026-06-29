from shared.db import get_clean_connection


def extract_subtasks():
    conn = get_clean_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT 
            id,
            task_id,
            status,
            estimated_hours,
            actual_hours
        FROM subtasks
    """
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows


if __name__ == "__main__":

    subtasks = extract_subtasks()

    print(
        f"Extracted {len(subtasks)} subtasks"
    )

    print(subtasks[:5])
