var options = {  
  host: '',
  user: '',
  password: '',
  database: '',
  port: 3306,
  clearExpired : true ,           // 만료된 세션 삭제 여부
  checkExpirationInterval: 10000, // 만료된 세션 삭제 간격 (ms)
  expiration: 1000*60*60*2,       // 만료 기간 (ms)
};

module.exports = options;