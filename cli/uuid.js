const commander = require('commander');
const uuid = require('uuid');
const chalk = require('chalk');
const clipboardy = require('clipboardy');


const generator = (count = 1) => {
    const ids = []
    for (let i = 0; i < count; i++) {
        ids.push(uuid.v4());
    }
    return ids;
}

const handler = (program) => (argCount) => {
    const options = program.opts();
    const count = options.count || argCount;
    const copyToClipboard = options.copy === 'false' ? false : !!options.copy
    const out = generator(+count).join(options.separator);
    console.log(chalk.green.bold('UUIDs Generated: '), chalk.bold('\n' + out));
    if (copyToClipboard) {
        clipboardy.writeSync(out);
        console.log(chalk.green.bold('\nCopied to clipboard!'));
    }
}

module.exports = () => {
    const uuidGenerator = new commander.Command('uuid');
    uuidGenerator
        .action(handler(uuidGenerator))
        .description('Simple uuid Generator')
        .addArgument(new commander.Argument('[count]', 'no. of ids to generate').default('1', '1 id'))
        .option('-n, --count <count>', 'No. of ids to generate',)
        .option('-c, --copy <copy>', 'Copy to clipboard', true)
        .option('--separator <separator>', 'Copy to clipboard with separator', '\n')
        .option('--no-copy', 'dont copy to clipboard')
    return uuidGenerator
}