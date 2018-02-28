class ClientBase {
    constructor () {}

    static init () {
        let client = {
            x: 0,
            y: 0
        };
        client.x = document.documentElement.clientWidth >= document.documentElement.clientHeight ? document.documentElement.clientWidth : document.documentElement.clientHeight;
        client.y = document.documentElement.clientWidth < document.documentElement.clientHeight ? document.documentElement.clientWidth : document.documentElement.clientHeight;
        return client;
    }

}

export default ClientBase;