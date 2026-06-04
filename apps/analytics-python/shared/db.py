import psycopg2


def get_raw_connection():
    return psycopg2.connect(
        host="localhost",
        port=5480,
        database="raw_db",
        user="postgres",
        password="postgres"
    )


def get_clean_connection():
    return psycopg2.connect(
        host="localhost",
        port=5481,
        database="clean_db",
        user="postgres",
        password="postgres"
    )


def get_analytics_connection():
    return psycopg2.connect(
        host="localhost",
        port=5482,
        database="analytics_db",
        user="postgres",
        password="postgres"
    )