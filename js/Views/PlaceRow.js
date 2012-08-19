/*
    PlaceRowView
    --------------

    @file       PlaceRowView.js
    @package    Trackerd/Views
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone','Models/Place','text!Templates/PlaceRow.html'],
    function(Backbone, Place, row_html) {
        return Backbone.View.extend({
            tagName: 'li',
            className: 'PlaceRow container',

            events: {
                'click .control.edit':   'edit',
                'click .control.delete': 'confirmDelete'
            },

            initialize: function(options) {
                this.__nc = options.__nc;

                this.model.on('change', this.render, this);
                this.model.on('destroy', this.remove, this);

                this.$el.attr('data-id', this.model.cid);

                this.Template = _.template(row_html);

                this.render();
            },

            render: function() {
                this.$el.empty();
                this.$el.append(this.Template({
                    note: this.model.get('note'),
                    tags: this.model.get('tags'),
                    distance: this.model.getDistance().round(2)
                }));
                this.delegateEvents();
            },

            renderDistance: function() {
                this.$el.find('.distance').html(this.model.getDistance().round(2)+' km');
            },

            edit: function() {
                this.__nc.trigger('editPlace', this.model.cid);
            },

            confirmDelete: function() {
                this.__nc.trigger('confirmDelete', this.model);
            }
        });
    }
);