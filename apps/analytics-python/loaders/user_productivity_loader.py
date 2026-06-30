from shared.db import get_analytics_connection
import ulid


def user_productivity_loader(rows):

    conn = get_analytics_connection()
    cur = conn.cursor()

    for _, row in rows.iterrows():

        cur.execute(
            """
            INSERT INTO user_productivity_metrics
            (
                id,
                user_id,
                workspace_id,
                completed_tasks,
                total_assigned_tasks,
                completion_rate,
                total_estimated_hours,
                total_actual_hours,
                average_task_duration_hours,
                calculated_at,
                updated_at
            )

            VALUES
            (
                %s,%s,%s,%s,%s,%s,%s,%s,%s,NOW(),NOW()
            )


            ON CONFLICT(user_id, workspace_id)

            DO UPDATE SET

                completed_tasks = EXCLUDED.completed_tasks,

                total_assigned_tasks = EXCLUDED.total_assigned_tasks,

                completion_rate = EXCLUDED.completion_rate,

                total_estimated_hours = EXCLUDED.total_estimated_hours,

                total_actual_hours = EXCLUDED.total_actual_hours,

                average_task_duration_hours =
                EXCLUDED.average_task_duration_hours,

                calculated_at = NOW(),

                updated_at = NOW()

            """,

            (
                str(ulid.new()),

                row["user_id"],

                row["workspace_id"],

                int(row["completed_tasks"]),

                int(row["total_assigned_tasks"]),

                float(row["completion_rate"]),

                float(row["total_estimated_hours"]),

                float(row["total_actual_hours"]),

                float(row["average_task_duration_hours"])
            )
        )

    conn.commit()

    cur.close()
    conn.close()
