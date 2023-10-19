const commander = require('commander')
const pkg = require('../package.json')

// const { program } = commander

const program = new commander.Command()

program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d --debug', '是否开启调试模式', false)
    .option('-e --envName <envName>', '获取环境变量名称')


//command注册命令
const clone = program.command('clone <source> [destination]');
clone
    .description('clone a repository')
    .option('-f --force', '是否强制克隆')
    .action((source, destination, cmdObj) => {
        console.log('do clone', source, destination, cmdObj.force)
    })

//addCommand 注册子命令
const service = new commander.Command('service')
service
    .command('start [port]')
    .description('start service at some port')
    .action((port) => {
        console.log('do service port', port)
    })
service.command('stop')
    .description('stop service')
    .action(() => {
        console.log('stop service')
    })

program.addCommand(service)

//fish-cli install init =>fish-test init
program
    .command('install [name]', 'install package', {
        executableFile: 'fish-test',
        isDefault: true,
        hidden: true
    })
    .alias('i')

program
    .arguments('<cmd> [options]')
    .description('test command', {
        cmd: 'command des',
        options: 'options for command'
    })
    .action((cmd, options) => {
        console.log(cmd, options)
    })
//自定义help信息
program.helpInformation = function () {
    return 'help info'
}
program.on('--help', function () {
    console.log('your help info')
})

//实现对位置命令的监听
program.on('command:*', function obj(obj) {
    console.error('未知的命令' + obj[0])
    const availableCommands = program.command.map(cmd => cmd.name())
    console.log('可用的命令' + availableCommands)
})

program
    .parse(process.argv)