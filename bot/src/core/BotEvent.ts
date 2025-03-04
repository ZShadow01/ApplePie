import BotEventOptions from './BotEventOptions.js';

export default class BotEvent {
    private name: string;
    private exec: (...args: any[]) => Promise<void>;
    private options: BotEventOptions;

    constructor(
        name: string,
        exec: (...args: any[]) => Promise<void>,
        options?: BotEventOptions
    ) {
        this.name = name;
        this.exec = exec;
        this.options = options || {};
    }

    /**
     * Get the name of the event
     * @returns The name of the event
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Get the state of the `once` flag
     * @returns Once flag
     */
    public isOnce(): boolean {
        return this.options.once ?? false;
    }

    /**
     * Execute / fire the event
     * @param args Any arguments to pass to the event
     */
    public execute(...args: any[]): void {
        this.exec(...args);
    }

    /**
     * Check if the given object is an instance of BotEvent
     * @param event The object to check
     * @returns True if the object is an instance of BotEvent, false otherwise
     */
    public static isBotEvent(event: any): boolean {
        return event instanceof BotEvent;
    }
}
