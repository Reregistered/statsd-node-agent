/*
 */

var statsd = require('statsd-node');


var Agent = function(params){

  ////////////////////////////////////
  // 
  params = params || {};

  //////////////////////////////////
  // 
  this.stat = statsd(params);

  /////////////////////////////////////////
  // use can use this to set an identifier
  // to be used for further calls.
  this.prefix = params.prefix ? (params.prefix + '.') : '';

}

Agent.prototype.startGauges = function(obj, interval){

  interval = interval || 10000;

  var me = this;
  var setStats = function(){
    for (var itr in obj){
      var stat_string = me.prefix + itr;
      me.stat.gauge(stat_string,obj[itr]);
    };
  };

  this.gaugeInterval = setInterval(setStats,interval);

};

Agent.prototype.stopGauges = function(){

  clearInterval(this.gaugeInterval);
  this.gaugeInterval = 0;

};

exports = module.exports = function(params){
  return new Agent(params);
};
