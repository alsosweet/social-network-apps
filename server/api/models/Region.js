/**
* VarUsernameW.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_region',
  attributes: {
    region_id: {
      type: 'integer',
      size:5,
      unique: true,
      primaryKey: true,
    },
    parent_id: {
      type: 'integer',
      size:5
    },
    region_name: {
      type: 'string',
      size:120
    },
    region_type: {
      type: 'integer',
      size: 2,
    },
    agency_id: {
      type: 'integer',
      size: 5,
    }
  }
};

