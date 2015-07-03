/* istanbul ignore next */
module.exports = task

/* istanbul ignore next */
function task(pliers) {
  pliers('cleanShrinkwrap', require('pliers-clean-shrinkwrap')(pliers))
}
