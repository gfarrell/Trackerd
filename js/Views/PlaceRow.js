/*
    PlaceRowView
    --------------

    @requires   Backbone, Places, Place
    @file       PlaceRowView.js
    @package    Trackerd/Views
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone','Models/Place'],
    function(Backbone, Places, Place) {
        return Backbone.View.extend({
            tagName: 'li',
            className: 'PlaceRow',

            initialize: function(model) {
                this.model = model.model;
                this.model.on('change', this.render.bind(this));

                this.$note = $('<span class="place-note"></span>');
                this.$tags = $('<span class="place-tags"></span>');

                this.$el.append(this.$note, this.$tags);

                this.render();
            },

            render: function() {
                this.$note.html(this.model.get('note'));
            }
        });
    }
);