const transformerPath = './config/jest/transformers';

function react(result = {}) {
  return {
    ...result,
    '^.+\\.jsx?$': `${transformerPath}/babel-react`,
    '\\.(css|scss|sass|less|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${transformerPath}/assets`,
  };
}

module.exports = react;
