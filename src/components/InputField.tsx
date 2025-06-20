import React from 'react';
import { type ChangeEvent, type KeyboardEvent } from 'react';
import { indexes2kana } from '../logic/kanaUtils';
import { baseInputStyle, BLACK } from '../constants/constants';

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    kana: string;
    letters: string[];
    wordList: number[][];
}

const InputField: React.FC<Props> = ({ onChange, onKeyDown, kana, letters, wordList }) => {
    const value = wordList.length === 0
        ? ''
        : indexes2kana(wordList[wordList.length - 1], letters);

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="ローマ字で単語を入力"
                spellCheck={false}
                autoComplete="off"
                style={{
                    ...baseInputStyle,
                    color: BLACK,
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 'none',
                }}
            />
            <div style={{ height: '2em', fontSize: '1.2em' }}>{kana || '　'}</div>
        </div>
    );
};

export default InputField;
