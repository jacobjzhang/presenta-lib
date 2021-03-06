import { version } from '../package.json'

import globals from './globals/index'

import { add as addController } from './controllers/types.js'
import { add as addModule } from './modules/types.js'
import { add as addBlock } from './blocks/types.js'

import { Container } from './core/Container.js'
import { group } from './blocks/group' // this import to avoid circular dependencies warning

import utils from './utils'
import defaults from './utils/defaults'
import pluginsInit from './utils/pluginsInit'

const Presenta = function (el, config) {
  defaults(config)

  const all = pluginsInit(config)

  return new Promise((resolve, reject) => {
    Promise.all(all).then(values => {
      resolve(new Container(utils.select(el), config))
    })
  })
}

addBlock('group', group) // this to avoid circular dependencies warning, since removed implicit inclusion in block types

Presenta.version = version
Presenta.colors = globals.colors
Presenta.fonts = globals.fonts
Presenta.transitions = globals.transitions
Presenta.layouts = globals.layouts
Presenta.colorvars = globals.colorvars
Presenta.scenevars = globals.scenevars

Presenta.addBlock = addBlock
Presenta.addController = addController
Presenta.addModule = addModule

Presenta.addGlob = utils.addGlob
Presenta.addProp = utils.addProp

Presenta.io = utils.io

Presenta.use = plugin => {
  plugin.install(Presenta)
}

export default Presenta
