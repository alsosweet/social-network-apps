/**
* VarTouchM.js
*
* @description :: 产生影子操作。重复申请见面无效，可提示已申请见面，请勿重复操作。
 * @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_appsee',
  attributes: {
    id: {
      type: 'integer',
      size:10,
      unique: true,
      primaryKey: true,
    },
    userid: {
      model: 'UserInfo',
      required: true
    },
    fromuserid: {
      model: 'UserInfo',
      required: true
    },
    /*NULL*/
    message: {
      type:'string',
      size:50
    },
    /*没用*/
    sign: {
      type: 'integer',
      size: 5,
    },
    /*status: 1表示同意见面 0表示未操作 2表示忽略*/
    status: {
      type: 'integer',
      size: 1,
    },
    addtime: {
      type: 'integer',
      size: 10,
    },
  }
};
