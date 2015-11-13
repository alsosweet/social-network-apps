/**
* UserInfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_userinfo',
  attributes: {
    userid: {
      type: 'integer',
      size:10,
      unique: true,
      primaryKey: true,
      columnName: 'userid'
    },
    /*用户名也是账号，email和用户名均可用于登陆*/
    username: {
      type: 'string',
      size:20,
    },
    true_username: {
      type: 'string',
      size:100,
    },
    password: {
      type: 'string',
      size:100,
    },
    /*email 唯一。用于登陆。size太小了吧？？*/
    email: {
      type: 'string',
      size:20,
    },
    sex: {
      type: 'string',
      size:10,
    },
    province: {
      type: 'string',
      size:50,
    },
    city: {
      type: 'string',
      size:50,
    },
    collage: {
      type: 'string',
      size:30,
    },
    height: {
      type: 'integer',
      size: 10,
    },
    vir_height: {
      type: 'integer',
      size: 10,
    },
    marry: {
      type: 'string',
      size:10,
    },
    bth_year: {
      type: 'integer',
      size: 10,
    },
    bth_moon: {
      type: 'integer',
      size: 10,
    },
    bth_day: {
      type: 'integer',
      size: 10,
    },
    vir_age: {
      type: 'integer',
      size: 20,
    },

    from_province: {
      type: 'string',
      size:50,
    },
    from_city: {
      type: 'string',
      size:50,
    },
    career: {
      type: 'string',
      size:20,
    },
    purpose: {
      type: 'string',
      size:50,
    },
    lovepoint: {
      type: 'string',
      size:50,
    },
    live: {
      type: 'string',
      size:20,
    },
    moongive: {
      type: 'string',
      size:100,
    },
    touch: {
      type: 'string',
      size:20,
    },
    hobby: {
      type: 'string',
      size:20,
    },
    talk: {
      type: 'string',
      size:50,
    },
    wish: {
      type: 'string',
      size:20,
    },
    meetpay:{
      type: 'string',
      size:20,
    },
    food: {
      type: 'string',
      size:50,
    },
    romance: {
      type: 'string',
      size:20,
    },
    meettime: {
      type: 'string',
      size:20,
    },
    meetads: {
      type: 'string',
      size:20,
    },
    image_big: {
      type: 'string',
      size:255,
    },
    image_mid: {
      type: 'string',
      size:255,
    },
    image_sal: {
      type: 'string',
      size:255,
    },
    image: {
      type: 'string',
      size:100,
    },
    /* 0审核未通过，1通过*/
    image_status: {
      type: 'integer',
      size: 2,
    },
    /* 是否为推荐会员*/
    sign: {
      type: 'integer',
      size: 5,
    },
    /* 等级0,1,2,3,4,5*/
    vip: {
      type: 'integer',
      size: 5,
    },
    /* 到期时间*/
    vip_time: {
      type: 'integer',
      size: 10,
    },
    /* chongzhi*/
    chongzhi: {
      type: 'integer',
      size: 10,
    },
    /* 积分*/
    point: {
      type: 'integer',
      size: 10,
    },
    /* 游戏积分*/
    game_point: {
      type: 'integer',
      size: 20,
    },
    /* hot*/
    hot: {
      type: 'integer',
      size: 5,
    },
    alipay:{
      type:'string',
      size:50,
    },
    /* 1冻结，0正常*/
    freeze: {
      type: 'integer',
      size: 10,
    },
    /* 1 is_var*/
    is_var: {
      type: 'integer',
      size: 2,
    },
    /* var_id*/
    var_id: {
      type: 'integer',
      size: 13,
    },
    /* count_view*/
    count_view: {
      type: 'integer',
      size: 13,
    },
    /* actiontime*/
    actiontime: {
      type: 'integer',
      size: 10,
    },
    /* actiontime*/
    logintime: {
      type: 'integer',
      size: 10,
    },
    /* 注册用户来源*/
    ad_id: {
      type: 'integer',
      size: 10,
    },
    source_id:{
      type:'string',
      size:100,
    },
    qq:{
      type:'string',
      size:50,
    },
    phone:{
      type:'string',
      size:20,
    },
    pceil:{
      type:'string',
      size:20,
    },
    addtime: {
      type: 'integer',
      size: 10,
      columnName: 'addtime'
    },
  }
};

