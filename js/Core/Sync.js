/*
    Backbone Synchronisation with LocalStorage
    ------------------------------------------

    @provides   Backbone.sync
    @requires   Backbone, Core/String.extend, Core/LocalStorage
    @file       Sync.js
    @package    Trackerd/Core
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Backbone', 'Core/String.extend'], function(Backbone) {
    var Store = function(name) {
      this.name = name;
      var store = localStorage.getItem(this.name);
      this.data = (store && JSON.parse(store)) || {};
    };

    _.extend(Store.prototype, {
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

    Backbone.sync = function(method, model, options) {
        var resp,
            store = model.localStorage || model.collection.localStorage;

        switch (method) {
            case "read":    resp = model.id ? store.find(model) : store.findAll(); break;
            case "create":  resp = store.create(model);                            break;
            case "update":  resp = store.update(model);                            break;
            case "delete":  resp = store.destroy(model);                           break;
        }

        if (resp) {
            options.success(resp);
        } else {
            options.error("Record not found");
        }
    };
});