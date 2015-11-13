/**
* Webconfig.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_webconfig',
  attributes: {
    id: {
      type: 'integer',
      size:10,
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    title: {
      type: 'string',
      size:255,
    },
    keyword: {
      type: 'string',
      size:255,
    },
    hobby: {
      type: 'string',
      size:255,
    },
    food: {
      type: 'string',
      size:255,
    },
    meettime: {
      type: 'string',
      size:255,
    },
    meetads: {
      type: 'string',
      size:255,
    },
    purpose: {
      type: 'string',
      size:255,
    },
    lovepoint: {
      type: 'string',
      size:255,
    },
    live: {
      type: 'string',
      size:255,
    },
    moongive: {
      type: 'string',
      size:255,
    },
    wish: {
      type: 'string',
      size:255,
    },
    collage: {
      type: 'string',
      size:255,
    },
    romance: {
      type: 'string',
      size:255,
    },
    addtime: {
      type: 'integer',
      size: 10,
      columnName: 'addtime'
    },
    meetpay:{
      type:'text',

    },
    career:{
      type:'text',

    }
  }
};

