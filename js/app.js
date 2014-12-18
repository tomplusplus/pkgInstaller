/**
 * Package Installer
 * Created by Tom on 12/17/14.
 */
'use strict';

//TODO Check for cycles


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


    // Package Graph - edge counting method
    function PackageDependencyGraph(){
        this.dependencies = {};
        this.orderedPackages = [];
        this.noCycles = true;
        this.writeOut = function(){
            this.orderedPackages.foreach(function(pkg){
                console.log(pkg);
            });
        };

    }
    PackageDependencyGraph.prototype.addDependency = function(pkg,dep){
        if (!this.dependencies.hasOwnProperty(pkg)){
            this.dependencies[pkg] = [];
        }
        if(dep.length > 0) {
            if (!this.dependencies.hasOwnProperty(dep)) {
                this.dependencies[dep] = [];
            }
            this.dependencies[dep].push(pkg);
        }
    };


    PackageDependencyGraph.prototype.orderDependencies = function(){
        var _this = this,
            hasCycles = false;
        this.orderedPackages = Object.keys(this.dependencies);
        this.orderedPackages.forEach(function(pkg){
            _this.checkForCycles(pkg,_this.dependencies[pkg]);
        });
        if(!this.noCycles){
            return false;
        }
        this.orderedPackages.sort(function (a, b) {
            return _this.getEdgeCount(b) - _this.getEdgeCount(a);
        });
        return this.orderedPackages;

    };

    PackageDependencyGraph.prototype.checkForCycles = function(pkg,deps){
        var _this = this;
        return deps.forEach(function (dep) {
            if (_this.dependencies[dep].length > 0) {
                if (pkg !== dep) {
                    _this.checkForCycles(pkg, _this.dependencies[dep]);
                } else {
                    _this.noCycles = false;
                    _this.orderedPackages = ['Rejected due to circular referance on '+ pkg];
                    console.log(pkg + " has a circular reference");
                }
            }
        });
    };

    PackageDependencyGraph.prototype.getEdgeCount = function(pkg){
        var _this = this,
            count = 0;
        //recursion is fun!
        this.dependencies[pkg].unique().forEach(function(n){
            count += 1 + _this.getEdgeCount(n);
        });
        return count;
    };





// View logic
    var input = document.getElementById("pkgPackages"),
        output = document.getElementById("pkgPackagesOrdered"),
        packages = [
            'KittenService: TomInstaller',
            'Leetmeme: Cyberportal',
            'Cyberportal: Ice',
            'CamelCaser: KittenService' ,
            'Fraudstream: Leetmeme',
            'Ice: KittenService',
            'TomInstaller: CamelCaser'
        ],
        packagesHtml = '',
        outputHtml = '',
        parsedPkgs = parsePackages(packages),
        pkgGraph = new PackageDependencyGraph();

    packages.forEach(function(pkg){
        packagesHtml += '<div>'+ pkg +'</div>';
    });

    if(!input) {
        input = document.createElement("DIV");
        output = document.createElement("DIV");
    }

    input.innerHTML = packagesHtml;

    parsedPkgs.forEach(function(pkg){
        pkgGraph.addDependency(pkg[0],pkg[1]);
    });
    pkgGraph.orderDependencies();

    packages.forEach(function(pkg){
        packagesHtml += '<div>'+ pkg +'</div>';
    });
    pkgGraph.orderedPackages.forEach(function(pkg){
        outputHtml += '<div>'+ pkg +'</div>';
    });
    output.innerHTML = outputHtml;


