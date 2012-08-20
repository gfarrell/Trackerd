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
            tagName: 'li',                                  // Each Row is an LI inside a UL
            className: 'PlaceRow container',

            events: {
                'click .control.edit':   'edit',            // Controls for edit ...
                'click .control.delete': 'confirmDelete'    // and delete (brings up a confirmation dialogue)
            },

            initialize: function(options) {
                this.__nc = options.__nc;                                   // Store the event aggregator

                this.__nc.on('locationUpdate', this.renderDistance, this);  // Whenever the current location is updated, re-render the distance

                this.model.on('change', this.render, this);                 // Update the row on model change
                this.model.on('destroy', this.remove, this);                // And delete the row when the model is deleted

                this.$el.attr('data-id', this.model.cid);                   // Set a data-attribute, not currently used but may one day come in handy

                this.Template = _.template(row_html);                       // Store a template function which will generate the HTML

                this.$el.append(this.Template({                             // Append the output of the templater
                    note: this.model.get('note'),
                    tags: this.model.get('tags'),
                    distance: this.model.getDistance().round(2)             // More decimal places than two is a bit pointless
                }));

                this.els = {                                                // Store a load of shortcuts to the parts which need updating
                    '$note': this.$el.find('.note'),
                    '$tags': this.$el.find('.tags'),
                    '$dist': this.$el.find('.distance')
                };
            },

            render: function() {
                this.els.$note.html(this.model.get('note'));
                this.els.$tags.html(this.model.get('tags'));
                this.els.$dist.html(this.model.getDistance().round(2)+' km');
            },

            renderDistance: function() {
                this.els.$dist.html(this.model.getDistance().round(2)+' km');
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