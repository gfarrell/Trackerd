/*
    PlaceRowView
    --------------

    @requires   Backbone, Place
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

            initialize: function() {
                this.model.on('change', this.render, this);
                this.model.on('destroy', this.remove, this);

                this.$el.attr('data-id', this.model.cid);

                this.$note = $('<span class="note"></span>');
                this.$tags = $('<span class="tags"></span>');
                this.$dist = $('<span class="distance"></span>');

                this.$el.append(this.$note, this.$tags, this.$dist);

                this.render();
            },

            render: function() {
                this.$note.html(this.model.get('note'));
                this.$tags.html(this.model.get('tags').join(', '));

                this.renderDistance();
            },

            renderDistance: function() {
                this.$dist.html(this.model.getDistance().round(2)+'km');
            }
        });
    }
);