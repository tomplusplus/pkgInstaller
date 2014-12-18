/**
 * Package Installer
 * Created by Tom on 12/17/14.
 */
'use strict';

//extend Array prototype to have a unique function
Array.prototype.unique = function(){
    return this.filter(function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    });
};

//Parse String into multifunction array
function parsePackages(packages){
    var parsed = [];
    packages.forEach(function(pkg){
        var delimiter = pkg.indexOf(": ") >= 0? ": ": ":";
        parsed.push(pkg.split(delimiter));
    });
    return parsed;
}


// Package Graph
function PackageDependencyGraph(){
    this.dependencies = {};
    this.graphIndex = [];
    this.orderedPackages = [];
    this.writeOut = function(){

    };

}
PackageDependencyGraph.prototype.addDependency = function(pkg,dep){
    var _this = this;
    this.graphIndex.push(pkg);
    if(dep.length > 0) {
        this.graphIndex.push(dep);
        if (!this.dependencies.hasOwnProperty(dep)) {
            this.dependencies[dep] = [];
        }
        this.dependencies[dep].push(pkg);
    }

    //chain dependencies : recursion is fun!!!
    if(typeof this.dependencies[pkg] !== 'undefined'){
        this.dependencies[pkg].forEach(function(p){
            _this.addDependency(p,dep);
        });
    }
};

PackageDependencyGraph.prototype.orderDependencies = function(){
    var _this = this;
    //Get the dependencies
    var dep = this.dependencies;
    var keys = Object.keys(dep);
    keys.sort(function(a, b){
        return dep[b].unique().length - dep[a].unique().length;
    });
    keys.forEach(function(k){
        _this.orderedPackages.push(k);
    });

    //Get the packages with no dependencies
    var indices = this.graphIndex.unique();
    indices.forEach(function(i){
        if (!dep.hasOwnProperty(i)){
            _this.orderedPackages.push(i);
        }
    });
    return this.orderedPackages;
};

