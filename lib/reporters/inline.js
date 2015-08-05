module.exports = function (errors) {

  if (errors.length) {
    errors.forEach(function (error) {
      console.error(error.filename + ': line ' + error.line + ', col ' + (error.col || 0) + ', ' + error.msg)
    })
  }

}
