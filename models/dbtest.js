const { selectSubscribe } = require('./subscribe');

(async () => {
  const allSubscribe = await selectSubscribe();
  console.log(allSubscribe.length);
})();
