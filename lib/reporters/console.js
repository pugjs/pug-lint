module.exports = function (errors, output = 'stderr') {
  if (errors.length) {
    var messages = [];

    errors.forEach(function (error) {
      if (messages.length > 0) {
        messages.push('');
      }

      messages.push(error.message);
    });

    if (output == 'stderr') {
      console.error(messages.join('\n'));
    } else {
      console.log(messages.join('\n'));
    }
  }
};
