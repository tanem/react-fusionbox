import 'shelljs/global';
config.fatal = true;

import { Server } from 'karma';
import makeKarmaConfig from './makeKarmaConfig';

const [ , , testType = 'ci'] = process.argv;

// exec('npm run lint');
// exec('npm run clean');

new Server(makeKarmaConfig(testType), exit).start();
