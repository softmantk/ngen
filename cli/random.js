const commander = require('commander');
const crypto = require('crypto');
const chalk = require('chalk');
const clipboardy = require('clipboardy');

function generateRandomString( length ) {
    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(allowedChars.length);
        randomString += allowedChars[randomIndex];
    }
    return randomString;
}

const generator = ( count = 1, length ) => {
    const ids = []
    for (let i = 0; i < count; i++) {
        ids.push(generateRandomString(length));
    }
    return ids;
}

const handler = ( program ) => ( argLength, argCount ) => {
    const options = program.opts();
    const count = argCount || options.count;
    const length = +argLength || +options.length
    const copyToClipboard = options.copy === 'false' ? false : !!options.copy
    const out = generator(+count, length).join(options.separator);
    console.log(chalk.green.bold('random characters generated: '), chalk.bold('\n' + out));
    if (copyToClipboard) {
        clipboardy.writeSync(out);
        console.log(chalk.green.bold('\nCopied to clipboard!'));
    }
}

module.exports = () => {
    const randomCharacters = new commander.Command('random');
    randomCharacters
    .action(handler(randomCharacters))
    .description('Simple random character Generator')
    .addArgument(new commander.Argument('[length]', 'length of the random string'))
    .addArgument(new commander.Argument('[count]', 'no. of ids to generate'))
    .option('-n, --count <count>', 'No. of ids to generate', 1)
    .option('-l, --length <length>', 'length of each ids', 40)
    .option('-c, --copy <copy>', 'Copy to clipboard', true)
    .option('--separator <separator>', 'separator', '\n')
    .option('--no-copy', 'dont copy to clipboard')
    return randomCharacters
}
