import logging
import sys


def configure_logging() -> None:
    """
    Sets up application-wide logging format and level.
    Called once, at application startup, from main.py.
    """
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )