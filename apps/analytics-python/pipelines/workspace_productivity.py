import pandas as pd


def calculate_metrics(tasks):

    df = pd.DataFrame(
        tasks,
        columns=[
            "id",
            "workspace_id",
            "project_id",
            "status",
            "priority",
            "estimated_hours",
            "actual_hours",
            "created_at",
            "completed_at"
        ]
    )

    result = (
        df
        .groupby("workspace_id")
        .agg(

            total_tasks=("id", "count"),

            completed_tasks=(
                "status",
                lambda x: x.isin(['completed', 'done']).sum()
            )

        )
        .reset_index()
    )

    return result
