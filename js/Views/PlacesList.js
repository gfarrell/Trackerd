/*
    PlacesListView
    --------------

    @requires   Backbone, Collections/Places, Views/PlaceRow
    @file       PlacesListView.js
    @package    Trackerd/Views
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone','Collections/Places','Views/PlaceRow'],
    function(Backbone, Places, PlaceRow) {
        return Backbone.View.extend({
            tagName: 'ul',
            className: 'PlacesList',

            initialize: function(options) {
                this.__nc = options.__nc;

                this._rows = [];
                Places.on('all', this.render, this);
                Places.fetch();
            },

            render: function() {
                Places.each(function(pl) {
                    if(!instanceOf(this._rows[pl.cid], PlaceRow)) {
                        var row = new PlaceRow({model: pl, __nc: this.__nc});
                        this._rows[pl.cid] = row;
                        row.$el.appendTo(this.$el);
                    } else {
                        this._rows[pl.cid].delegateEvents();
                    }
                }, this);
            }
        });
    }
);