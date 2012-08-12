/*
    Collection: Places
    ------------------

    @provides   Places
    @requires   libs/Backbone, Models/Place
    @file       Places.js
    @package    Trackerd/Models/Collections
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Backbone', 'Models/Place'], function(Backbone, Place) {
    return Backbone.Collection.extend({
        model: Place,

        sync: function() {
            
        }
    });
});