/*
    Model: Place
    ------------

    @provides   Place
    @requires   libs/Backbone, libs/Underscore, libs/Mootools, Core/Location
    @file       Place.js
    @package    Trackerd/Models
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Backbone', 'Core/Location', 'Underscore', 'Mootools', 'Core/Sync'], function(Backbone, Location) {
    return Backbone.Model.extend({
        defaults: {
            tags: [],       // An array of tags for this Place
            location: null, // A Location object pointing to the Place
            note: ''        // User recorded notes
        },

        initialize: function() {
            var location_obj    = this.get('location'),
                tags_list       = this.get('tags');

            // Instantiate a location object to cope with location features
            if(location_obj === null) {
                location_obj = new Location(0,0);
            } else {
                if(!instanceOf(location_obj, Location)) {
                    location_obj = Location.newLocationFromArray(location_obj);
                }
            }

            // Add an event to the location to save on update
            location_obj.addEvent('update', function() {
                this.save({location: this.get('location')});
                this.trigger('change');
            }.bind(this));

            // Make sure the tag list is unique
            tags_list = _.uniq(tags_list);

            // Set these back into the model
            this.set({
                location:   location_obj,
                tags:       tags_list
            });
        },

        validate: function(attributes) {
            // Validate the location
            if(!instanceOf(attributes.location, Location)) {
                return 'Invalid location object, please try and set the location again.';
            }

            // Validate the tag list
            if(!instanceOf(attributes.tags, Array)) {
                return 'Tag list must be an array.';
            }

            // Validate the tags
            if(!attributes.tags.every(function(tag) { return instanceOf(tag, String); })) {
                return 'Tags can only be strings.';
            }
        },

        addTag: function(tag) {
            tag = ''+tag; // Make sure it is a string
            var tags = this.get('tags');
            if(!instanceOf(tags, Array)) {
                tags = [];
            } else {
                tags = tags.clone();
            }

            if(!tags.contains(tag)) {
                tags.push(tag);
            }

            this.save({'tags': tags});
        },
        removeTag: function(tag) {
            tag = ''+tag; // Make sure it is a string

            var tags = this.get('tags');

            if(!instanceOf(tags, Array)) {
                tags = [];
                return;
            } else {
                tags = tags.clone();
            }
            if(tags.contains(tag)) {
                tags.erase(tag);
            }

            this.save({'tags': tags});
        },
        hasTag: function(tag) {
            tags = this.get('tags');
            return tags.contains(tag);
        },

        setLocation: function(lat, lon) {
            var location = this.get('location');
            if(instanceOf(location, Location)) {
                location.position = [lat, long];
            } else {
                location = new Location(lat, lon);
            }
        },

        getDistance: function() {
            if(instanceOf(window.LocationTracker, Location)) {
                return window.LocationTracker.distanceTo(this.attributes.location);
            } else {
                throw new Error('LocationTracker is not initialised, cannot get current location.');
            }
        }
    });
});