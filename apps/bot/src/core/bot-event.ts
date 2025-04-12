import Bot from './bot';

export default interface BotEvent {
    name: string;
    once?: boolean;
    execute: (bot: Bot, ...args: unknown[]) => Promise<void>;
}
