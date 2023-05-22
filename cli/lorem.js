const commander = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');


const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula fringilla enim vel bibendum. Phasellus non lectus id massa bibendum commodo. Nulla facilisi. Nullam eget leo at tellus laoreet pharetra nec ut metus. Sed vel consequat metus. Nulla facilisi. Suspendisse eget odio non leo tempor suscipit. Phasellus vel vestibulum metus.

Duis posuere libero et purus suscipit, a congue urna viverra. Morbi id risus dolor. Sed ut est at sapien congue lacinia. Donec lacinia suscipit velit, id aliquet erat placerat ut. Morbi vestibulum nulla eu lectus fringilla rhoncus. Sed non tellus vel mi ullamcorper consequat. Fusce elementum mi quis gravida luctus. Suspendisse non ante lacinia, tristique mauris id, tincidunt nibh.

Pellentesque interdum sapien quis diam pulvinar semper. Sed vestibulum luctus sagittis. Nam ultrices urna ac lectus pharetra, in pharetra purus lacinia. Duis luctus tellus id tellus cursus, sit amet faucibus nunc commodo. Ut ac faucibus lorem, id aliquam orci. Donec semper erat sit amet feugiat malesuada. Nullam varius felis nec diam lacinia, at aliquam tortor aliquam. Fusce volutpat velit augue, nec fringilla ipsum dignissim in. Integer sit amet ullamcorper ipsum.

In nec viverra magna. Nunc rhoncus sem eu ligula aliquam, a tincidunt orci rhoncus. Mauris in lorem id metus commodo tristique non a erat. Proin et erat vel nisl luctus fringilla. Sed rhoncus tincidunt convallis. Mauris ullamcorper enim nec dolor lacinia, id varius lacus fermentum. Mauris vulputate justo in elit consectetur, id congue leo tincidunt.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Curabitur ullamcorper semper turpis, vitae pellentesque quam eleifend a. Nam a sem eros. Morbi eget arcu vitae risus rhoncus bibendum at vitae ante. Phasellus eu est nisi. Cras auctor turpis vel mauris fringilla, ut consequat risus egestas. In quis erat felis.

Sed sagittis est a sapien sollicitudin, a lobortis mauris rhoncus. Nulla at tincidunt lectus. Fusce sed elit a tortor condimentum bibendum vitae eu metus. Pellentesque auctor enim sed ligula suscipit, in interdum dui consectetur. Suspendisse feugiat euismod tellus, in sollicitudin dui consequat et. Sed scelerisque lacus sed nisl iaculis tristique. Vestibulum sit amet consequat ante. Sed eu nunc orci.

Donec laoreet, sem nec gravida iaculis, nunc nulla consequat sem, at ultrices neque nisi sit amet dolor. `

const generator = ( wordCount = 1 ) => {
    const arr = LOREM_IPSUM.split(' ');
    const maxLength = LOREM_IPSUM.length;
    let strArr = [];
    let full = wordCount
    while (Math.floor(full / maxLength)) {
        full = Math.floor(full / maxLength);
        for (let i = 0; i < full; i++) {
            strArr = [ ...strArr, ...arr.slice(0, maxLength) ]
        }
    }
    if (wordCount % maxLength) {
        strArr = [ ...strArr, ...arr.slice(0, wordCount % maxLength) ]
    }
    return strArr.join(' ');
}

const handler = ( program ) => ( argCount ) => {
    const options = program.opts();
    const count = argCount || options.count;
    const copyToClipboard = options.copy === 'false' ? false : !!options.copy
    const out = generator(+count)
    console.log(chalk.green.bold('Lorem ipsum Generated: '), chalk.bold('\n' + out));
    if (copyToClipboard) {
        clipboardy.writeSync(out);
        console.log(chalk.green.bold('\nCopied to clipboard!'));
    }
}

module.exports = () => {
    const loremGenerator = new commander.Command('lorem');
    loremGenerator
    .action(handler(loremGenerator))
    .description('Simple lorem ipsum Generator')
    .addArgument(new commander.Argument('[count]', 'no. of words to generate'))
    .option('-n, --count <count>', 'No. of words to generate', 20)
    .option('-c, --copy <copy>', 'Copy to clipboard', true)
    .option('--separator <separator>', 'Copy to clipboard with separator', '\n')
    .option('--no-copy', 'dont copy to clipboard')
    return loremGenerator
}
