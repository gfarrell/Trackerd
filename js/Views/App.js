/*
    AppView
    -------

    @file       App.js
    @package    Trackerd/Views
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone', 'Core/Location', 'Collections/Places', 'Views/ControlBar', 'Views/EditPlace', 'Views/PlacesList'],
    function(Backbone, Location, Places, ControlBarView, EditPlaceView, PlacesListView) {
        return Backbone.View.extend({
            tagName: 'div',
            className: 'Trackerd',

            actions: {
                'add': 'showAddWindow',
                'list': 'showList',
                'nearMe': 'filterNearMe'
            },

            initialize: function(attrs) {
                this.Views = {};

                this.ControlBar = new ControlBarView();
                this.ControlBar.$el.appendTo(this.$el);

                this.ControlBar.on('action:toggleTracking', this.toggleTracking);

                Object.each(this.actions, function(method, action) {
                    this.ControlBar.on('action:'+action, this[method], this);
                }, this);

                this.$main = $(this.make('div', {'class':'container'}));
                this.$main.appendTo(this.$el);

                if(instanceOf(attrs.load, Backbone.View)) {
                    this.loadView(attrs.load);
                }

                this.render();
            },

            loadView: function(view) {
                if(instanceOf(view, Backbone.View)) {
                    this.clear();
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
                    this.Views[name] = new view();
                    if(instanceOf(this[func], Function)) {
                        this[func].call(this, this.Views[name]);
                    }
                }

                this.loadView(this.Views[name]);
            },

            __bootstrapEditPlace: function(view) {
                view.on('save', this.showList, this);
                view.on('add', function(data) {
                    Places.create({
                        note: data.note,
                        tags: data.tags.split(','),
                        location: Location.newFromCurrentLocation()
                    });
                    this.showList();
                }, this);
            },

            render: function() {
                if(instanceOf(this._loaded, Backbone.View)) {
                    this._loaded.render();
                }
            },

            clear: function() {
                if(instanceOf(this._loaded, Backbone.View)) {
                    this._loaded.remove();
                }
                this.$main.empty();
            },

            showAddWindow: function() {
                this.lazyLoadView('EditPlace');
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
            filterNearMe: function() {
                console.log('What\'s nearby?');
            },

            toggleTracking: function() {
                if(instanceOf(window.LocationTracker, Location)) {
                    window.LocationTracker.trackLocation();
                }
            }
        });
    }
);