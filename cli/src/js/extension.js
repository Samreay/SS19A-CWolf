String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.pad = function(width) {
    return this.length >= width ? this : new Array(width - this.length + 1).join('0') + this;
};
String.prototype.spacePad = function(width) {
    return this.length >= width ? this : this + new Array(width - this.length + 1).join(' ');
};
// RS: I think this is a bad idea because we use Arrays in the unit tests to convert matrices to Arrays.
// Use makeUnique instead
/*
Array.prototype.unique = function() {
    var a = [];
    for (var i=0, l=this.length; i<l; i++)
        if (a.indexOf(this[i]) === -1)
            a.push(this[i]);
    return a;
};
*/