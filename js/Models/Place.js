/*
    Model: Place
    ------------

    @provides   Place
    @requires   libs/Backbone, libs/Underscore, libs/Mootools, Core/Location
    @file       Place.js
    @package    Trackerd/Models
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Backbone', 'Underscore', 'Mootools'], function(Backbone, _) {
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
                location_obj = new Location([0,0]);
            } else {
                if(!instanceOf(location_obj, Location)) {
                    location_obj = new Location(location_obj);
                }
            }

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
            if(!instanceOf(attributes.location, Location) || !Location.validate()) {
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
            }

            if(!tags.contains(tag)) {
                tags.push(tag);
            }

            this.set({'tags': tags});
        },
        removeTag: function(tag) {
            tag = ''+tag; // Make sure it is a string

            var tags = this.get('tags');
            if(tags.contains(tag)) {
                tags.erase(tag);
            }
        }
    });
});