/*
    AppView
    -------

    @requires   Backbone, Views/ControlBar, Core/Location
    @file       App.js
    @package    Trackerd/Views
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone','Views/ControlBar', 'Core/Location'],
    function(Backbone, ControlBarView, Location) {
        return Backbone.View.extend({
            tagName: 'div',
            className: 'Trackerd',

            initialize: function(attrs) {
                this.ControlBar = new ControlBarView();
                this.ControlBar.$el.appendTo(this.$el);

                this.ControlBar.on('action:toggleTracking', this.toggleTracking);

                this.$main = $(this.make('div', {'class':'container'}));
                this.$main.appendTo(this.$el);

                if(instanceOf(attrs.load, Backbone.View)) {
                    this.loadView(attrs.load);
                }

                this.render();
            },

            loadView: function(view) {
                if(instanceOf(view, Backbone.View)) {
                    this.clear();
                    view.$el.appendTo(this.$main);
                    this._loaded = view;
                } else {
                    throw new Error('AppView can only load instances of Backbone.View.');
                }
            },

            render: function() {
                if(instanceOf(this._loaded, Backbone.View)) {
                    this._loaded.render();
                }
            },

            clear: function() {
                if(instanceOf(this._loaded, Backbone.View)) {
                    this._loaded.remove();
                }
                this.$main.empty();
            },

            toggleTracking: function() {
                if(instanceOf(window.LocationTracker, Location)) {
                    window.LocationTracker.trackLocation();
                }
            }
        });
    }
);