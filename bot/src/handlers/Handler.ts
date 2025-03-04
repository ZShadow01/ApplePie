import fs from 'fs';
import path from 'path';
import { Bot } from '../Bot.js';

export default abstract class Handler {
    protected bot: Bot;

    constructor(bot: Bot) {
        this.bot = bot;
    }

    /**
     * Load all objects from the given directory and its subdirectories
     * @param dirPath The path to the directory
     */
    public async loadFromDirectory(dirPath: string): Promise<void> {
        const directories: string[] = [dirPath];

        while (directories.length > 0) {
            const dir: string = directories.shift()!;

            const files: string[] = fs.readdirSync(dir);

            for (const file of files.filter((f) => f.endsWith('.js'))) {
                const filePath = path.join(dir, file);

                if (fs.lstatSync(filePath).isDirectory()) {
                    directories.push(filePath);
                } else {
                    await this.loadFromFile(filePath);
                }
            }
        }
    }

    /**
     * Load a single object from the given file
     * @param filePath The path to the command file
     */
    public abstract loadFromFile(filePath: string): Promise<void>;
}
