const responses = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'Signs point to yes',
    'Reply hazy try again',
    'Better not tell you now',
    'Cannot predict now',
    'Don\'t count on it',
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful'
];

const predict = () => {
    const randomIndex = Math.round(Math.random() * (responses.length - 1));
    return { 
        value : responses[randomIndex],
        certainty : 1
    }
};

module.exports = {
    predict
}