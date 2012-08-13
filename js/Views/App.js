/*
    AppView
    -------

    @requires   Backbone, Views/ControlBar
    @file       App.js
    @package    Trackerd/Views
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone','Views/ControlBar'],
    function(Backbone, ControlBarView) {
        return Backbone.View.extend({
            initialize: function() {
                this.ControlBar = new ControlBarView();
            }
        });
    }
);