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
                if(this.Views.EditPlace === undefined) {
                    this.Views.EditPlace = new EditPlaceView();
                }

                if(id !== undefined) {
                    var pl = Places.getByCid(id);
                    if(pl !== undefined && pl !== null) {
                        this.Views.EditPlace.primeForEdit(pl);
                    }
                } else {
                    this.Views.EditPlace.primeForNew();
                }
                this.AppView.loadView(this.Views.EditPlace);
                this.AppView.render();
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