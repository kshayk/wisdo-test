import {rateAlgo} from "../service/feedService";

describe('rate posts', () => {
    test('rate post 1', async () => {
        const rating = rateAlgo(0, 453);
        expect(rating).toBe<number>(0);
    });

    test('rate post 2', async () => {
        const rating = rateAlgo(13, 110);
        expect(rating).toBe<number>(10);
    });
});