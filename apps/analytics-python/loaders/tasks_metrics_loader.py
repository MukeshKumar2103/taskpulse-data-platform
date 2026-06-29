import ulid
from shared.db import get_analytics_connection


def tasks_metrics_loader(rows):
    conn = get_analytics_connection()

    cur = conn.cursor()

    for _, row in rows.iterrows():

        cur.execute(
            """
            INSERT INTO task_metrics
            (
                id,
                task_id,
                total_subtasks,
                completed_subtasks,
                in_progress_subtasks,
                completion_rate,
                total_estimated_hours,
                total_actual_hours
            )

            VALUES
            (
                %s,%s,%s,%s,%s,%s,%s,%s
            )

            ON CONFLICT(task_id)

            DO UPDATE SET

                total_subtasks = EXCLUDED.total_subtasks,

                completed_subtasks = EXCLUDED.completed_subtasks,

                in_progress_subtasks = EXCLUDED.in_progress_subtasks,

                completion_rate = EXCLUDED.completion_rate,

                total_estimated_hours = EXCLUDED.total_estimated_hours,

                total_actual_hours = EXCLUDED.total_actual_hours,

                updated_at = NOW()

            """,

            (
                str(ulid.new()),
                row["task_id"],
                int(row["total_subtasks"]),
                int(row["completed_subtasks"]),
                int(row["in_progress_subtasks"]),
                float(row["completion_rate"]),
                float(row["total_estimated_hours"]),
                float(row["total_actual_hours"]),
            )

        )

    conn.commit()

    cur.close()
    conn.close()
