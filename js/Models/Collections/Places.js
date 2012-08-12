/*
    Collection: Places
    ------------------

    @provides   Places
    @requires   libs/Backbone, Models/Place, Core/Sync
    @file       Places.js
    @package    Trackerd/Models/Collections
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Backbone', 'Models/Place', 'Core/Sync'], function(Backbone, Place) {
    return Backbone.Collection.extend({
        model: Place
    });
});