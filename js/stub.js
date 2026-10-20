// 살롱드레터 서버 API 호출 차단 (정적 호스팅용)
(function(){
  if (typeof $ === 'undefined') return;
  var origAjax = $.ajax;
  $.ajax = function(opts){
    var url = (opts && opts.url) || '';
    if (typeof url === 'string' && url.indexOf('/api/') === 0) {
      var d = $.Deferred();
      if (url.indexOf('/api/w/rsvp/save') === 0) {
        if (window.common && common.alert) common.alert('이 페이지에서는 참석 여부 전달이 지원되지 않습니다.', 'error');
        d.reject({});
        return d.promise();
      }
      var fake = {status:'OK', message:'', data:[]};
      if (opts.success) { try { opts.success(fake); } catch(e){} }
      d.resolve(fake);
      return d.promise();
    }
    return origAjax.apply(this, arguments);
  };
})();
