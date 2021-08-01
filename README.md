# Easily make a bot to retrieve data from your server using buttons

This is a wrapper around https://github.com/yagop/node-telegram-bot-api

At times you need to fetch some data from your server (e.g. processor temperature, free memory, amount of columns in a table etc). Use a Telegram bot with a keyboard to retrieve that data. You only need to define the button name and a callback which returns a string.
Usage example:

```typescript
import FetchingButtonsBot from "./FetchingButtonsBot";

...

const bot = FetchingButtonsBot('YOUR_TOKEN', {polling: true});

bot.addButton('Hello World', () => 'Hi!');
bot.addButton('Temp', () => getTemperature());
// Buttons add up vertically and do not paginate

...
// You can delete buttons dynamically if you wish. User may still be seeing it until the
// next received message though

bot.removeButton('Hello World');

// Get all defined buttons (this is a readonly property)
let myButtons: string[] = bot.buttons;

```

Check how I use this package to check on my local server: https://github.com/ghB111/my-server-fetcher
