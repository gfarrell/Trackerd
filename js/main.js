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
        jQuery: 'libs/jquery-1.7.2.min',
        Underscore: 'libs/underscore-min',
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