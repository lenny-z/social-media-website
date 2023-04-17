const util = require('./util.js');

let testUndefined;
const testNull = null;
const testBool = false;
const testNum = 0;
const testStr = 'str';

const testFunction = () => {
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

	if(thingType !== 'function' && thingType !== 'undefined'){
		if(thing){
			console.log(`\ttoString: ${thing.toString()}`);
		}
	}

	console.log(`\tJSON.stringify: ${JSON.stringify(thing)}`);
	console.log();
}

// console.log(testObject.toString());
// console.log(JSON.stringify(testObject));

testThing(testUndefined);
testThing(testNull);
testThing(testNum);
testThing(testFunction);
testThing(testObject);

util.log({
	testKey: 'testValue'
});