(function($) {
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read'  : 'GET'
  };

  var getUrl = function(object) {
    if (!(object && object.url)) return null;
    return _.isFunction(object.url) ? object.url() : object.url;
  };

  var urlError = function() {
    throw new Error("A 'url' property or function must be specified");
  };

  var cacheTimestampsKey = 'cacheTimestamps';

  var cacheTimestamps = null;
  try {
    cacheTimestamps = JSON.parse( (window.localStorage && window.localStorage.getItem(cacheTimestampsKey)) || "{}" );
  } catch (e) {
    cacheTimestamps = {};
  }

  // TODO: define match rules to set timeout for different resources
  var cacheTimeoutInSeconds = 300;

  var cachePathRegex = /([^\?]+)(\?)?([^\?]*)/i;

  Backbone.nocache = function(cachePath) {
    cacheTimestamps[cachePath] = (new Date().getTime() / 1000) | 0;
    storeCacheTimestamps();
    // console.log("set no cache", cacheTimestamps);
  }

  var storeCacheTimestamps = function() {
    if (window.localStorage) {
      window.localStorage.removeItem(cacheTimestampsKey);
      window.localStorage.setItem(cacheTimestampsKey, JSON.stringify(cacheTimestamps));
    }
  }

  var slimCacheTimestamps = function() {
    try {
      var currentTime = (new Date().getTime() / 1000) | 0;
      _.each(cacheTimestamps, function(value, key, obj) {
        if (currentTime - value > cacheTimeoutInSeconds) {
          delete cacheTimestamps[key];
        }
      });
      storeCacheTimestamps();
    } catch (e) {
      console.log('failed to slim cache timestamps', e);
    }
  }

  // clean the timestamps on start
  slimCacheTimestamps();

  var updateUrlWithCacheTimestamps = function(url) {
    var match = url.match(cachePathRegex);
    if (match) {
      var cachePath = match[1];
      var questionMark = match[2];
      var queryParams = match[3];
      // to set the timestamp, call Backbone.nocache(cachePath)
      // console.log ('cache path: ', cachePath);

      var cacheTime = cacheTimestamps[cachePath];
      if (cacheTime) {
        var currentTime = (new Date().getTime() / 1000) | 0;
        if (currentTime - cacheTime > cacheTimeoutInSeconds) {
          delete cacheTimestamps[cachePath];
          var saveFailCount = 0;
          try {
            storeCacheTimestamps();
          } catch (e) {
            console.log('failed to store cache timestamps', e);
            if (e == QUOTA_EXCEEDED_ERR) {
              slimCacheTimestamps();
            }
          }
        } else {
          // attach the timestamp to js query
          var noCacheParam = "_=" + cacheTime;
          if (questionMark) {
            if (queryParams && queryParams.length > 0) {
              return url + "&" + noCacheParam;
            } else {
              return url + noCacheParam;
            }
          } else {
            return url + "?" + noCacheParam;
          }
        }
      }
    } else {
      console.log ('this path is not tracked by cache timestamps: ', s.url);
    }
    return url;
  }

  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default JSON-request options.
    var params = _.extend({
      type:         type,
      dataType:     'json',
      beforeSend: function( xhr, s ) {
        var url_r1 = /([^\?]+)(\?)?([^\?]*)/ig;
        var url_r2 = /\.json(\?)?/ig;
        var url_r3 = /\/\.json/ig;

        if (!options.noCSRF) {
          var token = $('meta[name="csrf-token"]').attr('content');
          if (token) xhr.setRequestHeader('X-CSRF-Token', token);
        }

        xhr.setRequestHeader("Accept", "application/json");

        if (!url_r2.test(s.url)) {
          s.url = s.url.replace(url_r1, "$1.json$2$3");
        }

        if (url_r3.test(s.url)) {
          s.url = s.url.replace("/.json", "/index.json");
        }
        
        s.url = updateUrlWithCacheTimestamps(s.url);
        
        model.trigger('sync:start');
      }
    }, options);

    if (!params.url) {
      params.url = getUrl(model) || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!params.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';

      var data = {}

      if(model.paramRoot) {
        data[model.paramRoot] = model.toJSON();
      } else {
        data = model.toJSON();
      }

      params.data = JSON.stringify(data)
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET') {
      params.processData = false;
    }

    // Trigger the sync end event
    var complete = options.complete;
    params.complete = function(jqXHR, textStatus) {
      // Peter modified this: add jqXHR as parameter for sync:end
      model.trigger('sync:end', jqXHR);
      if (complete) complete(jqXHR, textStatus);
    };

    // var success = options.success;
    // params.success = function(resp) {
    //   if (success) success(model, resp, options);
    //   model.trigger('sync', model, resp, options);
    // };
    //
    // var error = options.error;
    // params.error = function(xhr) {
    //   if (error) error(model, xhr, options);
    //   model.trigger('error', model, xhr, options);
    // };

    // Make the request.
    if (params.retry) {
      return $.ajax(params).retry(params.retry);
    } else {
      return $.ajax(params);
    }
  }

})(jQuery);
