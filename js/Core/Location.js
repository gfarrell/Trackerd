/*
    Location Handling Class
    -----------------------

    @provides   Location
    @requires   Mootools, Core/Number.extend
    @file       Location.js
    @package    Trackerd/Core
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Mootools', 'Core/Number.extend'], function() {
    var Location = new Class({
        /**
         * Constructor
         * @param  {Number} latitude  Latitude of location (+ve => North, -ve => South)
         * @param  {Number} longitude Longitude of Location (+ve => East, -ve => West)
         * @return {void}
         */
        initialize: function(latitude, longitude) {
            var position = [];

            Object.defineProperty(this, 'latitude', {
                get: function() {
                    return position[0];
                },
                set: function(lat) {
                    if(typeOf(lat) != 'number' || Math.abs(lat) > 90) {
                        throw new Error('Latitude must be a number between 90 and -90.');
                    }
                    position[0] = lat;
                }
            });
            Object.defineProperty(this, 'longitude', {
                get: function() {
                    return position[1];
                },
                set: function(long) {
                    if(typeOf(long) != 'number' || Math.abs(long) > 180) {
                        throw new Error('Longitude must be a number between 180 and -180.');
                    }
                    position[1] = long;
                }
            });

            this.latitude = latitude;
            this.longitude = longitude;
        }
    });

    /**
     * Gives the distance in KM between two locations
     * @param  {Location} loc_a The first Location object
     * @param  {Location} loc_b The second Location object
     * @return {Number}         Distance in kilometres
     */
    Location.distanceBetweenLocations = function(loc_a, loc_b) {
        if(!instanceOf(loc_a, Location) || !instanceOf(loc_b, Location)) {
            throw new Error('Haversine function requires two Location objects as its arguments in order to calculate the distance between them.');
        }

        // Implementation of the Haversine formula from http://www.movable-type.co.uk/scripts/latlong.html

        var R, dLat, dLon, lat1, lat2, a, c;

        R = 6371; // radius of earth in km

        dLat = (loc_b.latitude-loc_a.latitude).toRadians();
        dLon = (loc_b.longitude-loc_a.longitude).toRadians();
        lat1 = loc_a.latitude.toRadians();
        lat2 = loc_b.latitude.toRadians();

        a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    };

    /**
     * Factory for generating new Locations from an array of [latitude, longitude]
     * @param  {Array}    arr Lat/Lon array
     * @return {Location}     Generated Location object
     */
    Location.newLocationFromArray = function(arr) {
        if(instanceOf(arr, Array) && arr.length == 2) {
            return new Location(arr[0], arr[1]);
        } else {
            throw new Error('Invalid location array given, should be [latitude, longitude].');
        }
    };

    Location.implement({
        /**
         * Gives the distance to another Location object
         * @param  {Location} other_location The Location to compare to
         * @return {Number}                  The distance in kilometres
         */
        distanceTo: function(other_location) {
            return Location.distanceBetweenLocations(this, other_location);
        }
    });

    return Location;
});