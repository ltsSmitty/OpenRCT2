"use strict";
var EntityViewer;
(function (EntityViewer) {
    var WINDOW_CLASS = 'devtools.window.entityviewer';
    var TOOL_ID = 'devtools.tool.entityviewer';
    var entityId;
    function register() {
        ui.registerMenuItem('Entity Viewer', function () {
            ui.activateTool({
                id: TOOL_ID,
                cursor: "cross_hair",
                onDown: function (e) {
                    if (e.entityId) {
                        getOrOpen(e.entityId);
                    }
                }
            });
        });
    }
    EntityViewer.register = register;
    function getOrOpen(id) {
        entityId = id;
        var w = ui.getWindow(WINDOW_CLASS);
        if (w) {
            w.bringToFront();
        }
        else {
            open();
        }
    }
    function open() {
        var window = ui.openWindow({
            classification: WINDOW_CLASS,
            title: '',
            width: 300,
            height: 500,
            minWidth: 300,
            minHeight: 300,
            maxWidth: 500,
            maxHeight: 1200,
            widgets: [
                {
                    type: "listview",
                    name: "rve-debug-list",
                    scrollbars: "both",
                    columns: [
                        {
                            width: 130
                        },
                        {}
                    ],
                    isStriped: true,
                    canSelect: true,
                    x: 5,
                    y: 20,
                    width: 290,
                    height: 575,
                    onClick: function (i, c) { return console.log("Clicked item ".concat(i, " in column ").concat(c)); }
                }
            ],
            onClose: function () { return onClose(); },
            onUpdate: function () { return onUpdate(); }
        });
        function onClose() {
            var tool = ui.tool;
            if (tool && tool.id == TOOL_ID) {
                tool.cancel();
            }
        }
        function onUpdate() {
            updateInfo();
        }
        function set(items) {
            var list = window.findWidget("rve-debug-list");
            list.width = window.width - 10;
            list.height = window.height - 36;
            list.items = items;
        }
        function updateInfo() {
            var _a, _b;
            window.title = "Entity Viewer: #".concat(entityId);
            var entity = map.getEntity(entityId);
            if (!entity) {
                set([["Entity does not exist anymore.", ""]]);
                return;
            }
            var sep = function (text) { return ({ type: 'seperator', text: text }); };
            var data = [
                sep('Entity'),
                ["Id:", entity.id.toString()],
                ["Type:", entity.type.toString()],
                ["Position:", "".concat(entity.x, ", ").concat(entity.y, ", ").concat(entity.z)]
            ];
            switch (entity.type) {
                case "car":
                    var car = entity;
                    data = data.concat([
                        ["", ""],
                        sep('Car'),
                        ["Ride id", car.ride.toString()],
                        ["Ride object id", car.rideObject.toString()],
                        ["Vehicle object id", car.vehicleObject.toString()],
                        ["Sprite type", car.spriteType.toString()],
                        ["Num. of seats", car.numSeats.toString()],
                        ["Next car on train", (_b = (_a = car.nextCarOnTrain) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "null"],
                        ["Next car on ride", car.nextCarOnRide.toString()],
                        ["Previous car on ride", car.previousCarOnRide.toString()],
                        ["Current station", car.currentStation.toString()],
                        ["", ""],
                        ["Mass:", car.mass.toString()],
                        ["Acceleration:", car.acceleration.toString()],
                        ["Banking rotation:", car.bankRotation.toString()],
                        ["Colours", "body: ".concat(car.colours.body, ", trim: ").concat(car.colours.trim, ", ternary: ").concat(car.colours.ternary)],
                        ["Powered acceleration:", car.poweredAcceleration.toString()],
                        ["Powered max. speed:", car.poweredMaxSpeed.toString()],
                        ["Status:", car.status.toString()],
                        ["Guests:", car.guests.map(function (p) { return (p == null) ? "null" : p.toString(); }).toString()],
                        ["", ""],
                        ["Track location", "".concat(car.trackLocation.x, ", ").concat(car.trackLocation.y, ", ").concat(car.trackLocation.z, ", dir: ").concat(car.trackLocation.direction)],
                        ["Track progress", car.trackProgress.toString()],
                        ["Remaining distance", car.remainingDistance.toString()],
                    ]);
                    var rideObject = context.getObject("ride", car.rideObject);
                    var vehicleObject = rideObject.vehicles[car.vehicleObject];
                    data = data.concat([
                        ["", ""],
                        sep('VehicleObject'),
                        ["Rotation frame mask:", vehicleObject.rotationFrameMask.toString()],
                        ["Num. of vertical frames:", vehicleObject.numVerticalFrames.toString()],
                        ["Num. of horizontal frames:", vehicleObject.numHorizontalFrames.toString()],
                        ["Spacing:", vehicleObject.spacing.toString()],
                        ["Car mass:", vehicleObject.carMass.toString()],
                        ["Tab height:", vehicleObject.tabHeight.toString()],
                        ["Num. of seats:", vehicleObject.numSeats.toString()],
                        ["", ""],
                        ["Sprite flags:", vehicleObject.spriteFlags.toString()],
                        ["Sprite width:", vehicleObject.spriteWidth.toString()],
                        ["Sprite height:", vehicleObject.spriteHeightPositive.toString()],
                        ["Animation:", vehicleObject.animation.toString()],
                        ["Flags:", vehicleObject.flags.toString()],
                        ["", ""],
                        ["Num. of vehicle images:", vehicleObject.noVehicleImages.toString()],
                        ["Num. of seating rows:", vehicleObject.noSeatingRows.toString()],
                        ["Spinning inertia:", vehicleObject.spinningInertia.toString()],
                        ["Spinning friction:", vehicleObject.spinningFriction.toString()],
                        ["Friction sound id:", vehicleObject.frictionSoundId.toString()],
                        ["Logflume reverser vehicle:", vehicleObject.logFlumeReverserVehicleType.toString()],
                        ["Sound range:", vehicleObject.soundRange.toString()],
                        ["Double sound frequency:", vehicleObject.doubleSoundFrequency.toString()],
                        ["", ""],
                        ["Powered acceleration:", vehicleObject.poweredAcceleration.toString()],
                        ["Powered max speed:", vehicleObject.poweredMaxSpeed.toString()],
                        ["Car visual:", vehicleObject.carVisual.toString()],
                        ["Effect visual:", vehicleObject.effectVisual.toString()],
                        ["Draw order:", vehicleObject.drawOrder.toString()],
                    ]);
                    data = data.concat([
                        ["", ""],
                        sep('RideObject'),
                        ["Type:", rideObject.type.toString()],
                        ["Index:", rideObject.index.toString()],
                        ["Identifier:", rideObject.identifier.toString()],
                        ["Legacy id:", rideObject.legacyIdentifier.toString()],
                        ["Name:", rideObject.name.toString()],
                        //["Name:", rideObject.exc],
                        ["", ""],
                        ["Capacity:", rideObject.capacity.toString()],
                        ["Flags:", rideObject.flags.toString()],
                        ["Ride type:", rideObject.rideType.map(function (r) { return (r == null) ? "null" : r.toString(); }).toString()],
                        ["", ""],
                        ["Min. cars in train:", rideObject.minCarsInTrain.toString()],
                        ["Max. cars in train:", rideObject.maxCarsInTrain.toString()],
                        ["Cars per flatride:", rideObject.carsPerFlatRide.toString()],
                        ["Seatless cars:", rideObject.zeroCars.toString()],
                        ["", ""],
                        ["Tab vehicle:", rideObject.tabVehicle.toString()],
                        ["Default vehicle:", rideObject.defaultVehicle.toString()],
                        ["Front vehicle:", rideObject.frontVehicle.toString()],
                        ["Second vehicle:", rideObject.secondVehicle.toString()],
                        ["Third vehicle:", rideObject.thirdVehicle.toString()],
                        ["Rear vehicle:", rideObject.rearVehicle.toString()],
                        ["", ""],
                        ["Excitement multiplier:", rideObject.excitementMultiplier.toString()],
                        ["Intensity multiplier:", rideObject.intensityMultiplier.toString()],
                        ["Nausea multiplier:", rideObject.nauseaMultiplier.toString()],
                        ["Max height:", rideObject.maxHeight.toString()],
                        ["Shop items:", "".concat(rideObject.shopItem, ", ").concat(rideObject.shopItemSecondary)],
                    ]);
            }
            set(data);
        }
    }
})(EntityViewer || (EntityViewer = {}));
var ImageList;
(function (ImageList) {
    var WINDOW_CLASS = 'devtools.window.imagelist';
    function register() {
        ui.registerMenuItem('Image List', function () {
            getOrOpen();
        });
    }
    ImageList.register = register;
    function getOrOpen() {
        var w = ui.getWindow(WINDOW_CLASS);
        if (w) {
            w.bringToFront();
        }
        else {
            open();
        }
    }
    ImageList.getOrOpen = getOrOpen;
    function open() {
        var startId = 14222;
        var nextId = 0;
        var showImageBorders = false;
        var primaryChecked = false;
        var secondaryChecked = false;
        var primaryColour = 4;
        var secondaryColour = 18;
        var ternaryColour = 30;
        var width = ui.width - 64;
        var height = ui.height - 96;
        var window = ui.openWindow({
            classification: WINDOW_CLASS,
            title: 'Image List',
            x: (ui.width - width) / 2,
            y: (ui.height - height) / 2,
            width: width,
            height: height,
            minWidth: width,
            minHeight: height,
            maxWidth: 1500,
            maxHeight: 1200,
            widgets: [
                { type: 'groupbox', x: 8, y: 16, width: 286, height: 100 },
                { type: 'colourpicker', name: 'clrPrimary', onChange: function (c) { return onPrimaryColourChange(c); }, x: 16, y: 28, width: 12, height: 12 },
                { type: 'checkbox', name: 'chkPrimary', x: 32, y: 28, width: 100, height: 14, isChecked: true, text: 'Primary' },
                { type: 'colourpicker', name: 'clrSecondary', onChange: function (c) { return onSecondaryColourChange(c); }, x: 16, y: 42, width: 12, height: 12 },
                { type: 'checkbox', name: 'chkSecondary', x: 32, y: 42, width: 100, height: 14, isChecked: true, text: 'Secondary' },
                { type: 'colourpicker', name: 'clrTernary', onChange: function (c) { return onTernaryColourChange(c); }, x: 16, y: 56, width: 12, height: 12 },
                { type: 'checkbox', x: 32, y: 56, width: 100, height: 14, text: 'Blend' },
                { type: 'label', x: 16, y: 74, width: 50, height: 14, text: 'Palette:' },
                { type: 'spinner', name: 'spnPalette', x: 68, y: 72, width: 100, height: 14, text: '0', onDecrement: function () { return onDecrementPalette(); }, onIncrement: function () { return onIncrementPalette(); } },
                { type: 'label', x: 16, y: 92, width: 50, height: 14, text: 'Start ID:' },
                { type: 'spinner', name: 'spnStartId', x: 68, y: 90, width: 100, height: 14, text: startId.toString(), onClick: function () { return onSelectId(); }, onDecrement: function () { return onDecrementId(); }, onIncrement: function () { return onIncrementId(); } },
                { type: 'custom', name: 'imageChart', x: 300, y: 20, width: 1200, height: 96, onDraw: function (g) { onDrawChart(this, g); } },
                { type: 'custom', name: 'imageList', x: 8, y: 122, width: 200, height: 100, onDraw: function (g) { onDrawImages(this, g); } }
            ],
            onUpdate: function () { return onUpdate(); }
        });
        function onSelectId() {
            ui.showTextInput({
                title: 'Start ID',
                description: 'Type in the image ID to move to:',
                initialValue: startId.toString(),
                maxLength: 8,
                callback: function (text) {
                    startId = parseInt(text) || 0;
                }
            });
        }
        function onPrimaryColourChange(c) {
            primaryColour = c;
        }
        function onSecondaryColourChange(c) {
            secondaryColour = c;
        }
        function onTernaryColourChange(c) {
            ternaryColour = c;
        }
        function onDecrementPalette() {
            var paletteSpinner = window.findWidget('spnPalette');
            if (paletteSpinner) {
                if (primaryColour === undefined) {
                    primaryColour = 0;
                }
                if (primaryColour > 0) {
                    primaryColour--;
                }
                paletteSpinner.text = primaryColour.toString();
            }
        }
        function onIncrementPalette() {
            var paletteSpinner = window.findWidget('spnPalette');
            if (paletteSpinner) {
                if (primaryColour === undefined) {
                    primaryColour = 0;
                }
                if (primaryColour < 255) {
                    primaryColour++;
                }
                paletteSpinner.text = primaryColour.toString();
            }
        }
        function onDecrementId() {
            var startIdSpinner = window.findWidget('spnStartId');
            if (startIdSpinner && startId > 0) {
                startId = Math.max(0, startId - 32);
            }
        }
        function onIncrementId() {
            var startIdSpinner = window.findWidget('spnStartId');
            if (startIdSpinner) {
                startId = nextId;
            }
        }
        function onUpdate() {
            var imageChart = window.findWidget('imageChart');
            if (imageChart) {
                imageChart.width = window.width - imageChart.x - 8;
            }
            var imageList = window.findWidget('imageList');
            if (imageList) {
                imageList.width = window.width - (imageList.x * 2);
                imageList.height = window.height - imageList.y - 16;
            }
            var startIdSpinner = window.findWidget('spnStartId');
            if (startIdSpinner) {
                startIdSpinner.text = startId.toString();
            }
            primaryChecked = window.findWidget('chkPrimary').isChecked || false;
            var primaryColourWidget = window.findWidget('clrPrimary');
            if (primaryColourWidget) {
                primaryColourWidget.colour = primaryColour;
            }
            secondaryChecked = window.findWidget('chkSecondary').isChecked || false;
            var secondaryColourWidget = window.findWidget('clrSecondary');
            if (secondaryColourWidget) {
                secondaryColourWidget.colour = secondaryColour;
            }
            var ternaryColourWidget = window.findWidget('clrTernary');
            if (ternaryColourWidget) {
                ternaryColourWidget.colour = ternaryColour;
            }
            var paletteSpinner = window.findWidget('spnPalette');
            if (primaryColour !== undefined) {
                paletteSpinner.text = primaryColour.toString();
            }
        }
        function onDrawChart(widget, g) {
            var clipWidth = widget.width - 2;
            var clipHeight = widget.height - 2;
            g.colour = 1;
            g.well(0, 0, widget.width, widget.height);
            g.clip(1, 1, clipWidth, clipHeight);
            g.fill = 61;
            g.clear();
            var allocatedRange = ui.imageManager.getPredefinedRange('allocated');
            if (!allocatedRange)
                return;
            var end = allocatedRange.start + allocatedRange.count;
            var indexToX = function (index) { return Math.floor((index / end) * clipWidth); };
            var rangeNames = ['g1', 'g2', 'csg'];
            var colours = [60, 90, 120];
            var ranges = rangeNames.map(function (x) { return ui.imageManager.getPredefinedRange(x); });
            for (var i = 0; i < rangeNames.length; i++) {
                var range = ranges[i];
                if (!range)
                    continue;
                var x = indexToX(range.start);
                var width_1 = indexToX(range.count);
                g.fill = colours[i];
                g.rect(x, 0, width_1, clipHeight);
            }
            for (var i = 0; i < rangeNames.length; i++) {
                var range = ranges[i];
                if (!range)
                    continue;
                var x = indexToX(range.start);
                var width_2 = indexToX(range.count);
                var name = rangeNames[i];
                var textSize = g.measureText(name);
                g.text('{OUTLINE}{WHITE}' + name, x + ((width_2 - textSize.width) / 2), clipHeight / 2 - 5);
            }
            var freeRanges = ui.imageManager.getAvailableAllocationRanges();
            for (var _i = 0, freeRanges_1 = freeRanges; _i < freeRanges_1.length; _i++) {
                var range = freeRanges_1[_i];
                var x = Math.floor((range.start / end) * clipWidth);
                var width_3 = Math.floor((range.count / end) * clipWidth);
                g.fill = 20;
                g.rect(x, 0, width_3, clipHeight);
            }
            var viewX = indexToX(startId);
            var viewSize = 8;
            g.fill = 8;
            g.stroke = 54;
            g.rect(viewX - (viewSize / 2), (clipHeight / 4) - (viewSize / 2), viewSize, viewSize);
        }
        function onDrawImages(widget, g) {
            var margin = 2;
            var clipWidth = widget.width - 2 - margin;
            var clipHeight = widget.height - 2 - margin;
            g.colour = 1;
            g.well(0, 0, widget.width, widget.height);
            g.clip(1 + margin, 1 + margin, clipWidth, clipHeight);
            var id = startId;
            var x = 0;
            var y = 0;
            var width = clipWidth;
            var lineHeight = 0;
            var secondLineId = undefined;
            var output = { width: 0, height: 0 };
            while (y < clipHeight) {
                var img = g.getImage(id);
                if (img) {
                    var remWidth = width - x;
                    if (img.width > remWidth) {
                        x = 0;
                        y += lineHeight;
                        lineHeight = 0;
                        if (secondLineId === undefined) {
                            secondLineId = id;
                        }
                    }
                    drawImage(g, img, x, y, output);
                    x += output.width;
                    lineHeight = Math.max(lineHeight, output.height);
                }
                id++;
                if (id > startId + 1000)
                    break;
            }
            nextId = secondLineId || startId + 1;
        }
        function drawImage(g, img, x, y, output) {
            var sz = '{TINYFONT}' + img.id;
            g.colour = 2;
            g.text(sz, x, y);
            var textWidth = g.measureText(sz).width;
            y += 8;
            if (showImageBorders) {
                g.stroke = 1;
                g.rect(x, y, img.width + 2, img.height + 2);
            }
            g.colour = primaryChecked && secondaryChecked ? primaryColour : undefined;
            g.secondaryColour = secondaryChecked ? secondaryColour : undefined;
            g.paletteId = primaryChecked && !secondaryChecked ? primaryColour : undefined;
            g.ternaryColour = ternaryColour;
            g.image(img.id, x - img.offset.x + 1, y - img.offset.y + 1);
            output.width = Math.max(textWidth + 4, img.width + 6);
            output.height = Math.max(8, img.height + 12);
        }
    }
})(ImageList || (ImageList = {}));
var DEBUG = false;
var main = function () {
    if (typeof ui === 'undefined') {
        console.log("Plugin not available on headless mode.");
        return;
    }
    EntityViewer.register();
    ImageList.register();
    NetworkMonitor.register();
    if (DEBUG) {
        ui.closeAllWindows();
        ImageList.getOrOpen();
    }
};
registerPlugin({
    name: 'DevTools',
    version: '1.1',
    authors: ['OpenRCT2'],
    type: 'local',
    licence: 'MIT',
    main: main
});
var NetworkMonitor;
(function (NetworkMonitor) {
    var NETWORK_STATS_WINDOW_CLASS = 'network-stats';
    var MOCK_STATS = DEBUG;
    function openNetworkStats() {
        var StatKind;
        (function (StatKind) {
            StatKind[StatKind["receive"] = 0] = "receive";
            StatKind[StatKind["send"] = 1] = "send";
        })(StatKind || (StatKind = {}));
        ;
        var categoryGroups = [
            { text: "Base protocol", paletteIndex: 102 },
            { text: "Commands", paletteIndex: 138 },
            { text: "Map", paletteIndex: 171 },
        ];
        var historyReceived = [];
        var historySent = [];
        var totalSentBytes = 0;
        var totalReceivedBytes = 0;
        var accumulatedSentBytes = 0;
        var accumulatedReceivedBytes = 0;
        var sentBytesPerSecond = 0;
        var receivedBytesPerSecond = 0;
        var lastStatsUpdateTime = 0;
        var receivedMax = 0;
        var sentMax = 0;
        function open() {
            var width = 450;
            var height = 210;
            var padding = 5;
            var heightTab = 43;
            var textHeight = 12;
            var totalHeight = height;
            var totalHeightText = (textHeight + (padding * 2)) * 3;
            var graphWidth = width - (padding * 2);
            var graphHeight = (totalHeight - totalHeightText - heightTab) / 2;
            graphHeight = ~~graphHeight;
            var x = padding;
            var y = heightTab + padding;
            var widgets = [];
            createGraphTextWidgets(widgets, x, y, StatKind.receive);
            y += textHeight + padding;
            createGraphWidget(widgets, x, y, graphWidth, graphHeight, StatKind.receive, 'graphReceived');
            y += graphHeight + padding;
            createGraphTextWidgets(widgets, x, y, StatKind.send);
            y += textHeight + padding;
            createGraphWidget(widgets, x, y, graphWidth, graphHeight, StatKind.send, 'graphSent');
            y += graphHeight + padding;
            createLegendWidgets(widgets, x, y);
            var stats = getStats();
            var w = ui.openWindow({
                x: (ui.width - width) / 2,
                y: (ui.height - height) / 2,
                width: width,
                height: height,
                minWidth: width,
                minHeight: height,
                maxWidth: width * 4,
                maxHeight: height * 4,
                title: 'Network Monitor',
                classification: NETWORK_STATS_WINDOW_CLASS,
                colours: [0, 0],
                tabs: [
                    {
                        image: {
                            frameBase: 5367,
                            frameCount: 8,
                            frameDuration: 4
                        },
                        widgets: widgets
                    }
                ],
                onUpdate: function () {
                    var deltaStats = {
                        bytesReceived: [0, 0, 0],
                        bytesSent: [0, 0, 0]
                    };
                    var receivedSum = 0;
                    var sentSum = 0;
                    var newStats = getStats();
                    for (var i = 0; i < categoryGroups.length; i++) {
                        deltaStats.bytesReceived[i] = newStats.bytesReceived[i + 1] - stats.bytesReceived[i + 1];
                        deltaStats.bytesSent[i] = newStats.bytesSent[i + 1] - stats.bytesSent[i + 1];
                        accumulatedReceivedBytes += deltaStats.bytesReceived[i];
                        accumulatedSentBytes += deltaStats.bytesSent[i];
                        receivedSum += deltaStats.bytesReceived[i];
                        sentSum += deltaStats.bytesSent[i];
                    }
                    stats = newStats;
                    totalReceivedBytes = stats.bytesReceived[0];
                    totalSentBytes = stats.bytesSent[0];
                    receivedMax = Math.max(receivedMax, receivedSum);
                    sentMax = Math.max(sentMax, sentSum);
                    while (historyReceived.length >= 256) {
                        historyReceived.shift();
                    }
                    historyReceived.push(deltaStats.bytesReceived);
                    while (historySent.length >= 256) {
                        historySent.shift();
                    }
                    historySent.push(deltaStats.bytesSent);
                    var currentTime = performance.now();
                    if (currentTime > lastStatsUpdateTime + 1000) {
                        var elapsed = (currentTime - lastStatsUpdateTime) / 1000;
                        lastStatsUpdateTime = currentTime;
                        receivedBytesPerSecond = accumulatedReceivedBytes / elapsed;
                        sentBytesPerSecond = accumulatedSentBytes / elapsed;
                        accumulatedReceivedBytes = 0;
                        accumulatedSentBytes = 0;
                    }
                    var setWidgetText = function (name, text) {
                        var label = w.findWidget(name);
                        if (label) {
                            label.text = text;
                        }
                    };
                    setWidgetText('lblReceivedBytes', formatReadableSpeed(receivedBytesPerSecond));
                    setWidgetText('lblTotalReceivedBytes', formatReadableSize(totalReceivedBytes));
                    setWidgetText('lblSentBytes', formatReadableSpeed(sentBytesPerSecond));
                    setWidgetText('lblTotalSentBytes', formatReadableSize(totalSentBytes));
                    performLayout(w);
                }
            });
        }
        function performLayout(w) {
            var width = w.width;
            var height = w.height;
            var padding = 5;
            var heightTab = 43;
            var textHeight = 12;
            var graphBarWidth = 1;
            var totalHeight = height;
            var totalHeightText = (textHeight + (padding * 2)) * 3;
            var graphWidth = width - (padding * 2);
            var graphHeight = (totalHeight - totalHeightText - heightTab) / 2;
            graphHeight = ~~graphHeight;
            var x = padding;
            var y = heightTab + padding;
            var setWidgetY = function (names, y) {
                for (var i = 0; i < names.length; i++) {
                    var widget = w.findWidget(names[i]);
                    if (widget) {
                        widget.y = y;
                    }
                }
            };
            setWidgetY(['lblReceive', 'lblReceivedBytes', 'lblTotalReceived', 'lblTotalReceivedBytes'], y);
            y += textHeight + padding;
            var graph = w.findWidget('graphReceived');
            graph.y = y;
            graph.width = graphWidth;
            graph.height = graphHeight;
            y += graphHeight + padding;
            setWidgetY(['lblSend', 'lblSentBytes', 'lblTotalSent', 'lblTotalSentBytes'], y);
            y += textHeight + padding;
            var graph = w.findWidget('graphSent');
            graph.y = y;
            graph.width = graphWidth;
            graph.height = graphHeight;
            y += graphHeight + padding;
            for (var n = 0; n < categoryGroups.length; n++) {
                setWidgetY(['legendColour' + n], y + 4);
                setWidgetY(['legendLabel' + n], y);
            }
        }
        function createLabel(name, x, y, text) {
            return {
                type: 'label',
                name: name,
                x: x,
                y: y,
                width: 100,
                height: 16,
                text: text
            };
        }
        function createLegendColourWidget(name, x, y, w, h, colour) {
            return {
                type: 'custom',
                name: name,
                x: x,
                y: y,
                width: w,
                height: h,
                onDraw: function (g) {
                    g.fill = colour;
                    g.clear();
                }
            };
        }
        function createGraphTextWidgets(widgets, x, y, kind) {
            if (kind === StatKind.receive) {
                widgets.push(createLabel('lblReceive', x, y, "Receive"));
                widgets.push(createLabel('lblReceivedBytes', x + 70, y, "0.000 B/sec"));
                widgets.push(createLabel('lblTotalReceived', x + 200, y, "Total received"));
                widgets.push(createLabel('lblTotalReceivedBytes', x + 300, y, "0.000 B/sec"));
            }
            else {
                widgets.push(createLabel('lblSend', x, y, "Send"));
                widgets.push(createLabel('lblSentBytes', x + 70, y, "0.000 B/sec"));
                widgets.push(createLabel('lblTotalSent', x + 200, y, "Total sent"));
                widgets.push(createLabel('lblTotalSentBytes', x + 300, y, "0.000 B/sec"));
            }
        }
        function createGraphWidget(widgets, x, y, w, h, kind, name) {
            widgets.push({
                type: 'custom',
                name: name,
                x: x,
                y: y,
                width: w,
                height: h,
                onDraw: function (g) {
                    var _a;
                    g.colour = ((_a = this.window) === null || _a === void 0 ? void 0 : _a.colours[1]) || 0;
                    g.well(0, 0, this.width, this.height);
                    g.clip(1, 1, this.width - 2, this.height - 2);
                    drawGraph(g, this.width - 2, this.height - 2, kind);
                }
            });
        }
        function createLegendWidgets(widgets, x, y) {
            for (var n = 0; n < categoryGroups.length; n++) {
                var cg = categoryGroups[n];
                widgets.push(createLegendColourWidget('legendColour' + n, x, y + 4, 6, 4, cg.paletteIndex));
                widgets.push(createLabel('legendLabel' + n, x + 10, y, cg.text));
                x += cg.text.length * 10;
            }
        }
        function drawGraph(g, width, height, kind) {
            var barWidth = 1;
            var history = kind == StatKind.receive ? historyReceived : historySent;
            var dataMax = kind == StatKind.receive ? receivedMax : sentMax;
            var numBars = Math.min(history.length, Math.floor(width / barWidth));
            var gap = (width - (numBars * barWidth)) / numBars;
            var x = 0;
            for (var i = 0; i < numBars; i++) {
                var historyItem = history[i];
                var totalSum = 0;
                for (var n = 0; n < categoryGroups.length; n++) {
                    totalSum += historyItem[n];
                }
                var totalHeight = (totalSum / dataMax) * height;
                var yOffset = height;
                for (var n = 0; n < categoryGroups.length; n++) {
                    var amount = historyItem[n];
                    var singleHeight = (amount / totalSum) * totalHeight;
                    var lineHeight = Math.ceil(singleHeight);
                    lineHeight = Math.min(lineHeight, height);
                    yOffset -= lineHeight;
                    if (lineHeight > 0) {
                        g.fill = categoryGroups[n].paletteIndex;
                        g.rect(x, yOffset, barWidth, lineHeight);
                    }
                }
                x += barWidth + gap;
            }
        }
        var getStats;
        if (MOCK_STATS) {
            var mockStats = {
                bytesReceived: [0, 0, 0, 0],
                bytesSent: [0, 0, 0, 0]
            };
            var mockSizeInc = 4;
            getStats = function () {
                for (var i = 1; i < 4; i++) {
                    mockStats.bytesReceived[i] += ~~(Math.random() * mockSizeInc);
                    mockStats.bytesSent[i] += ~~(Math.random() * mockSizeInc);
                    mockStats.bytesReceived[0] += mockStats.bytesReceived[i];
                    mockStats.bytesSent[0] += mockStats.bytesSent[i];
                }
                return JSON.parse(JSON.stringify(mockStats));
            };
        }
        else {
            getStats = function () {
                return network.stats;
            };
        }
        function formatReadableSpeed(speed) {
            return formatReadableSize(speed) + "/sec";
        }
        function formatReadableSize(size) {
            var sizeTable = ['B', 'KiB', 'MiB', 'GiB'];
            var idx = 0;
            while (size >= 1024 && idx < sizeTable.length - 1) {
                size /= 1024;
                idx++;
            }
            return context.formatString('{COMMA1DP16} {STRING}', size * 10, sizeTable[idx]);
        }
        return open();
    }
    function getOrOpen() {
        var w = ui.getWindow(NETWORK_STATS_WINDOW_CLASS);
        if (w) {
            w.bringToFront();
        }
        else {
            openNetworkStats();
        }
    }
    NetworkMonitor.getOrOpen = getOrOpen;
    function register() {
        if (DEBUG || network.mode != 'none') {
            ui.registerMenuItem('Network Monitor', function () {
                getOrOpen();
            });
        }
    }
    NetworkMonitor.register = register;
})(NetworkMonitor || (NetworkMonitor = {}));
