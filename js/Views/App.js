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
            className: 'Trackerd',

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
                    view.$el.appendTo(this.$main);                              // Append the view element to our main container
                    this._loaded = view;                                        // Store the loaded view

                    view.render();                                              // Explicitly render the view
                } else {
                    throw new Error('AppView can only load instances of Backbone.View.');
                }
            },

            lazyLoadView: function(name) {
                var view = null,
                    func = '__bootstrap'+name;                                  // The bootstrap function name - this will be called after initialisation

                switch(name) {                                                  // Possible views are hard-coded
                    case 'PlacesList':
                        view = PlacesListView;
                        break;
                    case 'EditPlace':
                        view = EditPlaceView;
                        break;
                    default:
                        throw new Error('Unknown view to load: '+name);
                }

                if(!instanceOf(this.Views[name], view)) {                       // Check that the stored view is of the right inheritance
                    this.Views[name] = new view({__nc: this.__nc});             // Otherwise initialise a new one
                    if(instanceOf(this[func], Function)) {
                        this[func].call(this, this.Views[name]);                // Call the bootstrap function if it exists
                    }
                }

                this.loadView(this.Views[name]);                                // Now load the view
            },

            __bootstrapEditPlace: function(view) {
                view.on('all', this.showList, this);                            // add, save, cancel events need list showing.
            },

            render: function() {
                if(instanceOf(this._loaded, Backbone.View)) {
                    this._loaded.render();                                      // Render the loaded view if it exists
                }

                this.delegateEvents();                                          // Force delegateEvents
            },

            clear: function() {
                if(instanceOf(this._loaded, Backbone.View)) {
                    this._loaded.remove();                                      // Remove the currently loaded view
                }
                this.$main.empty();                                             // Clear the contents of the container
            },

            showAddWindow: function() {
                this.lazyLoadView('EditPlace');

                this.Views.EditPlace.primeForNew();                             // Adding a new place requires that we clear the form
            },
            showEditWindow: function(cid) {
                this.lazyLoadView('EditPlace');

                if(cid !== undefined) {
                    var pl = Places.getByCid(cid);                              // Fetch the relevant Place
                    if(pl !== undefined && pl !== null) {
                        this.Views.EditPlace.primeForEdit(pl);                  // If it exists, let's set up the EditPlaceView to edit
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
                this.$deleteModal.data('model', model);                         // Set the data-model attribute on the delete modal for easy access
                this.$deleteModal.modal('show');                                // Show the modal
            },
            deletePlace: function() {
                this.$deleteModal.data('model').destroy();                      // Destroy the model now that the action has been confirmed
            }
        });
    }
);