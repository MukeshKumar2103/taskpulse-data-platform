import pandas as pd

from shared.db import get_clean_connection
from transformers.workspace_transform import transform_workspace_metrics
from loaders.analytics_loader import load_workspace_metrics


def workspace_metrics():

    conn = get_clean_connection()


    df = pd.read_sql(
        """
        SELECT
            id,
            workspace_id,
            status,
            estimated_hours,
            actual_hours

        FROM tasks

        WHERE deleted_at IS NULL

        """,
        conn
    )


    print(df.head())
    print(df.columns)


    conn.close()


    metrics = transform_workspace_metrics(df)

    print(metrics)


    load_workspace_metrics(metrics)



if __name__ == "__main__":
    workspace_metrics()