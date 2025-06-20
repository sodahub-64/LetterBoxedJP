import os
import re
import csv
from kanjiconv import KanjiConv

THIS_DIR = os.path.dirname(__file__)
INPUT_FILE_NAME = "0wiki.csv"
OUTPUT_FILE_NAME = "1wiki.csv"

INPUT_FILE_PATH = os.path.join(THIS_DIR, INPUT_FILE_NAME)
OUTPUT_FILE_PATH = os.path.join(THIS_DIR, OUTPUT_FILE_NAME)

kanji_conv = KanjiConv(separator="")

# 正規表現：カタカナ・ひらがな・漢字・長音符（ー）のみ許可
allowed_pattern = re.compile(r"^[ぁ-んァ-ヶ一-龠]+$")


def is_valid_title(title):
    return allowed_pattern.fullmatch(title) is not None


with (
    open(INPUT_FILE_PATH, encoding="utf-8") as infile,
    open(OUTPUT_FILE_PATH, "w", encoding="utf-8", newline="") as outfile,
):
    writer = csv.writer(outfile)
    i = 0
    for line in infile:
        i += 1
        print(i)
        title = line.strip()
        if not is_valid_title(title):
            continue
        hira = kanji_conv.to_katakana(title).replace("・", "")
        if len(hira) >= 2:
            writer.writerow([hira, title])
