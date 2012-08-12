/*
    Number Extensions
    -----------------

    @requires   Mootools
    @file       Number.extend.js
    @package    Trackerd/Core
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Mootools'], function() {
    Number.implement({
        toRadians: function() {
            return this * Math.PI / 180;
        },
        toDegrees: function() {
            return this * 180 / Math.PI;
        }
    });
});