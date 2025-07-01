


export async function loadDictionary(): Promise<Record<string, string>> {
    const response = await fetch(import.meta.env.BASE_URL + '1sum.csv');
    const text = await response.text();
    const lines = text.trim().split('\n');
    const dictionary: Record<string, string> = {};

    for (const line of lines) {
        const [hiragana, kanji] = line.split(',');
        if (hiragana && kanji) {
            dictionary[hiragana] = kanji;
        }
    }

    return dictionary;
}