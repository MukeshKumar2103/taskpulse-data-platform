import pandas as pd


def transform_task_metrics(data):
    tasks_df = pd.DataFrame(
        data,
        columns=[
            "id",
            "task_id",
            "status",
            "estimated_hours",
            "actual_hours",
        ],
    )

    metrics = (
        tasks_df.groupby("task_id")
        .agg(
            total_subtasks=("task_id", "count"),

            completed_subtasks=(
                "status",
                lambda x:
                (x == "completed").sum()
            ),

            in_progress_subtasks=(
                "status",
                lambda x:
                (x == 'in-progress').sum()
            ),

            total_estimated_hours=(
                "estimated_hours",
                "sum"
            ),

            total_actual_hours=(
                "actual_hours",
                "sum"
            ),

            avg_completion_hours=(
                "actual_hours",
                "mean"
            ),

            avg_task_duration_hours=(
                "actual_hours",
                "mean"
            ),
        )
    ).reset_index()

    metrics["completion_rate"] = (
        metrics["completed_subtasks"]
        /
        metrics["total_subtasks"]
        *
        100
    ).round(2)

    print(f'metrics {metrics[:2]}')

    return metrics
