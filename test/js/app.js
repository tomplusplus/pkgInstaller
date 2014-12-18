
describe('pkgInstaller', function() {
    var mockPackages = [
        'KittenService:',
        'Leetmeme: Cyberportal',
        'Cyberportal: Ice',
        'CamelCaser: KittenService' ,
        'Fraudstream: Leetmeme',
        'Ice: KittenService'
        ],
        parsedPackages = [];

    it('should parse out packages into a multi-dimensional array', function(){
        // expect parsed packages to return a multi-dimensional array
    });

    it('should list all packages in correct order', function() {
        //var packageList = new PackageList(mockPackages);
        parsedPackages.forEach(function(pkg){
            //expect each package dependency to have a lower index value than its own.
            //expect to find no cycles
        });
    });
});