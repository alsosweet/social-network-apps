/**
* VarTouchM.js
*
* @description :: ����Ӱ�Ӳ������ظ����������Ч������ʾ��������棬�����ظ�������
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
    /*û��*/
    sign: {
      type: 'integer',
      size: 5,
    },
    /*status: 1��ʾͬ����� 0��ʾδ���� 2��ʾ����*/
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
