/*
    AppView
    -------

    @file       App.js
    @package    Trackerd/Views
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone', 'Core/Location', 'Collections/Places', 'Views/ControlBar', 'Views/EditPlace', 'Views/PlacesList', 'text!Templates/DeleteModal.html'],
    function(Backbone, Location, Places, ControlBarView, EditPlaceView, PlacesListView, DeleteModalHtml) {
        return Backbone.View.extend({
            tagName: 'div',
            className: 'Trackerd container',

            events: {
                'click .delete-confirm': 'deletePlace'
            },

            initialize: function(attrs) {
                this.__nc = attrs.__nc;                                         // Store the event aggregator

                // Register for some events
                this.__nc.on('showList', this.showList, this);                  // showList -> show the list
                this.__nc.on('editPlace', this.showEditWindow, this);           // editPlace -> show the edit window (EditPlaceView)
                this.__nc.on('deletePlace', this.placeDeleted, this);           // deletePlace -> trigger delete action on Place
                this.__nc.on('addPlace', this.showAddWindow, this);             // newPlace -> show the new place window (EditPlaceView)
                this.__nc.on('filterNearby', this.filterNearby, this);          // filterNearby -> run a filter on the list
                this.__nc.on('confirmDelete', this.confirmDelete, this);        // confirmDelete -> show a delete confirmation dialogue using Bootstrap.modal

                this.Views = {};                                                // this.Views will hold the view classes that we will use

                this.ControlBar = new ControlBarView({__nc: this.__nc});        // We need to initialise the control bar, passing the event aggregator
                this.ControlBar.$el.appendTo(this.$el);                         // Bring the ControlBar into the document

                this.$main = $(this.make('div', {'class':'container'}));        // Create a main .container div
                this.$main.appendTo(this.$el);                                  // And add it into the $el

                this.$deleteModal = $(DeleteModalHtml);                         // Create a modal window from the loaded html
                this.$deleteModal.appendTo(this.$el);                           // Append it to the $el

                this.render();                                                  // Finally render the view, now that we're set up :)
            },

            loadView: function(view) {
                if(instanceOf(view, Backbone.View)) {                           // We can only deal with instances of Backbone.view
                    this.clear();                                               // Clear our contents
                    view.$el.appendTo(this.$main);
                    this._loaded = view;

                    view.render();
                } else {
                    throw new Error('AppView can only load instances of Backbone.View.');
                }
            },

            lazyLoadView: function(name) {
                var view = null,
                    func = '__bootstrap'+name;

                switch(name) {
                    case 'PlacesList':
                        view = PlacesListView;
                        break;
                    case 'EditPlace':
                        view = EditPlaceView;
                        break;
                    default:
                        throw new Error('Unknown view to load: '+name);
                }

                if(!instanceOf(this.Views[name], view)) {
                    this.Views[name] = new view({__nc: this.__nc});
                    if(instanceOf(this[func], Function)) {
                        this[func].call(this, this.Views[name]);
                    }
                }

                this.loadView(this.Views[name]);
            },

            __bootstrapEditPlace: function(view) {
                view.on('all', this.showList, this);    // add, save, cancel events need list showing.
            },

            render: function() {
                if(instanceOf(this._loaded, Backbone.View)) {
                    this._loaded.render();
                }

                this.delegateEvents();
            },

            clear: function() {
                if(instanceOf(this._loaded, Backbone.View)) {
                    this._loaded.remove();
                }
                this.$main.empty();
            },

            showAddWindow: function() {
                this.lazyLoadView('EditPlace');

                this.Views.EditPlace.primeForNew();
            },
            showEditWindow: function(cid) {
                this.lazyLoadView('EditPlace');

                if(cid !== undefined) {
                    var pl = Places.getByCid(cid);
                    if(pl !== undefined && pl !== null) {
                        this.Views.EditPlace.primeForEdit(pl);
                    }
                } else {
                    throw new Error('No such Place with cid '+cid+'.');
                }
            },
            showList: function() {
                this.lazyLoadView('PlacesList');
            },
            filterNearby: function() {
                console.log('What\'s nearby?');
            },

            confirmDelete: function(model) {
                this.$deleteModal.data('model', model);
                this.$deleteModal.modal('show');
            },
            deletePlace: function() {
                this.$deleteModal.data('model').destroy();
            }
        });
    }
);