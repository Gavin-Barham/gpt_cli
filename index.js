const readline = require("readline");
const dotenv = require("dotenv");
dotenv.config()

// create interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const API_KEY = process.env.OPENAI_API_KEY;
const URL = 'https://api.openai.com/v1/chat/completions';
let message = "";

// question user to enter name
rl.question(
    "Ask GPT:\n",
    function (string) {
        message = string;
        
        const OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: 'user',
                    content: message
                }]
                
            })
        };
        if (message === "q" || message === "quit") {
            // close input stream
            rl.close();
        }
            fetch(URL, OPTIONS)
            .then(res => res.json())
            .then(data => {
                    console.log(data)
                    if (!data.error) {
                        data.choices.forEach((choice, ind) => {
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
                })
                .catch(err => console.log('whoops somthing went wrong'));

        }

    );
