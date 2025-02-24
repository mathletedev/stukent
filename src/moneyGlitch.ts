export const moneyGlitch = (amount: string) => {
    const socket = new WebSocket(
        "wss://mpf.stukent.com/sockjs/915/3_jnx2k7/websocket",
        {
            // @ts-ignore
            headers: {
                Cookie: Bun.env.COOKIE,
            },
        },
    );

    const connect = [
        '{"msg":"connect","version":"1","support":["1","pre2","pre1"]}',
    ];
    const login = [
        `{"msg":"method","id":"1","method":"login","params":[{"resume":"${Bun.env.LOGIN}"}]}`,
    ];

    const transfer = [
        `{"msg":"method","id":"118","method":"transferMoneyBetweenAccountsMethod","params":["DMHRTdwjs99vYF3GZ","CC-5B6855","${amount}","Checking","Student","yes","wangnea@psd267.org"]}`,
    ];

    const pong = ['{"msg":"pong"}'];

    socket.onopen = () => {
        socket.send(JSON.stringify(connect));
        socket.send(JSON.stringify(login));
        for (let i = 0; i < 10000; ++i) {
            socket.send(JSON.stringify(transfer));
        }
        console.log("done");
    };

    socket.onmessage = (event) => {
        console.log(event);

        if (event.data.includes("ping")) {
            socket.send(JSON.stringify(pong));
        }
    };
};
