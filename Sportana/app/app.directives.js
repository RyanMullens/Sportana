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

/*
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