import TelegramBot from "node-telegram-bot-api";

export class FetchingButtonsBot {
    private readonly telegramBot: TelegramBot;
    private readonly buttonToCallbackMap: Record<string, () => string> = {};

    public get buttons(): string[] {
        return Object.keys(this.buttonToCallbackMap);
    }

    constructor(token: string, options: TelegramBot.ConstructorOptions | undefined) {
        this.telegramBot = new TelegramBot(token, options);
        this.telegramBot.onText(/\/start/, (msg, _) => {
            let id = msg.chat.id;
            this.telegramBot.sendMessage(id, 'Here is your keyboard!', {reply_markup: this.getKeyboardReplyMarkup()})
        })
        this.telegramBot.on('message', (message, _) => {
            
            let text = message.text;
            if (text === undefined) {
                return;
            }
            let callback = this.buttonToCallbackMap[text];
            if (callback === undefined) {
                return;
            }

            let id = message.chat.id;
            this.telegramBot.sendMessage(id, callback(), {reply_markup: this.getKeyboardReplyMarkup()});
        })
    }
    
    public addButton(buttonName: string, callback: () => string) {
        this.buttonToCallbackMap[buttonName] = callback;
    }

    public removeButton(buttonName: string) {
        delete this.buttonToCallbackMap[buttonName];
    }

    private getKeyboardReplyMarkup(): { keyboard: TelegramBot.KeyboardButton[][]; } {
        let buttons: string[] = Object.keys(this.buttonToCallbackMap);
        return { keyboard: buttons.map<TelegramBot.KeyboardButton[]>((x) => [{text: x}]) };
    }
}
