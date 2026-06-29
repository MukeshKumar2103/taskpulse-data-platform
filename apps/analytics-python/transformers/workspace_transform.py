import pandas as pd


def transform_workspace_metrics(df):

    metrics = (
        df.groupby("workspace_id")
        .agg(
            total_tasks=("id", "count"),

            completed_tasks=(
                "status",
                lambda x: x.isin(["completed", "done"]).sum()
            ),

            in_progress_tasks=(
                "status",
                lambda x: (x == "in_progress").sum()
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
        .reset_index()
    )


    metrics["completion_rate"] = (
        metrics["completed_tasks"]
        /
        metrics["total_tasks"]
        *
        100
    ).round(2)


    return metrics