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

                this.$tags = this.$el.find('input[name=tags]');
                this.$note = this.$el.find('textarea[name=note]');

                this.delegateEvents();
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

            preSave: function() {
                this.$tags.val(this.$tags.val().replace(/,(\s+)/g, ','));
                if(this.$note.val() === '') {
                    alert('Note cannot be empty.');
                }
            },

            save: function() {
                this.preSave();

                if(!this._new) {
                    this.trigger('save', this.model);
                } else {
                    this.trigger('add', {
                        note: this.$note.val(),
                        tags: this.$tags.val()
                    });
                }
            },
            cancel: function() {
                this.trigger('cancel');
            }
        });
    }
);