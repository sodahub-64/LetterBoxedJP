export function generateLetters(): string[] {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const required = ['A', 'I', 'U', 'E', 'O', 'N'];
    const ignored = ['Q', 'X', 'V', 'W', 'Y', 'Z'];
    const extras = ALPHABET.split('').filter(c => !ignored.includes(c) && !required.includes(c));
    const sampled = [...required, ...sample(extras, 6)];
    return shuffle(sampled);
}

function sample<T>(arr: T[], n: number): T[] {
    const copy = [...arr];
    const result: T[] = [];
    while (result.length < n) {
        const idx = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(idx, 1)[0]);
    }
    return result;
}

function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export function all<T>(array: T[], predicate: (item: T) => boolean): boolean {
    return array.every(predicate);
}

export function range(from: number, to: number): number[] {
    return Array.from({ length: to - from }, (_, i) => from + i);
}
