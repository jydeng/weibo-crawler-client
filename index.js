const Koa = require('koa');
const path = require('path');
const Static = require('koa-static');
const Views = require('koa-views');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const subscribe = require('./models/subscribe');
const feeds = require('./models/feeds');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

const staticPath = './static';
app.use(Static(path.join(__dirname, staticPath)));

app.use(Views(path.join(__dirname, './views'), { extension: 'ejs' }));

router.get('/', async ctx => {
  let request = ctx.request;
  let req_query = request.query;
  let uid = req_query['uid'];

  await ctx.render('subscribe', {
    rows: await subscribe.selectSubscribe(uid)
  });
});

router.post('/add', async ctx => {
  let postData = ctx.request.body;
  let uid = postData['uid'];
  if (uid) {
    let exists = await subscribe.exists(uid);
    if (exists[0].c === 0) {
      if (await subscribe.addSubscribe(uid)) {
        ctx.body = { code: 200, message: '新增订阅成功' };
      } else {
        ctx.body = { code: 500, message: '新增订阅失败' };
      }
    } else {
      ctx.body = { code: 400, message: '这个uid已经在订阅列表里了' };
    }
  } else {
    ctx.body = { code: 400, message: 'uid有误' };
  }
});

router.get('/feeds', async ctx => {
  let request = ctx.request;
  let req_query = request.query;
  let uid = req_query['uid'];

  await ctx.render('feeds', { uid: uid, rows: await feeds.selectFeeds(uid) });
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('微博爬虫客户端已启动，监听3000端口!');
});
