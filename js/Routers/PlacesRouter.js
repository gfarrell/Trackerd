/*
    PlacesRouter
    ------------

    @requires   Backbone, Models/Place, Collections/Places, Views/PlacesList
    @file       PlacesController.js
    @package    Trackerd/Controllers
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone', 'Views/App', 'Views/PlacesList'],
    function(Backbone, AppView, PlacesListView) {
        return Backbone.Router.extend({
            routes: {
                'places/index':       'index',
                'places/nearMe':      'nearMe',
                'places/view/:id':    'view',
                'places/delete/:id/': 'del',
                'places/add':         'edit',
                'places/edit/:id':    'edit'
            },

            initialize: function() {
                this.Views = {};
                this.AppView = new AppView({el: $('div[data-view=AppView]')});
            },

            index: function() {
                if(this.Views.PlacesList === undefined) {
                    this.Views.PlacesList = new PlacesListView();
                }
                this.AppView.loadView(this.Views.PlacesList);
                this.AppView.render();
            },

            nearMe: function() {
                console.log('Getting all places near you.');
            },

            edit: function(id) {
                console.log('Editing '+id);
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