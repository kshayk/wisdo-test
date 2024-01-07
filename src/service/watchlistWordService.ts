import {WatchlistWord} from "../model/watchlistWord";

export async function addWatchlistWord(word: string): Promise<void> {
    // if model exists, add word to words array, else create new model
    const watchlistWord = await WatchlistWord.findOne();
    if (watchlistWord) {
        watchlistWord.words.push(word);
        await watchlistWord.save();
        return;
    }

    const newWatchlistWord = new WatchlistWord({
        words: [word]
    });

    await newWatchlistWord.save();
}

export async function getWatchlistWords(): Promise<string[]> {
    // TODO: Cache this response
    const watchlistWord = await WatchlistWord.findOne();
    if (!watchlistWord) {
        return [];
    }

    return watchlistWord.words;
}