const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const actionMap = {
  greet: {
    context: ['HI', 'hello'],
    returns: function(tokenizedText) {
      return 'Hello! I\'m Jarvis, what can I do for you?'
    }
  }
};

function resolve(tokenizedText=[]) {
  const actions = Object.keys(actionMap);
  const returns = [];

  actions.forEach((key) => {
    const action = actionMap[key];
    if (natural.JaroWinklerDistance(action.context.join(''), tokenizedText.join('')) > 0.5 ) {
      returns.push(action.returns(tokenizedText));
    }
  });

  return returns.join('\r\n');
}

const handler = (session) => {
  const tokenizedText = tokenizer.tokenize(session.message.text);
  const response = resolve(tokenizedText) || 'Sorry!.. I couldn\'t understand you. :(';
  session.send(response);
};

module.exports = handler;
