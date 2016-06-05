module.exports = function (results) {
  var out = '';

  results.forEach(function (result) {
    result.messages.forEach(function (message, index) {
      out += [
        index ? '\n' : '',
        result.filePath,
        ':' + message.line,
        message.column ? ':' + message.column : '',
        ' ' + message.message
      ].join('');
    });
  });

  return out;
};
