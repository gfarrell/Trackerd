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
            tagName: 'div',
            className: 'Trackerd',

            initialize: function(attrs) {
                this.ControlBar = new ControlBarView();
                this.ControlBar.$el.appendTo(this.$el);

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
            }
        });
    }
);