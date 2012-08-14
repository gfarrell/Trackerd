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

        initialize: function() {
            var inner   = $(this.make('div', {'class':'navbar-inner'})),
                cont    = $(this.make('div', {'class':'container'})),
                brand   = $(this.make('a', {'class':'brand', 'href':'#'}, 'Trckd')),
                nav     = $(this.make('ul', {'class':'nav pull-right'})),
                menu    = [
                    {'action':'places/add', 'icon':'plus', 'text':'Add a place'},
                    {'action':'places/index', 'icon':'reorder', 'text':'My Places'},
                    {'action':'places/nearMe', 'icon':'search', 'text':'Near Me'},
                    {'action':':toggleTracking', 'icon':'map-marker', 'text':'Track my location'}
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

                // Two types of action, navigation and event (self-explanatory, right?)
                if(opts.action.indexOf(':') === 0) {        // Events start with a colon
                    item.bind('click', function() {
                        if(this.indexOf(':toggle') === 0) {
                            _view.toggleButton(this);       // If this is a toggle event, then we should toggle the switch class
                        }

                        _view.trigger('action'+this);       // Now trigger the event
                    }.bind(opts.action));
                } else {
                    item.bind('click', function() {
                        Backbone.history.navigate(this);    // Tell Backbone to go there
                        _view.makeButtonActive(this);       // And let's make the button active too
                    }.bind(opts.action));
                }
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