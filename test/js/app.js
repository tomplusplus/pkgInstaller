
describe('pkgInstaller', function() {

    var mockPackages = [
        'KittenService: TomInstaller',
        'Leetmeme: Cyberportal',
        'Cyberportal: Ice',
        'CamelCaser: KittenService' ,
        'Fraudstream: Leetmeme',
        'Ice: KittenService',
        'TomInstaller: '
        ],
        parsedPackages = parsePackages(mockPackages),
        packageGraph = new PackageDependencyGraph();

        parsedPackages.forEach(function(pkg){
            packageGraph.addDependency(pkg[0],pkg[1]);
        });



    it('should parse out packages into a multi-dimensional array', function(){
        expect(parsedPackages).toBeDefined();
        parsedPackages.forEach(function(p,i){
            expect((p[0]+p[1])).toEqual(mockPackages[i].replace(": ",'').replace(':',''));
        });
    });

    it('should list all packages in correct order', function() {
        expect(packageGraph).toBeDefined();
        packageGraph.orderDependencies();
        if(packageGraph.noCycles) {
            parsedPackages.forEach(function (pkg) {
                if (pkg.length > 1 && pkg[1].length > 1) { //if package has a dependency, check that it's index is higher than its dependency
                    var p = packageGraph.orderedPackages.indexOf(pkg[0]);
                    var d = packageGraph.orderedPackages.indexOf(pkg[1]);
                    expect((p >= 0)).toEqual(true);
                    expect((d >= 0)).toEqual(true);
                    expect((p > d)).toEqual(true);
                }

            });
        };
    });
});