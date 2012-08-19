/*
    Main.js Application Bootstrap
    -----------------------------

    @file       main.js
    @package    Trackerd
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

// Some shortcut paths and shim modules for this global nonsense
require.config({
    baseUrl: 'js',
    paths: {
        jQuery:     'libs/jquery-1.7.2.min', jquery: 'libs/jquery-1.7.2.min',       // unfortunately some libs have lower case stuff deeply buried so this keeps everything compat.
        Underscore: 'libs/underscore-min', underscore: 'libs/underscore-min',   // likewise above
        Backbone:   'libs/backbone-min',
        Mootools:   'libs/mootools/core',
        Bootstrap:  'libs/bootstrap/bootstrap.min',
        text:       'libs/require/text'
    },
    shim: {
        'Bootstrap': ['jQuery']
    }
});

require(
    [
        // Non AMD modules that need specific order
        'jQuery',
        'Underscore',
        'Backbone',
        'Mootools',
        'Bootstrap',

        // Nice Classes
        'Routers/PlacesRouter',
        'Views/App',
        'Core/Location'
    ],
    function(_jQ, _U, Backbone, _M, _B, PlacesRouter, AppView, Location) {
        window.LocationTracker = new Location(0,0);
        window.LocationTracker.setToCurrent();

        // Initialise an event aggregator and a router
        var NotificationCentre = _.extend({}, Backbone.Events),
            Router = new PlacesRouter({
                __nc: NotificationCentre
            });

        // Set up toggle listener for toggleTracking
        NotificationCentre.on('toggleTracking', function() {
            if(window.LocationTracker.tracking) {
                window.LocationTracker.stopTracking();
            } else {
                window.LocationTracker.trackLocation();
            }
        });

        // Set up debug listener
        NotificationCentre.on('all', function(e, args) { console.log('Notify: '+e+(args !== undefined && args.length > 0 ? ' with args: '+args.toString() : '')+'.'); });

        // Set up a listener for current location updates
        window.LocationTracker.addEvent('update', function() { NotificationCentre.trigger('locationUpdate'); });

        Backbone.history.start({
            root: (window.location.host.indexOf('localhost') != -1 || window.location.host.indexOf('gidbook') != -1) ? '/trackerd/' : '/'
        });

        // Clear the loader
        $(".loader").remove();
    }
);