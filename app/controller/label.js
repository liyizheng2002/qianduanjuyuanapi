'use strict';

const Controller = require('egg').Controller;

class WenDaController extends Controller {
  //查询label里面的18个导航表
  async label() {
    const { ctx } = this;
    const res = await ctx.service.label.label();
    ctx.body = {
      code: 1,
      data: res
    }
  }
  //问答
  async question() {
    const { ctx } = this;
    try {
      //post的接口定义参数
      const { title, des, label_id } = ctx.request.body;
      //前面是表名哪一个表跟着就是每个表的表标题,后面是用户对应要往哪里放的数据
      await ctx.service.label.question(title, des, label_id)
      ctx.body = {
        code: 1,
        message: '提问成功'
      }
    } catch (e) {
      ctx.throw(422, {
        code: 1,
        message: '提问失败'
      })
    }
  }
  //查询你添加的数据
  async select() {
    const { ctx } = this;
    const { page = 1, page_size = 10, label_id = '' } = ctx.request.query
    const data = await ctx.service.label.select_queustion(page, page_size, label_id);
    ctx.body = {
      code: 1,
      data
    }
  }
  //获取某一条数据的详情
  async question_detail() {
    const { ctx } = this;
    const id = ctx.params.id
    const data = await ctx.service.label.detail(id)
    const answer = await ctx.service.label.answerDetail(data.id)
    ctx.body = {
      code: 1,
      data: {
        ...data,
        answer
      }
    }
  }
  //回答某一个问题的答案
  async answer() {
    const { ctx } = this;
    try {
      const id = ctx.params.id;
      const { content } = ctx.request.body;
      await ctx.service.label.answer(id, content);
      ctx.body = {
        code: 1,
        message: '回答成功'
      }
    } catch (e) {
      ctx.throw(422, {
        code: 0,
        message: '答题失败'
      })
    }
  }
}

module.exports = WenDaController;
