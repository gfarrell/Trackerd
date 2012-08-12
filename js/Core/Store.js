/*
    Store - LocalStorage for Backbone Models
    ----------------------------------------

    @provides   Store
    @requires   Underscore, Mootools
    @file       Store.js
    @package    Trackerd/Core
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Underscore','Mootools'], function() {
    return new Class({
        initialize: function(name) {
            this.name = name;
            var store = localStorage.getItem(this.name);
            this.data = (store && JSON.parse(store)) || {};
        },

        save: function() {
            localStorage.setItem(this.name, JSON.encode(this.data));
        },
        create: function(model) {
            if (!model.id) model.id = model.attributes.id = String.UUID();
            this.data[model.id] = model;
            this.save();
            return model;
        },
        update: function(model) {
            this.data[model.id] = model;
            this.save();
            return model;
        },
        find: function(model) {
            return this.data[model.id];
        },
        findAll: function() {
            return _.values(this.data);
        },
        destroy: function(model) {
            delete this.data[model.id];
            this.save();
            return model;
        }
    });
});