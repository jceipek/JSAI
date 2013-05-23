// Returns a list representing the optimal path between startNode and endNode or null if such a path does not exist
// If the path exists, the order is such that elements can be popped off the path
var FindRoute = function (params) {
  var startNode = params['from'];
  var goalNode = params['to'];
  var network = params['network'];
  var frontier = new PriorityQueue(); // what have we not explored?
  var explored = new Set(); // what have we explored?
  var CostBetween = params['costFunction'];
  var HeuristicCostEstimate = params['heuristicFunction'];

  var pathTo = {}; // A dictionary mapping from nodes to nodes,
                   //  used to keep track of the path
                   //  The node that is the key
  var gCost = {}; // A dictionary mapping from nodes to floats,
                  //  used to keep track of the "G cost" associated with traveling to each node from startNode

  pathTo[startNode] = null;
  gCost[startNode] = 0.0;

  frontier.push(startNode, 0.0 + HeuristicCostEstimate({start: startNode,
                                                        end: goalNode}));

  while (!frontier.empty()) { // While the frontier remains unexplored
    var leafNode = frontier.pop(); //frontier.Values[0];

    if (leafNode == goalNode) {
      // We found the solution! Reconstruct it.
      var path = [];
      var pointer = goalNode;

      while (pointer != null) {
        path.push(pointer);
        pointer = pathTo[pointer];
      }

      return path;
    }

    explored.add(leafNode);

    for (var i in network[leafNode]) {
      if (network[leafNode].hasOwnProperty(i)) {
        var connectedNode = parseInt(i);
        if (!explored.contains(connectedNode) && !frontier.contains(connectedNode)) {
          gCost[connectedNode] = gCost[leafNode] +
                                 CostBetween({start: leafNode,
                                              end: connectedNode});
          pathTo[connectedNode] = leafNode;
          frontier.push(connectedNode, gCost[connectedNode] +
                                       HeuristicCostEstimate({start: connectedNode,
                                                              end: goalNode}));
        }
      }
    }
  }

  return null; // No path could be found
};