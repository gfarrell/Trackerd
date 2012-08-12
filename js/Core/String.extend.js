/*
    String Extensions
    -----------------

    @requires   Mootools
    @file       String.extend.js
    @package    Trackerd/Core
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(['Mootools'], function() {
    String.UUID = function() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };

        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    String.implement({
        /**
         * Parses a string for boolean values.
         * true, yes, 1     =>  true
         * false, no, 0, "" =>  false
         */
        toBool: function() {
            if(["true", "yes", "1"].contains(""+this.toLowerCase())) {
                return true;
            }
            
            if(["false", "no", "0", ""].contains(""+this.toLowerCase())) {
                return false;
            }
            
            return Boolean(""+this);
        }
    });
});