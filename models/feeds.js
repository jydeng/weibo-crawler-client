const util = require('../utils/util');
const { query } = require('./db');

/**
 * 写入博文
 * @param {string} uid 微博id
 * @param {string} content 正文
 * @param {string}} url 跳转地址
 * @param {date} feedtime 发表时间
 */
async function addFeeds(uid, content, url, feedtime) {
  try {
    const sql = `INSERT INTO feeds(id,uid,content,url,feed_time) VALUES(?,?,?,?,?);`;
    const values = [util.guid(), uid, content, url, feedtime];
    return await query(sql, values);
  } catch (error) {
    util.log(error.toString(), 'error');
    return [];
  }
}

/**
 * 查询博文
 * @param {string} uid 微博id
 */
async function selectFeeds(uid) {
  try {
    const sql = `SELECT id,uid,content,url,date_format(feed_time,'%Y-%m-%d %T') feed_time FROM feeds where uid=? order by feed_time desc`;
    const values = [uid];
    return await query(sql, values);
  } catch (error) {
    util.log(error.toString(), 'error');
    return [];
  }
}

/**
 * 删除博文
 * @param {string} uid 微博id
 */
async function delFeeds(uid){
  try {
    const sql = `DELETE FROM feeds WHERE uid = ?;`;
    const values = [uid];
    return await query(sql, values);
  } catch (error) {
    util.log(error.toString(), 'error');
    return [];
  }
}

module.exports = {
  addFeeds: addFeeds,
  selectFeeds: selectFeeds,
  delFeeds: delFeeds
};
