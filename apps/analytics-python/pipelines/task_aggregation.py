from extractors.extract_subtasks import extract_subtasks
from transformers.tasks_metrics import transform_task_metrics
from loaders.tasks_metrics_loader import tasks_metrics_loader


def task_metrics():
    tasks = extract_subtasks()

    metrics = transform_task_metrics(tasks)

    tasks_metrics_loader(metrics)

    print(f'subtasks {len(tasks)} {len(metrics)}')


if __name__ == "__main__":
    task_metrics()
