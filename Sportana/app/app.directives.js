app.directive('customPopover', function () {
    return {
        restrict: 'A',
        template: '<span>{{label}}</span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;

            $(el).popover({
                trigger: 'click',
                html: true,
                content: attrs.popoverHtml,
                placement: attrs.popoverPlacement
            });
        }
    };
});
app.directive('popOver', function ($compile) {
  /*
  var itemsTemplate = "<div ng-repeat='friend in viewGame.getFriends() track by $index' class='checkbox'><label><input type='checkbox' value='{{friend.id}}'>{{friend.firstname}} {{friend.lastname}}</label></div><button type='button' class='btn btn-primary' ng-click='viewGame.inviteFriends()'>Invite</button>";
  var getTemplate = function (contentType) {
    var template = '';
    switch (contentType) {
      case 'items':
        template = itemsTemplate;
        break;
    }
    return template;
  }
  */
  return {
    restrict: "A",
    transclude: true,
    template: "<span ng-transclude></span>",
    link: function (scope, element, attrs) {
      var popOverContent;
      if (scope.items) {
        var html = "<div ng-repeat='friend in items.getFriends()' class='checkbox'><label><input type='checkbox' value='{{friend.id}}'>{{friend.firstname}} {{friend.lastname}}</label></div><button type='button' class='btn btn-primary' ng-click='items.inviteFriends()'>Invite</button>";
        popOverContent = $compile(html)(scope);
      }
      var options = {
        content: popOverContent,
        placement: "right",
        html: true,
        title: scope.title
      };
      $(element).popover(options);
    },
    scope: {
      items: '=',
      title: '@'
    }
  };
});


/*
"<div ng-repeat='friend in viewGame.getFriends() track by $index' class='checkbox'><label><input type='checkbox' value='{{friend.id}}'>{{friend.firstname}} {{friend.lastname}}</label></div><button type='button' class='btn btn-primary' ng-click='viewGame.inviteFriends()'>Invite</button>"
"<div><label ng-repeat='item in items'><input type='checkbox' value='{{item.id}}''>{{item.firstname}} {{item.lastname}}</label></div><button type='button' class='btn btn-primary' ng-click='viewGame.inviteFriends()'>Invite</button>"

<div ng-repeat="friend in viewGame.getFriends() track by $index" class="checkbox">
    <label><input type="checkbox" value="{{friend.id}}">{{friend.firstname}} {{friend.lastname}}</label>
</div>                          
<button type="button" class="btn btn-primary" ng-click="viewGame.inviteFriends()">
    Invite
</button>


<form>
    <div ng-repeat='friend in viewGame.getFriends() track by $index' class='checkbox'>
        <label><input type='checkbox' value='{{friend.id}}'>{{friend.firstname}} {{friend.lastname}}</label>
    </div>                          
    <button type='button' class='btn btn-primary' ng-click='viewGame.inviteFriends()'>
        Invite
    </button>
</form>
*/
