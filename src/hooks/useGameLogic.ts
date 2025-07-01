import { useState } from 'react';
import { generateLetters, all, range } from '../logic/letterUtils';
import { roman2kana, indexes2kana } from '../logic/kanaUtils';
import { loadDictionary } from '../logic/dictionary';
import { EMPTY_CHAR, ngColor, DEBUG_MODE } from '../constants/constants';

export function useGameLogic() {
    const [dictionary, setDictionary] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [letters] = useState(generateLetters());
    const [wordList, setWordList] = useState<number[][]>([]);
    const [henkanList, setHenkanList] = useState<string[]>([])
    const [kana, setKana] = useState('');
    const [result, setResult] = useState({ message: EMPTY_CHAR, color: ngColor });
    const [open, setOpen] = useState(false);

    // Load dictionary on mount
    if (isLoading) {
        loadDictionary().then(dict => {
            setDictionary(dict);
            setIsLoading(false);
        }).catch(error => {
            console.error("Error loading dictionary:", error);
            setIsLoading(false);
            setResult({ message: '辞書の読み込みに失敗しました', color: ngColor });
        });
    }
    const lookupWord = (word: string): string | null => {
        if (isLoading) return null;
        return dictionary[word] || null;
    };

    const updateInputField = (value: string) => {
        const input = value.toUpperCase().split("").filter(c => letters.includes(c));

        if (wordList.length >= 2 && input.length === 0) {
            const prev1Letter = wordList[wordList.length - 2].slice(-1)[0];
            const prev2Letter = wordList[wordList.length - 2].slice(-2)[0];
            if (!"AIUEO".includes(letters[prev2Letter])) {
                input.unshift(letters[prev1Letter]);
                input.unshift(letters[prev2Letter]);
            } else {
                input.unshift(letters[prev1Letter]);
            }
        }

        const word = input.map(c => letters.indexOf(c)).filter(i => i >= 0);

        const prev = word[word.length - 2]!;
        const curr = word[word.length - 1]!;
        // 自分自身は許す場合
        const selfAllowed = true;
        if (!selfAllowed || prev !== curr) {
            if (Math.floor(prev / 3) === Math.floor(curr / 3)) word.pop();
        }

        const newList = [...wordList];
        newList[wordList.length ? wordList.length - 1 : 0] = word;

        const kana = roman2kana(word.map(i => letters[i]).join(""));
        // print contents of newList

        console.log("[" + newList.map(index => indexes2kana(index, letters)).join(', ') + "]");

        setWordList(newList);
        setKana(kana);
        setResult({ message: EMPTY_CHAR, color: ngColor });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => updateInputField(e.target.value);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (kana.length < 2) {
                setResult({ message: 'カタカナ2文字以上で入力してください', color: ngColor });
                return;
            }
            const match = lookupWord(kana);
            if (!DEBUG_MODE && !match) {
                setResult({ message: '辞書に存在しない単語です', color: ngColor });
                return;
            }

            const newList = wordList;
            newList.push([])
            setWordList(newList);

            const newHenkanList = henkanList;
            henkanList.push(match!);
            setHenkanList(newHenkanList);

            if (all(range(0, 12), i => newList.flat().includes(i))) {
                setOpen(true);
            }

            updateInputField('');
            // onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);

        } else if (e.key === 'Backspace') {
            if (wordList.length >= 2) {
                const currentWord = wordList[wordList.length - 1];
                if (currentWord.length === 2 && !"AIUEO".includes(letters[currentWord[0]])) {
                    let newWordList = wordList.slice(0, -1)
                    newWordList[newWordList.length - 1].pop();
                    setWordList(newWordList);
                    setHenkanList(henkanList.slice(0, -1));
                } else if (currentWord.length === 1) {
                    setWordList(wordList.slice(0, -1));
                    setHenkanList(henkanList.slice(0, -1));
                }
            }
        }
    };

    return {
        isLoading,
        letters,
        wordList,
        henkanList,
        result,
        open,
        kana,
        onChange,
        onKeyDown,
        setOpen,
        indexes2kana
    };
}
