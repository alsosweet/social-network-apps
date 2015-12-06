/**
* VarTouchM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_hello',
  attributes: {
    id: {
      type: 'integer',
      size:10,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      model: 'UserInfo',
      required: true
    },
    fromuserid: {
      model: 'UserInfo',
      required: true
    },
    /*��Ӧ�к��ı��*/
    message: {
      model: 'Qing_zhaohu',
      required: true
    },
    /*Sign: 1��ʾ���� 0 ��ʾδ�鿴*/
    sign: {
      type: 'integer',
      size: 5,
    },
    /*Reback  1��ʾ�ظ� 0 ��ʾδ�ظ�*/
    reback: {
      type: 'integer',
      size: 1,
    },
    addtime: {
      type: 'integer',
      size: 10,
    },
  }
};
