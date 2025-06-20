import os
import csv

THIS_DIR = os.path.dirname(__file__)
INPUT_FILE_NAME = "0sum.csv"
OUTPUT_FILE_NAME = "1sum.csv"

INPUT_FILE_PATH = os.path.join(THIS_DIR, INPUT_FILE_NAME)
OUTPUT_FILE_PATH = os.path.join(THIS_DIR, OUTPUT_FILE_NAME)

with open(INPUT_FILE_PATH, "r") as rf:
    with open(OUTPUT_FILE_PATH, "w") as wf:
        reader = csv.reader(rf)
        writer = csv.writer(wf)

        seen = set()
        for item in reader:
            katakana = item[0]
            if katakana not in seen:
                writer.writerow(item)
                seen.add(katakana)
