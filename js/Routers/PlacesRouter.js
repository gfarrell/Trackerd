/*
    PlacesRouter
    ------------

    @requires   Backbone, Models/Place, Collections/Places, Views/PlacesList
    @file       PlacesController.js
    @package    Trackerd/Controllers
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone', 'Models/Place', 'Collections/Places', 'Views/PlacesList'],
    function(Backbone, Place, Places, PlacesListView) {
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
                this.model = Place;
                this.Places = new Places();
            },

            index: function() {
                this.Places.fetch();

                // Instantiate the list view
                var view = new PlacesListView({
                    collection: this.Places
                });

            },

            nearMe: function() {
                console.log('Getting all places near you.');
            },

            edit: function(id) {
                var current = new Place();
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