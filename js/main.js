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
        Bootstrap: 'libs/bootstrap/bootstrap.min'
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

        'Routers/PlacesRouter',
        'Views/App'
    ],
    function(_jQ, _U, Backbone, _M, _B, PlacesRouter, AppView) {
        var Router = new PlacesRouter();

        Backbone.history.start({
            root: (window.location.host.indexOf('localhost') != -1 || window.location.host.indexOf('gidbook') != -1) ? '/trackerd/' : '/'
        });

        // Initialise the AppView
        $(".no-js").remove();
        var view = new AppView({el: $('div[data-view=AppView]')});
        Router.view = view;
    }
);