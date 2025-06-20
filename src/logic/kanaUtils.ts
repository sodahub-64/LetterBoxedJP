import * as wanakana from 'wanakana';

export function roman2kana(roman: string): string {
    return wanakana.toKatakana(roman);
}

export function indexes2kana(indexes: number[], letters: string[]): string {
    return indexes.map(i => letters[i]).join('');
}
