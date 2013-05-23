requirejs.config({
    baseUrl: 'src',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/kinetic', 'utils', 'network'],
function   (Kinetic, Utils, Network) {

  var stage = new Kinetic.Stage({
    container: 'container',
    width: 578,
    height: 500
  });

  var displayNetwork = function(network, networkLinks, stage) {
    var layer = new Kinetic.Layer();
    // Display Network

    for (var i = 0; i < networkLinks.size; i++) {

      for (var j in networkLinks[i]) {
        var startNode = i;
        if (networkLinks[i].hasOwnProperty(j)) {
          var endNode = j;
          var line = new Kinetic.Line({
            points: [network[startNode], network[endNode]],
            strokeWidth: 1,
            stroke: '#ccc'
          });
          layer.add(line);
        }
      }
    }

    for (var i = 0; i < network.size; i++) {
      var circle = new Kinetic.Circle({
        x: network[i].x,
        y: network[i].y,
        radius: 8,
        fill: 'lightgrey',
        stroke: 'black',
        strokeWidth: 1
      });

      layer.add(circle);

      var txt = new Kinetic.Text({
        x: network[i].x-3,
        y: network[i].y-6,
        text: i,
        fill: 'black'
      });

      layer.add(txt);
    }

    //stage.remove(layer);

    // add the layer to the stage
    stage.add(layer);
  };

  var networkLnks =
    {
      0 : {1:1},
      1 : {0:1, 2:1, 4:1},
      2 : {1:1, 4:1, 3:1},
      3 : {2:1, 4:1, 5:1},
      4 : {1:1, 2:1, 3:1, 5:1},
      5 : {3:1, 4:1},
      size : 6
    };

  var nodePosns = {
    0 : {x: 10, y: 10},
    1 : {x: 40, y: 80},
    2 : {x: 400, y: 100},
    3 : {x: 500, y: 200},
    4 : {x: 100, y: 200},
    5 : {x: 300, y: 300},
    size : 6
    };

  stage.clear();
  displayNetwork(nodePosns, networkLnks, stage);

  FindRoute({from: 0,
             to: 3,
             network: networkLnks,
             costFunction: function (params) {
                var startNode = params['start'];
                var endNode = params['end'];
                var network = networkLnks;
                return network[startNode][endNode];
              },
             heuristicFunction: function (params) {
                var startNode = params['start'];
                var endNode = params['end'];
                var networkMetadata = nodePosns;
                return DistBetween(networkMetadata[startNode], networkMetadata[endNode]);
              }
            });

});