module.exports = function (errors) {
  var messages = [];

  errors.forEach(function (error) {
    error.messages.forEach(function (message) {
      if (messages.length > 0) {
        messages.push('');
      }

      messages.push(message.messageWithSource);
    });
  });

  return messages.join('\n');
};
