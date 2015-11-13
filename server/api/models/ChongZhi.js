/**
* VarTouchW.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_chongzhi',
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
    /*type:  vip 升级vip ,chongzhi 充值  ,zhuanqian 赚钱会员？*/
    type: {
      type: 'string',
      size:100
    },
    /*out_trade_no:时间加+id号，不知道用途*/
    out_trade_no: {
      type: 'string',
      size:100
    },
    /*status :1 已提交（未支付），2以充值*/
    status: {
      type: 'integer',
      size: 5,
    },
    amount: {
      type: 'string',
      size:100
    },
    /*payment：支付类型*/
    payment: {
      type: 'string',
      size:100
    },
    addtime: {
      type: 'integer',
      size: 10,
      columnName: 'addtime'
    }
  }
};
