/*
    Collection: Places
    ------------------

    @provides   Places
    @requires   libs/Backbone, Models/Place
    @file       Places.js
    @package    Trackerd/Models/Collections
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

var Places = (function() {
    return Backbone.Collection.extend({
        model: Place
    });
}());