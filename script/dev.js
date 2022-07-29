const minimist = require('minimist');
const execa = require('execa');
// minimist 是一个专门用于处理Node.js启动参数的库，可以将 process.argv 中的参数列表转换成更加易于使用的格式
const args = minimist(process.argv.slice(2));

// 获取执行命令时的参数
const target = args._.length ? args._[0] : 'reactivity';
const formats = args.f || 'global'; // esm-bndler global cjs
const sourcemap = args.s || false;

execa(
  'rollup',
  [
    '-wc', // 监听配置文件 --watch --config
    '--environment',
    [`TARGET:${target}`, `FORMATS:${formats}`].filter(Boolean).join(','), // Boolean是把false都过滤掉了
  ],
  {
    stdio: 'inherit', // 这个子进程的输出是在我们当前命令行输出的
  }
);
console.log(args, target, formats, sourcemap);
