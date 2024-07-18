import { v6 as uuid } from 'uuid';

import { Friend, Task, UserInfo } from '../typings';

export type CollectRequest = {
    accountId: number;
};

export type CollectResponse = {
    tasks: Task[];
    userInfo: UserInfo;
    friends: Friend[];
};

export const initState = (args: CollectRequest): Promise<CollectResponse> => {
    const now = new Date();

    return new Promise((resolve) =>
        setTimeout(
            () =>
                resolve({
                    tasks: [
                        {
                            name: 'Connect wallet',
                            id: uuid(),
                            amount: 300,
                            isCompleted: true,
                            action: () => {},
                        },
                        {
                            name: 'follow twitter',
                            id: uuid(),
                            amount: 300,
                            isCompleted: true,
                            action: 'https://x.com/xyasnox',
                        },
                    ],
                    friends: [],
                    userInfo: {
                        balance: 0,
                        remainingGames: 3,
                        farmEndTimestamp: now.setSeconds(now.getSeconds() + 10).valueOf(),
                    },
                }),
            2000,
        ),
    );
};
