app.filter('capitalize', function () {
  return function (text) {
    return text.substring(0,1).toUpperCase() + text.substring(1, text.length);
  };
});