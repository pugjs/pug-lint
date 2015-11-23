/* istanbul ignore next */
module.exports = createTask

/* istanbul ignore next */
function createTask (pliers) {

  pliers('cleanShrinkwrap', require('pliers-clean-shrinkwrap')(pliers))

}
