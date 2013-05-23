var PriorityQueue = function () {
  var _contents = [];
  var _contentsDict = {}; // Fast random access
  var _isSorted = true;

  var _sortMethod = function(a, b) {
    return b.priority - a.priority;
  };

  var _sortIfNeeded = function () {
    if (!_isSorted) {
      _contents.sort(_sortMethod);
      _isSorted = true;
    }
  }

  this.empty = function () {
    return (_contents.length === 0);
  }

  this.push = function (value, priority) {
    if (value === undefined || priority === undefined) {
      throw "Expected a valid value, priority combination";
    }
    _isSorted = false;
    _contents.push({value: value, priority: priority});
    _contentsDict[value] = true;
  }

  this.pop = function () {
    if (this.empty()) {
      return undefined;
    }
    _sortIfNeeded();
    var elem = _contents.pop().value;
    delete _contentsDict[elem];
    return elem;
  }

  this.peek = function () {
    if (this.empty()) {
      return undefined;
    }
    _sortIfNeeded();
    return _contents[_contents.length-1].value;
  }

  this.contains = function (value) {
    return (_contentsDict[value] !== undefined);
  }

};

var Set = function () {
  var _contents = {};

  this.add = function (value) {
    _contents[value] = true;
  }

  this.contains = function (value) {
    return (_contents[value] !== undefined);
  }

  this.remove = function (value) {
    delete _contents[value];
  }
};

var DistBetween = function (a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) +
                   Math.pow(a.y - b.y, 2));
};