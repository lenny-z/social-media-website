const util = require('./util.js');

let testUndefined;
const testNull = null;
const testBool = false;
const testNum = 0;
const testStr = 'str';

function testFunction() {
	console.log('Hello, world!');
}

const testObject = {
	testKey: 'testValue'
};

function testThing(thing){
	console.log('testThing:');
	console.log(`\tthing: ${thing}`);
	const thingType = typeof thing;
	console.log(`\tthingType: ${thingType}`);

	if(thingType !== 'undefined'){
		if(thing){
			console.log(`\ttoString: ${thing.toString()}`);
		}
	}

	console.log(`\tJSON.stringify: ${JSON.stringify(thing)}`);
	console.log();
}

// testThing(testUndefined);
// testThing(testNull);
// testThing(testBool);
// testThing(testNum);
// testThing(testStr);
// testThing(testFunction);
// testThing(testObject);

// util.log({
// 	testKey: 'testValue'
// });

util.log(testUndefined);
util.log(testNull);
util.log(testBool);
util.log(testNum);
util.log(testStr);
util.log(testFunction, 0);
util.log(testObject, 2);