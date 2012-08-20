/*
    PlacesRouter
    ------------

    @requires   Backbone, Models/Place, Collections/Places, Views/PlacesList
    @file       PlacesController.js
    @package    Trackerd/Controllers
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone', 'Collections/Places', 'Views/App', 'Views/PlacesList', 'Views/EditPlace'],
    function(Backbone, Places, AppView, PlacesListView, EditPlaceView) {
        return Backbone.Router.extend({
            routes: {
                'add': 'addPlace',
                'list': 'showList',
                '*filter': 'showList'
            },

            initialize: function(options) {
                this.__nc = options.__nc;

                //this.__nc.on('all', this.silentLocationReplace, this);

                this.AppView = new AppView({el: $('div[data-view=AppView]'), __nc: options.__nc});
            },

            silentLocationReplace: function(trigger) {
                if(Object.contains(this.routes, trigger)) {
                    this.navigate(Object.keyOf(this.routes, trigger), {
                        trigger: false
                    });
                }
            },

            showList: function(filter) {
                this.__nc.trigger('showList');
            },
            addPlace: function() {
                this.__nc.trigger('addPlace');
            }
        });
    }
);