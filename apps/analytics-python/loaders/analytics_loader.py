import ulid
from shared.db import get_analytics_connection


def load_workspace_metrics(df):

    conn = get_analytics_connection()

    cur = conn.cursor()

    for _, row in df.iterrows():

        cur.execute(
            """
            INSERT INTO workspace_productivity_metrics
            (
                id,
                workspace_id,
                total_tasks,
                completed_tasks,
                in_progress_tasks,
                completion_rate,
                avg_completion_hours,
                avg_task_duration_hours,
                total_estimated_hours,
                total_actual_hours
            )

            VALUES
            (
                %s,%s,%s,%s,%s,%s,%s,%s,%s,%s
            )

            ON CONFLICT(workspace_id)

            DO UPDATE SET

                total_tasks = EXCLUDED.total_tasks,

                completed_tasks = EXCLUDED.completed_tasks,

                in_progress_tasks = EXCLUDED.in_progress_tasks,

                completion_rate = EXCLUDED.completion_rate,

                avg_completion_hours = EXCLUDED.avg_completion_hours,

                avg_task_duration_hours = EXCLUDED.avg_task_duration_hours,

                total_estimated_hours = EXCLUDED.total_estimated_hours,

                total_actual_hours = EXCLUDED.total_actual_hours,

                updated_at = NOW()

            """,

            (
                str(ulid.new()),
                row["workspace_id"],
                int(row["total_tasks"]),
                int(row["completed_tasks"]),
                int(row["in_progress_tasks"]),
                float(row["completion_rate"]),
                float(row["avg_completion_hours"]),
                float(row["avg_task_duration_hours"]),
                float(row["total_estimated_hours"]),
                float(row["total_actual_hours"]),
            )

        )

    conn.commit()

    cur.close()
    conn.close()
