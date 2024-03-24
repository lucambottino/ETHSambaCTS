import logging as log
import uuid
import os


log_uuid = str(uuid.uuid4())
log_folder = 'logs'
os.makedirs(log_folder, exist_ok=True)
results_folder = 'results'
os.makedirs(results_folder, exist_ok=True)


log.basicConfig(level=log.INFO, format=f'%(asctime)s - {log_uuid} - %(levelname)s - %(message)s')

# Create a logger
logger = log.getLogger()

# Create a handler for console logging
console_handler = log.StreamHandler()
console_handler.setLevel(log.INFO)

# Create a handler for file logging
log_filename = os.path.join(log_folder, f"logfile_{log_uuid}.log")
file_handler = log.FileHandler(log_filename)
file_handler.setLevel(log.INFO)

# Define format for file logging
file_formatter = log.Formatter(f'%(asctime)s_{log_uuid} - %(levelname)s - %(message)s')
file_handler.setFormatter(file_formatter)

logger.addHandler(console_handler)
logger.addHandler(file_handler)
