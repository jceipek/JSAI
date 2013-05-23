define(['src/utils'], function () {
  describe( "JSAI Utils", function () {
    describe("DistBetween", function () {
      it("finds the distance between the same point to be zero", function () {
        var pointX = 5.5;
        var pointY = 10;
        expect(DistBetween({x: pointX, y:pointY},
         {x: pointX, y:pointY})).toBeCloseTo(0);
      });

      it("finds the distance between two points offset on the x axis", function () {
        var pointX = 5.5;
        var pointY = 10;
        var offset = -9.21;
        var pointX2 = pointX + offset;
        var pointY2 = pointY;
        expect(DistBetween({x: pointX, y:pointY},
         {x: pointX2, y:pointY2})).toBeCloseTo(Math.abs(offset));
      });

      it("finds the distance between two points offset on the y axis", function () {
        var pointX = 5.5;
        var pointY = 10;
        var offset = 23.21;
        var pointX2 = pointX;
        var pointY2 = pointY + offset;
        expect(DistBetween({x: pointX, y:pointY},
         {x: pointX2, y:pointY2})).toBeCloseTo(Math.abs(offset));
      });

      it("finds the distance between two points offset on the x and y axis", function () {
        var pointX = 1;
        var pointY = 3;
        var pointX2 = 3;
        var pointY2 = 5;
        expect(DistBetween({x: pointX, y:pointY},
         {x: pointX2, y:pointY2})).toBeCloseTo(Math.abs(2.828427125));
      });
    });

    describe("Set", function () {

      describe("handles strings properly", function () {
        var aSet, str1, str2, str3;

        beforeEach(function() {
          aSet = new Set();
          str1 = "";
          str2 = "hello";
          str3 = "prototype";
        });

        afterEach(function() {
          aSet = undefined;
          str1 = undefined;
          str2 = undefined;
          str3 = undefined;
        });

        it("does not contain strings that are not added", function () {
          expect(aSet.contains(str1)).toBe(false);
          expect(aSet.contains(str2)).toBe(false);
          expect(aSet.contains(str3)).toBe(false);
        });

        it("contains strings that are added", function () {
          aSet.add(str1);
          aSet.add(str2);
          aSet.add(str3);
          expect(aSet.contains(str1)).toBe(true);
          expect(aSet.contains(str2)).toBe(true);
          expect(aSet.contains(str3)).toBe(true);
        });

        it("does not contain strings that were removed", function () {
          aSet.add(str1);
          aSet.add(str2);
          aSet.add(str3);
          aSet.remove(str3);
          expect(aSet.contains(str3)).toBe(false);
        });

        it("still contains added strings after a removal", function () {
          aSet.add(str1);
          aSet.add(str2);
          aSet.add(str3);
          aSet.remove(str3);
          expect(aSet.contains(str1)).toBe(true);
          expect(aSet.contains(str2)).toBe(true);
        });
      });

      describe("handles numbers properly", function () {
        var aSet, num1, num2, num3;

        beforeEach(function() {
          aSet = new Set();
          num1 = 0;
          num2 = 2.223;
          num3 = -90.0;
        });

        afterEach(function() {
          aSet = undefined;
          num1 = undefined;
          num2 = undefined;
          num3 = undefined;
        });

        it("does not contain numbers that are not added", function () {
          expect(aSet.contains(num1)).toBe(false);
          expect(aSet.contains(num2)).toBe(false);
          expect(aSet.contains(num3)).toBe(false);
        });

        it("contains numbers that are added", function () {
          aSet.add(num1);
          aSet.add(num2);
          aSet.add(num3);
          expect(aSet.contains(num1)).toBe(true);
          expect(aSet.contains(num2)).toBe(true);
          expect(aSet.contains(num3)).toBe(true);
        });

        it("does not contain numbers that were removed", function () {
          aSet.add(num1);
          aSet.add(num2);
          aSet.add(num3);
          aSet.remove(num3);
          expect(aSet.contains(num3)).toBe(false);
        });

        it("still contains added numbers after a removal", function () {
          aSet.add(num1);
          aSet.add(num2);
          aSet.add(num3);
          aSet.remove(num3);
          expect(aSet.contains(num1)).toBe(true);
          expect(aSet.contains(num2)).toBe(true);
        });
      });

    });

    describe("PriorityQueue", function () {
      var aQueue;

      beforeEach(function() {
        aQueue = new PriorityQueue();
      });

      afterEach(function() {
        aQueue = undefined;
      });

      it("does not accept undefined priority or value", function () {
        var noInput = function () {
          aQueue.push();
        };

        var noPriority = function () {
          aQueue.push("Hello");
        };

        var noValue = function () {
          aQueue.push(undefined, 5);
        };

        expect(noInput).toThrow();
        expect(noPriority).toThrow();
        expect(noValue).toThrow();
      });

      describe("empty works properly", function () {
        it("is empty on creation", function () {
          expect(aQueue.empty()).toBe(true);
        });

        it("is not empty after addition", function () {
          aQueue.push(5, 3.34);
          expect(aQueue.empty()).toBe(false);
        });

        it("is empty after removal of addition", function () {
          aQueue.push(5, 3.34);
          aQueue.pop();
          expect(aQueue.empty()).toBe(true);
        });

        it("is not empty after removal of one of two additions", function () {
          aQueue.push(5, 3.34);
          aQueue.push(0, 6);
          aQueue.pop();
          expect(aQueue.empty()).toBe(false);
        });
      });

      it("sorts priorities properly", function () {
        var val1, val2, val3, popped;
        val1 = "frog";
        val2 = "dog";
        val3 = 0;
        aQueue.push(val1, 0.2);
        aQueue.push(val2, 0);
        aQueue.push(val3, 900);

        expect(aQueue.peek()).toEqual(val2);
        popped = aQueue.pop();
        expect(popped).toEqual(val2);

        expect(aQueue.peek()).toEqual(val1);
        popped = aQueue.pop();
        expect(popped).toEqual(val1);

        expect(aQueue.peek()).toEqual(val3);
        popped = aQueue.pop();
        expect(popped).toEqual(val3);

        popped = aQueue.pop();
        expect(popped).toBeUndefined();
      });

      describe("has a working contains method", function () {
        it("contains things that were added", function () {
          var val1 = "Greetings!";
          var val2 = 45;
          aQueue.push(val1, 20);
          aQueue.push(val2, 19.3);
          expect(aQueue.contains(val1)).toBe(true);
          expect(aQueue.contains(val2)).toBe(true);
        });

        it("does not contain things that were not added", function () {
          var val1 = "Greetings!";
          var val2 = 45;
          aQueue.push(val1, 20);
          aQueue.push(val2, 19.3);
          expect(aQueue.contains("greetings!")).toBe(false);
          expect(aQueue.contains(19)).toBe(false);
        });

        it("does not contain things that were removed", function () {
          var val1 = "Greetings!";
          var val2 = 45;
          aQueue.push(val1, 20);
          aQueue.push(val2, 19.3);

          aQueue.pop();
          aQueue.pop();
          expect(aQueue.contains(val1)).toBe(false);
          expect(aQueue.contains(val2)).toBe(false);
        });

        it("contains things that were not removed", function () {
          var val1 = "Greetings!";
          var val2 = 45;
          aQueue.push(val1, 20);
          aQueue.push(val2, 19.3);

          aQueue.pop();
          expect(aQueue.contains(val1)).toBe(true);
        });
      });
    });
  });
});