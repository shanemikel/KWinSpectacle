var ws = workspace;

function getActiveClient() {
    var client = ws.activeClient;
    if (client.moveable === true && client.resizeable === true)
        return client;
    return null;
}

var SizeSpec = {
    ONE_THIRD  : 'ONE_THIRD',
    ONE_HALF   : 'ONE_HALF',
    TWO_THIRDS : 'TWO_THIRDS'
};

var SectionSpec = {
    LEFT  : 'LEFT',
    RIGHT : 'RIGHT'
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

function registerKeys() {
    var str = 'Spectacle: Move active window left';
    print('Registering action for...', str);
    var res = registerShortcut(str, str, 'Ctrl+Meta+Left', function() {
        print('Recieved key combo: Ctrl+Meta+Left...');
        newGeo = GeometrySpec(SizeSpec.TWO_THIRDS, SectionSpec.LEFT);
        moveActiveClient(newGeo);
    });
    if (res === false)
        print('Failed to register shortcut');
    
    str = 'Spectacle: Move active window right';
    print('Registering action for...', str);
    res = registerShortcut(str, str, 'Ctrl+Meta+Right', function() {
        print('Recieved key combo: Ctrl+Meta+Right...');
        newGeo = GeometrySpec(SizeSpec.TWO_THIRDS, SectionSpec.RIGHT);
        moveActiveClient(newGeo);
    });
    if (res === false)
        print('Failed to register shortcut');
    
    print();
}

(function() {
    registerKeys();
})();
