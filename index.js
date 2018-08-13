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
  let rows = await subscribe.selectSubscribe(uid);
  rows.forEach(item => {
    if(/^\d*$/.test(item.uid)){
      item.url = `https://weibo.com/u/${item.uid}`;
    }else{
      item.url = `https://weibo.com/${item.uid}`;
    }
  });

  await ctx.render('subscribe', {
    rows: rows
  });
});

router.post('/api/subscribe', async ctx => {
  let postData = ctx.request.body;
  let uid = postData['uid'];
  if (uid) {
    let exists = await subscribe.exists(uid);
    if (exists[0].c === 0) {
      if (await subscribe.addSubscribe(uid)) {
        ctx.type = 'json';
        ctx.body = {
          code: 200,
          message:
            '新增订阅成功<br>将在下一个周期自动抓取3个月内的所有博文,请稍候.'
        };
      } else {
        ctx.type = 'json';
        ctx.body = { code: 500, message: '新增订阅失败.' };
      }
    } else {
      ctx.type = 'json';
      ctx.body = { code: 400, message: '这个uid已经在订阅列表里了.' };
    }
  } else {
    ctx.type = 'json';
    ctx.body = { code: 400, message: 'uid有误.' };
  }
});

router.delete('/api/subscribe', async ctx => {
  let postData = ctx.request.body;
  let uid = postData['uid'];
  if (uid) {
    let exists = await subscribe.exists(uid);
    if (exists[0].c > 0) {
      if (
        (await subscribe.cancelSubscribe(uid)) &&
        (await feeds.delFeeds(uid))
      ) {
        ctx.type = 'json';
        ctx.body = { code: 200, message: '取消订阅成功.' };
      } else {
        ctx.type = 'json';
        ctx.body = { code: 500, message: '取消订阅失败.' };
      }
    } else {
      ctx.type = 'json';
      ctx.body = { code: 400, message: '这个uid已经取消订阅了.' };
    }
  } else {
    ctx.type = 'json';
    ctx.body = { code: 400, message: 'uid有误.' };
  }
});

router.get('/feeds', async ctx => {
  let request = ctx.request;
  let req_query = request.query;
  let uid = req_query['uid'];
  let uname = req_query['uname'];
  let rows = await feeds.selectFeeds(uid);

  await ctx.render('feeds', {
    uid: uid,
    uname: uname,
    rows: rows
  });
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('微博爬虫客户端已启动，监听3000端口!');
});
