import mongoose from "mongoose";

interface IWatchlistWords extends mongoose.Document {
    words: string[];
}

const WatchListWordsSchema = new mongoose.Schema<IWatchlistWords>(
    {
        words: [String],
    }
);

export const WatchlistWord = mongoose.model<IWatchlistWords>("watchlistWords", WatchListWordsSchema);