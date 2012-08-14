/*
    EditPlaceView
    -------------

    @requires   Underscore, Backbone, Collections/Places, Models/Place, Templates/EditPlace
    @file       EditPlace.js
    @package    Trackerd/Views
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Underscore', 'Backbone','Collections/Places','Models/Place', 'text!Templates/EditPlace.html'],
    function(_U, Backbone, Places, Place, edit_html) {
        return Backbone.View.extend({
            tagName: 'div',
            className: 'edit-window',

            events: {
                'click .btn[data-action=save]':   'save',
                'click .btn[data-action=cancel]': 'cancel'
            },

            initialize: function() {
                this.Template = _.template(edit_html);
                this._new = true;
                this.render();
            },

            render: function() {
                this.$el.empty();

                var template_opts = {
                    edit: !this._new
                };
                if(!this._new) {
                    template_opts.tags = this.model.get('tags').toString();
                    template_opts.note = this.model.get('note');
                    template_opts.id   = this.model.get('cid');
                }

                this.$el.append(this.Template(template_opts));
            },

            primeForNew: function() {
                this.model = null;
                this._new = true;

                this.render();
            },

            primeForEdit: function(model) {
                this.model = (instanceOf(model, Backbone.Model) ? model : null);
                this._new = (this.model !== null);

                this.render();
            },

            save: function() {},
            cancel: function() {}
        });
    }
);