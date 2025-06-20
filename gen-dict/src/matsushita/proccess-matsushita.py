import os
import csv
import re

THIS_DIR = os.path.dirname(__file__)
INPUT_FILE_NAME = "0matsushita.csv"
OUTPUT_FILE_NAME = "1matsushita.csv"

INPUT_FILE_PATH = os.path.join(THIS_DIR, INPUT_FILE_NAME)
OUTPUT_FILE_PATH = os.path.join(THIS_DIR, OUTPUT_FILE_NAME)

out = []
word = ""
katakana = ""
part = ""
conj_type = ""
conj_form = ""

pattern = re.compile("^[ァ-ヶぁ-ゖ\u4e00-\u9fd0・]+$")

required_parts = [
    "名詞",
    "代名詞",
    "感動詞",
    "形状詞",
    "連体詞",
    "接続詞",
    "動詞",
    "形容詞",
    "副詞",
]
# ignored_parts = ["フィラー", "記号", "補助記号"]

# 数詞, 固有名詞 -> いったん許容

MAXROW = 10000000

with open(INPUT_FILE_PATH, "r") as rf:
    reader = csv.reader(rf)
    with open(OUTPUT_FILE_PATH, "w") as wf:
        writer = csv.writer(wf)
        i = 1
        for row in reader:
            i += 1
            # if i >= MAXROW:
            #     break
            if "#N/A" in row:
                continue
            if "0" in row[0:3]:
                continue
            (word, katakana, part, conj_type, conj_form) = row
            if len(word) <= 1:
                continue
            if pattern.fullmatch(word) is None:
                continue
            if part.split("-")[0] not in required_parts:
                continue
            out.append([row[1], row[0]])

        result = []
        seen = set()

        for item in out:
            katakana = item[0]
            if katakana not in seen:
                result.append(item)
                seen.add(katakana)

        writer.writerows(result)
