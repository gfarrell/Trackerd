/*
    Backbone Synchronisation with LocalStorage
    ------------------------------------------

    @provides   Backbone.sync
    @requires   Backbone, Core/String.extend
    @file       Sync.js
    @package    Trackerd/Core
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Backbone', 'Core/String.extend'], function(Backbone) {
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