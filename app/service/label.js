'use strict';

const Service = require('egg').Service;

class WenDaService extends Service {
  //查询label里面的18个导航表
  async label() {
    const res = await this.app.mysql.query('SELECT * FROM label')
    return res
  }
  //问答
  async question(title, des, label_id) {
    const sql = `
      INSERT INTO question (title, des, label_id) VALUES ('${title}', '${des}', '${label_id}')
      `;
    const res = await this.app.mysql.query(sql)
    return res
  }
  //查询你添加的数据
  async select_queustion(page, page_size, label_id) {
    let sql = ''
    if (label_id) {
      sql =  `
      SELECT * FROM question
      WHERE label_id=${label_id * 1}
      ORDER BY id DESC
      LIMIT ${(page - 1) * page_size}, ${page_size}
      `
    } else {
      sql =  `
      SELECT * FROM question
      ORDER BY id DESC
      LIMIT ${(page - 1) * page_size}, ${page_size}
      `
    }
    const res = await this.app.mysql.query(sql)
    return res
  }
  //获取某一条数据的详情
  async detail(id) {
    const sql = `
    SELECT * FROM question WHERE id=${id}
    `
    const res = await this.app.mysql.query(sql) || [];
    return res[0]
  }
  //回答某一个问题的答案
  async answer(id, content) {
    const sql = `
    INSERT INTO answer (question_id, content) VALUES ('${id}', '${content}')
    `
    const res = await this.app.mysql.query(sql);
    return res
  }
  async answerDetail(id) {
    const sql = `
    SELECT * FROM answer WHERE question_id=${id}
    `
    const res = await this.app.mysql.query(sql) || [];
    return res[0]
  }
}

module.exports = WenDaService;
