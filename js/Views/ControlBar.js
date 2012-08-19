/*
    ControlBarView
    ---------------

    @requires   Backbone, jQuery
    @file       ControlBar.js
    @package    Trackerd/Views
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Backbone', 'jQuery'], function(Backbone) {
    return Backbone.View.extend({
        tagName: 'div',
        className: 'navbar navbar-fixed-top',

        events: {},

        initialize: function(options) {
            this.__nc = options.__nc;

            var inner   = $(this.make('div', {'class':'navbar-inner'})),
                cont    = $(this.make('div', {'class':'container'})),
                brand   = $(this.make('a', {'class':'brand', 'href':'#'}, 'Trckd')),
                nav     = $(this.make('ul', {'class':'nav pull-right'})),
                menu    = [
                    {'action':'addPlace', 'icon':'plus', 'text':'Add a place'},
                    {'action':'showList', 'icon':'reorder', 'text':'My Places'},
                    {'action':'filterNearby', 'icon':'search', 'text':'Near Me'},
                    {'action':'toggleTracking', 'icon':'map-marker', 'text':'Track my location'}
                ];

            // Put all these elements together
            this.$el.append(inner); inner.append(cont); cont.append(brand, nav);

            // Dummy this variable
            var _view = this;

            // Create the nav menu
            menu.each(function(opts) {
                var item = $(
                                '<li><a class="btn btn-navbar" data-action="{0}"><i class="icon-{1}"></i><span class="hidden-phone"> {2}</span></a></li>'
                                .format(opts.action, opts.icon, opts.text)
                            );

                // All button presses will trigger an event in order that the AppView can deal with it (and anyone else who's listening)
                item.bind('click', function() {
                    if(this.indexOf('toggle') === 0) {      // Some actions will be toggle based
                        _view.toggleButton(this);           // -> toggle the button state
                    } else {                                // If not, the buttons will still need an active state
                        _view.makeButtonActive(this);
                    }

                    _view.__nc.trigger(this);
                }.bind(opts.action));
                item.appendTo(nav);                         // Finally add the control to the nav menu
            });
        },

        makeButtonActive: function(action) {
            this.$el.find('li').removeClass('active');                                  // Remove anything else that is 'active'
            this.$el.find('li:has(a[data-action="'+action+'"])').addClass('active');    // Add active class to our specified element
        },

        toggleButton: function(action) {
            this.$el.find('li:has(a[data-action="'+action+'"])').toggleClass('control-toggle-active');  // Toggle the class on the spec'd element
        }
    });
});