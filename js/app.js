/**
 * Package Installer
 * Created by Tom on 12/17/14.
 */
'use strict';

function parsePackages(packages){
    var parsed = [];
    packages.forEach(function(pkg){
        var delimiter = pkg.indexOf(": ") >= 0? ": ": ":";
        parsed.push(pkg.split(delimiter));
    });
    return parsed;
}

function PackageDependencyGraph(){
    this.dependencies = {};
    this.graphIndex = [];
    this.orderedPackages = [];
    //TODO write out packages in proper order
}
PackageDependencyGraph.prototype.addDependency = function(pkg,dep){
    var _this = this;
    this.graphIndex.push(pkg);
    this.graphIndex.push(dep);
    if (!this.dependencies.hasOwnProperty(dep)){
        this.dependencies[dep] = [];
    }
    this.dependencies[dep].push(pkg);

    //TODO find a way to chain dependencies together
    //chain dependencies : recursion is fun!!!
    if(typeof this.dependencies[pkg] !== 'undefined'){
        this.dependencies[pkg].forEach(function(p){
            _this.addDependency(p,dep);
        });
    }
};

//TODO sort order of dependencies
PackageDependencyGraph.prototype.orderDependencies = function(){

};
