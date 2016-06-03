module.exports = function (errors) {
  if (errors.length) {
    errors.forEach(function (error) {
      var message = [
        error.filename,
        ':' + error.line,
        error.column ? ':' + error.column : '',
        ' ' + error.msg
      ];

      console.error(message.join(''));
    });
  }
};
