(function() {
    var ws = workspace;

    function getActiveClient() {
        var client = ws.activeClient;
        if (client.moveable === true && client.resizeable === true)
            return client;
        
        print('Active client is immovable (or fixed-size)...');
        return null;
    }

    var SizeSpec = {
        ONE_THIRD  : 0,
        ONE_HALF   : 1,
        TWO_THIRDS : 2
    };

    var SectionSpec = {
        LEFT  : 0,
        RIGHT : 1
    };

    function GeometrySpec(sizeSpec, sectionSpec) {
        var pos = {
            size    : sizeSpec,
            section : sectionSpec
        };
        return pos;
    }

    function Geometry(area, geoSpec) {
        var geo = {
            x      : 0,
            y      : 0,
            width  : 0,
            height : 0
        };
        geo.height = area.height;
        var s = SizeSpec;
        switch (geoSpec.size) {
        case s.ONE_THIRD:
            geo.width = Math.floor(area.width /3);
            break;
        case s.ONE_HALF:
            geo.width = Math.floor(area.width /2);
            break;
        case s.TWO_THIRDS:
            geo.width = Math.floor(area.width * 2/3);
            break;
        }
        s = SectionSpec;
        switch (geoSpec.section) {
        case s.LEFT:
            break;
        case s.RIGHT:
            geo.x = area.width - geo.width;
            break;
        }
        return geo;
    }

    function ScreenArea(client) {
        var area = {
            width  : 0,
            height : 0
        };
        var scr = client.screen;
        var scrArea = ws.clientArea(0, scr, 0);
        area.width  = scrArea.width;
        area.height = scrArea.height;
        return area;
    }

    function getGeometry(client) {
        return client.geometry;
    }

    function setGeometry(client, geo) {
        cgeo = client.geometry;
        cgeo.x      = geo.x;
        cgeo.y      = geo.y;
        cgeo.width  = geo.width;
        cgeo.height = geo.height;
        client.geometry = cgeo;
    }

    function printGeometry(geo) {
        print('Geometry {');
        print('    x =', geo.x, '; y =', geo.y, ';');
        print('    width =', geo.width, '; height =', geo.height, ';');
        print('}');
    }

    function printArea(area) {
        print('Area {');
        print('    width =', area.width, '; height =', area.height, ';');
        print('}');
    }

    function moveActiveClient(geoSpec) {
        var client = getActiveClient();
        if (client !== null) {
            var area = ScreenArea(client);
            var newGeo = Geometry(area, geoSpec);    
            setGeometry(client, newGeo);
            
            print('New geometry for client:');
            printGeometry(getGeometry(client));
            print();
        }
    }
    
    var clientMap = {};
    
    function cycle(sectionSpec) {
        var client = getActiveClient();
        var geoSpec;

        if (clientMap[client] === undefined) {
            print('Client not yet managed...');
            
            print('Registering client cleanup signal...');
            ws.clientRemoved.connect(function(client_) {
                print('Client removed...');
                if (client === client_) {
                    print('Client previously managed; Performing cleanup...');
                    clientMap[client] = undefined;
                }
            });
            
            print('Registering client moved signal...');
            client.moveResizedChanged.connect(function() {
                print('Client moved by user; Unregistering...');
                clientMap[client] = undefined;
            });
            
            print('Moving to new section...');
            geoSpec = GeometrySpec(SizeSpec.ONE_HALF, sectionSpec);
        } else {
            print('Client previously managed...');
            if (clientMap[client].section !== sectionSpec) {
                print('Moving to new section...');
                geoSpec = GeometrySpec(SizeSpec.ONE_HALF, sectionSpec);
            } else {
                print('Will cycle client size...');
                geoSpec = clientMap[client];
                geoSpec.size = (geoSpec.size + 1) % 3;
            }
        }
        
        clientMap[client] = geoSpec;
        moveActiveClient(geoSpec);
    }
        
    function registerKeys() {
        var str = 'Spectacle: Cycle Left';
        print('Registering action for...', str);
        var res = registerShortcut(str, str, 'Ctrl+Meta+Left', function() {
            print('Recieved key combo: Ctrl+Meta+Left...');
            // newGeo = GeometrySpec(SizeSpec.TWO_THIRDS, SectionSpec.LEFT);
            // moveActiveClient(newGeo);
            cycleActiveClient(SectionSpec.LEFT);
        });
        if (res === false)
            print('Failed to register shortcut');
        
        str = 'Spectacle: Cycle Right';
        print('Registering action for...', str);
        res = registerShortcut(str, str, 'Ctrl+Meta+Right', function() {
            print('Recieved key combo: Ctrl+Meta+Right...');
            // newGeo = GeometrySpec(SizeSpec.TWO_THIRDS, SectionSpec.RIGHT);
            // moveActiveClient(newGeo);
            cycleActiveClient(SectionSpec.RIGHT);
        });
        if (res === false)
            print('Failed to register shortcut');
        
        print();
    }

    registerKeys();
})();
