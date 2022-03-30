'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
   /* 获取所有的数据所有问题列表 */
  router.get('/api/wen/da', controller.label.label);
  /* 每一个问题详情 */
  router.post('/api/question', controller.label.question);
  /* 18个标题 */
  router.get('/api/question/list', controller.label.select);
  /* 创建问题 */
  router.get('/api/question/:id', controller.label.question_detail)
  //回答某一个问题
  router.post('/api/answer/:id', controller.label.answer)
  //删除问题
  // router.delete('/api/question/:id', controller.label.answer)
};
