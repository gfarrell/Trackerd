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
                '*filter': 'index'
            },

            initialize: function(options) {
                this.__nc = options.__nc;

                this.AppView = new AppView({el: $('div[data-view=AppView]'), __nc: options.__nc});
            },

            index: function(filter) {
                this.AppView.showList();
            },

            edit: function(id) {
                
            },
            view: function(id) {
                console.log('Viewing '+id);
            },
            del: function(id) {
                console.log('Deleting '+id);
            }
        });
    }
);