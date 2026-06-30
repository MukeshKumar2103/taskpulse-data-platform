from extractors.tasks_with_task_assignees import extract_tasks_with_task_assignees
from transformers.user_productivity_transform import user_productivity_transform
from loaders.user_productivity_loader import user_productivity_loader


def user_productivity_metrics():

    productivityData = extract_tasks_with_task_assignees()
    
    print(f"productivityData {len(productivityData)}")

    metrics = user_productivity_transform(productivityData)

    print(f"metrics {len(metrics)}")

    user_productivity_loader(metrics)


if __name__ == "__main__":
    user_productivity_metrics()
