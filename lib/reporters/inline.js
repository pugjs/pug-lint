module.exports = function (errors, output = 'stderr') {
  if (errors.length) {
    errors.forEach(function (error) {
      var message = [
        error.filename,
        ':' + error.line,
        error.column ? ':' + error.column : '',
        ' ' + error.msg
      ];

      if (output == 'stderr') {
        console.error(message.join(''));
      } else {
        console.log(message.join(''));
      }
    });
  }
};
