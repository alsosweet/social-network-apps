/**
* VarTouchM.js
*
* @description :: TODO: step :记录什么，累加计数
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_game_action',
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
    addtime: {
      type: 'integer',
      size: 10,
    },
  }
};
