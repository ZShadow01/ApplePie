export default class ConnectorError extends Error {
    protected code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}
