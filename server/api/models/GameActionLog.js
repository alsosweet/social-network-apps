/**
* VarTouchM.js
*
* @description :: TODO: 广告点击记录
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_game_action_log',
  attributes: {
    id: {
      type: 'integer',
      size:13,
      unique: true,
      primaryKey: true,
    },
    userid: {
      model: 'UserInfo',
      required: true
    },
    game_id: {
      model: 'Game',
      required: true
    },
    step: {
      type: 'integer',
      size: 10,
    },
    /*原数据库的设计者真是蛇精病*/
    time_date: {
      type: 'string',
      size: 20,
    },
  }
};
