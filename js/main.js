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
        jQuery: 'libs/jquery-1.7.2.min', jquery: 'libs/jquery-1.7.2.min',       // unfortunately some libs have lower case stuff deeply buried so this keeps everything compat.
        Underscore: 'libs/underscore-min', underscore: 'libs/underscore-min',   // likewise above
        Backbone: 'libs/backbone-min',
        Mootools: 'libs/mootools/core',
        Bootstrap: 'libs/bootstrap/bootstrap.min',
        Collections: 'Models/Collections'
    },
    shim: {
        'Backbone': {
            deps: ['Underscore', 'jQuery'],
            exports: 'Backbone'
        },
        'Bootstrap': ['jQuery']
    }
});

require(
    [
        'app',

        // Non AMD modules that need specific order
        'jQuery',
        'Underscore',
        'Backbone',
        'Mootools'
    ],
    function(Trackerd) {
        Trackerd.init();
    }
);