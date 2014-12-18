
describe('pkgInstaller', function() {
    var mockPackages = [
        'KittenService:',
        'Leetmeme: Cyberportal',
        'Cyberportal: Ice',
        'CamelCaser: KittenService' ,
        'Fraudstream: Leetmeme',
        'Ice: KittenService'
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
        console.log(packageGraph.graphIndex);
    });
});