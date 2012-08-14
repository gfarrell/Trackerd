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

        initialize: function() {
            var inner   = $(this.make('div', {'class':'navbar-inner'})),
                cont    = $(this.make('div', {'class':'container'})),
                brand   = $(this.make('a', {'class':'brand', 'href':'#'}, 'Trckd')),
                nav     = $(this.make('ul', {'class':'nav pull-right'})),
                menu    = [
                    {'action':'places/add', 'icon':'map-marker', 'text':'Add a place'},
                    {'action':'places/index', 'icon':'reorder', 'text':'My Places'},
                    {'action':'places/nearMe', 'icon':'search', 'text':'Near Me'},
                    {'action':'places/share', 'icon':'share', 'text':'Export my places'}
                ];

            // Put all these elements together
            this.$el.append(inner); inner.append(cont); cont.append(brand, nav);
            
            // Create the nav menu
            menu.each(function(opts) {
                var item = $(
                                '<li><a class="btn btn-navbar" data-action="{0}"><i class="icon-{1}"></i><span class="hidden-phone"> {2}</span></a></li>'
                                .format(opts.action, opts.icon, opts.text)
                            );

                item.bind('click', function() {
                    Backbone.history.navigate(opts.action);
                });
                item.appendTo(nav);
            });
        },

        addPlace: function() {},
        listPlaces: function() {},
        nearMe: function() {},
        share: function() {}
    });
});