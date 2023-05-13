const readline = require("readline");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config()

// create interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const API_KEY = process.env.OPENAI_API_KEY;
const URL = 'https://api.openai.com/v1/chat/completions';
let messages = [];
let content = '';


// question user to enter name
rl.question("Ask GPT:\n", function (string) {
    content = string;

    if (content === "q" || content === "quit") {
        // close input stream  
        rl.close();
    }
    else if (content === "c" || content === "clear") {
        // clear the chat log
        fs.writeFileSync('./chat.json', JSON.stringify([]));
        rl.close();
    }
    else {
        const message = {
            role: 'user',
            content: content
        }
        const file = fs.readFileSync('./chat.json')
        messages = JSON.parse(file)
        messages.push(message)
        const OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages
                
            })
        };
        fetch(URL, OPTIONS)
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
                data.choices.forEach((choice, ind) => {
                    messages.push(choice.message)
                    data.choices.length > 1 ?
                    console.log(`Response #${ind + 1}`)
                    :
                    console.log(`Response #${ind + 1}`)
                    console.log('--------------------------------');
                    console.log(choice.message.content);
                    console.log('--------------------------------');
                });
            }
            else {
                console.log('Error:');
                console.log('--------------------------------');
                console.log(data.error);
                console.log('--------------------------------')
            }
            console.log(`{Tokens used: ${data.usage.total_tokens}}`);
            fs.writeFileSync('./chat.json', JSON.stringify(messages));
        })
        .catch(err => console.log('whoops somthing went wrong'));
    }
    rl.close();
});
