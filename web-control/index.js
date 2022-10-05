import { Command, Option } from 'commander'
import jsonfile from 'jsonfile'
import dev from './dev.js'
import uploadCert from './uploadCert.js'
import passwordOptions from './passwordOptions.js'
import serve from './serve.js'

const packageJson = jsonfile.readFileSync('package.json')
const program = new Command()
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)

const passwordOption = new Option(
  `-p, --password <${passwordOptions.join('|')}>`,
  'When is password required?')
  .default('write')

program.command('dev')
  .description('Start dev server')
  .addOption(passwordOption)
  .action(dev)

program.command('upload-cert')
  .description('Updload SSL certificate to https://file.io to securely download')
  .action(uploadCert)

program.command('serve')
  .description('Serve built html files with api')
  .addOption(passwordOption)
  .action(serve)

program.parse()
