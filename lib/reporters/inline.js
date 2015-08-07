module.exports = function (errors) {

  if (errors.length) {
    errors.forEach(function (error) {
      console.error(error.filename + ':' + error.line + ':' + (error.column || 0) + ' ' + error.msg)
    })
  }

}
