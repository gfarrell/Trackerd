/*
    Collection: Places
    ------------------

    @provides   Places
    @requires   libs/Backbone, Models/Place, Core/Store, Core/Sync
    @file       Places.js
    @package    Trackerd/Models/Collections
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Backbone', 'Models/Place', 'Core/Store', 'Core/Sync'], function(Backbone, Store, Place) {
    return Backbone.Collection.extend({
        model: Place,
        localStorage: new Store('Trackerd.Places')
    });
});