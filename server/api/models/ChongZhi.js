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
    /*type:  vip ����vip ,chongzhi ��ֵ  ,zhuanqian ׬Ǯ��Ա��*/
    type: {
      type: 'string',
      size:100
    },
    /*out_trade_no:ʱ���+id�ţ���֪����;*/
    out_trade_no: {
      type: 'string',
      size:100
    },
    /*status :1 ���ύ��δ֧������2�Գ�ֵ*/
    status: {
      type: 'integer',
      size: 5,
    },
    amount: {
      type: 'string',
      size:100
    },
    /*payment��֧������*/
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
