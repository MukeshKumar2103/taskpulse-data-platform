import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def get_raw_db_connection():
    return psycopg2.connect(
        host=os.getenv("RAW_DB_HOST"),
        port=os.getenv("RAW_DB_PORT"),
        database=os.getenv("RAW_DB_NAME"),
        user=os.getenv("RAW_DB_USER"),
        password=os.getenv("RAW_DB_PASSWORD")
    )

def get_clean_db_connection():
    return psycopg2.connect(
        host=os.getenv("CLEAN_DB_HOST"),
        port=os.getenv("CLEAN_DB_PORT"),
        database=os.getenv("CLEAN_DB_NAME"),
        user=os.getenv("CLEAN_DB_USER"),
        password=os.getenv("CLEAN_DB_PASSWORD")
    )

def get_analytics_db_connection():
    return psycopg2.connect(
        host=os.getenv("ANALYTICS_DB_HOST"),
        port=os.getenv("ANALYTICS_DB_PORT"),
        database=os.getenv("ANALYTICS_DB_NAME"),
        user=os.getenv("ANALYTICS_DB_USER"),
        password=os.getenv("ANALYTICS_DB_PASSWORD")
    )