import pandas as pd


def user_productivity_transform(data):

    df = pd.DataFrame(
        data,
        columns=[
            "task_id",
            "user_id",
            "workspace_id",
            "status",
            "estimated_hours",
            "actual_hours",
            "created_at",
            "completed_at",
        ],
    )

    # convert dates
    df["created_at"] = pd.to_datetime(df["created_at"])
    df["completed_at"] = pd.to_datetime(df["completed_at"])

    metrics = (
        df.groupby(
            ["user_id", "workspace_id"]
        )
        .agg(
            total_assigned_tasks=(
                "task_id",
                "count"
            ),

            completed_tasks=(
                "status",
                lambda x: (x == "completed").sum()
            ),

            total_estimated_hours=(
                "estimated_hours",
                "sum"
            ),

            total_actual_hours=(
                "actual_hours",
                "sum"
            ),

            average_task_duration_hours=(
                "actual_hours",
                "mean"
            )
        )
        .reset_index()
    )

    metrics["completion_rate"] = (
        metrics["completed_tasks"]
        /
        metrics["total_assigned_tasks"]
        *
        100
    ).round(2)

    return metrics
