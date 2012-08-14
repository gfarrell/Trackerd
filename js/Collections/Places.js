/*
    Collection: Places
    ------------------

    @provides   Places
    @requires   libs/Backbone, Models/Place, Core/Store, Core/Sync
    @file       Places.js
    @package    Trackerd/Collections
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Backbone', 'Models/Place', 'Core/Store'], function(Backbone, Place, Store) {
    var Places = Backbone.Collection.extend({
        model: Place,
        localStorage: (new Store('Trackerd.Places'))
    });

    return new Places();
});