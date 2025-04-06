import Bot from './bot';

export default interface BotEvent {
    name: string;
    once?: boolean;
    execute: (bot: Bot, ...args: any[]) => Promise<void>;
}
