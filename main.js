(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.ba.ax === region.bn.ax)
	{
		return 'on line ' + region.ba.ax;
	}
	return 'on lines ' + region.ba.ax + ' through ' + region.bn.ax;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.cX,
		impl.dX,
		impl.dC,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		O: func(record.O),
		bb: record.bb,
		a6: record.a6
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.O;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.bb;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.a6) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.cX,
		impl.dX,
		impl.dC,
		function(sendToApp, initialModel) {
			var view = impl.dY;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.cX,
		impl.dX,
		impl.dC,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.a8 && impl.a8(sendToApp)
			var view = impl.dY;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.cn);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.dR) && (_VirtualDom_doc.title = title = doc.dR);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.de;
	var onUrlRequest = impl.df;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		a8: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.bN === next.bN
							&& curr.bu === next.bu
							&& curr.bK.a === next.bK.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		cX: function(flags)
		{
			return A3(impl.cX, flags, _Browser_getUrl(), key);
		},
		dY: impl.dY,
		dX: impl.dX,
		dC: impl.dC
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { cQ: 'hidden', cy: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { cQ: 'mozHidden', cy: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { cQ: 'msHidden', cy: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { cQ: 'webkitHidden', cy: 'webkitvisibilitychange' }
		: { cQ: 'hidden', cy: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		bR: _Browser_getScene(),
		b$: {
			b3: _Browser_window.pageXOffset,
			b4: _Browser_window.pageYOffset,
			aT: _Browser_doc.documentElement.clientWidth,
			aO: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		aT: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		aO: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			bR: {
				aT: node.scrollWidth,
				aO: node.scrollHeight
			},
			b$: {
				b3: node.scrollLeft,
				b4: node.scrollTop,
				aT: node.clientWidth,
				aO: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			bR: _Browser_getScene(),
			b$: {
				b3: x,
				b4: y,
				aT: _Browser_doc.documentElement.clientWidth,
				aO: _Browser_doc.documentElement.clientHeight
			},
			cJ: {
				b3: x + rect.left,
				b4: y + rect.top,
				aT: rect.width,
				aO: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.c9) { flags += 'm'; }
	if (options.cx) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.j) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.l),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.l);
		} else {
			var treeLen = builder.j * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.m) : builder.m;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.j);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.l) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.l);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{m: nodeList, j: (len / $elm$core$Array$branchFactor) | 0, l: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bq: fragment, bu: host, bI: path, bK: port_, bN: protocol, bO: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Main$Model = F3(
	function (window, state, error) {
		return {F: error, d: state, b2: window};
	});
var $author$project$Main$NoMetamask = {$: 2};
var $author$project$Main$NotConnected = {$: 1};
var $author$project$Main$Window = F2(
	function (width, height) {
		return {aO: height, aT: width};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function (_v0) {
	var width = _v0.aT;
	var height = _v0.aO;
	var hasMetamask = _v0.aZ;
	var state = hasMetamask ? $author$project$Main$NotConnected : $author$project$Main$NoMetamask;
	return _Utils_Tuple2(
		A3(
			$author$project$Main$Model,
			A2($author$project$Main$Window, width, height),
			state,
			$elm$core$Maybe$Nothing),
		$elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Main$ChangeWindow = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Main$Check = function (a) {
	return {$: 6, a: a};
};
var $author$project$Main$ReceiveConnect = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$ReceiveNetwork = function (a) {
	return {$: 4, a: a};
};
var $author$project$Main$ReceiveTransaction = function (a) {
	return {$: 5, a: a};
};
var $author$project$Main$ReceiveUser = function (a) {
	return {$: 3, a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {bM: processes, bV: taggers};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 1) {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.bM;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.bV);
		if (_v0.$ === 1) {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {bJ: pids, bU: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {bo: event, bx: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.bJ,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.bx;
		var event = _v0.bo;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.bU);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Main$receiveConnect = _Platform_incomingPort('receiveConnect', $elm$json$Json$Decode$value);
var $author$project$Main$receiveNetwork = _Platform_incomingPort('receiveNetwork', $elm$json$Json$Decode$value);
var $author$project$Main$receiveTransaction = _Platform_incomingPort('receiveTransaction', $elm$json$Json$Decode$value);
var $author$project$Main$receiveUser = _Platform_incomingPort('receiveUser', $elm$json$Json$Decode$value);
var $author$project$Main$subscriptions = function (_v0) {
	var state = _v0.d;
	switch (state.$) {
		case 0:
			return $elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						$elm$browser$Browser$Events$onResize($author$project$Main$ChangeWindow),
						$author$project$Main$receiveUser($author$project$Main$ReceiveUser),
						$author$project$Main$receiveNetwork($author$project$Main$ReceiveNetwork),
						$author$project$Main$receiveTransaction($author$project$Main$ReceiveTransaction),
						A2($elm$time$Time$every, 10000, $author$project$Main$Check)
					]));
		case 1:
			return $elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						$elm$browser$Browser$Events$onResize($author$project$Main$ChangeWindow),
						$author$project$Main$receiveConnect($author$project$Main$ReceiveConnect)
					]));
		default:
			return $elm$browser$Browser$Events$onResize($author$project$Main$ChangeWindow);
	}
};
var $author$project$Main$request = _Platform_outgoingPort('request', $elm$core$Basics$identity);
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Main$sendConnect = _Platform_outgoingPort(
	'sendConnect',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Main$Rinkeby = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$ApproveCollateral = {$: 12};
var $author$project$Main$Outcome = F2(
	function (value, log) {
		return {a: log, e: value};
	});
var $author$project$Main$SendTransaction = 1;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Hexadecimal$fromDigitToChar = function (digit) {
	switch (digit) {
		case 0:
			return '0';
		case 1:
			return '1';
		case 2:
			return '2';
		case 3:
			return '3';
		case 4:
			return '4';
		case 5:
			return '5';
		case 6:
			return '6';
		case 7:
			return '7';
		case 8:
			return '8';
		case 9:
			return '9';
		case 10:
			return 'a';
		case 11:
			return 'A';
		case 12:
			return 'b';
		case 13:
			return 'B';
		case 14:
			return 'c';
		case 15:
			return 'C';
		case 16:
			return 'd';
		case 17:
			return 'D';
		case 18:
			return 'e';
		case 19:
			return 'E';
		case 20:
			return 'f';
		default:
			return 'F';
	}
};
var $elm$core$String$fromList = _String_fromList;
var $author$project$Hexadecimal$toStringHexadecimal = function (_v0) {
	var leftMostDigit = _v0.c;
	var otherDigits = _v0.b;
	return '0x' + $elm$core$String$fromList(
		A2(
			$elm$core$List$map,
			$author$project$Hexadecimal$fromDigitToChar,
			A2($elm$core$List$cons, leftMostDigit, otherDigits)));
};
var $author$project$Hexadecimal$encode = function (hexadecimal) {
	return $elm$json$Json$Encode$string(
		$author$project$Hexadecimal$toStringHexadecimal(hexadecimal));
};
var $author$project$Data$addressEncode = function (_v0) {
	var hexadecimal = _v0;
	return $author$project$Hexadecimal$encode(hexadecimal);
};
var $author$project$Data$Address = $elm$core$Basics$identity;
var $author$project$Hexadecimal$Eight = 8;
var $author$project$Hexadecimal$Five = 5;
var $author$project$Hexadecimal$Four = 4;
var $author$project$Hexadecimal$Hexadecimal = $elm$core$Basics$identity;
var $author$project$Hexadecimal$LowercaseA = 10;
var $author$project$Hexadecimal$LowercaseB = 12;
var $author$project$Hexadecimal$LowercaseC = 14;
var $author$project$Hexadecimal$LowercaseD = 16;
var $author$project$Hexadecimal$LowercaseF = 20;
var $author$project$Hexadecimal$Nine = 9;
var $author$project$Hexadecimal$One = 1;
var $author$project$Hexadecimal$Seven = 7;
var $author$project$Hexadecimal$Six = 6;
var $author$project$Hexadecimal$Three = 3;
var $author$project$Hexadecimal$Two = 2;
var $author$project$Hexadecimal$UppercaseA = 11;
var $author$project$Hexadecimal$UppercaseB = 13;
var $author$project$Hexadecimal$UppercaseC = 15;
var $author$project$Hexadecimal$UppercaseE = 19;
var $author$project$Hexadecimal$Zero = 0;
var $author$project$Hexadecimal$addressFileTSDemo = {
	c: 12,
	b: _List_fromArray(
		[6, 12, 19, 20, 20, 9, 1, 5, 9, 8, 7, 8, 13, 11, 5, 3, 10, 16, 0, 0, 0, 0, 9, 0, 14, 16, 7, 19, 1, 19, 5, 14, 3, 4, 4, 4, 2, 2, 15])
};
var $author$project$Data$addressFileTSDemo = $author$project$Hexadecimal$addressFileTSDemo;
var $author$project$Hexadecimal$UppercaseF = 21;
var $author$project$Hexadecimal$addressTimeswapConvenience = {
	c: 19,
	b: _List_fromArray(
		[21, 8, 11, 6, 0, 11, 19, 10, 20, 9, 3, 0, 12, 8, 3, 6, 5, 7, 0, 16, 21, 2, 5, 20, 20, 0, 7, 7, 2, 2, 16, 9, 3, 7, 13, 8, 9, 14, 7])
};
var $author$project$Data$addressTimeswapConvenience = $author$project$Hexadecimal$addressTimeswapConvenience;
var $author$project$Data$AddressParameter = function (a) {
	return {$: 0, a: a};
};
var $author$project$Data$Data = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Data$UnsignedIntegerParameter = function (a) {
	return {$: 1, a: a};
};
var $author$project$Data$Selector = $elm$core$Basics$identity;
var $author$project$Hexadecimal$LowercaseE = 18;
var $author$project$Hexadecimal$approve = {
	c: 0,
	b: _List_fromArray(
		[9, 5, 18, 10, 7, 12, 3])
};
var $author$project$Data$selectorApprove = $author$project$Hexadecimal$approve;
var $author$project$Data$approve = F2(
	function (spender, amount) {
		return A2(
			$author$project$Data$Data,
			$author$project$Data$selectorApprove,
			_List_fromArray(
				[
					$author$project$Data$AddressParameter(spender),
					$author$project$Data$UnsignedIntegerParameter(amount)
				]));
	});
var $author$project$Hexadecimal$create = F2(
	function (leftMostDigit, otherDigits) {
		return {c: leftMostDigit, b: otherDigits};
	});
var $author$project$Hexadecimal$append = F2(
	function (_v0, _v1) {
		var first = _v0;
		var second = _v1;
		return A2(
			$author$project$Hexadecimal$create,
			first.c,
			_Utils_ap(
				first.b,
				A2($elm$core$List$cons, second.c, second.b)));
	});
var $author$project$Hexadecimal$length = function (_v0) {
	var otherDigits = _v0.b;
	return $elm$core$List$length(otherDigits) + 1;
};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$Hexadecimal$padUpto64 = function (hexadecimal) {
	var leftMostDigit = hexadecimal.c;
	var otherDigits = hexadecimal.b;
	if ($author$project$Hexadecimal$length(hexadecimal) === 64) {
		return hexadecimal;
	} else {
		var numberOfZeroes = 63 - $author$project$Hexadecimal$length(hexadecimal);
		var zeroes = A2($elm$core$List$repeat, numberOfZeroes, 0);
		return A2(
			$author$project$Hexadecimal$create,
			0,
			_Utils_ap(
				zeroes,
				A2($elm$core$List$cons, leftMostDigit, otherDigits)));
	}
};
var $author$project$Data$append = F2(
	function (parameter, hexadecimal) {
		var appendWithPad = function (currentHexadecimal) {
			return A2(
				$author$project$Hexadecimal$append,
				hexadecimal,
				$author$project$Hexadecimal$padUpto64(currentHexadecimal));
		};
		if (!parameter.$) {
			var address = parameter.a;
			return appendWithPad(address);
		} else {
			var unsignedInteger = parameter.a;
			return appendWithPad(unsignedInteger);
		}
	});
var $author$project$Data$encode = function (_v0) {
	var hexadecimal = _v0.a;
	var list = _v0.b;
	return $author$project$Hexadecimal$encode(
		A3($elm$core$List$foldl, $author$project$Data$append, hexadecimal, list));
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Main$idEncode = function (_v0) {
	var id = _v0._;
	return $elm$json$Json$Encode$int(id);
};
var $author$project$Main$jsonrpcEncode = $elm$json$Json$Encode$string('2.0');
var $author$project$Main$methodEncode = function (method) {
	if (!method) {
		return $elm$json$Json$Encode$string('eth_call');
	} else {
		return $elm$json$Json$Encode$string('eth_sendTransaction');
	}
};
var $author$project$Main$next = F2(
	function (_function, _v0) {
		var id = _v0._;
		var record = _v0.ae;
		var nextId = id + 1;
		var nextRecord = A3($elm$core$Dict$insert, nextId, _function, record);
		return {_: nextId, ae: nextRecord};
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$Main$parameterEncode = function (parameter) {
	return A2(
		$elm$json$Json$Encode$list,
		$elm$json$Json$Encode$object,
		$elm$core$List$singleton(parameter));
};
var $author$project$Data$UnsignedInteger = $elm$core$Basics$identity;
var $author$project$Hexadecimal$maxUnsignedInteger = A2(
	$author$project$Hexadecimal$create,
	20,
	A2($elm$core$List$repeat, 63, 20));
var $author$project$Data$unsignedIntegerMaxInteger = $author$project$Hexadecimal$maxUnsignedInteger;
var $author$project$Main$approveCollateral = F2(
	function (sender, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'from',
				$author$project$Data$addressEncode(sender)),
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressFileTSDemo)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					A2($author$project$Data$approve, $author$project$Data$addressTimeswapConvenience, $author$project$Data$unsignedIntegerMaxInteger)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$ApproveCollateral, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(1)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Main$ApproveToken = {$: 11};
var $author$project$Hexadecimal$UppercaseD = 17;
var $author$project$Hexadecimal$addressDaiTSDemo = {
	c: 14,
	b: _List_fromArray(
		[20, 14, 4, 18, 17, 8, 3, 6, 1, 5, 8, 14, 14, 15, 16, 9, 14, 5, 5, 0, 16, 4, 2, 2, 4, 5, 8, 5, 19, 16, 8, 1, 17, 1, 3, 10, 3, 8, 6])
};
var $author$project$Data$addressDaiTSDemo = $author$project$Hexadecimal$addressDaiTSDemo;
var $author$project$Main$approveToken = F2(
	function (sender, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'from',
				$author$project$Data$addressEncode(sender)),
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressDaiTSDemo)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					A2($author$project$Data$approve, $author$project$Data$addressTimeswapConvenience, $author$project$Data$unsignedIntegerMaxInteger)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$ApproveToken, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(1)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Main$sendTransaction = _Platform_outgoingPort('sendTransaction', $elm$core$Basics$identity);
var $author$project$Main$updateApprove = F2(
	function (info, model) {
		var _v0 = _Utils_Tuple3(info.g.C, info.af, info.V);
		_v0$2:
		while (true) {
			if (!_v0.a) {
				if ((!_v0.b.$) && (_v0.b.a === 1)) {
					var _v1 = _v0.a;
					var _v2 = _v0.b.a;
					var approveOutcome = A2($author$project$Main$approveToken, info.i, info.a);
					var nextInfo = _Utils_update(
						info,
						{a: approveOutcome.a});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								d: $author$project$Main$Rinkeby(nextInfo)
							}),
						$author$project$Main$sendTransaction(approveOutcome.e));
				} else {
					break _v0$2;
				}
			} else {
				if ((!_v0.c.$) && (_v0.c.a === 1)) {
					var _v3 = _v0.a;
					var _v4 = _v0.c.a;
					var approveOutcome = A2($author$project$Main$approveCollateral, info.i, info.a);
					var nextInfo = _Utils_update(
						info,
						{a: approveOutcome.a});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								d: $author$project$Main$Rinkeby(nextInfo)
							}),
						$author$project$Main$sendTransaction(approveOutcome.e));
				} else {
					break _v0$2;
				}
			}
		}
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Main$AllowanceCollateral = {$: 8};
var $author$project$Main$Call = 0;
var $author$project$Hexadecimal$allowance = {
	c: 16,
	b: _List_fromArray(
		[16, 6, 2, 18, 16, 3, 18])
};
var $author$project$Data$selectorAllowance = $author$project$Hexadecimal$allowance;
var $author$project$Data$allowance = F2(
	function (owner, spender) {
		return A2(
			$author$project$Data$Data,
			$author$project$Data$selectorAllowance,
			_List_fromArray(
				[
					$author$project$Data$AddressParameter(owner),
					$author$project$Data$AddressParameter(spender)
				]));
	});
var $author$project$Main$allowanceCollateral = F2(
	function (owner, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressFileTSDemo)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					A2($author$project$Data$allowance, owner, $author$project$Data$addressTimeswapConvenience)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$AllowanceCollateral, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(0)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Main$AllowanceToken = {$: 7};
var $author$project$Main$allowanceToken = F2(
	function (owner, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressDaiTSDemo)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					A2($author$project$Data$allowance, owner, $author$project$Data$addressTimeswapConvenience)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$AllowanceToken, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(0)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Main$DepositOf = {$: 1};
var $author$project$Hexadecimal$addressTimeswapPool = {
	c: 21,
	b: _List_fromArray(
		[4, 17, 6, 5, 0, 20, 17, 4, 15, 0, 4, 9, 16, 3, 10, 5, 10, 6, 2, 17, 4, 3, 19, 1, 17, 20, 21, 7, 8, 17, 9, 9, 5, 17, 11, 9, 19, 13, 21])
};
var $author$project$Data$addressTimeswapPool = $author$project$Hexadecimal$addressTimeswapPool;
var $author$project$Hexadecimal$depositOf = {
	c: 2,
	b: _List_fromArray(
		[3, 18, 3, 20, 12, 16, 5])
};
var $author$project$Data$selectorDepositOf = $author$project$Hexadecimal$depositOf;
var $author$project$Data$depositOf = function (owner) {
	return A2(
		$author$project$Data$Data,
		$author$project$Data$selectorDepositOf,
		_List_fromArray(
			[
				$author$project$Data$AddressParameter(owner)
			]));
};
var $author$project$Main$depositOf = F2(
	function (owner, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressTimeswapPool)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					$author$project$Data$depositOf(owner)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$DepositOf, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(0)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Main$LoanOf = function (a) {
	return {$: 2, a: a};
};
var $author$project$Hexadecimal$loanOf = {
	c: 12,
	b: _List_fromArray(
		[3, 1, 6, 1, 0, 9, 5])
};
var $author$project$Data$selectorLoanOf = $author$project$Hexadecimal$loanOf;
var $author$project$Data$loanOf = F2(
	function (owner, index) {
		return A2(
			$author$project$Data$Data,
			$author$project$Data$selectorLoanOf,
			_List_fromArray(
				[
					$author$project$Data$AddressParameter(owner),
					$author$project$Data$UnsignedIntegerParameter(index)
				]));
	});
var $author$project$Main$loanOf = F3(
	function (owner, index, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressTimeswapPool)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					A2($author$project$Data$loanOf, owner, index)))
			]);
		var nextLog = A2(
			$author$project$Main$next,
			$author$project$Main$LoanOf(index),
			log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(0)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Hexadecimal$zero = A2($author$project$Hexadecimal$create, 0, _List_Nil);
var $author$project$Data$unsignedIntegerZero = $author$project$Hexadecimal$zero;
var $author$project$Main$ViewReserves = {$: 0};
var $author$project$Hexadecimal$viewReserves = {
	c: 3,
	b: _List_fromArray(
		[10, 20, 7, 16, 20, 5, 14])
};
var $author$project$Data$selectorViewReserves = $author$project$Hexadecimal$viewReserves;
var $author$project$Data$viewReserves = A2($author$project$Data$Data, $author$project$Data$selectorViewReserves, _List_Nil);
var $author$project$Main$viewReserves = function (log) {
	var parameter = _List_fromArray(
		[
			_Utils_Tuple2(
			'to',
			$author$project$Data$addressEncode($author$project$Data$addressTimeswapPool)),
			_Utils_Tuple2(
			'data',
			$author$project$Data$encode($author$project$Data$viewReserves))
		]);
	var nextLog = A2($author$project$Main$next, $author$project$Main$ViewReserves, log);
	var value = $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$author$project$Main$idEncode(nextLog)),
				_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
				_Utils_Tuple2(
				'method',
				$author$project$Main$methodEncode(0)),
				_Utils_Tuple2(
				'params',
				$author$project$Main$parameterEncode(parameter))
			]));
	return A2($author$project$Main$Outcome, value, nextLog);
};
var $author$project$Main$updateCheck = F2(
	function (info, model) {
		var viewReservesOutcome = $author$project$Main$viewReserves(info.a);
		var depositOfOutcome = A2($author$project$Main$depositOf, info.i, viewReservesOutcome.a);
		var loanOfOutcome = A3($author$project$Main$loanOf, info.i, $author$project$Data$unsignedIntegerZero, depositOfOutcome.a);
		var allowanceTokenOutcome = A2($author$project$Main$allowanceToken, info.i, loanOfOutcome.a);
		var allowanceCollateralOutcome = A2($author$project$Main$allowanceCollateral, info.i, allowanceTokenOutcome.a);
		var nextInfo = _Utils_update(
			info,
			{a: allowanceCollateralOutcome.a});
		var sendTransactionCommand = $elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					$author$project$Main$sendTransaction(viewReservesOutcome.e),
					$author$project$Main$sendTransaction(depositOfOutcome.e),
					$author$project$Main$sendTransaction(loanOfOutcome.e),
					$author$project$Main$sendTransaction(allowanceTokenOutcome.e),
					$author$project$Main$sendTransaction(allowanceCollateralOutcome.e)
				]));
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					d: $author$project$Main$Rinkeby(nextInfo)
				}),
			sendTransactionCommand);
	});
var $cmditch$elm_bigint$BigInt$BigIntNotNormalised = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $cmditch$elm_bigint$BigInt$MagnitudeNotNormalised = $elm$core$Basics$identity;
var $cmditch$elm_bigint$BigInt$Positive = 0;
var $cmditch$elm_bigint$BigInt$Magnitude = $elm$core$Basics$identity;
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $cmditch$elm_bigint$BigInt$isNegativeMagnitude = function (digits) {
	var _v0 = $elm_community$list_extra$List$Extra$last(digits);
	if (_v0.$ === 1) {
		return false;
	} else {
		var x = _v0.a;
		return x < 0;
	}
};
var $cmditch$elm_bigint$BigInt$Neg = function (a) {
	return {$: 1, a: a};
};
var $cmditch$elm_bigint$BigInt$Pos = function (a) {
	return {$: 0, a: a};
};
var $cmditch$elm_bigint$BigInt$Zer = {$: 2};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $cmditch$elm_bigint$BigInt$mkBigInt = F2(
	function (s, mag) {
		var digits = mag;
		if ($elm$core$List$isEmpty(digits)) {
			return $cmditch$elm_bigint$BigInt$Zer;
		} else {
			switch (s) {
				case 2:
					return $cmditch$elm_bigint$BigInt$Zer;
				case 0:
					return $cmditch$elm_bigint$BigInt$Pos(mag);
				default:
					return $cmditch$elm_bigint$BigInt$Neg(mag);
			}
		}
	});
var $cmditch$elm_bigint$BigInt$mkBigIntNotNormalised = F2(
	function (s, digits) {
		return A2($cmditch$elm_bigint$BigInt$BigIntNotNormalised, s, digits);
	});
var $elm_community$list_extra$List$Extra$dropWhileRight = function (p) {
	return A2(
		$elm$core$List$foldr,
		F2(
			function (x, xs) {
				return (p(x) && $elm$core$List$isEmpty(xs)) ? _List_Nil : A2($elm$core$List$cons, x, xs);
			}),
		_List_Nil);
};
var $cmditch$elm_bigint$BigInt$dropZeroes = $elm_community$list_extra$List$Extra$dropWhileRight(
	$elm$core$Basics$eq(0));
var $cmditch$elm_bigint$Constants$maxDigitMagnitude = 7;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$pow = _Basics_pow;
var $cmditch$elm_bigint$Constants$maxDigitValue = (-1) + A2($elm$core$Basics$pow, 10, $cmditch$elm_bigint$Constants$maxDigitMagnitude);
var $cmditch$elm_bigint$BigInt$baseDigit = $cmditch$elm_bigint$Constants$maxDigitValue + 1;
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $cmditch$elm_bigint$BigInt$normaliseDigit = function (x) {
	return (x < 0) ? A2(
		$elm$core$Tuple$mapFirst,
		$elm$core$Basics$add(-1),
		$cmditch$elm_bigint$BigInt$normaliseDigit(x + $cmditch$elm_bigint$BigInt$baseDigit)) : _Utils_Tuple2((x / $cmditch$elm_bigint$BigInt$baseDigit) | 0, x % $cmditch$elm_bigint$BigInt$baseDigit);
};
var $cmditch$elm_bigint$BigInt$normaliseDigitList = F2(
	function (carry, xs) {
		normaliseDigitList:
		while (true) {
			if (!xs.b) {
				if (_Utils_cmp(carry, $cmditch$elm_bigint$BigInt$baseDigit) > 0) {
					var $temp$carry = 0,
						$temp$xs = _List_fromArray(
						[carry]);
					carry = $temp$carry;
					xs = $temp$xs;
					continue normaliseDigitList;
				} else {
					return _List_fromArray(
						[carry]);
				}
			} else {
				var x = xs.a;
				var xs_ = xs.b;
				var _v1 = $cmditch$elm_bigint$BigInt$normaliseDigit(x + carry);
				var newCarry = _v1.a;
				var x_ = _v1.b;
				return A2(
					$elm$core$List$cons,
					x_,
					A2($cmditch$elm_bigint$BigInt$normaliseDigitList, newCarry, xs_));
			}
		}
	});
var $cmditch$elm_bigint$BigInt$normaliseMagnitude = function (_v0) {
	var xs = _v0;
	return $cmditch$elm_bigint$BigInt$dropZeroes(
		A2($cmditch$elm_bigint$BigInt$normaliseDigitList, 0, xs));
};
var $cmditch$elm_bigint$BigInt$reverseMagnitude = $elm$core$List$map($elm$core$Basics$negate);
var $cmditch$elm_bigint$BigInt$Negative = 1;
var $cmditch$elm_bigint$BigInt$Zero = 2;
var $cmditch$elm_bigint$BigInt$signNegate = function (sign_) {
	switch (sign_) {
		case 0:
			return 1;
		case 1:
			return 0;
		default:
			return 2;
	}
};
var $cmditch$elm_bigint$BigInt$normalise = function (_v0) {
	normalise:
	while (true) {
		var s = _v0.a;
		var digits = _v0.b;
		var _v1 = $cmditch$elm_bigint$BigInt$normaliseMagnitude(digits);
		var normalisedMag = _v1;
		if ($cmditch$elm_bigint$BigInt$isNegativeMagnitude(normalisedMag)) {
			var $temp$_v0 = A2(
				$cmditch$elm_bigint$BigInt$mkBigIntNotNormalised,
				$cmditch$elm_bigint$BigInt$signNegate(s),
				$cmditch$elm_bigint$BigInt$reverseMagnitude(normalisedMag));
			_v0 = $temp$_v0;
			continue normalise;
		} else {
			return A2($cmditch$elm_bigint$BigInt$mkBigInt, s, normalisedMag);
		}
	}
};
var $cmditch$elm_bigint$BigInt$MagnitudePair = $elm$core$Basics$identity;
var $cmditch$elm_bigint$BigInt$sameSizeRaw = F2(
	function (xs, ys) {
		var _v0 = _Utils_Tuple2(xs, ys);
		if (!_v0.a.b) {
			if (!_v0.b.b) {
				return _List_Nil;
			} else {
				var _v2 = _v0.b;
				var y = _v2.a;
				var ys_ = _v2.b;
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(0, y),
					A2($cmditch$elm_bigint$BigInt$sameSizeRaw, _List_Nil, ys_));
			}
		} else {
			if (!_v0.b.b) {
				var _v1 = _v0.a;
				var x = _v1.a;
				var xs_ = _v1.b;
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(x, 0),
					A2($cmditch$elm_bigint$BigInt$sameSizeRaw, xs_, _List_Nil));
			} else {
				var _v3 = _v0.a;
				var x = _v3.a;
				var xs_ = _v3.b;
				var _v4 = _v0.b;
				var y = _v4.a;
				var ys_ = _v4.b;
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(x, y),
					A2($cmditch$elm_bigint$BigInt$sameSizeRaw, xs_, ys_));
			}
		}
	});
var $cmditch$elm_bigint$BigInt$sameSizeNotNormalized = F2(
	function (_v0, _v1) {
		var xs = _v0;
		var ys = _v1;
		return A2($cmditch$elm_bigint$BigInt$sameSizeRaw, xs, ys);
	});
var $cmditch$elm_bigint$BigInt$toPositiveSign = function (bigInt) {
	switch (bigInt.$) {
		case 2:
			return A2($cmditch$elm_bigint$BigInt$mkBigIntNotNormalised, 2, _List_Nil);
		case 1:
			var digits = bigInt.a;
			return A2(
				$cmditch$elm_bigint$BigInt$mkBigIntNotNormalised,
				0,
				$cmditch$elm_bigint$BigInt$reverseMagnitude(digits));
		default:
			var digits = bigInt.a;
			return A2($cmditch$elm_bigint$BigInt$mkBigIntNotNormalised, 0, digits);
	}
};
var $cmditch$elm_bigint$BigInt$add = F2(
	function (a, b) {
		var _v0 = $cmditch$elm_bigint$BigInt$toPositiveSign(b);
		var mb = _v0.b;
		var _v1 = $cmditch$elm_bigint$BigInt$toPositiveSign(a);
		var ma = _v1.b;
		var _v2 = A2($cmditch$elm_bigint$BigInt$sameSizeNotNormalized, ma, mb);
		var pairs = _v2;
		var added = A2(
			$elm$core$List$map,
			function (_v3) {
				var a_ = _v3.a;
				var b_ = _v3.b;
				return a_ + b_;
			},
			pairs);
		return $cmditch$elm_bigint$BigInt$normalise(
			A2($cmditch$elm_bigint$BigInt$BigIntNotNormalised, 0, added));
	});
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $cmditch$elm_bigint$BigInt$compareMagnitude = F4(
	function (x, y, xs, ys) {
		compareMagnitude:
		while (true) {
			var _v0 = _Utils_Tuple2(xs, ys);
			if (!_v0.a.b) {
				if (!_v0.b.b) {
					return A2($elm$core$Basics$compare, x, y);
				} else {
					return 0;
				}
			} else {
				if (!_v0.b.b) {
					return 2;
				} else {
					var _v1 = _v0.a;
					var x_ = _v1.a;
					var xss = _v1.b;
					var _v2 = _v0.b;
					var y_ = _v2.a;
					var yss = _v2.b;
					if (_Utils_eq(x_, y_)) {
						var $temp$x = x,
							$temp$y = y,
							$temp$xs = xss,
							$temp$ys = yss;
						x = $temp$x;
						y = $temp$y;
						xs = $temp$xs;
						ys = $temp$ys;
						continue compareMagnitude;
					} else {
						var $temp$x = x_,
							$temp$y = y_,
							$temp$xs = xss,
							$temp$ys = yss;
						x = $temp$x;
						y = $temp$y;
						xs = $temp$xs;
						ys = $temp$ys;
						continue compareMagnitude;
					}
				}
			}
		}
	});
var $cmditch$elm_bigint$BigInt$orderNegate = function (x) {
	switch (x) {
		case 0:
			return 2;
		case 1:
			return 1;
		default:
			return 0;
	}
};
var $cmditch$elm_bigint$BigInt$compare = F2(
	function (int1, int2) {
		var _v0 = _Utils_Tuple2(int1, int2);
		switch (_v0.a.$) {
			case 0:
				if (!_v0.b.$) {
					var mag1 = _v0.a.a;
					var mag2 = _v0.b.a;
					return A4($cmditch$elm_bigint$BigInt$compareMagnitude, 0, 0, mag1, mag2);
				} else {
					return 2;
				}
			case 1:
				if (_v0.b.$ === 1) {
					var mag1 = _v0.a.a;
					var mag2 = _v0.b.a;
					return $cmditch$elm_bigint$BigInt$orderNegate(
						A4($cmditch$elm_bigint$BigInt$compareMagnitude, 0, 0, mag1, mag2));
				} else {
					return 0;
				}
			default:
				switch (_v0.b.$) {
					case 0:
						var _v1 = _v0.a;
						return 0;
					case 2:
						var _v2 = _v0.a;
						var _v3 = _v0.b;
						return 1;
					default:
						var _v4 = _v0.a;
						return 2;
				}
		}
	});
var $cmditch$elm_bigint$BigInt$gt = F2(
	function (x, y) {
		return A2($cmditch$elm_bigint$BigInt$compare, x, y) === 2;
	});
var $cmditch$elm_bigint$BigInt$lt = F2(
	function (x, y) {
		return !A2($cmditch$elm_bigint$BigInt$compare, x, y);
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $cmditch$elm_bigint$BigInt$signFromInt = function (x) {
	var _v0 = A2($elm$core$Basics$compare, x, 0);
	switch (_v0) {
		case 0:
			return 1;
		case 2:
			return 0;
		default:
			return 2;
	}
};
var $cmditch$elm_bigint$BigInt$fromInt = function (x) {
	return $cmditch$elm_bigint$BigInt$normalise(
		A2(
			$cmditch$elm_bigint$BigInt$BigIntNotNormalised,
			$cmditch$elm_bigint$BigInt$signFromInt(x),
			_List_fromArray(
				[
					$elm$core$Basics$abs(x)
				])));
};
var $cmditch$elm_bigint$BigInt$one = $cmditch$elm_bigint$BigInt$fromInt(1);
var $cmditch$elm_bigint$BigInt$abs = function (bigInt) {
	switch (bigInt.$) {
		case 2:
			return $cmditch$elm_bigint$BigInt$Zer;
		case 1:
			var mag = bigInt.a;
			return $cmditch$elm_bigint$BigInt$Pos(mag);
		default:
			var i = bigInt;
			return i;
	}
};
var $elm$core$Basics$not = _Basics_not;
var $cmditch$elm_bigint$BigInt$lte = F2(
	function (x, y) {
		return !A2($cmditch$elm_bigint$BigInt$gt, x, y);
	});
var $cmditch$elm_bigint$BigInt$magnitude = function (bigInt) {
	switch (bigInt.$) {
		case 2:
			return _List_Nil;
		case 0:
			var mag = bigInt.a;
			return mag;
		default:
			var mag = bigInt.a;
			return mag;
	}
};
var $cmditch$elm_bigint$BigInt$mulSingleDigit = F2(
	function (_v0, d) {
		var xs = _v0;
		return $cmditch$elm_bigint$BigInt$normaliseMagnitude(
			A2(
				$elm$core$List$map,
				$elm$core$Basics$mul(d),
				xs));
	});
var $cmditch$elm_bigint$BigInt$mulMagnitudes = F2(
	function (_v0, _v1) {
		var mag1 = _v0;
		var mag2 = _v1;
		if (!mag1.b) {
			return _List_Nil;
		} else {
			if (!mag1.b.b) {
				var m = mag1.a;
				return A2($cmditch$elm_bigint$BigInt$mulSingleDigit, mag2, m);
			} else {
				var m = mag1.a;
				var mx = mag1.b;
				var accum = A2($cmditch$elm_bigint$BigInt$mulSingleDigit, mag2, m);
				var _v3 = A2($cmditch$elm_bigint$BigInt$mulMagnitudes, mx, mag2);
				var rest = _v3;
				var bigInt = A2(
					$cmditch$elm_bigint$BigInt$add,
					A2($cmditch$elm_bigint$BigInt$mkBigInt, 0, accum),
					A2(
						$cmditch$elm_bigint$BigInt$mkBigInt,
						0,
						A2($elm$core$List$cons, 0, rest)));
				return $cmditch$elm_bigint$BigInt$magnitude(bigInt);
			}
		}
	});
var $cmditch$elm_bigint$BigInt$sign = function (bigInt) {
	switch (bigInt.$) {
		case 2:
			return 2;
		case 0:
			return 0;
		default:
			return 1;
	}
};
var $cmditch$elm_bigint$BigInt$signProduct = F2(
	function (x, y) {
		return ((x === 2) || (y === 2)) ? 2 : (_Utils_eq(x, y) ? 0 : 1);
	});
var $cmditch$elm_bigint$BigInt$mul = F2(
	function (int1, int2) {
		return A2(
			$cmditch$elm_bigint$BigInt$mkBigInt,
			A2(
				$cmditch$elm_bigint$BigInt$signProduct,
				$cmditch$elm_bigint$BigInt$sign(int1),
				$cmditch$elm_bigint$BigInt$sign(int2)),
			A2(
				$cmditch$elm_bigint$BigInt$mulMagnitudes,
				$cmditch$elm_bigint$BigInt$magnitude(int1),
				$cmditch$elm_bigint$BigInt$magnitude(int2)));
	});
var $cmditch$elm_bigint$BigInt$negate = function (bigInt) {
	switch (bigInt.$) {
		case 2:
			return $cmditch$elm_bigint$BigInt$Zer;
		case 0:
			var mag = bigInt.a;
			return $cmditch$elm_bigint$BigInt$Neg(mag);
		default:
			var mag = bigInt.a;
			return $cmditch$elm_bigint$BigInt$Pos(mag);
	}
};
var $cmditch$elm_bigint$BigInt$sub = F2(
	function (a, b) {
		return A2(
			$cmditch$elm_bigint$BigInt$add,
			a,
			$cmditch$elm_bigint$BigInt$negate(b));
	});
var $cmditch$elm_bigint$BigInt$zero = $cmditch$elm_bigint$BigInt$fromInt(0);
var $cmditch$elm_bigint$BigInt$divmodDigit_ = F4(
	function (to_test, padding, num, den) {
		if (!to_test) {
			return _Utils_Tuple2($cmditch$elm_bigint$BigInt$zero, num);
		} else {
			var x = $cmditch$elm_bigint$BigInt$fromInt(to_test);
			var candidate = A2(
				$cmditch$elm_bigint$BigInt$mul,
				A2($cmditch$elm_bigint$BigInt$mul, x, den),
				padding);
			var _v0 = A2($cmditch$elm_bigint$BigInt$lte, candidate, num) ? _Utils_Tuple2(
				A2($cmditch$elm_bigint$BigInt$mul, x, padding),
				A2($cmditch$elm_bigint$BigInt$sub, num, candidate)) : _Utils_Tuple2($cmditch$elm_bigint$BigInt$zero, num);
			var newdiv = _v0.a;
			var newmod = _v0.b;
			var _v1 = A4($cmditch$elm_bigint$BigInt$divmodDigit_, (to_test / 2) | 0, padding, newmod, den);
			var restdiv = _v1.a;
			var restmod = _v1.b;
			return _Utils_Tuple2(
				A2($cmditch$elm_bigint$BigInt$add, newdiv, restdiv),
				restmod);
		}
	});
var $cmditch$elm_bigint$BigInt$maxDigitBits = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $cmditch$elm_bigint$Constants$maxDigitValue));
var $cmditch$elm_bigint$BigInt$divmodDigit = F3(
	function (padding, x, y) {
		return A4(
			$cmditch$elm_bigint$BigInt$divmodDigit_,
			A2($elm$core$Basics$pow, 2, $cmditch$elm_bigint$BigInt$maxDigitBits),
			padding,
			x,
			y);
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $cmditch$elm_bigint$BigInt$repeatedly = F3(
	function (f, x, n) {
		return A3(
			$elm$core$List$foldl,
			$elm$core$Basics$always(f),
			x,
			A2($elm$core$List$range, 1, n));
	});
var $cmditch$elm_bigint$BigInt$padDigits = function (n) {
	return A3(
		$cmditch$elm_bigint$BigInt$repeatedly,
		$cmditch$elm_bigint$BigInt$mul(
			$cmditch$elm_bigint$BigInt$fromInt($cmditch$elm_bigint$BigInt$baseDigit)),
		$cmditch$elm_bigint$BigInt$one,
		n);
};
var $cmditch$elm_bigint$BigInt$divMod_ = F3(
	function (n, num, den) {
		if (!n) {
			return A3(
				$cmditch$elm_bigint$BigInt$divmodDigit,
				$cmditch$elm_bigint$BigInt$padDigits(n),
				num,
				den);
		} else {
			var _v0 = A3(
				$cmditch$elm_bigint$BigInt$divmodDigit,
				$cmditch$elm_bigint$BigInt$padDigits(n),
				num,
				den);
			var cdiv = _v0.a;
			var cmod = _v0.b;
			var _v1 = A3($cmditch$elm_bigint$BigInt$divMod_, n - 1, cmod, den);
			var rdiv = _v1.a;
			var rmod = _v1.b;
			return _Utils_Tuple2(
				A2($cmditch$elm_bigint$BigInt$add, cdiv, rdiv),
				rmod);
		}
	});
var $cmditch$elm_bigint$BigInt$toDigits = function (bigInt) {
	switch (bigInt.$) {
		case 2:
			return _List_Nil;
		case 0:
			var ds = bigInt.a;
			return ds;
		default:
			var ds = bigInt.a;
			return ds;
	}
};
var $cmditch$elm_bigint$BigInt$divmod = F2(
	function (num, den) {
		if (_Utils_eq(den, $cmditch$elm_bigint$BigInt$zero)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var cand_l = ($elm$core$List$length(
				$cmditch$elm_bigint$BigInt$toDigits(num)) - $elm$core$List$length(
				$cmditch$elm_bigint$BigInt$toDigits(den))) + 1;
			var _v0 = A3(
				$cmditch$elm_bigint$BigInt$divMod_,
				A2($elm$core$Basics$max, 0, cand_l),
				$cmditch$elm_bigint$BigInt$abs(num),
				$cmditch$elm_bigint$BigInt$abs(den));
			var d = _v0.a;
			var m = _v0.b;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					A2(
						$cmditch$elm_bigint$BigInt$mkBigInt,
						A2(
							$cmditch$elm_bigint$BigInt$signProduct,
							$cmditch$elm_bigint$BigInt$sign(num),
							$cmditch$elm_bigint$BigInt$sign(den)),
						$cmditch$elm_bigint$BigInt$magnitude(d)),
					A2(
						$cmditch$elm_bigint$BigInt$mkBigInt,
						$cmditch$elm_bigint$BigInt$sign(num),
						$cmditch$elm_bigint$BigInt$magnitude(m))));
		}
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $cmditch$elm_bigint$BigInt$div = F2(
	function (num, den) {
		return A2(
			$elm$core$Maybe$withDefault,
			$cmditch$elm_bigint$BigInt$zero,
			A2(
				$elm$core$Maybe$map,
				$elm$core$Tuple$first,
				A2($cmditch$elm_bigint$BigInt$divmod, num, den)));
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $cmditch$elm_bigint$BigInt$isEven = function (num) {
	var even = function (i) {
		return !A2($elm$core$Basics$modBy, 2, i);
	};
	switch (num.$) {
		case 2:
			return true;
		case 0:
			var mag = num.a;
			return even(
				A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$List$head(mag)));
		default:
			var mag = num.a;
			return even(
				A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$List$head(mag)));
	}
};
var $cmditch$elm_bigint$BigInt$square = function (num) {
	return A2($cmditch$elm_bigint$BigInt$mul, num, num);
};
var $cmditch$elm_bigint$BigInt$two = $cmditch$elm_bigint$BigInt$fromInt(2);
var $cmditch$elm_bigint$BigInt$powHelp = F3(
	function (work, num, exp) {
		powHelp:
		while (true) {
			switch (exp.$) {
				case 2:
					return $cmditch$elm_bigint$BigInt$one;
				case 1:
					return $cmditch$elm_bigint$BigInt$Zer;
				default:
					if (_Utils_eq(exp, $cmditch$elm_bigint$BigInt$one)) {
						return A2($cmditch$elm_bigint$BigInt$mul, work, num);
					} else {
						if ($cmditch$elm_bigint$BigInt$isEven(exp)) {
							var $temp$work = work,
								$temp$num = $cmditch$elm_bigint$BigInt$square(num),
								$temp$exp = A2($cmditch$elm_bigint$BigInt$div, exp, $cmditch$elm_bigint$BigInt$two);
							work = $temp$work;
							num = $temp$num;
							exp = $temp$exp;
							continue powHelp;
						} else {
							var $temp$work = A2($cmditch$elm_bigint$BigInt$mul, num, work),
								$temp$num = $cmditch$elm_bigint$BigInt$square(num),
								$temp$exp = A2(
								$cmditch$elm_bigint$BigInt$div,
								A2($cmditch$elm_bigint$BigInt$sub, exp, $cmditch$elm_bigint$BigInt$one),
								$cmditch$elm_bigint$BigInt$two);
							work = $temp$work;
							num = $temp$num;
							exp = $temp$exp;
							continue powHelp;
						}
					}
			}
		}
	});
var $cmditch$elm_bigint$BigInt$pow = F2(
	function (base, exp) {
		return A3($cmditch$elm_bigint$BigInt$powHelp, $cmditch$elm_bigint$BigInt$one, base, exp);
	});
var $author$project$Main$maxUint256 = A2(
	$cmditch$elm_bigint$BigInt$sub,
	A2(
		$cmditch$elm_bigint$BigInt$pow,
		$cmditch$elm_bigint$BigInt$fromInt(2),
		$cmditch$elm_bigint$BigInt$fromInt(256)),
	$cmditch$elm_bigint$BigInt$fromInt(1));
var $author$project$Main$zero = $cmditch$elm_bigint$BigInt$fromInt(0);
var $author$project$Main$checkSize = function (bigInt) {
	return A2($cmditch$elm_bigint$BigInt$gt, bigInt, $author$project$Main$maxUint256) ? $elm$core$Result$Err('Overflow') : (A2($cmditch$elm_bigint$BigInt$lt, bigInt, $author$project$Main$zero) ? $elm$core$Result$Err('Overflow') : $elm$core$Result$Ok(bigInt));
};
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm_community$maybe_extra$Maybe$Extra$combine = A2(
	$elm$core$List$foldr,
	$elm$core$Maybe$map2($elm$core$List$cons),
	$elm$core$Maybe$Just(_List_Nil));
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {cW: index, c7: match, db: number, dB: submatches};
	});
var $elm$regex$Regex$contains = _Regex_contains;
var $elm_community$list_extra$List$Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			if (!list.b) {
				return _List_Nil;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					var $temp$predicate = predicate,
						$temp$list = xs;
					predicate = $temp$predicate;
					list = $temp$list;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var $cmditch$elm_bigint$BigInt$emptyZero = function (_v0) {
	var xs = _v0;
	var _v1 = A2(
		$elm_community$list_extra$List$Extra$dropWhile,
		$elm$core$Basics$eq(0),
		xs);
	if (!_v1.b) {
		return _List_Nil;
	} else {
		return xs;
	}
};
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{cx: false, c9: false},
		string);
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm_community$list_extra$List$Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var xs_ = A2($elm$core$List$drop, step, xs);
		var okayXs = $elm$core$List$length(xs) > 0;
		var okayArgs = (size > 0) && (step > 0);
		return (okayArgs && okayXs) ? A2(
			$elm$core$List$cons,
			A2($elm$core$List$take, size, xs),
			A3($elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, step, xs_)) : _List_Nil;
	});
var $elm_community$list_extra$List$Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3($elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var $elm$regex$Regex$never = _Regex_never;
var $cmditch$elm_bigint$BigInt$fromString_ = function (x) {
	var _v0 = A2(
		$elm$regex$Regex$contains,
		A2(
			$elm$core$Maybe$withDefault,
			$elm$regex$Regex$never,
			$elm$regex$Regex$fromString('^[0-9]')),
		$elm$core$String$fromList(x));
	if (_v0) {
		return A2(
			$elm$core$Maybe$map,
			A2($elm$core$Basics$composeL, $cmditch$elm_bigint$BigInt$emptyZero, $elm$core$Basics$identity),
			$elm_community$maybe_extra$Maybe$Extra$combine(
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$List$reverse,
						A2($elm$core$Basics$composeR, $elm$core$String$fromList, $elm$core$String$toInt)),
					A2(
						$elm_community$list_extra$List$Extra$greedyGroupsOf,
						$cmditch$elm_bigint$Constants$maxDigitMagnitude,
						$elm$core$List$reverse(x)))));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$String$toLower = _String_toLower;
var $cmditch$elm_bigint$BigInt$fromIntString = function (x) {
	var _v0 = $elm$core$String$toList(
		$elm$core$String$toLower(x));
	if (!_v0.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		switch (_v0.a) {
			case '-':
				if (!_v0.b.b) {
					return $elm$core$Maybe$Nothing;
				} else {
					var xs = _v0.b;
					return A2(
						$elm$core$Maybe$map,
						$cmditch$elm_bigint$BigInt$mkBigInt(1),
						$cmditch$elm_bigint$BigInt$fromString_(xs));
				}
			case '+':
				if (!_v0.b.b) {
					return $elm$core$Maybe$Nothing;
				} else {
					var xs = _v0.b;
					return A2(
						$elm$core$Maybe$map,
						$cmditch$elm_bigint$BigInt$mkBigInt(0),
						$cmditch$elm_bigint$BigInt$fromString_(xs));
				}
			default:
				var xs = _v0;
				return A2(
					$elm$core$Maybe$map,
					$cmditch$elm_bigint$BigInt$mkBigInt(0),
					$cmditch$elm_bigint$BigInt$fromString_(xs));
		}
	}
};
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (!maybe.$) {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $author$project$Main$quintillion = A2(
	$elm$core$Maybe$withDefault,
	$author$project$Main$zero,
	$cmditch$elm_bigint$BigInt$fromIntString('1000000000000000000'));
var $author$project$Main$fromTokenToBigInt = function (string) {
	var whole = function (wholeString) {
		return A2(
			$elm$core$Result$map,
			$cmditch$elm_bigint$BigInt$mul($author$project$Main$quintillion),
			A2(
				$elm$core$Result$fromMaybe,
				'Not able to turn to big int',
				$cmditch$elm_bigint$BigInt$fromIntString(wholeString)));
	};
	var splits = A2($elm$core$String$split, '.', string);
	var decimal = function (decimalString) {
		var decimalLength = $elm$core$String$length(decimalString);
		return (decimalLength <= 18) ? A2(
			$elm$core$Result$fromMaybe,
			'Not able to turn to big int',
			$cmditch$elm_bigint$BigInt$fromIntString(
				A3($elm$core$String$padRight, 18, '0', decimalString))) : A2(
			$elm$core$Result$fromMaybe,
			'Not able to turn to big int',
			$cmditch$elm_bigint$BigInt$fromIntString(
				A2($elm$core$String$left, 18, decimalString)));
	};
	if (!splits.b) {
		return $elm$core$Result$Err('Cannot be empty string');
	} else {
		if (!splits.b.b) {
			var big = splits.a;
			return whole(big);
		} else {
			if (!splits.b.b.b) {
				var big = splits.a;
				var _v1 = splits.b;
				var small = _v1.a;
				return A2(
					$elm$core$Result$andThen,
					$author$project$Main$checkSize,
					A3(
						$elm$core$Result$map2,
						$cmditch$elm_bigint$BigInt$add,
						whole(big),
						decimal(small)));
			} else {
				return $elm$core$Result$Err('Cannot be unsignedInteger');
			}
		}
	}
};
var $author$project$Utility$andThen2 = F3(
	function (monad, result1, result2) {
		return A2(
			$elm$core$Result$andThen,
			$elm$core$Basics$identity,
			A3($elm$core$Result$map2, monad, result1, result2));
	});
var $author$project$Main$divBy = F2(
	function (bigInt1, bigInt2) {
		return $author$project$Main$checkSize(
			A2($cmditch$elm_bigint$BigInt$div, bigInt2, bigInt1));
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $cmditch$elm_bigint$BigInt$fillZeroes = A2(
	$elm$core$Basics$composeL,
	A2($elm$core$String$padLeft, $cmditch$elm_bigint$Constants$maxDigitMagnitude, '0'),
	$elm$core$String$fromInt);
var $cmditch$elm_bigint$BigInt$revMagnitudeToString = function (_v0) {
	var digits = _v0;
	var _v1 = $elm$core$List$reverse(digits);
	if (!_v1.b) {
		return '0';
	} else {
		var x = _v1.a;
		var xs = _v1.b;
		return $elm$core$String$concat(
			A2(
				$elm$core$List$cons,
				$elm$core$String$fromInt(x),
				A2($elm$core$List$map, $cmditch$elm_bigint$BigInt$fillZeroes, xs)));
	}
};
var $cmditch$elm_bigint$BigInt$toString = function (bigInt) {
	switch (bigInt.$) {
		case 2:
			return '0';
		case 0:
			var mag = bigInt.a;
			return $cmditch$elm_bigint$BigInt$revMagnitudeToString(mag);
		default:
			var mag = bigInt.a;
			return '-' + $cmditch$elm_bigint$BigInt$revMagnitudeToString(mag);
	}
};
var $author$project$Main$fromBigIntToToken = function (bigInt) {
	var division = A2(
		$elm$core$Result$fromMaybe,
		'cannot be turn to string',
		A2($cmditch$elm_bigint$BigInt$divmod, bigInt, $author$project$Main$quintillion));
	var quotient = A2(
		$elm$core$Result$map,
		$cmditch$elm_bigint$BigInt$toString,
		A2($elm$core$Result$map, $elm$core$Tuple$first, division));
	var remainder = A2(
		$elm$core$Result$map,
		$cmditch$elm_bigint$BigInt$toString,
		A2($elm$core$Result$map, $elm$core$Tuple$second, division));
	var combine = F2(
		function (whole, decimal) {
			var _v0 = _Utils_Tuple2(whole, decimal);
			if (_v0.a === '0') {
				if (_v0.b === '0') {
					return '0';
				} else {
					var notZero = _v0.b;
					return '0.' + A3($elm$core$String$padLeft, 18, '0', notZero);
				}
			} else {
				if (_v0.b === '0') {
					var notZero = _v0.a;
					return notZero;
				} else {
					return _Utils_ap(
						whole,
						'.' + A3($elm$core$String$padLeft, 18, '0', decimal));
				}
			}
		});
	return A3($elm$core$Result$map2, combine, quotient, remainder);
};
var $author$project$Main$mulBy = F2(
	function (bigInt1, bigInt2) {
		return $author$project$Main$checkSize(
			A2($cmditch$elm_bigint$BigInt$mul, bigInt2, bigInt1));
	});
var $author$project$Main$subBy = F2(
	function (bigInt1, bigInt2) {
		return $author$project$Main$checkSize(
			A2($cmditch$elm_bigint$BigInt$sub, bigInt2, bigInt1));
	});
var $cmditch$elm_bigint$BigInt$eightHexDigits = A2(
	$cmditch$elm_bigint$BigInt$mul,
	$cmditch$elm_bigint$BigInt$fromInt(2),
	$cmditch$elm_bigint$BigInt$fromInt(2147483648));
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $cmditch$elm_bigint$Constants$hexDigitMagnitude = 8;
var $elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $cmditch$elm_bigint$BigInt$fromHexString_ = function (x) {
	var _v0 = A2(
		$elm$regex$Regex$contains,
		A2(
			$elm$core$Maybe$withDefault,
			$elm$regex$Regex$never,
			$elm$regex$Regex$fromString('^[0-9A-Fa-f]')),
		$elm$core$String$fromList(x));
	if (_v0) {
		return A2(
			$elm$core$Maybe$map,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$List$reverse,
				A2(
					$elm$core$List$foldl,
					F2(
						function (e, s) {
							return A2(
								$cmditch$elm_bigint$BigInt$add,
								$cmditch$elm_bigint$BigInt$fromInt(e),
								A2($cmditch$elm_bigint$BigInt$mul, s, $cmditch$elm_bigint$BigInt$eightHexDigits));
						}),
					$cmditch$elm_bigint$BigInt$zero)),
			$elm_community$maybe_extra$Maybe$Extra$combine(
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$List$reverse,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$String$fromList,
							A2($elm$core$Basics$composeR, $rtfeldman$elm_hex$Hex$fromString, $elm$core$Result$toMaybe))),
					A2(
						$elm_community$list_extra$List$Extra$greedyGroupsOf,
						$cmditch$elm_bigint$Constants$hexDigitMagnitude,
						$elm$core$List$reverse(x)))));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $cmditch$elm_bigint$BigInt$fromHexString = function (x) {
	var _v0 = $elm$core$String$toList(
		$elm$core$String$toLower(x));
	_v0$9:
	while (true) {
		if (!_v0.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			switch (_v0.a) {
				case '-':
					if (_v0.b.b) {
						if ((('0' === _v0.b.a) && _v0.b.b.b) && ('x' === _v0.b.b.a)) {
							if (!_v0.b.b.b.b) {
								var _v1 = _v0.b;
								var _v2 = _v1.b;
								return $elm$core$Maybe$Nothing;
							} else {
								var _v3 = _v0.b;
								var _v4 = _v3.b;
								var xs = _v4.b;
								return A2(
									$elm$core$Maybe$map,
									$cmditch$elm_bigint$BigInt$mul(
										$cmditch$elm_bigint$BigInt$fromInt(-1)),
									$cmditch$elm_bigint$BigInt$fromHexString_(xs));
							}
						} else {
							var xs = _v0.b;
							return A2(
								$elm$core$Maybe$map,
								$cmditch$elm_bigint$BigInt$mul(
									$cmditch$elm_bigint$BigInt$fromInt(-1)),
								$cmditch$elm_bigint$BigInt$fromHexString_(xs));
						}
					} else {
						return $elm$core$Maybe$Nothing;
					}
				case '+':
					if (!_v0.b.b) {
						return $elm$core$Maybe$Nothing;
					} else {
						var xs = _v0.b;
						return $cmditch$elm_bigint$BigInt$fromHexString_(xs);
					}
				case '0':
					if (_v0.b.b && ('x' === _v0.b.a)) {
						if (!_v0.b.b.b) {
							var _v5 = _v0.b;
							return $elm$core$Maybe$Nothing;
						} else {
							var _v6 = _v0.b;
							var xs = _v6.b;
							return $cmditch$elm_bigint$BigInt$fromHexString_(xs);
						}
					} else {
						break _v0$9;
					}
				default:
					break _v0$9;
			}
		}
	}
	var xs = _v0;
	return $cmditch$elm_bigint$BigInt$fromHexString_(xs);
};
var $author$project$Hexadecimal$toBigInt = function (hexadecimal) {
	return A2(
		$elm$core$Result$fromMaybe,
		'Not able to turn to hexadecimal',
		$cmditch$elm_bigint$BigInt$fromHexString(
			$author$project$Hexadecimal$toStringHexadecimal(hexadecimal)));
};
var $author$project$Data$toBigInt = function (_v0) {
	var hexadecimal = _v0;
	return $author$project$Hexadecimal$toBigInt(hexadecimal);
};
var $author$project$Main$getCollateralMin = F2(
	function (token, reserve) {
		var reserveToken = $author$project$Data$toBigInt(reserve.dS);
		var reserveCollateral = $author$project$Data$toBigInt(reserve.bl);
		var difference = A2(
			$elm$core$Result$andThen,
			$author$project$Main$subBy(token),
			reserveToken);
		return A3(
			$author$project$Utility$andThen2,
			$author$project$Main$divBy,
			difference,
			A3(
				$author$project$Utility$andThen2,
				$author$project$Main$mulBy,
				reserveCollateral,
				$elm$core$Result$Ok(token)));
	});
var $author$project$Main$getInterestMaxBorrow = F2(
	function (token, reserve) {
		var reserveToken = $author$project$Data$toBigInt(reserve.dS);
		var reserveInterest = $author$project$Data$toBigInt(reserve.c2);
		var difference = A2(
			$elm$core$Result$andThen,
			$author$project$Main$subBy(token),
			reserveToken);
		return A3(
			$author$project$Utility$andThen2,
			$author$project$Main$divBy,
			difference,
			A3(
				$author$project$Utility$andThen2,
				$author$project$Main$mulBy,
				reserveInterest,
				$elm$core$Result$Ok(token)));
	});
var $cmditch$elm_bigint$BigInt$gte = F2(
	function (x, y) {
		return !A2($cmditch$elm_bigint$BigInt$lt, x, y);
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Main$getInterestBorrow = F3(
	function (token, collateral, reserve) {
		var interestMax = A2($author$project$Main$getInterestMaxBorrow, token, reserve);
		var collateralMin = A2($author$project$Main$getCollateralMin, token, reserve);
		var checkedCollateral = A2(
			$elm$core$Result$withDefault,
			false,
			A3(
				$elm$core$Result$map2,
				$cmditch$elm_bigint$BigInt$gte,
				$elm$core$Result$Ok(collateral),
				collateralMin)) ? $elm$core$Result$Ok(collateral) : $elm$core$Result$Err('Collateral must be greeater than minimum');
		return A2(
			$elm$core$Result$withDefault,
			'',
			A2(
				$elm$core$Result$andThen,
				$author$project$Main$fromBigIntToToken,
				A3(
					$author$project$Utility$andThen2,
					$author$project$Main$divBy,
					checkedCollateral,
					A3($author$project$Utility$andThen2, $author$project$Main$mulBy, collateralMin, interestMax))));
	});
var $author$project$Main$addBy = F2(
	function (bigInt1, bigInt2) {
		return $author$project$Main$checkSize(
			A2($cmditch$elm_bigint$BigInt$add, bigInt2, bigInt1));
	});
var $author$project$Main$getCollateralMax = F2(
	function (token, reserve) {
		var reserveToken = $author$project$Data$toBigInt(reserve.dS);
		var sum = A2(
			$elm$core$Result$andThen,
			$author$project$Main$addBy(token),
			reserveToken);
		var reserveCollateral = $author$project$Data$toBigInt(reserve.bl);
		return A3(
			$author$project$Utility$andThen2,
			$author$project$Main$divBy,
			sum,
			A3(
				$author$project$Utility$andThen2,
				$author$project$Main$mulBy,
				reserveCollateral,
				$elm$core$Result$Ok(token)));
	});
var $author$project$Main$getInterestMaxLend = F2(
	function (token, reserve) {
		var reserveToken = $author$project$Data$toBigInt(reserve.dS);
		var sum = A2(
			$elm$core$Result$andThen,
			$author$project$Main$addBy(token),
			reserveToken);
		var reserveInterest = $author$project$Data$toBigInt(reserve.c2);
		return A3(
			$author$project$Utility$andThen2,
			$author$project$Main$divBy,
			sum,
			A3(
				$author$project$Utility$andThen2,
				$author$project$Main$mulBy,
				reserveInterest,
				$elm$core$Result$Ok(token)));
	});
var $author$project$Main$getInterestLend = F3(
	function (token, collateral, reserve) {
		var interestMax = A2($author$project$Main$getInterestMaxLend, token, reserve);
		var collateralMax = A2($author$project$Main$getCollateralMax, token, reserve);
		var difference = A2(
			$elm$core$Result$andThen,
			$author$project$Main$subBy(collateral),
			collateralMax);
		return A2(
			$elm$core$Result$withDefault,
			'',
			A2(
				$elm$core$Result$andThen,
				$author$project$Main$fromBigIntToToken,
				A3(
					$author$project$Utility$andThen2,
					$author$project$Main$divBy,
					collateralMax,
					A3($author$project$Utility$andThen2, $author$project$Main$mulBy, difference, interestMax))));
	});
var $author$project$Main$updateCollateralAmount = F3(
	function (input, info, model) {
		var resultCollateral = $author$project$Main$fromTokenToBigInt(input);
		var initialTransaction = info.g;
		var resultToken = $author$project$Main$fromTokenToBigInt(initialTransaction.dS);
		var _v0 = info.I;
		if (!_v0.$) {
			var reserve = _v0.a;
			var _v1 = _Utils_Tuple3(initialTransaction.C, resultToken, resultCollateral);
			_v1$2:
			while (true) {
				if (!_v1.a) {
					if ((!_v1.b.$) && (!_v1.c.$)) {
						var _v2 = _v1.a;
						var token = _v1.b.a;
						var collateral = _v1.c.a;
						var transaction = _Utils_update(
							initialTransaction,
							{
								bl: input,
								c2: A3($author$project$Main$getInterestLend, token, collateral, reserve)
							});
						var nextInfo = _Utils_update(
							info,
							{g: transaction});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: $author$project$Main$Rinkeby(nextInfo)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						break _v1$2;
					}
				} else {
					if ((!_v1.b.$) && (!_v1.c.$)) {
						var _v3 = _v1.a;
						var token = _v1.b.a;
						var collateral = _v1.c.a;
						var transaction = _Utils_update(
							initialTransaction,
							{
								bl: input,
								c2: A3($author$project$Main$getInterestBorrow, token, collateral, reserve)
							});
						var nextInfo = _Utils_update(
							info,
							{g: transaction});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: $author$project$Main$Rinkeby(nextInfo)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						break _v1$2;
					}
				}
			}
			var transaction = _Utils_update(
				initialTransaction,
				{bl: input});
			var nextInfo = _Utils_update(
				info,
				{g: transaction});
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						d: $author$project$Main$Rinkeby(nextInfo)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$BalanceOfCollateral = {$: 4};
var $author$project$Hexadecimal$balanceOf = {
	c: 7,
	b: _List_fromArray(
		[0, 10, 0, 8, 2, 3, 1])
};
var $author$project$Data$selectorBalanceOf = $author$project$Hexadecimal$balanceOf;
var $author$project$Data$balanceOf = function (owner) {
	return A2(
		$author$project$Data$Data,
		$author$project$Data$selectorBalanceOf,
		_List_fromArray(
			[
				$author$project$Data$AddressParameter(owner)
			]));
};
var $author$project$Main$balanceOfCollateral = F2(
	function (owner, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressFileTSDemo)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					$author$project$Data$balanceOf(owner)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$BalanceOfCollateral, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(0)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Main$BalanceOfPoolCollateral = {$: 5};
var $author$project$Main$balanceOfPoolCollateral = function (log) {
	var parameter = _List_fromArray(
		[
			_Utils_Tuple2(
			'to',
			$author$project$Data$addressEncode($author$project$Data$addressFileTSDemo)),
			_Utils_Tuple2(
			'data',
			$author$project$Data$encode(
				$author$project$Data$balanceOf($author$project$Data$addressTimeswapPool)))
		]);
	var nextLog = A2($author$project$Main$next, $author$project$Main$BalanceOfPoolCollateral, log);
	var value = $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$author$project$Main$idEncode(nextLog)),
				_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
				_Utils_Tuple2(
				'method',
				$author$project$Main$methodEncode(0)),
				_Utils_Tuple2(
				'params',
				$author$project$Main$parameterEncode(parameter))
			]));
	return A2($author$project$Main$Outcome, value, nextLog);
};
var $author$project$Main$BalanceOfToken = {$: 3};
var $author$project$Main$balanceOfToken = F2(
	function (owner, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressDaiTSDemo)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					$author$project$Data$balanceOf(owner)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$BalanceOfToken, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(0)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $author$project$Main$ResultConnect = F2(
	function (network, user) {
		return {bC: network, i: user};
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Hexadecimal$fromCharToDigit = function (character) {
	switch (character) {
		case '0':
			return $elm$core$Result$Ok(0);
		case '1':
			return $elm$core$Result$Ok(1);
		case '2':
			return $elm$core$Result$Ok(2);
		case '3':
			return $elm$core$Result$Ok(3);
		case '4':
			return $elm$core$Result$Ok(4);
		case '5':
			return $elm$core$Result$Ok(5);
		case '6':
			return $elm$core$Result$Ok(6);
		case '7':
			return $elm$core$Result$Ok(7);
		case '8':
			return $elm$core$Result$Ok(8);
		case '9':
			return $elm$core$Result$Ok(9);
		case 'a':
			return $elm$core$Result$Ok(10);
		case 'A':
			return $elm$core$Result$Ok(11);
		case 'b':
			return $elm$core$Result$Ok(12);
		case 'B':
			return $elm$core$Result$Ok(13);
		case 'c':
			return $elm$core$Result$Ok(14);
		case 'C':
			return $elm$core$Result$Ok(15);
		case 'd':
			return $elm$core$Result$Ok(16);
		case 'D':
			return $elm$core$Result$Ok(17);
		case 'e':
			return $elm$core$Result$Ok(18);
		case 'E':
			return $elm$core$Result$Ok(19);
		case 'f':
			return $elm$core$Result$Ok(20);
		case 'F':
			return $elm$core$Result$Ok(21);
		default:
			return $elm$core$Result$Err('Not hexadecimalable');
	}
};
var $author$project$Hexadecimal$remove0 = function (_v0) {
	var leftMostDigit = _v0.c;
	var otherDigits = _v0.b;
	var recursive = F2(
		function (currentLeft, currentOther) {
			recursive:
			while (true) {
				var _v1 = _Utils_Tuple2(currentLeft, currentOther);
				if (!_v1.a) {
					if (!_v1.b.b) {
						var _v2 = _v1.a;
						return $author$project$Hexadecimal$zero;
					} else {
						var _v3 = _v1.a;
						var _v4 = _v1.b;
						var singleton = _v4.a;
						var remaining = _v4.b;
						var $temp$currentLeft = singleton,
							$temp$currentOther = remaining;
						currentLeft = $temp$currentLeft;
						currentOther = $temp$currentOther;
						continue recursive;
					}
				} else {
					return A2($author$project$Hexadecimal$create, currentLeft, currentOther);
				}
			}
		});
	return A2(recursive, leftMostDigit, otherDigits);
};
var $author$project$Hexadecimal$fromStringHexadecimal = function (string) {
	var remove0x = function (characters) {
		_v3$3:
		while (true) {
			if (!characters.b) {
				return $elm$core$Result$Err('Cannot be empty string');
			} else {
				if (('0' === characters.a) && characters.b.b) {
					switch (characters.b.a) {
						case 'x':
							var _v4 = characters.b;
							var remainingCharacters = _v4.b;
							return $elm$core$Result$Ok(remainingCharacters);
						case 'X':
							var _v5 = characters.b;
							var remainingCharacters = _v5.b;
							return $elm$core$Result$Ok(remainingCharacters);
						default:
							break _v3$3;
					}
				} else {
					break _v3$3;
				}
			}
		}
		return $elm$core$Result$Err('Must start wiht 0x or 0X');
	};
	var recursive = F2(
		function (characters, accumulatingDigits) {
			var _v0 = _Utils_Tuple2(characters, accumulatingDigits);
			if (!_v0.a.b) {
				if (!_v0.b.b) {
					return $elm$core$Result$Err('Cannot be empty string after 0x or 0X');
				} else {
					var _v1 = _v0.b;
					var singletonDigit = _v1.a;
					var remainingDigits = _v1.b;
					return $elm$core$Result$Ok(
						A2($author$project$Hexadecimal$create, singletonDigit, remainingDigits));
				}
			} else {
				var _v2 = _v0.a;
				var singletonCharacter = _v2.a;
				var remainingCharacters = _v2.b;
				var digits = _v0.b;
				var resultDigit = $author$project$Hexadecimal$fromCharToDigit(singletonCharacter);
				var recursiveRemaining = recursive(remainingCharacters);
				return A2(
					$elm$core$Result$andThen,
					recursiveRemaining,
					A3(
						$elm$core$Result$map2,
						$elm$core$List$cons,
						resultDigit,
						$elm$core$Result$Ok(digits)));
			}
		});
	var initial = function (initialCharacters) {
		return A2(recursive, initialCharacters, _List_Nil);
	};
	return A2(
		$elm$core$Result$map,
		$author$project$Hexadecimal$remove0,
		A2(
			$elm$core$Result$andThen,
			initial,
			A2(
				$elm$core$Result$map,
				$elm$core$List$reverse,
				remove0x(
					$elm$core$String$toList(string)))));
};
var $author$project$Data$toAddressFromString = function (string) {
	var resultHexadecimal = $author$project$Hexadecimal$fromStringHexadecimal(string);
	var resultLength = A2($elm$core$Result$map, $author$project$Hexadecimal$length, resultHexadecimal);
	var _v0 = _Utils_Tuple2(resultHexadecimal, resultLength);
	if (_v0.a.$ === 1) {
		var error = _v0.a.a;
		return $elm$core$Result$Err(error);
	} else {
		if (!_v0.b.$) {
			if (_v0.b.a === 40) {
				var hexadecimal = _v0.a.a;
				return $elm$core$Result$Ok(hexadecimal);
			} else {
				return $elm$core$Result$Err('Address must be 20 bytes');
			}
		} else {
			var error = _v0.b.a;
			return $elm$core$Result$Err(error);
		}
	}
};
var $author$project$Data$addressDecoder = A2($elm$json$Json$Decode$map, $author$project$Data$toAddressFromString, $elm$json$Json$Decode$string);
var $author$project$Network$Rinkeby = 0;
var $author$project$Network$fromNetworkId = function (string) {
	if (string === '4') {
		return $elm$core$Result$Ok(0);
	} else {
		return $elm$core$Result$Err('Timeswap only works with Rinkeby Test Network. Please switch your network on Metamask.');
	}
};
var $author$project$Network$decoder = A2($elm$json$Json$Decode$map, $author$project$Network$fromNetworkId, $elm$json$Json$Decode$string);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $author$project$Main$decoderConnect = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'user',
	$author$project$Data$addressDecoder,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'network',
		$author$project$Network$decoder,
		$elm$json$Json$Decode$succeed($author$project$Main$ResultConnect)));
var $author$project$Main$Lend = 0;
var $author$project$Main$defaultLend = {bl: '', c2: '', dS: '', C: 0};
var $rtfeldman$elm_sorter_experiment$Internal$Dict$Leaf = function (a) {
	return {$: 0, a: a};
};
var $rtfeldman$elm_sorter_experiment$Sort$Dict$empty = function (sorter) {
	return $rtfeldman$elm_sorter_experiment$Internal$Dict$Leaf(sorter);
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Hexadecimal$Decimal = F2(
	function (leftMostDigit, otherDigits) {
		return {c: leftMostDigit, b: otherDigits};
	});
var $author$project$Hexadecimal$decimalLength = function (_v0) {
	var otherDigits = _v0.b;
	return $elm$core$List$length(otherDigits) + 1;
};
var $author$project$Hexadecimal$decimalPad = F2(
	function (amount, decimal) {
		var leftMostDigit = decimal.c;
		var otherDigits = decimal.b;
		if (!amount) {
			return decimal;
		} else {
			var notZero = amount;
			var numberOfZeroes = notZero - 1;
			var zeroes = A2($elm$core$List$repeat, numberOfZeroes, 0);
			return A2(
				$author$project$Hexadecimal$Decimal,
				0,
				_Utils_ap(
					zeroes,
					A2($elm$core$List$cons, leftMostDigit, otherDigits)));
		}
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Hexadecimal$decimalSubtractBy = F2(
	function (small, big) {
		var subtract = F2(
			function (first, second) {
				if (_Utils_cmp(second, first) > -1) {
					return {M: 0, aM: second - first};
				} else {
					var negative = first - second;
					var tens = ((negative / 10) | 0) + 1;
					var ones = (tens * 10) - negative;
					return {M: tens, aM: ones};
				}
			});
		var shortNoPad = (_Utils_cmp(
			$author$project$Hexadecimal$decimalLength(small),
			$author$project$Hexadecimal$decimalLength(big)) > -1) ? big : small;
		var _long = (_Utils_cmp(
			$author$project$Hexadecimal$decimalLength(small),
			$author$project$Hexadecimal$decimalLength(big)) > -1) ? small : big;
		var numberOfZeroes = $author$project$Hexadecimal$decimalLength(_long) - $author$project$Hexadecimal$decimalLength(shortNoPad);
		var _short = A2($author$project$Hexadecimal$decimalPad, numberOfZeroes, shortNoPad);
		var subtractLeftMostDigit = A2(subtract, _short.c, _long.c);
		var combineDifference = F2(
			function (first, second) {
				var next = A2(subtract, second.M, first.aM);
				var nextList = A2($elm$core$List$cons, next.aM, second.N);
				return {M: first.M + next.M, N: nextList};
			});
		var subtractOtherDigits = A2(
			combineDifference,
			subtractLeftMostDigit,
			A3(
				$elm$core$List$foldr,
				combineDifference,
				{M: 0, N: _List_Nil},
				A3($elm$core$List$map2, subtract, _short.b, _long.b)));
		var _v0 = _Utils_Tuple2(subtractOtherDigits.N, subtractOtherDigits.M);
		if (_v0.a.b && (!_v0.b)) {
			var _v1 = _v0.a;
			var singletonDigit = _v1.a;
			var remainingDigit = _v1.b;
			return $elm$core$Result$Ok(
				A2($author$project$Hexadecimal$Decimal, singletonDigit, remainingDigit));
		} else {
			return $elm$core$Result$Err('Subtraction overflow');
		}
	});
var $author$project$Hexadecimal$decimalDivide16 = function (_v0) {
	var leftMostDigit = _v0.c;
	var otherDigits = _v0.b;
	var recursive = F3(
		function (increase, integers, accumulatingIntegers) {
			if (!integers.b) {
				return accumulatingIntegers;
			} else {
				var singletonInteger = integers.a;
				var remainingIntegers = integers.b;
				var dividend = (increase * 10) + singletonInteger;
				var quotient = (dividend / 16) | 0;
				var remainder = A2($elm$core$Basics$modBy, 16, dividend);
				return A3(
					recursive,
					remainder,
					remainingIntegers,
					A2($elm$core$List$cons, quotient, accumulatingIntegers));
			}
		});
	if (!otherDigits.b) {
		return A2($author$project$Hexadecimal$Decimal, 0, _List_Nil);
	} else {
		var singletonDigit = otherDigits.a;
		var remainingDigits = otherDigits.b;
		var leftMostDividend = (leftMostDigit * 10) + singletonDigit;
		var leftMostQuotient = (leftMostDividend / 16) | 0;
		var remainder = A2($elm$core$Basics$modBy, 16, leftMostDividend);
		return A2(
			$author$project$Hexadecimal$Decimal,
			leftMostQuotient,
			$elm$core$List$reverse(
				A3(recursive, remainder, remainingDigits, _List_Nil)));
	}
};
var $author$project$Hexadecimal$decimalModBy16 = function (_v0) {
	var leftMostDigit = _v0.c;
	var otherDigits = _v0.b;
	var recursive = F2(
		function (increase, integers) {
			recursive:
			while (true) {
				if (!integers.b) {
					return increase;
				} else {
					var singletonInteger = integers.a;
					var remainingIntegers = integers.b;
					var dividend = (increase * 10) + singletonInteger;
					var remainder = A2($elm$core$Basics$modBy, 16, dividend);
					var $temp$increase = remainder,
						$temp$integers = remainingIntegers;
					increase = $temp$increase;
					integers = $temp$integers;
					continue recursive;
				}
			}
		});
	if (!otherDigits.b) {
		return leftMostDigit;
	} else {
		var singletonDigit = otherDigits.a;
		var remainingDigits = otherDigits.b;
		var leftMostDividend = (leftMostDigit * 10) + singletonDigit;
		var remainder = A2($elm$core$Basics$modBy, 16, leftMostDividend);
		return A2(recursive, remainder, remainingDigits);
	}
};
var $author$project$Hexadecimal$fromIntToDigit = function (integer) {
	switch (integer) {
		case 0:
			return $elm$core$Result$Ok(0);
		case 1:
			return $elm$core$Result$Ok(1);
		case 2:
			return $elm$core$Result$Ok(2);
		case 3:
			return $elm$core$Result$Ok(3);
		case 4:
			return $elm$core$Result$Ok(4);
		case 5:
			return $elm$core$Result$Ok(5);
		case 6:
			return $elm$core$Result$Ok(6);
		case 7:
			return $elm$core$Result$Ok(7);
		case 8:
			return $elm$core$Result$Ok(8);
		case 9:
			return $elm$core$Result$Ok(9);
		case 10:
			return $elm$core$Result$Ok(10);
		case 11:
			return $elm$core$Result$Ok(12);
		case 12:
			return $elm$core$Result$Ok(14);
		case 13:
			return $elm$core$Result$Ok(16);
		case 14:
			return $elm$core$Result$Ok(18);
		case 15:
			return $elm$core$Result$Ok(20);
		default:
			return $elm$core$Result$Err('Not Hexadecimalable');
	}
};
var $author$project$Hexadecimal$fromDecimal = function (decimal) {
	var recursive = F2(
		function (currentDecimal, accumulatingDigits) {
			var resultRemainder = $author$project$Hexadecimal$fromIntToDigit(
				$author$project$Hexadecimal$decimalModBy16(currentDecimal));
			var quotient = $author$project$Hexadecimal$decimalDivide16(currentDecimal);
			var nextRecursive = recursive(quotient);
			return _Utils_eq(
				quotient,
				A2($author$project$Hexadecimal$Decimal, 0, _List_Nil)) ? A3(
				$elm$core$Result$map2,
				$author$project$Hexadecimal$create,
				resultRemainder,
				$elm$core$Result$Ok(accumulatingDigits)) : A2(
				$elm$core$Result$andThen,
				nextRecursive,
				A3(
					$elm$core$Result$map2,
					$elm$core$List$cons,
					resultRemainder,
					$elm$core$Result$Ok(accumulatingDigits)));
		});
	return A2(recursive, decimal, _List_Nil);
};
var $author$project$Hexadecimal$decimalAddBy = F2(
	function (first, second) {
		var shortNoPad = (_Utils_cmp(
			$author$project$Hexadecimal$decimalLength(first),
			$author$project$Hexadecimal$decimalLength(second)) > -1) ? second : first;
		var recursive = F3(
			function (increase, currentList, accumulatingList) {
				if (!currentList.b) {
					return A2($author$project$Hexadecimal$Decimal, increase, accumulatingList);
				} else {
					var singleton = currentList.a;
					var remaining = currentList.b;
					var singletonIncrease = singleton + increase;
					var tens = (singletonIncrease / 10) | 0;
					var ones = A2($elm$core$Basics$modBy, 10, singletonIncrease);
					return A3(
						recursive,
						tens,
						remaining,
						A2($elm$core$List$cons, ones, accumulatingList));
				}
			});
		var _long = (_Utils_cmp(
			$author$project$Hexadecimal$decimalLength(first),
			$author$project$Hexadecimal$decimalLength(second)) > -1) ? first : second;
		var numberOfZeroes = $author$project$Hexadecimal$decimalLength(_long) - $author$project$Hexadecimal$decimalLength(shortNoPad);
		var _short = A2($author$project$Hexadecimal$decimalPad, numberOfZeroes, shortNoPad);
		var leftMostSum = _long.c + _short.c;
		var initial = function (currentList) {
			return A3(recursive, 0, currentList, _List_Nil);
		};
		var addLeftMostDigit = F2(
			function (integer, _v1) {
				var leftMostDigit = _v1.c;
				var otherDigits = _v1.b;
				var leftMostSumIncrease = integer + leftMostDigit;
				var ones = A2($elm$core$Basics$modBy, 10, leftMostSumIncrease);
				var tens = (leftMostSumIncrease / 10) | 0;
				return (!tens) ? A2($author$project$Hexadecimal$Decimal, ones, otherDigits) : A2(
					addLeftMostDigit,
					0,
					A2(
						$author$project$Hexadecimal$Decimal,
						tens,
						A2($elm$core$List$cons, ones, otherDigits)));
			});
		return A2(
			addLeftMostDigit,
			leftMostSum,
			initial(
				$elm$core$List$reverse(
					A3($elm$core$List$map2, $elm$core$Basics$add, _long.b, _short.b))));
	});
var $author$project$Hexadecimal$decimalMultiplyByDigit = F2(
	function (digit, decimal) {
		var recursive = F3(
			function (increase, currentList, accumulatingList) {
				if (!currentList.b) {
					return A2($author$project$Hexadecimal$Decimal, increase, accumulatingList);
				} else {
					var singleton = currentList.a;
					var remaining = currentList.b;
					var singletonIncrease = singleton + increase;
					var tens = (singletonIncrease / 10) | 0;
					var ones = A2($elm$core$Basics$modBy, 10, singletonIncrease);
					return A3(
						recursive,
						tens,
						remaining,
						A2($elm$core$List$cons, ones, accumulatingList));
				}
			});
		var multiplyByDigit = $elm$core$Basics$mul(digit);
		var leftMostProduct = digit * decimal.c;
		var initial = function (currentList) {
			return A3(recursive, 0, currentList, _List_Nil);
		};
		var addLeftMostDigit = F2(
			function (integer, _v1) {
				var leftMostDigit = _v1.c;
				var otherDigits = _v1.b;
				var leftMostSumIncrease = integer + leftMostDigit;
				var ones = A2($elm$core$Basics$modBy, 10, leftMostSumIncrease);
				var tens = (leftMostSumIncrease / 10) | 0;
				return (!tens) ? A2($author$project$Hexadecimal$Decimal, ones, otherDigits) : A2(
					addLeftMostDigit,
					0,
					A2(
						$author$project$Hexadecimal$Decimal,
						tens,
						A2($elm$core$List$cons, ones, otherDigits)));
			});
		return A2(
			addLeftMostDigit,
			leftMostProduct,
			initial(
				$elm$core$List$reverse(
					A2($elm$core$List$map, multiplyByDigit, decimal.b))));
	});
var $author$project$Hexadecimal$decimalHexadecimalPower = function (integer) {
	if (!integer) {
		return A2($author$project$Hexadecimal$Decimal, 1, _List_Nil);
	} else {
		var notZero = integer;
		var recursive = F2(
			function (currentInteger, accumulatingDecimal) {
				if (!currentInteger) {
					return accumulatingDecimal;
				} else {
					var nextInteger = currentInteger - 1;
					return A2(
						recursive,
						nextInteger,
						A2($author$project$Hexadecimal$decimalMultiplyByDigit, 16, accumulatingDecimal));
				}
			});
		var initial = function (currentInteger) {
			return A2(
				recursive,
				currentInteger,
				A2($author$project$Hexadecimal$Decimal, 1, _List_Nil));
		};
		return initial(notZero);
	}
};
var $author$project$Hexadecimal$decimalZero = {c: 0, b: _List_Nil};
var $author$project$Hexadecimal$fromDigitToInt = function (digit) {
	switch (digit) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		case 5:
			return 5;
		case 6:
			return 6;
		case 7:
			return 7;
		case 8:
			return 8;
		case 9:
			return 9;
		case 10:
			return 10;
		case 11:
			return 10;
		case 12:
			return 11;
		case 13:
			return 11;
		case 14:
			return 12;
		case 15:
			return 12;
		case 16:
			return 13;
		case 17:
			return 13;
		case 18:
			return 14;
		case 19:
			return 14;
		case 20:
			return 15;
		default:
			return 15;
	}
};
var $author$project$Hexadecimal$toDecimal = function (_v0) {
	var leftMostDigit = _v0.c;
	var otherDigits = _v0.b;
	var otherDecimalDigits = A2($elm$core$List$map, $author$project$Hexadecimal$fromDigitToInt, otherDigits);
	var multiplyWith = F2(
		function (index, integer) {
			return A2(
				$author$project$Hexadecimal$decimalMultiplyByDigit,
				integer,
				$author$project$Hexadecimal$decimalHexadecimalPower(index));
		});
	var leftMostDecimalDigit = $author$project$Hexadecimal$fromDigitToInt(leftMostDigit);
	var leftMostProduct = function () {
		var otherDigitsLength = $elm$core$List$length(otherDecimalDigits);
		return A2(
			$author$project$Hexadecimal$decimalMultiplyByDigit,
			leftMostDecimalDigit,
			$author$project$Hexadecimal$decimalHexadecimalPower(otherDigitsLength));
	}();
	return A2(
		$author$project$Hexadecimal$decimalAddBy,
		leftMostProduct,
		A3(
			$elm$core$List$foldl,
			$author$project$Hexadecimal$decimalAddBy,
			$author$project$Hexadecimal$decimalZero,
			A2(
				$elm$core$List$indexedMap,
				multiplyWith,
				$elm$core$List$reverse(otherDecimalDigits))));
};
var $author$project$Hexadecimal$subtractBy = F2(
	function (small, big) {
		var smallDecimal = $author$project$Hexadecimal$toDecimal(small);
		var bigDecimal = $author$project$Hexadecimal$toDecimal(big);
		return A2(
			$elm$core$Result$andThen,
			$author$project$Hexadecimal$fromDecimal,
			A2($author$project$Hexadecimal$decimalSubtractBy, smallDecimal, bigDecimal));
	});
var $author$project$Data$greaterThanStrict = F2(
	function (_v0, _v1) {
		var first = _v0;
		var second = _v1;
		var _v2 = A2($author$project$Hexadecimal$subtractBy, second, first);
		if (!_v2.$) {
			var hexadecimal = _v2.a;
			return !_Utils_eq(hexadecimal, $author$project$Hexadecimal$zero);
		} else {
			return false;
		}
	});
var $author$project$Data$compare = F2(
	function (first, second) {
		return A2($author$project$Data$greaterThanStrict, first, second) ? 2 : (A2($author$project$Data$greaterThanStrict, second, first) ? 0 : 1);
	});
var $rtfeldman$elm_sorter_experiment$Sort$Sorter = $elm$core$Basics$identity;
var $rtfeldman$elm_sorter_experiment$Sort$custom = function (sort) {
	return sort;
};
var $author$project$Data$sorter = $rtfeldman$elm_sorter_experiment$Sort$custom($author$project$Data$compare);
var $author$project$Main$initialState = F2(
	function (address, log) {
		return $author$project$Main$Rinkeby(
			{
				V: $elm$core$Maybe$Nothing,
				W: $elm$core$Maybe$Nothing,
				au: $elm$core$Maybe$Nothing,
				cG: $elm$core$Maybe$Nothing,
				c5: $rtfeldman$elm_sorter_experiment$Sort$Dict$empty($author$project$Data$sorter),
				a: log,
				I: $elm$core$Maybe$Nothing,
				af: $elm$core$Maybe$Nothing,
				ao: $elm$core$Maybe$Nothing,
				aC: $elm$core$Maybe$Nothing,
				g: $author$project$Main$defaultLend,
				i: address
			});
	});
var $author$project$Main$TotalDeposit = {$: 6};
var $author$project$Hexadecimal$totalDeposit = {
	c: 20,
	b: _List_fromArray(
		[6, 1, 5, 3, 14, 14, 16])
};
var $author$project$Data$selectorTotalDeposit = $author$project$Hexadecimal$totalDeposit;
var $author$project$Data$totalDeposit = A2($author$project$Data$Data, $author$project$Data$selectorTotalDeposit, _List_Nil);
var $author$project$Main$totalDeposit = function (log) {
	var parameter = _List_fromArray(
		[
			_Utils_Tuple2(
			'to',
			$author$project$Data$addressEncode($author$project$Data$addressTimeswapPool)),
			_Utils_Tuple2(
			'data',
			$author$project$Data$encode($author$project$Data$totalDeposit))
		]);
	var nextLog = A2($author$project$Main$next, $author$project$Main$TotalDeposit, log);
	var value = $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$author$project$Main$idEncode(nextLog)),
				_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
				_Utils_Tuple2(
				'method',
				$author$project$Main$methodEncode(0)),
				_Utils_Tuple2(
				'params',
				$author$project$Main$parameterEncode(parameter))
			]));
	return A2($author$project$Main$Outcome, value, nextLog);
};
var $author$project$Main$updateConnect = F2(
	function (value, model) {
		var resultConnect = A2($elm$json$Json$Decode$decodeValue, $author$project$Main$decoderConnect, value);
		if (!resultConnect.$) {
			var network = resultConnect.a.bC;
			var user = resultConnect.a.i;
			var _v1 = _Utils_Tuple2(network, user);
			if (!_v1.a.$) {
				if (!_v1.b.$) {
					var address = _v1.b.a;
					var viewReservesOutcome = $author$project$Main$viewReserves(
						{_: 0, ae: $elm$core$Dict$empty});
					var depositOfOutcome = A2($author$project$Main$depositOf, address, viewReservesOutcome.a);
					var loanOfOutcome = A3($author$project$Main$loanOf, address, $author$project$Data$unsignedIntegerZero, depositOfOutcome.a);
					var balanceOfTokenOutcome = A2($author$project$Main$balanceOfToken, address, loanOfOutcome.a);
					var balanceOfCollateralOutcome = A2($author$project$Main$balanceOfCollateral, address, balanceOfTokenOutcome.a);
					var balanceOfCollateralPoolOutcome = $author$project$Main$balanceOfPoolCollateral(balanceOfCollateralOutcome.a);
					var totalDepositOutcome = $author$project$Main$totalDeposit(balanceOfCollateralPoolOutcome.a);
					var allowanceTokenOutcome = A2($author$project$Main$allowanceToken, address, totalDepositOutcome.a);
					var allowanceCollateralOutcome = A2($author$project$Main$allowanceCollateral, address, allowanceTokenOutcome.a);
					var sendTransactionCommand = $elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$author$project$Main$sendTransaction(viewReservesOutcome.e),
								$author$project$Main$sendTransaction(depositOfOutcome.e),
								$author$project$Main$sendTransaction(loanOfOutcome.e),
								$author$project$Main$sendTransaction(balanceOfTokenOutcome.e),
								$author$project$Main$sendTransaction(balanceOfCollateralOutcome.e),
								$author$project$Main$sendTransaction(balanceOfCollateralPoolOutcome.e),
								$author$project$Main$sendTransaction(totalDepositOutcome.e),
								$author$project$Main$sendTransaction(allowanceTokenOutcome.e),
								$author$project$Main$sendTransaction(allowanceCollateralOutcome.e)
							]));
					var state = A2($author$project$Main$initialState, address, allowanceCollateralOutcome.a);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{d: state}),
						sendTransactionCommand);
				} else {
					var error = _v1.b.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								F: $elm$core$Maybe$Just(error)
							}),
						$elm$core$Platform$Cmd$none);
				}
			} else {
				var error = _v1.a.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: $elm$core$Maybe$Just(error)
						}),
					$elm$core$Platform$Cmd$none);
			}
		} else {
			var decodeError = resultConnect.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						F: $elm$core$Maybe$Just(
							$elm$json$Json$Decode$errorToString(decodeError))
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$updateInterestAmount = F3(
	function (input, info, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Main$MintCollateral = {$: 10};
var $author$project$Hexadecimal$mint = {
	c: 4,
	b: _List_fromArray(
		[0, 14, 1, 0, 20, 1, 9])
};
var $author$project$Data$selectorMint = $author$project$Hexadecimal$mint;
var $author$project$Data$mint = F2(
	function (recipient, amount) {
		return A2(
			$author$project$Data$Data,
			$author$project$Data$selectorMint,
			_List_fromArray(
				[
					$author$project$Data$AddressParameter(recipient),
					$author$project$Data$UnsignedIntegerParameter(amount)
				]));
	});
var $author$project$Hexadecimal$mintCollateralAmount = {
	c: 4,
	b: _List_fromArray(
		[5, 6, 3, 9, 1, 8, 2, 4, 4, 20, 4, 0, 0, 0, 0])
};
var $author$project$Data$mintCollateralAmount = $author$project$Hexadecimal$mintCollateralAmount;
var $author$project$Main$mintCollateral = F2(
	function (sender, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'from',
				$author$project$Data$addressEncode(sender)),
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressFileTSDemo)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					A2($author$project$Data$mint, sender, $author$project$Data$mintCollateralAmount)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$MintCollateral, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(1)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Main$updateMintCollateral = F2(
	function (info, model) {
		var mintCollateralOutcome = A2($author$project$Main$mintCollateral, info.i, info.a);
		var nextInfo = _Utils_update(
			info,
			{a: mintCollateralOutcome.a});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					d: $author$project$Main$Rinkeby(nextInfo)
				}),
			$author$project$Main$sendTransaction(mintCollateralOutcome.e));
	});
var $author$project$Main$MintToken = {$: 9};
var $author$project$Hexadecimal$mintTokenAmount = {
	c: 3,
	b: _List_fromArray(
		[6, 3, 5, 14, 9, 10, 16, 14, 5, 16, 18, 10, 0, 0, 0, 0, 0])
};
var $author$project$Data$mintTokenAmount = $author$project$Hexadecimal$mintTokenAmount;
var $author$project$Main$mintToken = F2(
	function (sender, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'from',
				$author$project$Data$addressEncode(sender)),
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressDaiTSDemo)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					A2($author$project$Data$mint, sender, $author$project$Data$mintTokenAmount)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$MintToken, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(1)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Main$updateMintToken = F2(
	function (info, model) {
		var mintTokenOutcome = A2($author$project$Main$mintToken, info.i, info.a);
		var nextInfo = _Utils_update(
			info,
			{a: mintTokenOutcome.a});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					d: $author$project$Main$Rinkeby(nextInfo)
				}),
			$author$project$Main$sendTransaction(mintTokenOutcome.e));
	});
var $author$project$Main$updateNetwork = F3(
	function (value, info, model) {
		var resultNetwork = A2($elm$json$Json$Decode$decodeValue, $author$project$Network$decoder, value);
		if (!resultNetwork.$) {
			if (!resultNetwork.a.$) {
				var viewReservesOutcome = $author$project$Main$viewReserves(
					{_: 0, ae: $elm$core$Dict$empty});
				var depositOfOutcome = A2($author$project$Main$depositOf, info.i, viewReservesOutcome.a);
				var loanOfOutcome = A3($author$project$Main$loanOf, info.i, $author$project$Data$unsignedIntegerZero, depositOfOutcome.a);
				var allowanceTokenOutcome = A2($author$project$Main$allowanceToken, info.i, loanOfOutcome.a);
				var allowanceCollateralOutcome = A2($author$project$Main$allowanceCollateral, info.i, allowanceTokenOutcome.a);
				var sendTransactionCommand = $elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							$author$project$Main$sendTransaction(viewReservesOutcome.e),
							$author$project$Main$sendTransaction(depositOfOutcome.e),
							$author$project$Main$sendTransaction(loanOfOutcome.e),
							$author$project$Main$sendTransaction(allowanceTokenOutcome.e),
							$author$project$Main$sendTransaction(allowanceCollateralOutcome.e)
						]));
				var state = A2($author$project$Main$initialState, info.i, allowanceCollateralOutcome.a);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{d: state}),
					sendTransactionCommand);
			} else {
				var error = resultNetwork.a.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: $elm$core$Maybe$Just(error),
							d: $author$project$Main$NotConnected
						}),
					$elm$core$Platform$Cmd$none);
			}
		} else {
			var decodeError = resultNetwork.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						F: $elm$core$Maybe$Just(
							$elm$json$Json$Decode$errorToString(decodeError))
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $author$project$Main$roundDownString = function (string) {
	return (string === '0') ? '0' : A2($elm$core$String$dropRight, 12, string);
};
var $elm$core$Basics$truncate = _Basics_truncate;
var $author$project$Main$updateSliderAmount = F3(
	function (input, info, model) {
		var initialTransaction = info.g;
		var resultToken = $author$project$Main$fromTokenToBigInt(initialTransaction.dS);
		var maxCollateral = A3(
			$author$project$Utility$andThen2,
			$author$project$Main$getCollateralMax,
			resultToken,
			A2($elm$core$Result$fromMaybe, 'No Maybe', info.I));
		var resultCollateral = (input < 0) ? $elm$core$Result$Err('Cannot be less than zero') : ((input > 100) ? $elm$core$Result$Err('Cannot be greater than one hundred') : A3(
			$author$project$Utility$andThen2,
			$author$project$Main$divBy,
			A2(
				$author$project$Main$mulBy,
				$cmditch$elm_bigint$BigInt$fromInt(100),
				$author$project$Main$quintillion),
			A3(
				$author$project$Utility$andThen2,
				$author$project$Main$mulBy,
				maxCollateral,
				$author$project$Main$fromTokenToBigInt(
					$elm$core$String$fromInt(input | 0)))));
		var _v0 = info.I;
		if (!_v0.$) {
			var reserve = _v0.a;
			var _v1 = _Utils_Tuple3(initialTransaction.C, resultToken, resultCollateral);
			_v1$2:
			while (true) {
				if (!_v1.a) {
					if ((!_v1.b.$) && (!_v1.c.$)) {
						var _v2 = _v1.a;
						var token = _v1.b.a;
						var collateral = _v1.c.a;
						var transaction = _Utils_update(
							initialTransaction,
							{
								bl: $author$project$Main$roundDownString(
									A2(
										$elm$core$Result$withDefault,
										'0',
										$author$project$Main$fromBigIntToToken(collateral))),
								c2: A3($author$project$Main$getInterestLend, token, collateral, reserve)
							});
						var nextInfo = _Utils_update(
							info,
							{g: transaction});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: $author$project$Main$Rinkeby(nextInfo)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						break _v1$2;
					}
				} else {
					if ((!_v1.b.$) && (!_v1.c.$)) {
						var _v3 = _v1.a;
						var token = _v1.b.a;
						var collateral = _v1.c.a;
						var transaction = _Utils_update(
							initialTransaction,
							{
								bl: $author$project$Main$roundDownString(
									A2(
										$elm$core$Result$withDefault,
										'0',
										$author$project$Main$fromBigIntToToken(collateral))),
								c2: A3($author$project$Main$getInterestBorrow, token, collateral, reserve)
							});
						var nextInfo = _Utils_update(
							info,
							{g: transaction});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: $author$project$Main$Rinkeby(nextInfo)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						break _v1$2;
					}
				}
			}
			var transaction = _Utils_update(
				initialTransaction,
				{bl: ''});
			var nextInfo = _Utils_update(
				info,
				{g: transaction});
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						d: $author$project$Main$Rinkeby(nextInfo)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$Borrowing = {$: 14};
var $author$project$Hexadecimal$borrow = {
	c: 8,
	b: _List_fromArray(
		[9, 8, 9, 8, 9, 10, 18])
};
var $author$project$Data$selectorBorrow = $author$project$Hexadecimal$borrow;
var $author$project$Data$borrow = F4(
	function (pool, token, collateral, reciepient) {
		return A2(
			$author$project$Data$Data,
			$author$project$Data$selectorBorrow,
			_List_fromArray(
				[
					$author$project$Data$AddressParameter(pool),
					$author$project$Data$UnsignedIntegerParameter(token),
					$author$project$Data$UnsignedIntegerParameter(collateral),
					$author$project$Data$AddressParameter(reciepient)
				]));
	});
var $author$project$Main$borrow = F4(
	function (token, collateral, sender, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'from',
				$author$project$Data$addressEncode(sender)),
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressTimeswapConvenience)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					A4($author$project$Data$borrow, $author$project$Data$addressTimeswapPool, token, collateral, sender)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$Borrowing, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(1)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Main$Borrow = 1;
var $author$project$Main$defaultBorrow = {bl: '', c2: '', dS: '', C: 1};
var $author$project$Main$Lending = {$: 13};
var $author$project$Hexadecimal$lend = {
	c: 6,
	b: _List_fromArray(
		[20, 20, 9, 1, 8, 2, 18])
};
var $author$project$Data$selectorLend = $author$project$Hexadecimal$lend;
var $author$project$Data$lend = F4(
	function (pool, token, collateral, reciepient) {
		return A2(
			$author$project$Data$Data,
			$author$project$Data$selectorLend,
			_List_fromArray(
				[
					$author$project$Data$AddressParameter(pool),
					$author$project$Data$UnsignedIntegerParameter(token),
					$author$project$Data$UnsignedIntegerParameter(collateral),
					$author$project$Data$AddressParameter(reciepient)
				]));
	});
var $author$project$Main$lend = F4(
	function (token, collateral, sender, log) {
		var parameter = _List_fromArray(
			[
				_Utils_Tuple2(
				'from',
				$author$project$Data$addressEncode(sender)),
				_Utils_Tuple2(
				'to',
				$author$project$Data$addressEncode($author$project$Data$addressTimeswapConvenience)),
				_Utils_Tuple2(
				'data',
				$author$project$Data$encode(
					A4($author$project$Data$lend, $author$project$Data$addressTimeswapPool, token, collateral, sender)))
			]);
		var nextLog = A2($author$project$Main$next, $author$project$Main$Lending, log);
		var value = $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'id',
					$author$project$Main$idEncode(nextLog)),
					_Utils_Tuple2('jsonrpc', $author$project$Main$jsonrpcEncode),
					_Utils_Tuple2(
					'method',
					$author$project$Main$methodEncode(1)),
					_Utils_Tuple2(
					'params',
					$author$project$Main$parameterEncode(parameter))
				]));
		return A2($author$project$Main$Outcome, value, nextLog);
	});
var $author$project$Hexadecimal$decimalPadRight = F2(
	function (amount, decimal) {
		var leftMostDigit = decimal.c;
		var otherDigits = decimal.b;
		if (!amount) {
			return decimal;
		} else {
			var notZero = amount;
			var numberOfZeroes = notZero;
			var zeroes = A2($elm$core$List$repeat, numberOfZeroes, 0);
			return A2(
				$author$project$Hexadecimal$Decimal,
				leftMostDigit,
				_Utils_ap(otherDigits, zeroes));
		}
	});
var $author$project$Hexadecimal$fromCharToInt = function (character) {
	switch (character) {
		case '0':
			return $elm$core$Result$Ok(0);
		case '1':
			return $elm$core$Result$Ok(1);
		case '2':
			return $elm$core$Result$Ok(2);
		case '3':
			return $elm$core$Result$Ok(3);
		case '4':
			return $elm$core$Result$Ok(4);
		case '5':
			return $elm$core$Result$Ok(5);
		case '6':
			return $elm$core$Result$Ok(6);
		case '7':
			return $elm$core$Result$Ok(7);
		case '8':
			return $elm$core$Result$Ok(8);
		case '9':
			return $elm$core$Result$Ok(9);
		default:
			return $elm$core$Result$Err('Not decimalable');
	}
};
var $author$project$Hexadecimal$tokenFromString = function (string) {
	var recursive = F4(
		function (characters, hasPoint, accumulatingDecimals, accumulatingIntegers) {
			if (hasPoint) {
				var _v0 = _Utils_Tuple3(characters, accumulatingIntegers, accumulatingDecimals);
				if (!_v0.a.b) {
					if (!_v0.b.b) {
						return $elm$core$Result$Err('Cannot by empty string');
					} else {
						var _v1 = _v0.b;
						var singletonInteger = _v1.a;
						var remainingIntegers = _v1.b;
						var decimals = _v0.c;
						return $elm$core$Result$Ok(
							A2(
								$author$project$Hexadecimal$decimalPadRight,
								18 - decimals,
								A2($author$project$Hexadecimal$Decimal, singletonInteger, remainingIntegers)));
					}
				} else {
					var _v2 = _v0.a;
					var singletonCharacter = _v2.a;
					var remainingCharacters = _v2.b;
					var integers = _v0.b;
					var decimals = _v0.c;
					var resultInteger = $author$project$Hexadecimal$fromCharToInt(singletonCharacter);
					var recursiveRemaining = A3(recursive, remainingCharacters, true, decimals);
					return A2(
						$elm$core$Result$andThen,
						recursiveRemaining,
						A3(
							$elm$core$Result$map2,
							$elm$core$List$cons,
							resultInteger,
							$elm$core$Result$Ok(integers)));
				}
			} else {
				var _v3 = _Utils_Tuple3(characters, accumulatingIntegers, accumulatingDecimals);
				if (!_v3.a.b) {
					if (!_v3.b.b) {
						return $elm$core$Result$Err('Cannot be empty string');
					} else {
						var _v4 = _v3.b;
						var singletonInteger = _v4.a;
						var remainingIntegers = _v4.b;
						return $elm$core$Result$Ok(
							A2(
								$author$project$Hexadecimal$decimalPadRight,
								18,
								A2($author$project$Hexadecimal$Decimal, singletonInteger, remainingIntegers)));
					}
				} else {
					if ('.' === _v3.a.a) {
						if (!_v3.c) {
							var _v5 = _v3.a;
							return $elm$core$Result$Err('Cannot end in decimal');
						} else {
							var _v6 = _v3.a;
							var remainingCharacters = _v6.b;
							var integers = _v3.b;
							var decimals = _v3.c;
							return (decimals <= 18) ? A4(recursive, remainingCharacters, true, decimals, integers) : $elm$core$Result$Err('Cannot have more than 18 decimals');
						}
					} else {
						var _v7 = _v3.a;
						var singletonCharacter = _v7.a;
						var remainingCharacters = _v7.b;
						var integers = _v3.b;
						var decimals = _v3.c;
						var resultInteger = $author$project$Hexadecimal$fromCharToInt(singletonCharacter);
						var recursiveRemaining = A3(recursive, remainingCharacters, false, decimals + 1);
						return A2(
							$elm$core$Result$andThen,
							recursiveRemaining,
							A3(
								$elm$core$Result$map2,
								$elm$core$List$cons,
								resultInteger,
								$elm$core$Result$Ok(integers)));
					}
				}
			}
		});
	var initial = function (initialCharacters) {
		return A4(recursive, initialCharacters, false, 0, _List_Nil);
	};
	return initial(
		$elm$core$List$reverse(
			$elm$core$String$toList(string)));
};
var $author$project$Hexadecimal$fromStringToken = function (string) {
	return A2(
		$elm$core$Result$andThen,
		$author$project$Hexadecimal$fromDecimal,
		$author$project$Hexadecimal$tokenFromString(string));
};
var $author$project$Data$toUnsignedIntegerFromStringToken = function (string) {
	var resultHexadecimal = $author$project$Hexadecimal$fromStringToken(string);
	var resultLength = A2($elm$core$Result$map, $author$project$Hexadecimal$length, resultHexadecimal);
	var _v0 = _Utils_Tuple2(resultHexadecimal, resultLength);
	if (_v0.a.$ === 1) {
		var error = _v0.a.a;
		return $elm$core$Result$Err(error);
	} else {
		if (!_v0.b.$) {
			var hexadecimal = _v0.a.a;
			var length = _v0.b.a;
			return (length <= 64) ? $elm$core$Result$Ok(hexadecimal) : $elm$core$Result$Err('Unsigned Integer must be 32 bytes');
		} else {
			var error = _v0.b.a;
			return $elm$core$Result$Err(error);
		}
	}
};
var $author$project$Main$updateSwap = F2(
	function (info, model) {
		var initialTransaction = info.g;
		var resultCollateral = $author$project$Data$toUnsignedIntegerFromStringToken(initialTransaction.bl);
		var resultInterest = $author$project$Data$toUnsignedIntegerFromStringToken(initialTransaction.c2);
		var resultToken = $author$project$Data$toUnsignedIntegerFromStringToken(initialTransaction.dS);
		var _v0 = _Utils_Tuple3(resultToken, resultCollateral, resultInterest);
		if (((!_v0.a.$) && (!_v0.b.$)) && (!_v0.c.$)) {
			var token = _v0.a.a;
			var collateral = _v0.b.a;
			var _v1 = initialTransaction.C;
			if (!_v1) {
				var lendOutcome = A4($author$project$Main$lend, token, collateral, info.i, info.a);
				var nextInfo = _Utils_update(
					info,
					{a: lendOutcome.a, g: $author$project$Main$defaultLend});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: $author$project$Main$Rinkeby(nextInfo)
						}),
					$author$project$Main$sendTransaction(lendOutcome.e));
			} else {
				var borrowOutcome = A4($author$project$Main$borrow, token, collateral, info.i, info.a);
				var nextInfo = _Utils_update(
					info,
					{a: borrowOutcome.a, g: $author$project$Main$defaultBorrow});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: $author$project$Main$Rinkeby(nextInfo)
						}),
					$author$project$Main$sendTransaction(borrowOutcome.e));
			}
		} else {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$updateToBorrow = F2(
	function (info, model) {
		var nextInfo = _Utils_update(
			info,
			{g: $author$project$Main$defaultBorrow});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					d: $author$project$Main$Rinkeby(nextInfo)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Main$updateToLend = F2(
	function (info, model) {
		var nextInfo = _Utils_update(
			info,
			{g: $author$project$Main$defaultLend});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					d: $author$project$Main$Rinkeby(nextInfo)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Main$updateTokenAmount = F3(
	function (input, info, model) {
		var resultToken = $author$project$Main$fromTokenToBigInt(input);
		var initialTransaction = info.g;
		var resultCollateral = $author$project$Main$fromTokenToBigInt(initialTransaction.bl);
		var _v0 = info.I;
		if (!_v0.$) {
			var reserve = _v0.a;
			var _v1 = _Utils_Tuple3(initialTransaction.C, resultToken, resultCollateral);
			_v1$2:
			while (true) {
				if (!_v1.a) {
					if ((!_v1.b.$) && (!_v1.c.$)) {
						var _v2 = _v1.a;
						var token = _v1.b.a;
						var collateral = _v1.c.a;
						var transaction = _Utils_update(
							initialTransaction,
							{
								c2: A3($author$project$Main$getInterestLend, token, collateral, reserve),
								dS: input
							});
						var nextInfo = _Utils_update(
							info,
							{g: transaction});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: $author$project$Main$Rinkeby(nextInfo)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						break _v1$2;
					}
				} else {
					if ((!_v1.b.$) && (!_v1.c.$)) {
						var _v3 = _v1.a;
						var token = _v1.b.a;
						var collateral = _v1.c.a;
						var transaction = _Utils_update(
							initialTransaction,
							{
								c2: A3($author$project$Main$getInterestBorrow, token, collateral, reserve),
								dS: input
							});
						var nextInfo = _Utils_update(
							info,
							{g: transaction});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: $author$project$Main$Rinkeby(nextInfo)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						break _v1$2;
					}
				}
			}
			var transaction = _Utils_update(
				initialTransaction,
				{dS: input});
			var nextInfo = _Utils_update(
				info,
				{g: transaction});
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						d: $author$project$Main$Rinkeby(nextInfo)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$Approved = 0;
var $author$project$Main$NotApproved = 1;
var $author$project$Data$Deposit = F2(
	function (deposit, insurance) {
		return {cG: deposit, c1: insurance};
	});
var $author$project$Hexadecimal$fromStringHexadecimalToList = function (string) {
	var remove0x = function (characters) {
		_v5$3:
		while (true) {
			if (!characters.b) {
				return $elm$core$Result$Err('Cannot be empty string');
			} else {
				if (('0' === characters.a) && characters.b.b) {
					switch (characters.b.a) {
						case 'x':
							var _v6 = characters.b;
							var remainingCharacters = _v6.b;
							return $elm$core$Result$Ok(remainingCharacters);
						case 'X':
							var _v7 = characters.b;
							var remainingCharacters = _v7.b;
							return $elm$core$Result$Ok(remainingCharacters);
						default:
							break _v5$3;
					}
				} else {
					break _v5$3;
				}
			}
		}
		return $elm$core$Result$Err('Must start wiht 0x or 0X');
	};
	var recursive = F2(
		function (characters, accumulatingDigits) {
			var _v0 = _Utils_Tuple2(characters, accumulatingDigits);
			if (!_v0.a.b) {
				if (!_v0.b.b) {
					return $elm$core$Result$Err('Cannot be empty string after 0x or 0X');
				} else {
					var _v1 = _v0.b;
					var singletonDigit = _v1.a;
					var remainingDigits = _v1.b;
					return $elm$core$Result$Ok(
						A2($author$project$Hexadecimal$create, singletonDigit, remainingDigits));
				}
			} else {
				var _v2 = _v0.a;
				var singletonCharacter = _v2.a;
				var remainingCharacters = _v2.b;
				var digits = _v0.b;
				var resultDigit = $author$project$Hexadecimal$fromCharToDigit(singletonCharacter);
				var recursiveRemaining = recursive(remainingCharacters);
				return A2(
					$elm$core$Result$andThen,
					recursiveRemaining,
					A3(
						$elm$core$Result$map2,
						$elm$core$List$cons,
						resultDigit,
						$elm$core$Result$Ok(digits)));
			}
		});
	var initial = function (initialCharacters) {
		return A2(recursive, initialCharacters, _List_Nil);
	};
	var resultWholeHexadecimal = A2(
		$elm$core$Result$andThen,
		initial,
		A2(
			$elm$core$Result$map,
			$elm$core$List$reverse,
			remove0x(
				$elm$core$String$toList(string))));
	var cut64 = F2(
		function (currentHexadecimal, accumulatingList) {
			var hexadecimal = currentHexadecimal;
			if ($author$project$Hexadecimal$length(currentHexadecimal) >= 64) {
				var remainingDigits = A2($elm$core$List$drop, 63, hexadecimal.b);
				var otherDigits = A2($elm$core$List$take, 63, hexadecimal.b);
				var leftMostDigit = hexadecimal.c;
				var singletonHexadecimal = $author$project$Hexadecimal$remove0(
					A2($author$project$Hexadecimal$create, leftMostDigit, otherDigits));
				if (!remainingDigits.b) {
					return $elm$core$Result$Ok(
						$elm$core$List$reverse(
							A2($elm$core$List$cons, singletonHexadecimal, accumulatingList)));
				} else {
					var singleton = remainingDigits.a;
					var remaining = remainingDigits.b;
					return A2(
						cut64,
						A2($author$project$Hexadecimal$create, singleton, remaining),
						A2($elm$core$List$cons, singletonHexadecimal, accumulatingList));
				}
			} else {
				return $elm$core$Result$Err('Problem with the result');
			}
		});
	if (!resultWholeHexadecimal.$) {
		var wholeHexadecimal = resultWholeHexadecimal.a;
		return A2(cut64, wholeHexadecimal, _List_Nil);
	} else {
		var error = resultWholeHexadecimal.a;
		return $elm$core$Result$Err(error);
	}
};
var $author$project$Data$toDepositFromString = function (string) {
	var resultHexadecimal = $author$project$Hexadecimal$fromStringHexadecimalToList(string);
	if (((!resultHexadecimal.$) && resultHexadecimal.a.b) && resultHexadecimal.a.b.b) {
		var _v1 = resultHexadecimal.a;
		var deposit = _v1.a;
		var _v2 = _v1.b;
		var insurance = _v2.a;
		return $elm$core$Result$Ok(
			A2($author$project$Data$Deposit, deposit, insurance));
	} else {
		return $elm$core$Result$Err('Decoding Error');
	}
};
var $author$project$Data$depositOfDecoder = A2($elm$json$Json$Decode$map, $author$project$Data$toDepositFromString, $elm$json$Json$Decode$string);
var $author$project$Main$depositOfDecoder = A2($elm$json$Json$Decode$field, 'result', $author$project$Data$depositOfDecoder);
var $author$project$Main$idDecoder = A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int);
var $author$project$Hexadecimal$addBy = F2(
	function (first, second) {
		var secondDecimal = $author$project$Hexadecimal$toDecimal(second);
		var firstDecimal = $author$project$Hexadecimal$toDecimal(first);
		return $author$project$Hexadecimal$fromDecimal(
			A2($author$project$Hexadecimal$decimalAddBy, secondDecimal, firstDecimal));
	});
var $author$project$Data$addBy = F2(
	function (_v0, _v1) {
		var first = _v0;
		var second = _v1;
		var toUnsignedInteger = function (hexadecimal) {
			return ($author$project$Hexadecimal$length(hexadecimal) <= 64) ? $elm$core$Result$Ok(hexadecimal) : $elm$core$Result$Err('Addition overflow');
		};
		var sum = A2($author$project$Hexadecimal$addBy, first, second);
		return A2($elm$core$Result$andThen, toUnsignedInteger, sum);
	});
var $author$project$Hexadecimal$one = A2($author$project$Hexadecimal$create, 1, _List_Nil);
var $author$project$Data$unsignedIntegerOne = $author$project$Hexadecimal$one;
var $author$project$Data$increment = $author$project$Data$addBy($author$project$Data$unsignedIntegerOne);
var $rtfeldman$elm_sorter_experiment$Internal$Dict$Black = 0;
var $rtfeldman$elm_sorter_experiment$Internal$Dict$Node = F6(
	function (a, b, c, d, e, f) {
		return {$: 1, a: a, b: b, c: c, d: d, e: e, f: f};
	});
var $rtfeldman$elm_sorter_experiment$Internal$Dict$Red = 1;
var $rtfeldman$elm_sorter_experiment$Sort$Dict$balance = F6(
	function (sorter, color, key, value, left, right) {
		if ((right.$ === 1) && (right.b === 1)) {
			var _v1 = right.b;
			var rK = right.c;
			var rV = right.d;
			var rLeft = right.e;
			var rRight = right.f;
			if ((left.$ === 1) && (left.b === 1)) {
				var _v3 = left.b;
				var lK = left.c;
				var lV = left.d;
				var lLeft = left.e;
				var lRight = left.f;
				return A6(
					$rtfeldman$elm_sorter_experiment$Internal$Dict$Node,
					sorter,
					1,
					key,
					value,
					A6($rtfeldman$elm_sorter_experiment$Internal$Dict$Node, sorter, 0, lK, lV, lLeft, lRight),
					A6($rtfeldman$elm_sorter_experiment$Internal$Dict$Node, sorter, 0, rK, rV, rLeft, rRight));
			} else {
				return A6(
					$rtfeldman$elm_sorter_experiment$Internal$Dict$Node,
					sorter,
					color,
					rK,
					rV,
					A6($rtfeldman$elm_sorter_experiment$Internal$Dict$Node, sorter, 1, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 1) && (left.b === 1)) && (left.e.$ === 1)) && (left.e.b === 1)) {
				var _v5 = left.b;
				var lK = left.c;
				var lV = left.d;
				var _v6 = left.e;
				var _v7 = _v6.b;
				var llK = _v6.c;
				var llV = _v6.d;
				var llLeft = _v6.e;
				var llRight = _v6.f;
				var lRight = left.f;
				return A6(
					$rtfeldman$elm_sorter_experiment$Internal$Dict$Node,
					sorter,
					1,
					lK,
					lV,
					A6($rtfeldman$elm_sorter_experiment$Internal$Dict$Node, sorter, 0, llK, llV, llLeft, llRight),
					A6($rtfeldman$elm_sorter_experiment$Internal$Dict$Node, sorter, 0, key, value, lRight, right));
			} else {
				return A6($rtfeldman$elm_sorter_experiment$Internal$Dict$Node, sorter, color, key, value, left, right);
			}
		}
	});
var $rtfeldman$elm_sorter_experiment$Sort$toOrder = F3(
	function (_v0, first, second) {
		var sort = _v0;
		return A2(sort, first, second);
	});
var $rtfeldman$elm_sorter_experiment$Sort$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (!dict.$) {
			var sorter = dict.a;
			return A6(
				$rtfeldman$elm_sorter_experiment$Internal$Dict$Node,
				sorter,
				1,
				key,
				value,
				$rtfeldman$elm_sorter_experiment$Internal$Dict$Leaf(sorter),
				$rtfeldman$elm_sorter_experiment$Internal$Dict$Leaf(sorter));
		} else {
			var sorter = dict.a;
			var nColor = dict.b;
			var nKey = dict.c;
			var nValue = dict.d;
			var nLeft = dict.e;
			var nRight = dict.f;
			var _v1 = A3($rtfeldman$elm_sorter_experiment$Sort$toOrder, sorter, key, nKey);
			switch (_v1) {
				case 0:
					return A6(
						$rtfeldman$elm_sorter_experiment$Sort$Dict$balance,
						sorter,
						nColor,
						nKey,
						nValue,
						A3($rtfeldman$elm_sorter_experiment$Sort$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 2:
					return A6(
						$rtfeldman$elm_sorter_experiment$Sort$Dict$balance,
						sorter,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($rtfeldman$elm_sorter_experiment$Sort$Dict$insertHelp, key, value, nRight));
				default:
					return A6($rtfeldman$elm_sorter_experiment$Internal$Dict$Node, sorter, nColor, nKey, value, nLeft, nRight);
			}
		}
	});
var $rtfeldman$elm_sorter_experiment$Sort$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($rtfeldman$elm_sorter_experiment$Sort$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 1) && (_v0.b === 1)) {
			var sorter = _v0.a;
			var _v1 = _v0.b;
			var k = _v0.c;
			var v = _v0.d;
			var l = _v0.e;
			var r = _v0.f;
			return A6($rtfeldman$elm_sorter_experiment$Internal$Dict$Node, sorter, 0, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $author$project$Main$jsonrpcDecoder = A2($elm$json$Json$Decode$field, 'jsonrpc', $elm$json$Json$Decode$string);
var $author$project$Data$Loan = F2(
	function (loan, collateral) {
		return {bl: collateral, c5: loan};
	});
var $author$project$Data$toLoanFromString = function (string) {
	var resultHexadecimal = $author$project$Hexadecimal$fromStringHexadecimalToList(string);
	if (((!resultHexadecimal.$) && resultHexadecimal.a.b) && resultHexadecimal.a.b.b) {
		var _v1 = resultHexadecimal.a;
		var debt = _v1.a;
		var _v2 = _v1.b;
		var collateral = _v2.a;
		return $elm$core$Result$Ok(
			A2($author$project$Data$Loan, debt, collateral));
	} else {
		return $elm$core$Result$Err('Decoding Error');
	}
};
var $author$project$Data$loanOfDecoder = A2($elm$json$Json$Decode$map, $author$project$Data$toLoanFromString, $elm$json$Json$Decode$string);
var $author$project$Main$loanOfDecoder = A2($elm$json$Json$Decode$field, 'result', $author$project$Data$loanOfDecoder);
var $author$project$Main$maxUint112 = A2(
	$cmditch$elm_bigint$BigInt$sub,
	A2(
		$cmditch$elm_bigint$BigInt$pow,
		$cmditch$elm_bigint$BigInt$fromInt(2),
		$cmditch$elm_bigint$BigInt$fromInt(112)),
	$cmditch$elm_bigint$BigInt$fromInt(1));
var $author$project$Data$toUnsignedIntegerFromStringHexadecimal = function (string) {
	var resultHexadecimal = $author$project$Hexadecimal$fromStringHexadecimal(string);
	var resultLength = A2($elm$core$Result$map, $author$project$Hexadecimal$length, resultHexadecimal);
	var _v0 = _Utils_Tuple2(resultHexadecimal, resultLength);
	if (_v0.a.$ === 1) {
		var error = _v0.a.a;
		return $elm$core$Result$Err(error);
	} else {
		if (!_v0.b.$) {
			var hexadecimal = _v0.a.a;
			var length = _v0.b.a;
			return (length <= 64) ? $elm$core$Result$Ok(hexadecimal) : $elm$core$Result$Err('Unsigned Integer must be 32 bytes');
		} else {
			var error = _v0.b.a;
			return $elm$core$Result$Err(error);
		}
	}
};
var $author$project$Data$unsignedIntegerDecoder = A2($elm$json$Json$Decode$map, $author$project$Data$toUnsignedIntegerFromStringHexadecimal, $elm$json$Json$Decode$string);
var $author$project$Main$unsignedIntegerDecoder = A2($elm$json$Json$Decode$field, 'result', $author$project$Data$unsignedIntegerDecoder);
var $author$project$Data$Reserve = F3(
	function (token, collateral, interest) {
		return {bl: collateral, c2: interest, dS: token};
	});
var $author$project$Data$toReserveFromString = function (string) {
	var resultHexadecimal = $author$project$Hexadecimal$fromStringHexadecimalToList(string);
	if ((((!resultHexadecimal.$) && resultHexadecimal.a.b) && resultHexadecimal.a.b.b) && resultHexadecimal.a.b.b.b) {
		var _v1 = resultHexadecimal.a;
		var token = _v1.a;
		var _v2 = _v1.b;
		var collateral = _v2.a;
		var _v3 = _v2.b;
		var interest = _v3.a;
		return $elm$core$Result$Ok(
			A3($author$project$Data$Reserve, token, collateral, interest));
	} else {
		return $elm$core$Result$Err('Decoding Error');
	}
};
var $author$project$Data$viewReservesDecoder = A2($elm$json$Json$Decode$map, $author$project$Data$toReserveFromString, $elm$json$Json$Decode$string);
var $author$project$Main$viewReservesDecoder = A2($elm$json$Json$Decode$field, 'result', $author$project$Data$viewReservesDecoder);
var $author$project$Main$updateTransaction = F3(
	function (value, info, model) {
		var jsonrpc = A2($elm$json$Json$Decode$decodeValue, $author$project$Main$jsonrpcDecoder, value);
		var id = A2($elm$json$Json$Decode$decodeValue, $author$project$Main$idDecoder, value);
		var _function = A3(
			$elm$core$Result$map2,
			$elm$core$Dict$get,
			id,
			$elm$core$Result$Ok(info.a.ae));
		var _v0 = _Utils_Tuple2(jsonrpc, _function);
		_v0$9:
		while (true) {
			if ((((!_v0.a.$) && (_v0.a.a === '2.0')) && (!_v0.b.$)) && (!_v0.b.a.$)) {
				switch (_v0.b.a.a.$) {
					case 0:
						var _v1 = _v0.b.a.a;
						var reserve = A2(
							$elm$core$Result$withDefault,
							$elm$core$Maybe$Nothing,
							A2(
								$elm$core$Result$map,
								$elm$core$Result$toMaybe,
								A2($elm$json$Json$Decode$decodeValue, $author$project$Main$viewReservesDecoder, value)));
						var nextInfo = _Utils_update(
							info,
							{I: reserve});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: $author$project$Main$Rinkeby(nextInfo)
								}),
							$elm$core$Platform$Cmd$none);
					case 1:
						var _v2 = _v0.b.a.a;
						var deposit = A2(
							$elm$core$Result$withDefault,
							$elm$core$Maybe$Nothing,
							A2(
								$elm$core$Result$map,
								$elm$core$Result$toMaybe,
								A2($elm$json$Json$Decode$decodeValue, $author$project$Main$depositOfDecoder, value)));
						var nextInfo = _Utils_update(
							info,
							{cG: deposit});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: $author$project$Main$Rinkeby(nextInfo)
								}),
							$elm$core$Platform$Cmd$none);
					case 2:
						var index = _v0.b.a.a.a;
						var resultLoan = A2(
							$elm$core$Result$withDefault,
							$elm$core$Maybe$Nothing,
							A2(
								$elm$core$Result$map,
								$elm$core$Result$toMaybe,
								A2($elm$json$Json$Decode$decodeValue, $author$project$Main$loanOfDecoder, value)));
						if (!resultLoan.$) {
							var loan = resultLoan.a;
							var nextIndex = A2(
								$elm$core$Result$withDefault,
								$author$project$Data$unsignedIntegerZero,
								$author$project$Data$increment(index));
							var loanOfOutcome = A3($author$project$Main$loanOf, info.i, nextIndex, info.a);
							var nextInfo = _Utils_update(
								info,
								{
									c5: A3($rtfeldman$elm_sorter_experiment$Sort$Dict$insert, index, loan, info.c5),
									a: loanOfOutcome.a
								});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$author$project$Main$sendTransaction(loanOfOutcome.e));
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					case 3:
						var _v4 = _v0.b.a.a;
						var resultUnsignedInteger = A2(
							$elm$core$Result$withDefault,
							$elm$core$Result$Err('Cannot turn to big int'),
							A2($elm$json$Json$Decode$decodeValue, $author$project$Main$unsignedIntegerDecoder, value));
						if (!resultUnsignedInteger.$) {
							var unsignedInteger = resultUnsignedInteger.a;
							var nextInfo = _Utils_update(
								info,
								{
									ao: $elm$core$Maybe$Just(unsignedInteger)
								});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var nextInfo = _Utils_update(
								info,
								{ao: $elm$core$Maybe$Nothing});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						}
					case 4:
						var _v6 = _v0.b.a.a;
						var resultUnsignedInteger = A2(
							$elm$core$Result$withDefault,
							$elm$core$Result$Err('Cannot turn to big int'),
							A2($elm$json$Json$Decode$decodeValue, $author$project$Main$unsignedIntegerDecoder, value));
						if (!resultUnsignedInteger.$) {
							var unsignedInteger = resultUnsignedInteger.a;
							var nextInfo = _Utils_update(
								info,
								{
									W: $elm$core$Maybe$Just(unsignedInteger)
								});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var nextInfo = _Utils_update(
								info,
								{W: $elm$core$Maybe$Nothing});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						}
					case 5:
						var _v8 = _v0.b.a.a;
						var resultUnsignedInteger = A2(
							$elm$core$Result$withDefault,
							$elm$core$Result$Err('Cannot turn to big int'),
							A2($elm$json$Json$Decode$decodeValue, $author$project$Main$unsignedIntegerDecoder, value));
						if (!resultUnsignedInteger.$) {
							var unsignedInteger = resultUnsignedInteger.a;
							var nextInfo = _Utils_update(
								info,
								{
									au: $elm$core$Maybe$Just(unsignedInteger)
								});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var nextInfo = _Utils_update(
								info,
								{W: $elm$core$Maybe$Nothing});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						}
					case 6:
						var _v10 = _v0.b.a.a;
						var deposit = A2(
							$elm$core$Result$withDefault,
							$elm$core$Maybe$Nothing,
							A2(
								$elm$core$Result$map,
								$elm$core$Result$toMaybe,
								A2($elm$json$Json$Decode$decodeValue, $author$project$Main$depositOfDecoder, value)));
						var nextInfo = _Utils_update(
							info,
							{aC: deposit});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									d: $author$project$Main$Rinkeby(nextInfo)
								}),
							$elm$core$Platform$Cmd$none);
					case 7:
						var _v11 = _v0.b.a.a;
						var resultUnsignedInteger = A2(
							$elm$core$Result$andThen,
							$author$project$Data$toBigInt,
							A2(
								$elm$core$Result$withDefault,
								$elm$core$Result$Err('Cannot turn to big int'),
								A2($elm$json$Json$Decode$decodeValue, $author$project$Main$unsignedIntegerDecoder, value)));
						if (!resultUnsignedInteger.$) {
							var unsignedInteger = resultUnsignedInteger.a;
							var tokenApproved = A2($cmditch$elm_bigint$BigInt$gt, unsignedInteger, $author$project$Main$maxUint112) ? 0 : 1;
							var nextInfo = _Utils_update(
								info,
								{
									af: $elm$core$Maybe$Just(tokenApproved)
								});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var nextInfo = _Utils_update(
								info,
								{af: $elm$core$Maybe$Nothing});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						}
					case 8:
						var _v13 = _v0.b.a.a;
						var resultUnsignedInteger = A2(
							$elm$core$Result$andThen,
							$author$project$Data$toBigInt,
							A2(
								$elm$core$Result$withDefault,
								$elm$core$Result$Err('Cannot turn to big int'),
								A2($elm$json$Json$Decode$decodeValue, $author$project$Main$unsignedIntegerDecoder, value)));
						if (!resultUnsignedInteger.$) {
							var unsignedInteger = resultUnsignedInteger.a;
							var collateralApproved = A2($cmditch$elm_bigint$BigInt$gt, unsignedInteger, $author$project$Main$maxUint112) ? 0 : 1;
							var nextInfo = _Utils_update(
								info,
								{
									V: $elm$core$Maybe$Just(collateralApproved)
								});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var nextInfo = _Utils_update(
								info,
								{V: $elm$core$Maybe$Nothing});
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										d: $author$project$Main$Rinkeby(nextInfo)
									}),
								$elm$core$Platform$Cmd$none);
						}
					default:
						break _v0$9;
				}
			} else {
				break _v0$9;
			}
		}
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $author$project$Main$updateUser = F2(
	function (value, model) {
		var resultAddress = A2(
			$elm$json$Json$Decode$decodeValue,
			$elm$json$Json$Decode$nullable($author$project$Data$addressDecoder),
			value);
		if (!resultAddress.$) {
			if (!resultAddress.a.$) {
				if (!resultAddress.a.a.$) {
					var address = resultAddress.a.a.a;
					var viewReservesOutcome = $author$project$Main$viewReserves(
						{_: 0, ae: $elm$core$Dict$empty});
					var depositOfOutcome = A2($author$project$Main$depositOf, address, viewReservesOutcome.a);
					var loanOfOutcome = A3($author$project$Main$loanOf, address, $author$project$Data$unsignedIntegerZero, depositOfOutcome.a);
					var allowanceTokenOutcome = A2($author$project$Main$allowanceToken, address, loanOfOutcome.a);
					var allowanceCollateralOutcome = A2($author$project$Main$allowanceCollateral, address, allowanceTokenOutcome.a);
					var sendTransactionCommand = $elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$author$project$Main$sendTransaction(viewReservesOutcome.e),
								$author$project$Main$sendTransaction(depositOfOutcome.e),
								$author$project$Main$sendTransaction(loanOfOutcome.e),
								$author$project$Main$sendTransaction(allowanceTokenOutcome.e),
								$author$project$Main$sendTransaction(allowanceCollateralOutcome.e)
							]));
					var state = A2($author$project$Main$initialState, address, allowanceCollateralOutcome.a);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{d: state}),
						sendTransactionCommand);
				} else {
					var error = resultAddress.a.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								F: $elm$core$Maybe$Just(error),
								d: $author$project$Main$NotConnected
							}),
						$elm$core$Platform$Cmd$none);
				}
			} else {
				var _v1 = resultAddress.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: $elm$core$Maybe$Just('You have been logged out. Decentralized Counter only works with Kovan Test Network. Please switch your network on Metamask.'),
							d: $author$project$Main$NotConnected
						}),
					$elm$core$Platform$Cmd$none);
			}
		} else {
			var decodeError = resultAddress.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						F: $elm$core$Maybe$Just(
							$elm$json$Json$Decode$errorToString(decodeError))
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$collateralEncode = $elm$json$Json$Encode$string('FILE');
var $author$project$Main$decimalsEncode = $elm$json$Json$Encode$int(18);
var $author$project$Main$method2Encode = $elm$json$Json$Encode$string('wallet_watchAsset');
var $author$project$Main$tokenERC20Encode = $elm$json$Json$Encode$string('ERC20');
var $author$project$Main$watchCollateral = function () {
	var options = $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'address',
				$author$project$Data$addressEncode($author$project$Data$addressFileTSDemo)),
				_Utils_Tuple2('symbol', $author$project$Main$collateralEncode),
				_Utils_Tuple2('decimals', $author$project$Main$decimalsEncode)
			]));
	var parameter = $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2('type', $author$project$Main$tokenERC20Encode),
				_Utils_Tuple2('options', options)
			]));
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2('method', $author$project$Main$method2Encode),
				_Utils_Tuple2('params', parameter)
			]));
}();
var $author$project$Main$tokenEncode = $elm$json$Json$Encode$string('DAI');
var $author$project$Main$watchToken = function () {
	var options = $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'address',
				$author$project$Data$addressEncode($author$project$Data$addressDaiTSDemo)),
				_Utils_Tuple2('symbol', $author$project$Main$tokenEncode),
				_Utils_Tuple2('decimals', $author$project$Main$decimalsEncode)
			]));
	var parameter = $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2('type', $author$project$Main$tokenERC20Encode),
				_Utils_Tuple2('options', options)
			]));
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2('method', $author$project$Main$method2Encode),
				_Utils_Tuple2('params', parameter)
			]));
}();
var $author$project$Main$update = F2(
	function (msg, model) {
		var _v0 = _Utils_Tuple2(msg, model.d);
		_v0$19:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					var _v1 = _v0.a;
					var width = _v1.a;
					var height = _v1.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								b2: A2($author$project$Main$Window, width, height)
							}),
						$elm$core$Platform$Cmd$none);
				case 1:
					if (_v0.b.$ === 1) {
						var _v2 = _v0.a;
						var _v3 = _v0.b;
						return _Utils_Tuple2(
							model,
							$author$project$Main$sendConnect(0));
					} else {
						break _v0$19;
					}
				case 2:
					if (_v0.b.$ === 1) {
						var value = _v0.a.a;
						var _v4 = _v0.b;
						return A2($author$project$Main$updateConnect, value, model);
					} else {
						break _v0$19;
					}
				case 3:
					if (!_v0.b.$) {
						var value = _v0.a.a;
						return A2($author$project$Main$updateUser, value, model);
					} else {
						break _v0$19;
					}
				case 4:
					if (!_v0.b.$) {
						var value = _v0.a.a;
						var info = _v0.b.a;
						return A3($author$project$Main$updateNetwork, value, info, model);
					} else {
						break _v0$19;
					}
				case 5:
					if (!_v0.b.$) {
						var value = _v0.a.a;
						var info = _v0.b.a;
						return A3($author$project$Main$updateTransaction, value, info, model);
					} else {
						break _v0$19;
					}
				case 6:
					if (!_v0.b.$) {
						var info = _v0.b.a;
						return A2($author$project$Main$updateCheck, info, model);
					} else {
						break _v0$19;
					}
				case 7:
					if (!_v0.b.$) {
						var _v5 = _v0.a;
						var info = _v0.b.a;
						return A2($author$project$Main$updateToLend, info, model);
					} else {
						break _v0$19;
					}
				case 8:
					if (!_v0.b.$) {
						var _v6 = _v0.a;
						var info = _v0.b.a;
						return A2($author$project$Main$updateToBorrow, info, model);
					} else {
						break _v0$19;
					}
				case 9:
					if (!_v0.b.$) {
						var input = _v0.a.a;
						var info = _v0.b.a;
						return A3($author$project$Main$updateTokenAmount, input, info, model);
					} else {
						break _v0$19;
					}
				case 10:
					if (!_v0.b.$) {
						var input = _v0.a.a;
						var info = _v0.b.a;
						return A3($author$project$Main$updateSliderAmount, input, info, model);
					} else {
						break _v0$19;
					}
				case 11:
					if (!_v0.b.$) {
						var input = _v0.a.a;
						var info = _v0.b.a;
						return A3($author$project$Main$updateCollateralAmount, input, info, model);
					} else {
						break _v0$19;
					}
				case 12:
					if (!_v0.b.$) {
						var input = _v0.a.a;
						var info = _v0.b.a;
						return A3($author$project$Main$updateInterestAmount, input, info, model);
					} else {
						break _v0$19;
					}
				case 13:
					if (!_v0.b.$) {
						var _v7 = _v0.a;
						return _Utils_Tuple2(
							model,
							$author$project$Main$request($author$project$Main$watchToken));
					} else {
						break _v0$19;
					}
				case 14:
					if (!_v0.b.$) {
						var _v8 = _v0.a;
						return _Utils_Tuple2(
							model,
							$author$project$Main$request($author$project$Main$watchCollateral));
					} else {
						break _v0$19;
					}
				case 15:
					if (!_v0.b.$) {
						var _v9 = _v0.a;
						var info = _v0.b.a;
						return A2($author$project$Main$updateMintToken, info, model);
					} else {
						break _v0$19;
					}
				case 16:
					if (!_v0.b.$) {
						var _v10 = _v0.a;
						var info = _v0.b.a;
						return A2($author$project$Main$updateMintCollateral, info, model);
					} else {
						break _v0$19;
					}
				case 17:
					if (!_v0.b.$) {
						var _v11 = _v0.a;
						var info = _v0.b.a;
						return A2($author$project$Main$updateApprove, info, model);
					} else {
						break _v0$19;
					}
				default:
					if (!_v0.b.$) {
						var _v12 = _v0.a;
						var info = _v0.b.a;
						return A2($author$project$Main$updateSwap, info, model);
					} else {
						break _v0$19;
					}
			}
		}
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Main$focus = {cj: $elm$core$Maybe$Nothing, cp: $elm$core$Maybe$Nothing, ds: $elm$core$Maybe$Nothing};
var $mdgriffith$elm_ui$Internal$Model$FocusStyleOption = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Element$focusStyle = $mdgriffith$elm_ui$Internal$Model$FocusStyleOption;
var $mdgriffith$elm_ui$Internal$Model$InFront = 4;
var $mdgriffith$elm_ui$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 0};
var $mdgriffith$elm_ui$Element$createNearby = F2(
	function (loc, element) {
		if (element.$ === 3) {
			return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
		} else {
			return A2($mdgriffith$elm_ui$Internal$Model$Nearby, loc, element);
		}
	});
var $mdgriffith$elm_ui$Element$inFront = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, 4, element);
};
var $mdgriffith$elm_ui$Internal$Style$classes = {b6: 'a', aU: 'atv', b8: 'ab', b9: 'cx', ca: 'cy', cb: 'acb', cc: 'accx', cd: 'accy', ce: 'acr', bg: 'al', bh: 'ar', cf: 'at', aV: 'ah', aW: 'av', ch: 's', cl: 'bh', cm: 'b', co: 'w7', cq: 'bd', cr: 'bdt', aF: 'bn', cs: 'bs', aG: 'cpe', cz: 'cp', cA: 'cpx', cB: 'cpy', K: 'c', aI: 'ctr', aJ: 'cb', aK: 'ccx', L: 'ccy', av: 'cl', aL: 'cr', cD: 'ct', cE: 'cptr', cF: 'ctxt', cM: 'fcs', bp: 'focus-within', cN: 'fs', cO: 'g', aY: 'hbh', a_: 'hc', bs: 'he', a$: 'hf', bt: 'hfp', cR: 'hv', cT: 'ic', cV: 'fr', aP: 'lbl', cY: 'iml', cZ: 'imlf', c_: 'imlp', c$: 'implw', c0: 'it', c3: 'i', by: 'lnk', al: 'nb', bD: 'notxt', dc: 'ol', dd: 'or', ab: 'oq', di: 'oh', bG: 'pg', bH: 'p', dj: 'ppe', dm: 'ui', z: 'r', $7: 'sb', dp: 'sbx', dq: 'sby', dr: 'sbt', dt: 'e', du: 'cap', dv: 'sev', dz: 'sk', dD: 't', dE: 'tc', dF: 'w8', dG: 'w2', dH: 'w9', dI: 'tj', aR: 'tja', dJ: 'tl', dK: 'w3', dL: 'w5', dM: 'w4', dN: 'tr', dO: 'w6', dP: 'w1', dQ: 'tun', bX: 'ts', ag: 'clr', dW: 'u', bc: 'wc', b0: 'we', bd: 'wf', b1: 'wfp', be: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsEl = 2;
var $mdgriffith$elm_ui$Internal$Model$asEl = 2;
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.K);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cO);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bG);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bH);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.z);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dt);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 1:
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 2:
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 3:
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 4:
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
var $mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 3:
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $elm$core$Basics$round = _Basics_round;
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 13:
			var name = style.a;
			return name;
		case 12:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 7:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 6:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 8:
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.dn)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.D)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.dw.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.dw.b)))))));
		case 9:
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.z) + ('-' + ($elm$core$String$fromInt(pos.cC) + ('-' + ($elm$core$String$fromInt(pos.aT) + ('-' + $elm$core$String$fromInt(pos.aO)))))));
		case 11:
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector) {
					case 0:
						return 'fs';
					case 1:
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.bw ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.bE.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.bE.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.ai) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.am) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.aj))
				])));
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bp) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.cp),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.cj),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										ai: shadow.ai,
										aj: shadow.aj,
										bw: false,
										bE: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.bE)),
										am: shadow.am
									}));
						},
						focus.ds),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch) + (':focus .focusable, ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch) + '.focusable:focus')),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.cp),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.cj),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										ai: shadow.ai,
										aj: shadow.aj,
										bw: false,
										bE: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.bE)),
										am: shadow.am
									}));
						},
						focus.ds),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = 3;
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = 2;
var $mdgriffith$elm_ui$Internal$Style$Self = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Bottom = 1;
var $mdgriffith$elm_ui$Internal$Style$CenterX = 4;
var $mdgriffith$elm_ui$Internal$Style$CenterY = 5;
var $mdgriffith$elm_ui$Internal$Style$Top = 0;
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cD);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aJ);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aL);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.av);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aK);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.L);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cf);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b8);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bh);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bg);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b9);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ca);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(alignment),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aY),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cl),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dr),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dD),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a$),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bd),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a_),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a$),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bd),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b1),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bc),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment) {
				case 0:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 1:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 2:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 3:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 4:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = 0;
var $mdgriffith$elm_ui$Internal$Style$Behind = 5;
var $mdgriffith$elm_ui$Internal$Style$Below = 1;
var $mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
var $mdgriffith$elm_ui$Internal$Style$OnRight = 2;
var $mdgriffith$elm_ui$Internal$Style$Within = 4;
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = 0;
	var _v0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dt),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cT))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				'img',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a$)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a$),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cV),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.al),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.al),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dt),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc) {
							case 0:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b6),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a$),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bd),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 1:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cm),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a$),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 2:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dd),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 3:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dc),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 4:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cV),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cl),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.be),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bD),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cE),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cF),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dj),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aG),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ag),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ab),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.cR, $mdgriffith$elm_ui$Internal$Style$classes.ag)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.cR, $mdgriffith$elm_ui$Internal$Style$classes.ab)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.cM, $mdgriffith$elm_ui$Internal$Style$classes.ag)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.cM, $mdgriffith$elm_ui$Internal$Style$classes.ab)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.aU, $mdgriffith$elm_ui$Internal$Style$classes.ag)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.aU, $mdgriffith$elm_ui$Internal$Style$classes.ab)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bX),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.$7),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dp),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.z),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dq),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.K),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dt),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cz),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cA),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cB),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bc),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aF),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cq),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cr),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cs),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dD),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c0),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dt),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.z),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b0),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.by),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a$),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bt),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bd),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aI),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.ce,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.cc,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b9),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.cc,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b9),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.cc,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ca),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.cc + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.ce + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.cc)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dv),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aP),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.K),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a$),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bd),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b1),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bc),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.cb,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.cd,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ca),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.cd,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ca),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.cd,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ca),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.cd + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.cb + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.cd)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aI),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dv),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cO),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 1:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 2:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 3:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 4:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bG),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.ch + ($mdgriffith$elm_ui$Internal$Style$selfName(3) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.ch))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.ch + ($mdgriffith$elm_ui$Internal$Style$selfName(2) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.ch))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c$),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dt),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c_),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cZ),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bH),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cl),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dD),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bH),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::after',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::before',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dt),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b0),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cV),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cl),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b6),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cm),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dd),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dc),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dD),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.z),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.K),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cO),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dP),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dG),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dK),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dM),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dL),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dO),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.co),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dF),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dH),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c3),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dz),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dW),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dW),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dz)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dQ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dI),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aR),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dE),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dN),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dJ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.ch + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.ch + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.z) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.z) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aI) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $mdgriffith$elm_ui$Internal$Style$Intermediate = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {aH: closing, o: _List_Nil, Q: _List_Nil, A: selector};
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								Q: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.Q)
							});
					case 3:
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								o: A2(
									$elm$core$List$cons,
									{aH: '\n}', o: _List_Nil, Q: props, A: '@supports (' + (prop + (':' + (value + (') {' + parent.A))))},
									rendered.o)
							});
					case 5:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								o: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.A + (' + ' + selector), ''),
										adjRules),
									rendered.o)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								o: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.A + (' > ' + child), ''),
										childRules),
									rendered.o)
							});
					case 2:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								o: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.A + (' ' + child), ''),
										childRules),
									rendered.o)
							});
					case 4:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								o: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.A, descriptor),
											''),
										descriptorRules),
									rendered.o)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								o: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.A, ''),
										batched),
									rendered.o)
							});
				}
			});
		return A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.Q;
		if (!_v2.b) {
			return '';
		} else {
			return rule.A + ('{' + (renderValues(rule.Q) + (rule.aH + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.o)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.c8;
	switch (_v0) {
		case 0:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 1:
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 0:
			return 'serif';
		case 1:
			return 'sans-serif';
		case 2:
			return 'monospace';
		case 3:
			var name = font.a;
			return '\"' + (name + '\"');
		case 4:
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.da;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return name === 'smcp';
		case 1:
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.bZ);
	} else {
		return false;
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 1) {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo) {
				case 1:
					var _v2 = options.cR;
					switch (_v2) {
						case 0:
							return _List_Nil;
						case 2:
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 0:
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[selector + ('-fs:focus {' + (renderedProps + '\n}')), ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.ch + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'), (selector + '-fs:focus-within {') + (renderedProps + '\n}'), ('.focusable-parent:focus ~ ' + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + (selector + '-fs {'))))) + (renderedProps + '\n}')]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return '\"' + (name + '\"');
		case 1:
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.bZ)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 0:
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 13:
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 12:
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 2:
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 1:
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 3:
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 4:
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 5:
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.dt;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.z;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.be + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.bh;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.bH;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.bG;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.bg;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.K;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.ch;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 7:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromFloat(top) + ('px ' + ($elm$core$String$fromFloat(right) + ('px ' + ($elm$core$String$fromFloat(bottom) + ('px ' + ($elm$core$String$fromFloat(left) + 'px')))))))
						]));
			case 6:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 8:
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 0:
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 1:
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 1) {
										if (_v2.b.$ === 1) {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 1) {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 2:
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 1) {
										if (_v7.b.$ === 1) {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 1) {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 3:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.dw.a);
				var ySpacing = toGridLength(template.dw.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.dn)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.D)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.D)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.dw.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.dw.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.D)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.dn)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.D)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.dw.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.dw.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 9:
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.z) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.aO) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.cC) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.aT) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.z) + (' / ' + ($elm$core$String$fromInt(position.z + position.aO) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.cC) + (' / ' + ($elm$core$String$fromInt(position.cC + position.aT) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.z) + ('-' + ($elm$core$String$fromInt(position.cC) + ('-' + ($elm$core$String$fromInt(position.aT) + ('-' + $elm$core$String$fromInt(position.aO)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 11:
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((!_v12.a.$) && (!_v12.b.$)) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.dD + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.dD)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.du, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.cN, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.du + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.du))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.du + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.dD + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.du + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.dD)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {aO: height / size, am: size, b_: vertical};
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.cw, adjustment.ck, adjustment.cH, adjustment.c6]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.cH,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.ck,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.cw,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		cw: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		br: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.aO)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.b_) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.am) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 1) {
					if (face.$ === 5) {
						var _with = face.a;
						var _v2 = _with.b7;
						if (_v2.$ === 1) {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.br;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.cw;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 4) {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 1) {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 1) {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					aQ: _Utils_ap(
						rendered.aQ,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					aB: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 1) {
							return rendered.aB;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.aB);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{aQ: _List_Nil, aB: _List_Nil},
			stylesheet);
		var topLevel = _v0.aB;
		var rules = _v0.aQ;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.c8;
		switch (_v0) {
			case 0:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 1:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.cM)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.cM)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return keyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return unkeyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 0:
					return A2(createNode, 'div', attributes);
				case 1:
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dt))
									]))
							]));
			}
		}();
		switch (parentContext) {
			case 0:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.ch, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.aI, $mdgriffith$elm_ui$Internal$Style$classes.L, $mdgriffith$elm_ui$Internal$Style$classes.ce])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.ch, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.aI, $mdgriffith$elm_ui$Internal$Style$classes.L, $mdgriffith$elm_ui$Internal$Style$classes.cc])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.ch, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.aI, $mdgriffith$elm_ui$Internal$Style$classes.cd])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.ch, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.aI, $mdgriffith$elm_ui$Internal$Style$classes.cb])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.dD + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.bc + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.a_)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.ch + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.dD + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.bd + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.a$)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.cS, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.dA : _Utils_ap(styled.dA, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.cS, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.dA : _Utils_ap(styled.dA, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.cS, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.dA : _Utils_ap(styled.dA, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.cS, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.dA : _Utils_ap(styled.dA, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 1) {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.dA : _Utils_ap(rendered.dA, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.Z,
						rendered.aa,
						rendered.T,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.U)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						cS: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.Z,
							rendered.aa,
							rendered.T,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.U))),
						dA: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.dA : _Utils_ap(rendered.dA, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.Z,
						rendered.aa,
						rendered.T,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.U)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						cS: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.Z,
							rendered.aa,
							rendered.T,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.U))),
						dA: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 10, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location) {
							case 0:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.al, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.b6]));
							case 1:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.al, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.cm]));
							case 2:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.al, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.dd]));
							case 3:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.al, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.dc]));
							case 4:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.al, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.cV]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.al, $mdgriffith$elm_ui$Internal$Style$classes.dt, $mdgriffith$elm_ui$Internal$Style$classes.cl]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 3:
							return $elm$virtual_dom$VirtualDom$text('');
						case 2:
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 0:
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.cS, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 0:
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 1:
				var existingBehind = existing.a;
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 2:
				var existingInFront = existing.a;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.aV + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bg);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.aV + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bh);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.aV + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.b9);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.aW + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cf);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.aW + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.b8);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.aW + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ca);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 0:
				switch (component.$) {
					case 0:
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 1:
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 2:
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 1:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 1:
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 2:
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 1:
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 2:
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 3:
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 4:
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 0:
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.bs + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.a_,
				_List_Nil);
		case 2:
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.a$,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.bt + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.ch + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.K + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 0:
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.b0 + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.bc,
				_List_Nil);
		case 2:
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.bd,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.b1 + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.ch + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.z + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 3) {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 2:
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 7:
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 1) {
					return {
						T: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						U: children,
						Z: has,
						aa: node,
						dA: styles
					};
				} else {
					var _class = _v1.a;
					return {
						T: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						U: children,
						Z: has,
						aa: node,
						dA: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 0:
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 3:
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 1:
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 4:
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 10:
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 7:
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 0:
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.b0 + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bc),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bd),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.b1 + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.ch + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.z + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 8:
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 0:
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.bs + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.a_ + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.a$ + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.bt + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.ch + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.K + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 2:
						var description = attribute.a;
						switch (description.$) {
							case 0:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 1:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 2:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 3:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 4:
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 9:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 8:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 5:
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 6:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 9:
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 3:
									return styles;
								case 2:
									var str = elem.a;
									return styles;
								case 0:
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.dA);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 6:
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
var $mdgriffith$elm_ui$Internal$Model$Layout = 0;
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	cj: $elm$core$Maybe$Nothing,
	cp: $elm$core$Maybe$Nothing,
	ds: $elm$core$Maybe$Just(
		{
			ai: 0,
			aj: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			bE: _Utils_Tuple2(0, 0),
			am: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _v4 = record.cR;
					if (_v4.$ === 1) {
						return _Utils_update(
							record,
							{
								cR: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _v5 = record.cM;
					if (_v5.$ === 1) {
						return _Utils_update(
							record,
							{
								cM: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.c8;
					if (_v6.$ === 1) {
						return _Utils_update(
							record,
							{
								c8: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			cM: function () {
				var _v0 = record.cM;
				if (_v0.$ === 1) {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			cR: function () {
				var _v1 = record.cR;
				if (_v1.$ === 1) {
					return 1;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			c8: function () {
				var _v2 = record.c8;
				if (_v2.$ === 1) {
					return 0;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{cM: $elm$core$Maybe$Nothing, cR: $elm$core$Maybe$Nothing, c8: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 1:
				var styles = el.a.dA;
				var html = el.a.cS;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 2:
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.c8;
			if (_v0 === 1) {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $elm$core$String$words = _String_words;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 4:
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.da;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.dh;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.dm, $mdgriffith$elm_ui$Internal$Style$classes.ch, $mdgriffith$elm_ui$Internal$Style$classes.dt]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 3};
var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 8, a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 1};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Element$fromRgb255 = function (clr) {
	return A4($mdgriffith$elm_ui$Internal$Model$Rgba, clr.ay / 255, clr.aw / 255, clr.at / 255, clr.as);
};
var $author$project$Main$imperfectWhite = $mdgriffith$elm_ui$Element$fromRgb255(
	{as: 1, at: 254, aw: 254, ay: 254});
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 7, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Element$paddingXY = F2(
	function (x, y) {
		if (_Utils_eq(x, y)) {
			var f = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + $elm$core$String$fromInt(x),
					f,
					f,
					f,
					f));
		} else {
			var yFloat = y;
			var xFloat = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
					yFloat,
					xFloat,
					yFloat,
					xFloat));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsRow = 0;
var $mdgriffith$elm_ui$Internal$Model$asRow = 0;
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.av + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.L)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Right = 2;
var $mdgriffith$elm_ui$Element$alignRight = $mdgriffith$elm_ui$Internal$Model$AlignX(2);
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Top = 0;
var $mdgriffith$elm_ui$Element$alignTop = $mdgriffith$elm_ui$Internal$Model$AlignY(0);
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$overflow = $mdgriffith$elm_ui$Internal$Flag$flag(20);
var $mdgriffith$elm_ui$Element$clipY = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.cB);
var $mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
var $mdgriffith$elm_ui$Internal$Model$asColumn = 1;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cD + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.av)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $author$project$Main$dirtyWhite = $mdgriffith$elm_ui$Element$fromRgb255(
	{as: 1, at: 230, aw: 230, ay: 230});
var $mdgriffith$elm_ui$Element$padding = function (x) {
	var f = x;
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(x),
			f,
			f,
			f,
			f));
};
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Element$scrollbarX = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.dp);
var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var $mdgriffith$elm_ui$Element$Font$family = function (families) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontFamily,
		A2(
			$mdgriffith$elm_ui$Internal$Model$FontFamily,
			A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var $author$project$Main$imperfectBlack = $mdgriffith$elm_ui$Element$fromRgb255(
	{as: 1, at: 34, aw: 34, ay: 34});
var $mdgriffith$elm_ui$Element$Font$sansSerif = $mdgriffith$elm_ui$Internal$Model$SansSerif;
var $mdgriffith$elm_ui$Element$Font$typeface = $mdgriffith$elm_ui$Internal$Model$Typeface;
var $author$project$Main$lato = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Font$typeface('Lato'),
		$mdgriffith$elm_ui$Element$Font$sansSerif
	]);
var $mdgriffith$elm_ui$Element$Font$size = function (i) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontSize,
		$mdgriffith$elm_ui$Internal$Model$FontSize(i));
};
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $author$project$Hexadecimal$decimalRemove0 = function (decimal) {
	var leftMostDigit = decimal.c;
	var otherDigits = decimal.b;
	var _v0 = _Utils_Tuple2(leftMostDigit, otherDigits);
	if ((!_v0.a) && _v0.b.b) {
		var _v1 = _v0.b;
		var singletonDigit = _v1.a;
		var remainingDigits = _v1.b;
		return $author$project$Hexadecimal$decimalRemove0(
			A2($author$project$Hexadecimal$Decimal, singletonDigit, remainingDigits));
	} else {
		return decimal;
	}
};
var $author$project$Hexadecimal$decimalToString = function (decimal) {
	var normal = $author$project$Hexadecimal$decimalRemove0(decimal);
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			$elm$core$String$fromInt,
			A2($elm$core$List$cons, normal.c, normal.b)));
};
var $author$project$Hexadecimal$toStringDecimal = function (hexadecimal) {
	return $author$project$Hexadecimal$decimalToString(
		$author$project$Hexadecimal$toDecimal(hexadecimal));
};
var $author$project$Hexadecimal$toStringToken = function (hexadecimal) {
	var numbers = A2(
		$elm$core$String$dropRight,
		12,
		$author$project$Hexadecimal$toStringDecimal(hexadecimal));
	var whole = A2($elm$core$String$dropRight, 6, numbers);
	var fraction = A2($elm$core$String$right, 6, numbers);
	return ((whole === '') && (fraction === '000000')) ? '0' : ((fraction === '000000') ? whole : ((whole === '') ? ('0.' + fraction) : (whole + ('.' + fraction))));
};
var $author$project$Data$fromUnsignedIntegerToToken = function (_v0) {
	var hexadecimal = _v0;
	return $author$project$Hexadecimal$toStringToken(hexadecimal);
};
var $author$project$Main$unsignedIntegerToString = function (resultCollateral) {
	return $elm$core$Result$toMaybe(
		A2($elm$core$Result$map, $author$project$Data$fromUnsignedIntegerToToken, resultCollateral));
};
var $author$project$Main$viewDepositAmount = function (deposit) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$spacing(10),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
				$mdgriffith$elm_ui$Element$Font$size(24),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text(
				A2(
					$elm$core$Maybe$withDefault,
					'',
					$author$project$Main$unsignedIntegerToString(
						$elm$core$Result$Ok(deposit)))),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$alignRight]),
				$mdgriffith$elm_ui$Element$text('DAI'))
			]));
};
var $author$project$Main$gray = $mdgriffith$elm_ui$Element$fromRgb255(
	{as: 1, at: 152, aw: 152, ay: 152});
var $author$project$Main$viewDepositInformation = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$spacing(10),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
			$mdgriffith$elm_ui$Element$Font$size(12),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	$mdgriffith$elm_ui$Element$text('Max Return'));
var $author$project$Main$viewDeposit = function (deposit) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding(5),
				$mdgriffith$elm_ui$Element$spacing(10),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
				$mdgriffith$elm_ui$Element$Font$size(24),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		_List_fromArray(
			[
				$author$project$Main$viewDepositInformation,
				$author$project$Main$viewDepositAmount(deposit)
			]));
};
var $author$project$Main$viewDepositClaimAmount = F3(
	function (insurance, collateralBalance, totalPoolInsurance) {
		var resultTotalPoolInsurance = $author$project$Data$toBigInt(totalPoolInsurance);
		var resultInsurance = $author$project$Data$toBigInt(insurance);
		var resultCollateralBalance = $author$project$Data$toBigInt(collateralBalance);
		var maximumClaim = A2(
			$elm$core$Result$withDefault,
			'',
			A2(
				$elm$core$Result$map,
				$author$project$Main$roundDownString,
				A2(
					$elm$core$Result$andThen,
					$author$project$Main$fromBigIntToToken,
					A3(
						$author$project$Utility$andThen2,
						$author$project$Main$divBy,
						resultTotalPoolInsurance,
						A3($author$project$Utility$andThen2, $author$project$Main$mulBy, resultCollateralBalance, resultInsurance)))));
		return A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
					$mdgriffith$elm_ui$Element$Font$size(24),
					$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
				]),
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$text(maximumClaim),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[$mdgriffith$elm_ui$Element$alignRight]),
					$mdgriffith$elm_ui$Element$text('FILE'))
				]));
	});
var $author$project$Main$viewDepositInsuranceAmount = function (insurance) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$spacing(10),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
				$mdgriffith$elm_ui$Element$Font$size(12),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		$mdgriffith$elm_ui$Element$text(
			'Current Max Claim with ' + (A2(
				$elm$core$Maybe$withDefault,
				'',
				$author$project$Main$unsignedIntegerToString(
					$elm$core$Result$Ok(insurance))) + ' Insurance')));
};
var $author$project$Main$viewDepositInsurance = F3(
	function (insurance, collateralBalance, totalPoolInsurance) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$padding(5),
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
					$mdgriffith$elm_ui$Element$Font$size(24),
					$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
				]),
			_List_fromArray(
				[
					$author$project$Main$viewDepositInsuranceAmount(insurance),
					A3($author$project$Main$viewDepositClaimAmount, insurance, collateralBalance, totalPoolInsurance)
				]));
	});
var $author$project$Main$viewDepositBox = F3(
	function (_v0, collateralBalance, totalPoolDeposit) {
		var deposit = _v0.cG;
		var insurance = _v0.c1;
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$padding(20),
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Main$imperfectWhite),
					$mdgriffith$elm_ui$Element$Border$rounded(30)
				]),
			_List_fromArray(
				[
					$author$project$Main$viewDeposit(deposit),
					A3($author$project$Main$viewDepositInsurance, insurance, collateralBalance, totalPoolDeposit.c1)
				]));
	});
var $mdgriffith$elm_ui$Internal$Flag$fontAlignment = $mdgriffith$elm_ui$Internal$Flag$flag(12);
var $mdgriffith$elm_ui$Element$Font$center = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontAlignment, $mdgriffith$elm_ui$Internal$Style$classes.dE);
var $author$project$Main$viewDepositMaturity = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
			$mdgriffith$elm_ui$Element$Font$size(12),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	$mdgriffith$elm_ui$Element$text('August 5, 2021'));
var $author$project$Main$blue = $mdgriffith$elm_ui$Element$fromRgb255(
	{as: 1, at: 241, aw: 158, ay: 0});
var $author$project$Main$viewDepositText = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Font$size(24),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	$mdgriffith$elm_ui$Element$text('Asset'));
var $author$project$Main$viewDepositTitle = A2(
	$mdgriffith$elm_ui$Element$column,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$spacing(5)
		]),
	_List_fromArray(
		[$author$project$Main$viewDepositText, $author$project$Main$viewDepositMaturity]));
var $author$project$Main$viewAsset = F3(
	function (maybeDeposit, maybeCollateralBalance, maybeTotalDeposit) {
		var _v0 = _Utils_Tuple3(maybeDeposit, maybeCollateralBalance, maybeTotalDeposit);
		if (((!_v0.a.$) && (!_v0.b.$)) && (!_v0.c.$)) {
			var deposit = _v0.a.a;
			var collateralBalance = _v0.b.a;
			var totalPoolDeposit = _v0.c.a;
			return (_Utils_eq(deposit.cG, $author$project$Data$unsignedIntegerZero) && _Utils_eq(deposit.c1, $author$project$Data$unsignedIntegerZero)) ? $mdgriffith$elm_ui$Element$none : A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width(
						$mdgriffith$elm_ui$Element$px(400)),
						$mdgriffith$elm_ui$Element$padding(20),
						$mdgriffith$elm_ui$Element$spacing(20),
						$mdgriffith$elm_ui$Element$alignRight,
						$mdgriffith$elm_ui$Element$alignTop,
						$mdgriffith$elm_ui$Element$Background$color($author$project$Main$dirtyWhite),
						$mdgriffith$elm_ui$Element$Border$rounded(30),
						$mdgriffith$elm_ui$Element$clipY,
						$mdgriffith$elm_ui$Element$scrollbarX
					]),
				_List_fromArray(
					[
						$author$project$Main$viewDepositTitle,
						A3($author$project$Main$viewDepositBox, deposit, collateralBalance, totalPoolDeposit)
					]));
		} else {
			return $mdgriffith$elm_ui$Element$none;
		}
	});
var $author$project$Main$viewAssetBox = F3(
	function (maybeDeposit, maybeCollateralBalance, maybeTotalDeposit) {
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			A3($author$project$Main$viewAsset, maybeDeposit, maybeCollateralBalance, maybeTotalDeposit));
	});
var $mdgriffith$elm_ui$Internal$Model$Left = 0;
var $mdgriffith$elm_ui$Element$alignLeft = $mdgriffith$elm_ui$Internal$Model$AlignX(0);
var $rtfeldman$elm_sorter_experiment$Internal$Dict$foldr = F3(
	function (f, acc, dict) {
		foldr:
		while (true) {
			if (!dict.$) {
				return acc;
			} else {
				var key = dict.c;
				var value = dict.d;
				var left = dict.e;
				var right = dict.f;
				var $temp$f = f,
					$temp$acc = A3(
					f,
					key,
					value,
					A3($rtfeldman$elm_sorter_experiment$Internal$Dict$foldr, f, acc, right)),
					$temp$dict = left;
				f = $temp$f;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldr;
			}
		}
	});
var $rtfeldman$elm_sorter_experiment$Sort$Dict$foldr = F3(
	function (f, acc, dict) {
		return A3($rtfeldman$elm_sorter_experiment$Internal$Dict$foldr, f, acc, dict);
	});
var $rtfeldman$elm_sorter_experiment$Sort$Dict$values = function (dict) {
	return A3(
		$rtfeldman$elm_sorter_experiment$Sort$Dict$foldr,
		F3(
			function (_v0, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Main$viewDebtMaturity = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
			$mdgriffith$elm_ui$Element$Font$size(12),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	$mdgriffith$elm_ui$Element$text('August 5, 2021'));
var $author$project$Main$viewDebtText = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Font$size(24),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	$mdgriffith$elm_ui$Element$text('Debt'));
var $author$project$Main$viewDebtTitle = A2(
	$mdgriffith$elm_ui$Element$column,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$spacing(5)
		]),
	_List_fromArray(
		[$author$project$Main$viewDebtText, $author$project$Main$viewDebtMaturity]));
var $author$project$Main$viewLoanAmount = function (loan) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$spacing(10),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
				$mdgriffith$elm_ui$Element$Font$size(24),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text(
				A2(
					$elm$core$Maybe$withDefault,
					'',
					$author$project$Main$unsignedIntegerToString(
						$elm$core$Result$Ok(loan)))),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$alignRight]),
				$mdgriffith$elm_ui$Element$text('DAI'))
			]));
};
var $author$project$Main$viewLoanDebtDetails = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
			$mdgriffith$elm_ui$Element$Font$size(12),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	$mdgriffith$elm_ui$Element$text('Debt'));
var $author$project$Main$viewLoan = function (loan) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding(5),
				$mdgriffith$elm_ui$Element$spacing(10),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
				$mdgriffith$elm_ui$Element$Font$size(24),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		_List_fromArray(
			[
				$author$project$Main$viewLoanDebtDetails,
				$author$project$Main$viewLoanAmount(loan)
			]));
};
var $author$project$Main$viewLoanCollateralAmount = function (collateral) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$spacing(10),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
				$mdgriffith$elm_ui$Element$Font$size(24),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text(
				A2(
					$elm$core$Maybe$withDefault,
					'',
					$author$project$Main$unsignedIntegerToString(
						$elm$core$Result$Ok(collateral)))),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$alignRight]),
				$mdgriffith$elm_ui$Element$text('FILE'))
			]));
};
var $author$project$Main$viewLoanCollateralDetails = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
			$mdgriffith$elm_ui$Element$Font$size(12),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	$mdgriffith$elm_ui$Element$text('Collateral Stake'));
var $author$project$Main$viewLoanCollateral = function (collateral) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding(5),
				$mdgriffith$elm_ui$Element$spacing(10),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
				$mdgriffith$elm_ui$Element$Font$size(24),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		_List_fromArray(
			[
				$author$project$Main$viewLoanCollateralDetails,
				$author$project$Main$viewLoanCollateralAmount(collateral)
			]));
};
var $author$project$Main$viewLoanBox = function (_v0) {
	var loan = _v0.c5;
	var collateral = _v0.bl;
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding(20),
				$mdgriffith$elm_ui$Element$spacing(10),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Main$imperfectWhite),
				$mdgriffith$elm_ui$Element$Border$rounded(30)
			]),
		_List_fromArray(
			[
				$author$project$Main$viewLoan(loan),
				$author$project$Main$viewLoanCollateral(collateral)
			]));
};
var $author$project$Main$viewLiability = function (dictionaryLoan) {
	return _Utils_eq(
		dictionaryLoan,
		$rtfeldman$elm_sorter_experiment$Sort$Dict$empty($author$project$Data$sorter)) ? $mdgriffith$elm_ui$Element$none : A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(400)),
				$mdgriffith$elm_ui$Element$padding(20),
				$mdgriffith$elm_ui$Element$spacing(20),
				$mdgriffith$elm_ui$Element$alignLeft,
				$mdgriffith$elm_ui$Element$alignTop,
				$mdgriffith$elm_ui$Element$Background$color($author$project$Main$dirtyWhite),
				$mdgriffith$elm_ui$Element$Border$rounded(30),
				$mdgriffith$elm_ui$Element$clipY,
				$mdgriffith$elm_ui$Element$scrollbarX
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Main$viewDebtTitle,
			A2(
				$elm$core$List$map,
				$author$project$Main$viewLoanBox,
				$elm$core$List$reverse(
					$rtfeldman$elm_sorter_experiment$Sort$Dict$values(dictionaryLoan)))));
};
var $author$project$Main$viewLiabilityBox = function (dictionaryLoan) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		$author$project$Main$viewLiability(dictionaryLoan));
};
var $mdgriffith$elm_ui$Internal$Model$CenterX = 1;
var $mdgriffith$elm_ui$Element$centerX = $mdgriffith$elm_ui$Internal$Model$AlignX(1);
var $author$project$Main$Approve = {$: 17};
var $mdgriffith$elm_ui$Internal$Model$Button = {$: 8};
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 4) && (attr.b.$ === 11)) && (!attr.b.a)) {
		var _v1 = attr.b;
		var _v2 = _v1.a;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $mdgriffith$elm_ui$Element$Input$onKey = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _Utils_eq(code, desiredCode) ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('Not the enter key');
		};
		var isKey = A2(
			$elm$json$Json$Decode$andThen,
			decode,
			A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
		return $mdgriffith$elm_ui$Internal$Model$Attr(
			A2(
				$elm$html$Html$Events$preventDefaultOn,
				'keyup',
				A2(
					$elm$json$Json$Decode$map,
					function (fired) {
						return _Utils_Tuple2(fired, true);
					},
					isKey)));
	});
var $mdgriffith$elm_ui$Element$Input$onEnter = function (msg) {
	return A2($mdgriffith$elm_ui$Element$Input$onKey, $mdgriffith$elm_ui$Element$Input$enter, msg);
};
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cE);
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _v0) {
		var onPress = _v0.k;
		var label = _v0.a0;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aK + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.L + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.dr + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bD)))))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$pointer,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											$elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 1) {
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$Attr(
														$elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														$elm$core$List$cons,
														$mdgriffith$elm_ui$Element$Input$onEnter(msg),
														attrs));
											}
										}()))))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $author$project$Main$viewApproveButton = function (approved) {
	if (!approved.$) {
		if (!approved.a) {
			var _v1 = approved.a;
			return $mdgriffith$elm_ui$Element$none;
		} else {
			var _v2 = approved.a;
			return A2(
				$mdgriffith$elm_ui$Element$Input$button,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$padding(12),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
						$mdgriffith$elm_ui$Element$Border$rounded(30),
						$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
						$mdgriffith$elm_ui$Element$Font$size(24),
						$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
						$mdgriffith$elm_ui$Element$Font$center
					]),
				{
					a0: $mdgriffith$elm_ui$Element$text('Approve'),
					k: $elm$core$Maybe$Just($author$project$Main$Approve)
				});
		}
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $author$project$Main$viewBorrowTabChosen = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Font$size(24),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	{
		a0: $mdgriffith$elm_ui$Element$text('Borrow'),
		k: $elm$core$Maybe$Nothing
	});
var $author$project$Main$SwitchToLend = {$: 7};
var $author$project$Main$viewLendTab = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
			$mdgriffith$elm_ui$Element$Font$size(24),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	{
		a0: $mdgriffith$elm_ui$Element$text('Lend'),
		k: $elm$core$Maybe$Just($author$project$Main$SwitchToLend)
	});
var $author$project$Main$viewBorrowTabs = A2(
	$mdgriffith$elm_ui$Element$row,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$padding(10),
			$mdgriffith$elm_ui$Element$Background$color($author$project$Main$dirtyWhite)
		]),
	_List_fromArray(
		[$author$project$Main$viewLendTab, $author$project$Main$viewBorrowTabChosen]));
var $author$project$Main$ChangeCollateralAmount = function (a) {
	return {$: 11, a: a};
};
var $author$project$Main$getCollateralDetails = F2(
	function (token, maybeReserve) {
		return $elm$core$Result$toMaybe(
			A2(
				$elm$core$Result$map,
				$author$project$Main$roundDownString,
				A2(
					$elm$core$Result$andThen,
					$author$project$Main$fromBigIntToToken,
					A3(
						$author$project$Utility$andThen2,
						$author$project$Main$getCollateralMin,
						$author$project$Main$fromTokenToBigInt(token),
						A2($elm$core$Result$fromMaybe, 'No reserve', maybeReserve)))));
	});
var $mdgriffith$elm_ui$Element$Input$HiddenLabel = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Element$Input$labelHidden = $mdgriffith$elm_ui$Element$Input$HiddenLabel;
var $mdgriffith$elm_ui$Element$Input$TextInputNode = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Element$Input$TextArea = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$LivePolite = {$: 6};
var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
var $mdgriffith$elm_ui$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		if (label.$ === 1) {
			var labelText = label.a;
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asColumn,
				$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
				attrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[input])));
		} else {
			var position = label.a;
			var labelAttrs = label.b;
			var labelChild = label.c;
			var labelElement = A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				labelAttrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[labelChild])));
			switch (position) {
				case 2:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aP),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
				case 3:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aP),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				case 0:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aP),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				default:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aP),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
			}
		}
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $mdgriffith$elm_ui$Element$Input$autofill = A2(
	$elm$core$Basics$composeL,
	$mdgriffith$elm_ui$Internal$Model$Attr,
	$elm$html$Html$Attributes$attribute('autocomplete'));
var $mdgriffith$elm_ui$Internal$Model$Behind = 5;
var $mdgriffith$elm_ui$Element$behindContent = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, 5, element);
};
var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
var $mdgriffith$elm_ui$Element$moveUp = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(-y));
};
var $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding = function (attrs) {
	var gatherSpacing = F2(
		function (attr, found) {
			if ((attr.$ === 4) && (attr.b.$ === 5)) {
				var _v2 = attr.b;
				var x = _v2.b;
				var y = _v2.c;
				if (found.$ === 1) {
					return $elm$core$Maybe$Just(y);
				} else {
					return found;
				}
			} else {
				return found;
			}
		});
	var _v0 = A3($elm$core$List$foldr, gatherSpacing, $elm$core$Maybe$Nothing, attrs);
	if (_v0.$ === 1) {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	} else {
		var vSpace = _v0.a;
		return $mdgriffith$elm_ui$Element$moveUp(
			$elm$core$Basics$floor(vSpace / 2));
	}
};
var $mdgriffith$elm_ui$Element$clip = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.cz);
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Element$Input$darkGrey = A3($mdgriffith$elm_ui$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var $mdgriffith$elm_ui$Element$Input$defaultTextPadding = A2($mdgriffith$elm_ui$Element$paddingXY, 12, 12);
var $mdgriffith$elm_ui$Element$Input$white = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 6, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + $elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var $mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Input$defaultTextPadding,
		$mdgriffith$elm_ui$Element$Border$rounded(3),
		$mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$Input$darkGrey),
		$mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
		$mdgriffith$elm_ui$Element$Border$width(1),
		$mdgriffith$elm_ui$Element$spacing(5),
		$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
		$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink)
	]);
var $mdgriffith$elm_ui$Element$Input$getHeight = function (attr) {
	if (attr.$ === 8) {
		var h = attr.a;
		return $elm$core$Maybe$Just(h);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
	if (label.$ === 1) {
		var textLabel = label.a;
		return $mdgriffith$elm_ui$Internal$Model$Describe(
			$mdgriffith$elm_ui$Internal$Model$Label(textLabel));
	} else {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	}
};
var $mdgriffith$elm_ui$Element$Input$isConstrained = function (len) {
	isConstrained:
	while (true) {
		switch (len.$) {
			case 1:
				return false;
			case 0:
				return true;
			case 2:
				return true;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isConstrained;
			default:
				var l = len.b;
				return true;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
	if (label.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$isStacked = function (label) {
	if (!label.$) {
		var loc = label.a;
		switch (loc) {
			case 0:
				return false;
			case 1:
				return false;
			case 2:
				return true;
			default:
				return true;
		}
	} else {
		return true;
	}
};
var $mdgriffith$elm_ui$Element$Input$negateBox = function (box) {
	return {ct: -box.ct, c4: -box.c4, dl: -box.dl, dT: -box.dT};
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $mdgriffith$elm_ui$Internal$Model$paddingName = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left)))))));
	});
var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
	var top = _v0.dT;
	var right = _v0.dl;
	var bottom = _v0.ct;
	var left = _v0.c4;
	if (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) {
		var topFloat = top;
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				'p-' + $elm$core$String$fromInt(top),
				topFloat,
				topFloat,
				topFloat,
				topFloat));
	} else {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				A4($mdgriffith$elm_ui$Internal$Model$paddingName, top, right, bottom, left),
				top,
				right,
				bottom,
				left));
	}
};
var $mdgriffith$elm_ui$Element$htmlAttribute = $mdgriffith$elm_ui$Internal$Model$Attr;
var $mdgriffith$elm_ui$Element$Input$isFill = function (len) {
	isFill:
	while (true) {
		switch (len.$) {
			case 2:
				return true;
			case 1:
				return false;
			case 0:
				return false;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isPixel = function (len) {
	isPixel:
	while (true) {
		switch (len.$) {
			case 1:
				return false;
			case 0:
				return true;
			case 2:
				return false;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
		}
	}
};
var $mdgriffith$elm_ui$Internal$Model$paddingNameFloat = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(top) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(right) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(bottom) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(left)))))));
	});
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $mdgriffith$elm_ui$Element$Input$redistributeOver = F4(
	function (isMultiline, stacked, attr, els) {
		switch (attr.$) {
			case 9:
				return _Utils_update(
					els,
					{
						f: A2($elm$core$List$cons, attr, els.f)
					});
			case 7:
				var width = attr.a;
				return $mdgriffith$elm_ui$Element$Input$isFill(width) ? _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h),
						n: A2($elm$core$List$cons, attr, els.n),
						f: A2($elm$core$List$cons, attr, els.f)
					}) : (stacked ? _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h)
					}) : _Utils_update(
					els,
					{
						f: A2($elm$core$List$cons, attr, els.f)
					}));
			case 8:
				var height = attr.a;
				return (!stacked) ? _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h),
						f: A2($elm$core$List$cons, attr, els.f)
					}) : ($mdgriffith$elm_ui$Element$Input$isFill(height) ? _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h),
						f: A2($elm$core$List$cons, attr, els.f)
					}) : ($mdgriffith$elm_ui$Element$Input$isPixel(height) ? _Utils_update(
					els,
					{
						f: A2($elm$core$List$cons, attr, els.f)
					}) : _Utils_update(
					els,
					{
						f: A2($elm$core$List$cons, attr, els.f)
					})));
			case 6:
				return _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h)
					});
			case 5:
				return _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h)
					});
			case 4:
				switch (attr.b.$) {
					case 5:
						var _v1 = attr.b;
						return _Utils_update(
							els,
							{
								h: A2($elm$core$List$cons, attr, els.h),
								n: A2($elm$core$List$cons, attr, els.n),
								f: A2($elm$core$List$cons, attr, els.f),
								aq: A2($elm$core$List$cons, attr, els.aq)
							});
					case 7:
						var cls = attr.a;
						var _v2 = attr.b;
						var pad = _v2.a;
						var t = _v2.b;
						var r = _v2.c;
						var b = _v2.d;
						var l = _v2.e;
						if (isMultiline) {
							return _Utils_update(
								els,
								{
									s: A2($elm$core$List$cons, attr, els.s),
									f: A2($elm$core$List$cons, attr, els.f)
								});
						} else {
							var newTop = t - A2($elm$core$Basics$min, t, b);
							var newLineHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'line-height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newBottom = b - A2($elm$core$Basics$min, t, b);
							var reducedVerticalPadding = A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$padding,
								A5(
									$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
									A4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat, newTop, r, newBottom, l),
									newTop,
									r,
									newBottom,
									l));
							return _Utils_update(
								els,
								{
									s: A2($elm$core$List$cons, attr, els.s),
									n: A2(
										$elm$core$List$cons,
										newHeight,
										A2($elm$core$List$cons, newLineHeight, els.n)),
									f: A2($elm$core$List$cons, reducedVerticalPadding, els.f)
								});
						}
					case 6:
						var _v3 = attr.b;
						return _Utils_update(
							els,
							{
								s: A2($elm$core$List$cons, attr, els.s),
								f: A2($elm$core$List$cons, attr, els.f)
							});
					case 10:
						return _Utils_update(
							els,
							{
								s: A2($elm$core$List$cons, attr, els.s),
								f: A2($elm$core$List$cons, attr, els.f)
							});
					case 2:
						return _Utils_update(
							els,
							{
								h: A2($elm$core$List$cons, attr, els.h)
							});
					case 1:
						var _v4 = attr.b;
						return _Utils_update(
							els,
							{
								h: A2($elm$core$List$cons, attr, els.h)
							});
					default:
						var flag = attr.a;
						var cls = attr.b;
						return _Utils_update(
							els,
							{
								f: A2($elm$core$List$cons, attr, els.f)
							});
				}
			case 0:
				return els;
			case 1:
				var a = attr.a;
				return _Utils_update(
					els,
					{
						n: A2($elm$core$List$cons, attr, els.n)
					});
			case 2:
				return _Utils_update(
					els,
					{
						n: A2($elm$core$List$cons, attr, els.n)
					});
			case 3:
				return _Utils_update(
					els,
					{
						f: A2($elm$core$List$cons, attr, els.f)
					});
			default:
				return _Utils_update(
					els,
					{
						n: A2($elm$core$List$cons, attr, els.n)
					});
		}
	});
var $mdgriffith$elm_ui$Element$Input$redistribute = F3(
	function (isMultiline, stacked, attrs) {
		return function (redist) {
			return {
				s: $elm$core$List$reverse(redist.s),
				h: $elm$core$List$reverse(redist.h),
				n: $elm$core$List$reverse(redist.n),
				f: $elm$core$List$reverse(redist.f),
				aq: $elm$core$List$reverse(redist.aq)
			};
		}(
			A3(
				$elm$core$List$foldl,
				A2($mdgriffith$elm_ui$Element$Input$redistributeOver, isMultiline, stacked),
				{s: _List_Nil, h: _List_Nil, n: _List_Nil, f: _List_Nil, aq: _List_Nil},
				attrs));
	});
var $mdgriffith$elm_ui$Element$Input$renderBox = function (_v0) {
	var top = _v0.dT;
	var right = _v0.dl;
	var bottom = _v0.ct;
	var left = _v0.c4;
	return $elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px'))))));
};
var $mdgriffith$elm_ui$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
var $mdgriffith$elm_ui$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			$elm$core$Basics$min,
			1.0,
			A2($elm$core$Basics$max, 0.0, o)));
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2(
			$mdgriffith$elm_ui$Internal$Model$Transparency,
			'transparency-' + $mdgriffith$elm_ui$Internal$Model$floatClass(transparency),
			transparency));
};
var $mdgriffith$elm_ui$Element$Input$charcoal = A3($mdgriffith$elm_ui$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
var $mdgriffith$elm_ui$Element$Input$renderPlaceholder = F3(
	function (_v0, forPlaceholder, on) {
		var placeholderAttrs = _v0.a;
		var placeholderEl = _v0.b;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_Utils_ap(
				forPlaceholder,
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$Input$charcoal),
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bD + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dj)),
							$mdgriffith$elm_ui$Element$clip,
							$mdgriffith$elm_ui$Element$Border$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$Background$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$alpha(
							on ? 1 : 0)
						]),
					placeholderAttrs)),
			placeholderEl);
	});
var $mdgriffith$elm_ui$Element$scrollbarY = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.dq);
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $mdgriffith$elm_ui$Element$Input$spellcheck = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$spellcheck);
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $mdgriffith$elm_ui$Element$Input$value = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$value);
var $mdgriffith$elm_ui$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var withDefaults = _Utils_ap($mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle, attrs);
		var redistributed = A3(
			$mdgriffith$elm_ui$Element$Input$redistribute,
			_Utils_eq(textInput.q, $mdgriffith$elm_ui$Element$Input$TextArea),
			$mdgriffith$elm_ui$Element$Input$isStacked(textOptions.a0),
			withDefaults);
		var onlySpacing = function (attr) {
			if ((attr.$ === 4) && (attr.b.$ === 5)) {
				var _v9 = attr.b;
				return true;
			} else {
				return false;
			}
		};
		var heightConstrained = function () {
			var _v7 = textInput.q;
			if (!_v7.$) {
				var inputType = _v7.a;
				return false;
			} else {
				return A2(
					$elm$core$Maybe$withDefault,
					false,
					A2(
						$elm$core$Maybe$map,
						$mdgriffith$elm_ui$Element$Input$isConstrained,
						$elm$core$List$head(
							$elm$core$List$reverse(
								A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Element$Input$getHeight, withDefaults)))));
			}
		}();
		var getPadding = function (attr) {
			if ((attr.$ === 4) && (attr.b.$ === 7)) {
				var cls = attr.a;
				var _v6 = attr.b;
				var pad = _v6.a;
				var t = _v6.b;
				var r = _v6.c;
				var b = _v6.d;
				var l = _v6.e;
				return $elm$core$Maybe$Just(
					{
						ct: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(b - 3)),
						c4: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(l - 3)),
						dl: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(r - 3)),
						dT: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(t - 3))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var parentPadding = A2(
			$elm$core$Maybe$withDefault,
			{ct: 0, c4: 0, dl: 0, dT: 0},
			$elm$core$List$head(
				$elm$core$List$reverse(
					A2($elm$core$List$filterMap, getPadding, withDefaults))));
		var inputElement = A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			function () {
				var _v3 = textInput.q;
				if (!_v3.$) {
					var inputType = _v3.a;
					return $mdgriffith$elm_ui$Internal$Model$NodeName('input');
				} else {
					return $mdgriffith$elm_ui$Internal$Model$NodeName('textarea');
				}
			}(),
			_Utils_ap(
				function () {
					var _v4 = textInput.q;
					if (!_v4.$) {
						var inputType = _v4.a;
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$type_(inputType)),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c0)
							]);
					} else {
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$clip,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cY),
								$mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding(withDefaults),
								$mdgriffith$elm_ui$Element$paddingEach(parentPadding),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2(
									$elm$html$Html$Attributes$style,
									'margin',
									$mdgriffith$elm_ui$Element$Input$renderBox(
										$mdgriffith$elm_ui$Element$Input$negateBox(parentPadding)))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$style, 'box-sizing', 'content-box'))
							]);
					}
				}(),
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Input$value(textOptions.dD),
							$mdgriffith$elm_ui$Internal$Model$Attr(
							$elm$html$Html$Events$onInput(textOptions.a3)),
							$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(textOptions.a0),
							$mdgriffith$elm_ui$Element$Input$spellcheck(textInput.B),
							A2(
							$elm$core$Maybe$withDefault,
							$mdgriffith$elm_ui$Internal$Model$NoAttribute,
							A2($elm$core$Maybe$map, $mdgriffith$elm_ui$Element$Input$autofill, textInput.w))
						]),
					redistributed.n)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil));
		var wrappedInput = function () {
			var _v0 = textInput.q;
			if (_v0.$ === 1) {
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					_Utils_ap(
						(heightConstrained ? $elm$core$List$cons($mdgriffith$elm_ui$Element$scrollbarY) : $elm$core$Basics$identity)(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bp),
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c$)
								])),
						redistributed.f),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asParagraph,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Element$inFront(inputElement),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c_),
												redistributed.aq)))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(
									function () {
										if (textOptions.dD === '') {
											var _v1 = textOptions.a4;
											if (_v1.$ === 1) {
												return _List_fromArray(
													[
														$mdgriffith$elm_ui$Element$text('\u00A0')
													]);
											} else {
												var place = _v1.a;
												return _List_fromArray(
													[
														A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, _List_Nil, textOptions.dD === '')
													]);
											}
										} else {
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Internal$Model$unstyled(
													A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.cZ)
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(textOptions.dD + '\u00A0')
															])))
												]);
										}
									}()))
							])));
			} else {
				var inputType = _v0.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						A2(
							$elm$core$List$cons,
							A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bp),
							$elm$core$List$concat(
								_List_fromArray(
									[
										redistributed.f,
										function () {
										var _v2 = textOptions.a4;
										if (_v2.$ === 1) {
											return _List_Nil;
										} else {
											var place = _v2.a;
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Element$behindContent(
													A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, redistributed.s, textOptions.dD === ''))
												]);
										}
									}()
									])))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[inputElement])));
			}
		}();
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			A2(
				$elm$core$List$cons,
				A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cF),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(textOptions.a0) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(5),
					A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Region$announce, redistributed.h))),
			textOptions.a0,
			wrappedInput);
	});
var $mdgriffith$elm_ui$Element$Input$text = $mdgriffith$elm_ui$Element$Input$textHelper(
	{
		w: $elm$core$Maybe$Nothing,
		B: false,
		q: $mdgriffith$elm_ui$Element$Input$TextInputNode('text')
	});
var $mdgriffith$elm_ui$Element$Input$Placeholder = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$Input$placeholder = $mdgriffith$elm_ui$Element$Input$Placeholder;
var $author$project$Main$viewZeros = A2(
	$mdgriffith$elm_ui$Element$Input$placeholder,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
			$mdgriffith$elm_ui$Element$Font$size(24),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	$mdgriffith$elm_ui$Element$text('0.0'));
var $author$project$Main$viewInputNumber = F2(
	function (text, msg) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$text,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$padding(5),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Main$imperfectWhite),
					$mdgriffith$elm_ui$Element$Border$width(0),
					$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
					$mdgriffith$elm_ui$Element$Font$size(24),
					$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
				]),
			{
				a0: $mdgriffith$elm_ui$Element$Input$labelHidden('Input'),
				a3: msg,
				a4: $elm$core$Maybe$Just($author$project$Main$viewZeros),
				dD: text
			});
	});
var $mdgriffith$elm_ui$Internal$Model$Hover = 1;
var $mdgriffith$elm_ui$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$hover = $mdgriffith$elm_ui$Internal$Flag$flag(33);
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $mdgriffith$elm_ui$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 1:
				var styled = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						cS: F2(
							function (add, context) {
								return A2(
									$elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.cS, add, context));
							}),
						dA: styled.dA
					});
			case 0:
				var html = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A2(
						$elm$core$Basics$composeL,
						$elm$virtual_dom$VirtualDom$map(fn),
						html));
			case 2:
				var str = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Text(str);
			default:
				return $mdgriffith$elm_ui$Internal$Model$Empty;
		}
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
			case 2:
				var description = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Describe(description);
			case 6:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
			case 5:
				var y = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
			case 7:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Width(x);
			case 8:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Height(x);
			case 3:
				var x = attr.a;
				var y = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Class, x, y);
			case 4:
				var flag = attr.a;
				var style = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$StyleClass, flag, style);
			case 9:
				var location = attr.a;
				var elem = attr.b;
				return A2(
					$mdgriffith$elm_ui$Internal$Model$Nearby,
					location,
					A2($mdgriffith$elm_ui$Internal$Model$map, fn, elem));
			case 1:
				var htmlAttr = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			default:
				var fl = attr.a;
				var trans = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$TransformComponent, fl, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$removeNever = function (style) {
	return A2($mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle, $elm$core$Basics$never, style);
};
var $mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper = F2(
	function (attr, _v0) {
		var styles = _v0.a;
		var trans = _v0.b;
		var _v1 = $mdgriffith$elm_ui$Internal$Model$removeNever(attr);
		switch (_v1.$) {
			case 4:
				var style = _v1.b;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, style, styles),
					trans);
			case 10:
				var flag = _v1.a;
				var component = _v1.b;
				return _Utils_Tuple2(
					styles,
					A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, trans, component));
			default:
				return _Utils_Tuple2(styles, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$unwrapDecorations = function (attrs) {
	var _v0 = A3(
		$elm$core$List$foldl,
		$mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper,
		_Utils_Tuple2(_List_Nil, $mdgriffith$elm_ui$Internal$Model$Untransformed),
		attrs);
	var styles = _v0.a;
	var transform = _v0.b;
	return A2(
		$elm$core$List$cons,
		$mdgriffith$elm_ui$Internal$Model$Transform(transform),
		styles);
};
var $mdgriffith$elm_ui$Element$mouseOver = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$hover,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			1,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $author$project$Main$viewCurrency = function (currency) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$spacing(5),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
				$mdgriffith$elm_ui$Element$Font$size(24),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		$mdgriffith$elm_ui$Element$text(currency));
};
var $author$project$Main$viewTokenInput = function (string) {
	return A2(
		$mdgriffith$elm_ui$Element$Input$button,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding(5),
				$mdgriffith$elm_ui$Element$Border$rounded(30),
				$mdgriffith$elm_ui$Element$mouseOver(
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Background$color($author$project$Main$dirtyWhite)
					])),
				$mdgriffith$elm_ui$Element$alignRight
			]),
		{
			a0: $author$project$Main$viewCurrency(string),
			k: $elm$core$Maybe$Nothing
		});
};
var $author$project$Main$viewInput = F3(
	function (string, currency, msg) {
		return A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing(10)
				]),
			_List_fromArray(
				[
					A2($author$project$Main$viewInputNumber, string, msg),
					$author$project$Main$viewTokenInput(currency)
				]));
	});
var $author$project$Main$viewCollateralText = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$padding(5),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
			$mdgriffith$elm_ui$Element$Font$size(14),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	$mdgriffith$elm_ui$Element$text('Collateral'));
var $author$project$Main$viewMinimumCollateral = function (maybeLimit) {
	if (!maybeLimit.$) {
		var limit = maybeLimit.a;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$alignRight,
					$mdgriffith$elm_ui$Element$padding(5),
					$mdgriffith$elm_ui$Element$Border$rounded(30),
					$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
					$mdgriffith$elm_ui$Element$Font$size(14),
					$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
				]),
			$mdgriffith$elm_ui$Element$text('Min ' + limit));
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $author$project$Main$viewInputCollateralDetails = function (maybeLimit) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Main$viewCollateralText,
				$author$project$Main$viewMinimumCollateral(maybeLimit)
			]));
};
var $author$project$Main$viewCollateral = F3(
	function (token, collateral, maybeReserve) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$padding(20),
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Main$imperfectWhite),
					$mdgriffith$elm_ui$Element$Border$rounded(30)
				]),
			_List_fromArray(
				[
					$author$project$Main$viewInputCollateralDetails(
					A2($author$project$Main$getCollateralDetails, token, maybeReserve)),
					A3($author$project$Main$viewInput, collateral, 'FILE', $author$project$Main$ChangeCollateralAmount)
				]));
	});
var $author$project$Main$getInsuranceDetails = F2(
	function (token, maybeReserve) {
		return $elm$core$Result$toMaybe(
			A2(
				$elm$core$Result$map,
				$author$project$Main$roundDownString,
				A2(
					$elm$core$Result$andThen,
					$author$project$Main$fromBigIntToToken,
					A3(
						$author$project$Utility$andThen2,
						$author$project$Main$getCollateralMax,
						$author$project$Main$fromTokenToBigInt(token),
						A2($elm$core$Result$fromMaybe, 'No reserves', maybeReserve)))));
	});
var $author$project$Main$viewClaim = F3(
	function (collateral, maybeCollateralPoolBalance, maybeTotalDeposit) {
		var resultTotalInsurance = A2(
			$elm$core$Result$andThen,
			$author$project$Data$toBigInt,
			A2(
				$elm$core$Result$map,
				function ($) {
					return $.c1;
				},
				A2($elm$core$Result$fromMaybe, 'Empty', maybeTotalDeposit)));
		var resultCollateralPoolBalance = A2(
			$elm$core$Result$andThen,
			$author$project$Data$toBigInt,
			A2($elm$core$Result$fromMaybe, 'Empty', maybeCollateralPoolBalance));
		var resultCollateral = $author$project$Main$fromTokenToBigInt(collateral);
		var maxClaim = A2(
			$elm$core$Result$withDefault,
			'0.0',
			A2(
				$elm$core$Result$map,
				$author$project$Main$roundDownString,
				A2(
					$elm$core$Result$andThen,
					$author$project$Main$fromBigIntToToken,
					A3(
						$author$project$Utility$andThen2,
						$author$project$Main$divBy,
						resultTotalInsurance,
						A3($author$project$Utility$andThen2, $author$project$Main$mulBy, resultCollateralPoolBalance, resultCollateral)))));
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$padding(5),
					$mdgriffith$elm_ui$Element$Border$rounded(30),
					$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
					$mdgriffith$elm_ui$Element$Font$size(14),
					$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
				]),
			$mdgriffith$elm_ui$Element$text('Current Max Claim of ' + (maxClaim + ' FILE')));
	});
var $author$project$Main$viewInsuranceText = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$padding(5),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
			$mdgriffith$elm_ui$Element$Font$size(14),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	$mdgriffith$elm_ui$Element$text('Insurance'));
var $author$project$Main$viewMaximumInsurance = function (maybeLimit) {
	if (!maybeLimit.$) {
		var limit = maybeLimit.a;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$alignRight,
					$mdgriffith$elm_ui$Element$padding(5),
					$mdgriffith$elm_ui$Element$Border$rounded(30),
					$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
					$mdgriffith$elm_ui$Element$Font$size(14),
					$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
				]),
			$mdgriffith$elm_ui$Element$text('Max ' + limit));
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $author$project$Main$viewInputInsuranceDetails = function (maybeLimit) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Main$viewInsuranceText,
				$author$project$Main$viewMaximumInsurance(maybeLimit)
			]));
};
var $author$project$Main$SlideCollateralAmount = function (a) {
	return {$: 10, a: a};
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$active = $mdgriffith$elm_ui$Internal$Flag$flag(32);
var $mdgriffith$elm_ui$Internal$Flag$focus = $mdgriffith$elm_ui$Internal$Flag$flag(31);
var $mdgriffith$elm_ui$Internal$Model$getHeight = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (attr, acc) {
				if (!acc.$) {
					var x = acc.a;
					return $elm$core$Maybe$Just(x);
				} else {
					if (attr.$ === 8) {
						var len = attr.a;
						return $elm$core$Maybe$Just(len);
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}
			}),
		$elm$core$Maybe$Nothing,
		attrs);
};
var $mdgriffith$elm_ui$Internal$Model$getSpacing = F2(
	function (attrs, _default) {
		return A2(
			$elm$core$Maybe$withDefault,
			_default,
			A3(
				$elm$core$List$foldr,
				F2(
					function (attr, acc) {
						if (!acc.$) {
							var x = acc.a;
							return $elm$core$Maybe$Just(x);
						} else {
							if ((attr.$ === 4) && (attr.b.$ === 5)) {
								var _v2 = attr.b;
								var x = _v2.b;
								var y = _v2.c;
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(x, y));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}),
				$elm$core$Maybe$Nothing,
				attrs));
	});
var $mdgriffith$elm_ui$Internal$Model$getWidth = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (attr, acc) {
				if (!acc.$) {
					var x = acc.a;
					return $elm$core$Maybe$Just(x);
				} else {
					if (attr.$ === 7) {
						var len = attr.a;
						return $elm$core$Maybe$Just(len);
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}
			}),
		$elm$core$Maybe$Nothing,
		attrs);
};
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $mdgriffith$elm_ui$Element$spacingXY = F2(
	function (x, y) {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$spacing,
			A3(
				$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
				A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, y),
				x,
				y));
	});
var $elm$html$Html$Attributes$step = function (n) {
	return A2($elm$html$Html$Attributes$stringProperty, 'step', n);
};
var $elm$core$String$toFloat = _String_toFloat;
var $mdgriffith$elm_ui$Internal$Model$CenterY = 1;
var $mdgriffith$elm_ui$Element$centerY = $mdgriffith$elm_ui$Internal$Model$AlignY(1);
var $mdgriffith$elm_ui$Element$fillPortion = $mdgriffith$elm_ui$Internal$Model$Fill;
var $mdgriffith$elm_ui$Internal$Model$mapAttr = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
			case 2:
				var description = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Describe(description);
			case 6:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
			case 5:
				var y = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
			case 7:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Width(x);
			case 8:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Height(x);
			case 3:
				var x = attr.a;
				var y = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Class, x, y);
			case 4:
				var flag = attr.a;
				var style = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$StyleClass, flag, style);
			case 9:
				var location = attr.a;
				var elem = attr.b;
				return A2(
					$mdgriffith$elm_ui$Internal$Model$Nearby,
					location,
					A2($mdgriffith$elm_ui$Internal$Model$map, fn, elem));
			case 1:
				var htmlAttr = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			default:
				var fl = attr.a;
				var trans = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$TransformComponent, fl, trans);
		}
	});
var $mdgriffith$elm_ui$Element$Input$viewHorizontalThumb = F3(
	function (factor, thumbAttributes, trackHeight) {
		return A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height(
					A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackHeight)),
					$mdgriffith$elm_ui$Element$centerY
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$fillPortion(
								$elm$core$Basics$round(factor * 10000)))
						]),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$centerY,
						A2(
							$elm$core$List$map,
							$mdgriffith$elm_ui$Internal$Model$mapAttr($elm$core$Basics$never),
							thumbAttributes)),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$fillPortion(
								$elm$core$Basics$round(
									$elm$core$Basics$abs(1 - factor) * 10000)))
						]),
					$mdgriffith$elm_ui$Element$none)
				]));
	});
var $mdgriffith$elm_ui$Element$Input$viewVerticalThumb = F3(
	function (factor, thumbAttributes, trackWidth) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$width(
					A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth)),
					$mdgriffith$elm_ui$Element$centerX
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$height(
							$mdgriffith$elm_ui$Element$fillPortion(
								$elm$core$Basics$round(
									$elm$core$Basics$abs(1 - factor) * 10000)))
						]),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$centerX,
						A2(
							$elm$core$List$map,
							$mdgriffith$elm_ui$Internal$Model$mapAttr($elm$core$Basics$never),
							thumbAttributes)),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$height(
							$mdgriffith$elm_ui$Element$fillPortion(
								$elm$core$Basics$round(factor * 10000)))
						]),
					$mdgriffith$elm_ui$Element$none)
				]));
	});
var $mdgriffith$elm_ui$Element$Input$slider = F2(
	function (attributes, input) {
		var trackWidth = $mdgriffith$elm_ui$Internal$Model$getWidth(attributes);
		var trackHeight = $mdgriffith$elm_ui$Internal$Model$getHeight(attributes);
		var vertical = function () {
			var _v8 = _Utils_Tuple2(trackWidth, trackHeight);
			_v8$3:
			while (true) {
				if (_v8.a.$ === 1) {
					if (_v8.b.$ === 1) {
						var _v9 = _v8.a;
						var _v10 = _v8.b;
						return false;
					} else {
						break _v8$3;
					}
				} else {
					if ((!_v8.a.a.$) && (!_v8.b.$)) {
						switch (_v8.b.a.$) {
							case 0:
								var w = _v8.a.a.a;
								var h = _v8.b.a.a;
								return _Utils_cmp(h, w) > 0;
							case 2:
								return true;
							default:
								break _v8$3;
						}
					} else {
						break _v8$3;
					}
				}
			}
			return false;
		}();
		var factor = (input.e - input.bA) / (input.bz - input.bA);
		var _v0 = input.bW;
		var thumbAttributes = _v0;
		var height = $mdgriffith$elm_ui$Internal$Model$getHeight(thumbAttributes);
		var thumbHeightString = function () {
			if (height.$ === 1) {
				return '20px';
			} else {
				if (!height.a.$) {
					var px = height.a.a;
					return $elm$core$String$fromInt(px) + 'px';
				} else {
					return '100%';
				}
			}
		}();
		var width = $mdgriffith$elm_ui$Internal$Model$getWidth(thumbAttributes);
		var thumbWidthString = function () {
			if (width.$ === 1) {
				return '20px';
			} else {
				if (!width.a.$) {
					var px = width.a.a;
					return $elm$core$String$fromInt(px) + 'px';
				} else {
					return '100%';
				}
			}
		}();
		var className = 'thmb-' + (thumbWidthString + ('-' + thumbHeightString));
		var thumbShadowStyle = _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', thumbWidthString),
				A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', thumbHeightString)
			]);
		var _v1 = A2(
			$mdgriffith$elm_ui$Internal$Model$getSpacing,
			attributes,
			_Utils_Tuple2(5, 5));
		var spacingX = _v1.a;
		var spacingY = _v1.b;
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(input.a0) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : A2($mdgriffith$elm_ui$Element$spacingXY, spacingX, spacingY),
					$mdgriffith$elm_ui$Element$Region$announce,
					$mdgriffith$elm_ui$Element$width(
					function () {
						if (trackWidth.$ === 1) {
							return $mdgriffith$elm_ui$Element$fill;
						} else {
							if (!trackWidth.a.$) {
								return $mdgriffith$elm_ui$Element$shrink;
							} else {
								var x = trackWidth.a;
								return x;
							}
						}
					}()),
					$mdgriffith$elm_ui$Element$height(
					function () {
						if (trackHeight.$ === 1) {
							return $mdgriffith$elm_ui$Element$shrink;
						} else {
							if (!trackHeight.a.$) {
								return $mdgriffith$elm_ui$Element$shrink;
							} else {
								var x = trackHeight.a;
								return x;
							}
						}
					}())
				]),
			input.a0,
			A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width(
						A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth)),
						$mdgriffith$elm_ui$Element$height(
						A2(
							$elm$core$Maybe$withDefault,
							$mdgriffith$elm_ui$Element$px(20),
							trackHeight))
					]),
				_List_fromArray(
					[
						A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asEl,
						$mdgriffith$elm_ui$Internal$Model$NodeName('input'),
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(input.a0),
								A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$active,
								A2($mdgriffith$elm_ui$Internal$Model$Style, 'input[type=\"range\"].' + (className + '::-moz-range-thumb'), thumbShadowStyle)),
								A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$hover,
								A2($mdgriffith$elm_ui$Internal$Model$Style, 'input[type=\"range\"].' + (className + '::-webkit-slider-thumb'), thumbShadowStyle)),
								A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$focus,
								A2($mdgriffith$elm_ui$Internal$Model$Style, 'input[type=\"range\"].' + (className + '::-ms-thumb'), thumbShadowStyle)),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$class(className + ' focusable-parent')),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Events$onInput(
									function (str) {
										var _v4 = $elm$core$String$toFloat(str);
										if (_v4.$ === 1) {
											return input.a3(0);
										} else {
											var val = _v4.a;
											return input.a3(val);
										}
									})),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$type_('range')),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$step(
									function () {
										var _v5 = input.bT;
										if (_v5.$ === 1) {
											return 'any';
										} else {
											var step = _v5.a;
											return $elm$core$String$fromFloat(step);
										}
									}())),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$min(
									$elm$core$String$fromFloat(input.bA))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$max(
									$elm$core$String$fromFloat(input.bz))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$value(
									$elm$core$String$fromFloat(input.e))),
								vertical ? $mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$attribute, 'orient', 'vertical')) : $mdgriffith$elm_ui$Internal$Model$NoAttribute,
								$mdgriffith$elm_ui$Element$width(
								vertical ? A2(
									$elm$core$Maybe$withDefault,
									$mdgriffith$elm_ui$Element$px(20),
									trackHeight) : A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth)),
								$mdgriffith$elm_ui$Element$height(
								vertical ? A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth) : A2(
									$elm$core$Maybe$withDefault,
									$mdgriffith$elm_ui$Element$px(20),
									trackHeight))
							]),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil)),
						A2(
						$mdgriffith$elm_ui$Element$el,
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$width(
								A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth)),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$height(
									A2(
										$elm$core$Maybe$withDefault,
										$mdgriffith$elm_ui$Element$px(20),
										trackHeight)),
								_Utils_ap(
									attributes,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$behindContent(
											vertical ? A3($mdgriffith$elm_ui$Element$Input$viewVerticalThumb, factor, thumbAttributes, trackWidth) : A3($mdgriffith$elm_ui$Element$Input$viewHorizontalThumb, factor, thumbAttributes, trackHeight))
										])))),
						$mdgriffith$elm_ui$Element$none)
					])));
	});
var $mdgriffith$elm_ui$Element$Input$Thumb = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Element$Input$thumb = $elm$core$Basics$identity;
var $author$project$Main$viewThumbPercent = function (string) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$centerX,
				$mdgriffith$elm_ui$Element$centerY,
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
				$mdgriffith$elm_ui$Element$Font$size(12),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		$mdgriffith$elm_ui$Element$text(string));
};
var $author$project$Main$thumb = function (string) {
	return $mdgriffith$elm_ui$Element$Input$thumb(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(40)),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(20)),
				$mdgriffith$elm_ui$Element$inFront(
				$author$project$Main$viewThumbPercent(string)),
				$mdgriffith$elm_ui$Element$Border$rounded(20),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue)
			]));
};
var $author$project$Main$viewTrail = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$height(
			$mdgriffith$elm_ui$Element$px(10)),
			A2($mdgriffith$elm_ui$Element$paddingXY, 20, 0),
			$mdgriffith$elm_ui$Element$centerX,
			$mdgriffith$elm_ui$Element$centerY,
			$mdgriffith$elm_ui$Element$Border$rounded(10),
			$mdgriffith$elm_ui$Element$Background$color($author$project$Main$dirtyWhite)
		]),
	$mdgriffith$elm_ui$Element$none);
var $author$project$Main$viewSlider = F2(
	function (collateral, maybeLimit) {
		var value = function () {
			if (!maybeLimit.$) {
				var string = maybeLimit.a;
				return A2(
					$elm$core$Maybe$withDefault,
					0,
					A2(
						$elm$core$Maybe$map,
						$elm$core$Basics$toFloat,
						A2(
							$elm$core$Maybe$map,
							$elm$core$Basics$truncate,
							A2(
								$elm$core$Maybe$andThen,
								$elm$core$String$toFloat,
								$elm$core$Result$toMaybe(
									A2(
										$elm$core$Result$andThen,
										$author$project$Main$fromBigIntToToken,
										A3(
											$author$project$Utility$andThen2,
											$author$project$Main$divBy,
											$author$project$Main$fromTokenToBigInt(string),
											A3(
												$author$project$Utility$andThen2,
												$author$project$Main$mulBy,
												A2(
													$author$project$Main$mulBy,
													$cmditch$elm_bigint$BigInt$fromInt(100),
													$author$project$Main$quintillion),
												$author$project$Main$fromTokenToBigInt(collateral)))))))));
			} else {
				return 0;
			}
		}();
		var showThumb = ((value < 0) || (value > 100)) ? '' : ($elm$core$String$fromInt(value | 0) + '%');
		return A2(
			$mdgriffith$elm_ui$Element$Input$slider,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$behindContent($author$project$Main$viewTrail)
				]),
			{
				a0: $mdgriffith$elm_ui$Element$Input$labelHidden('Slider'),
				bz: 100,
				bA: 0,
				a3: $author$project$Main$SlideCollateralAmount,
				bT: $elm$core$Maybe$Just(1),
				bW: $author$project$Main$thumb(showThumb),
				e: value
			});
	});
var $author$project$Main$viewInsurance = F5(
	function (token, collateral, maybeReserve, maybeCollateralPoolBalance, maybeTotalDeposit) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$padding(20),
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Main$imperfectWhite),
					$mdgriffith$elm_ui$Element$Border$rounded(30)
				]),
			_List_fromArray(
				[
					$author$project$Main$viewInputInsuranceDetails(
					A2($author$project$Main$getInsuranceDetails, token, maybeReserve)),
					A2(
					$author$project$Main$viewSlider,
					collateral,
					A2($author$project$Main$getInsuranceDetails, token, maybeReserve)),
					A3($author$project$Main$viewInput, collateral, '', $author$project$Main$ChangeCollateralAmount),
					A3($author$project$Main$viewClaim, collateral, maybeCollateralPoolBalance, maybeTotalDeposit)
				]));
	});
var $author$project$Main$ChangeInterestAmount = function (a) {
	return {$: 12, a: a};
};
var $author$project$Main$roundDown = F2(
	function (decimals, _float) {
		return ((_float * A2($elm$core$Basics$pow, 10, decimals)) | 0) / A2($elm$core$Basics$pow, 10, decimals);
	});
var $author$project$Main$roundDownPercent = $author$project$Main$roundDown(2);
var $author$project$Main$getAPR = F2(
	function (token, interest) {
		var maybeTokenFloat = $elm$core$String$toFloat(token);
		var maybeInterestFloat = $elm$core$String$toFloat(interest);
		var getInterest = F2(
			function (tokenFloat, interestFloat) {
				return $elm$core$String$fromFloat(
					$author$project$Main$roundDownPercent((interestFloat * 100) / tokenFloat));
			});
		return A3($elm$core$Maybe$map2, getInterest, maybeTokenFloat, maybeInterestFloat);
	});
var $author$project$Main$viewInterestText = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$padding(5),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
			$mdgriffith$elm_ui$Element$Font$size(14),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	$mdgriffith$elm_ui$Element$text('Output on August 5, 2021'));
var $author$project$Main$viewPercent = function (maybePercent) {
	if (!maybePercent.$) {
		var percent = maybePercent.a;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$alignRight,
					$mdgriffith$elm_ui$Element$padding(5),
					$mdgriffith$elm_ui$Element$Border$rounded(30),
					$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
					$mdgriffith$elm_ui$Element$Font$size(14),
					$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
				]),
			$mdgriffith$elm_ui$Element$text('APR ' + (percent + '%')));
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $author$project$Main$viewInputInterestDetails = function (maybePercent) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Main$viewInterestText,
				$author$project$Main$viewPercent(maybePercent)
			]));
};
var $author$project$Main$viewInterest = F2(
	function (token, interest) {
		var resultToken = $author$project$Main$fromTokenToBigInt(token);
		var resultInterest = $author$project$Main$fromTokenToBigInt(interest);
		var output = A2(
			$elm$core$Result$withDefault,
			'',
			A2(
				$elm$core$Result$map,
				$author$project$Main$roundDownString,
				A2(
					$elm$core$Result$andThen,
					$author$project$Main$fromBigIntToToken,
					A3($author$project$Utility$andThen2, $author$project$Main$addBy, resultToken, resultInterest))));
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$padding(20),
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Main$imperfectWhite),
					$mdgriffith$elm_ui$Element$Border$rounded(30)
				]),
			_List_fromArray(
				[
					$author$project$Main$viewInputInterestDetails(
					A2($author$project$Main$getAPR, token, interest)),
					A3($author$project$Main$viewInput, output, 'DAI', $author$project$Main$ChangeInterestAmount)
				]));
	});
var $author$project$Main$SwitchToBorrow = {$: 8};
var $author$project$Main$viewBorrowTab = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$gray),
			$mdgriffith$elm_ui$Element$Font$size(24),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	{
		a0: $mdgriffith$elm_ui$Element$text('Borrow'),
		k: $elm$core$Maybe$Just($author$project$Main$SwitchToBorrow)
	});
var $author$project$Main$viewLendTabChosen = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Font$size(24),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	{
		a0: $mdgriffith$elm_ui$Element$text('Lend'),
		k: $elm$core$Maybe$Nothing
	});
var $author$project$Main$viewLendTabs = A2(
	$mdgriffith$elm_ui$Element$row,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$padding(10),
			$mdgriffith$elm_ui$Element$Background$color($author$project$Main$dirtyWhite)
		]),
	_List_fromArray(
		[$author$project$Main$viewLendTabChosen, $author$project$Main$viewBorrowTab]));
var $author$project$Main$Swap = {$: 18};
var $author$project$Main$viewSwapButton = F4(
	function (tokenBalance, collateralBalance, approved, transaction) {
		if ((!approved.$) && (!approved.a)) {
			var _v1 = approved.a;
			var resultTokenBigInt = $author$project$Main$fromTokenToBigInt(transaction.dS);
			var resultTokenBalance = A2(
				$elm$core$Result$andThen,
				$author$project$Data$toBigInt,
				A2($elm$core$Result$fromMaybe, 'Has not acquired balance', tokenBalance));
			var resultToken = $author$project$Data$toUnsignedIntegerFromStringToken(transaction.dS);
			var resultInterest = $author$project$Data$toUnsignedIntegerFromStringToken(transaction.c2);
			var resultCollateralBigInt = $author$project$Main$fromTokenToBigInt(transaction.bl);
			var resultCollateralBalance = A2(
				$elm$core$Result$andThen,
				$author$project$Data$toBigInt,
				A2($elm$core$Result$fromMaybe, 'Has not acquired balance', collateralBalance));
			var resultCollateral = $author$project$Data$toUnsignedIntegerFromStringToken(transaction.bl);
			var _v2 = _Utils_Tuple3(resultToken, resultCollateral, resultInterest);
			if (((!_v2.a.$) && (!_v2.b.$)) && (!_v2.c.$)) {
				var _v3 = transaction.C;
				if (!_v3) {
					var _v4 = _Utils_Tuple2(resultTokenBalance, resultTokenBigInt);
					if ((!_v4.a.$) && (!_v4.b.$)) {
						var currentTokenBalance = _v4.a.a;
						var tokenBigInt = _v4.b.a;
						return A2($cmditch$elm_bigint$BigInt$gte, currentTokenBalance, tokenBigInt) ? A2(
							$mdgriffith$elm_ui$Element$Input$button,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$padding(12),
									$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
									$mdgriffith$elm_ui$Element$Border$rounded(30),
									$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
									$mdgriffith$elm_ui$Element$Font$size(24),
									$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
									$mdgriffith$elm_ui$Element$Font$center
								]),
							{
								a0: $mdgriffith$elm_ui$Element$text('Swap'),
								k: $elm$core$Maybe$Just($author$project$Main$Swap)
							}) : A2(
							$mdgriffith$elm_ui$Element$Input$button,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$padding(12),
									$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
									$mdgriffith$elm_ui$Element$Border$rounded(30),
									$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
									$mdgriffith$elm_ui$Element$Font$size(24),
									$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
									$mdgriffith$elm_ui$Element$Font$center
								]),
							{
								a0: $mdgriffith$elm_ui$Element$text('Not Enough Funds'),
								k: $elm$core$Maybe$Nothing
							});
					} else {
						return A2(
							$mdgriffith$elm_ui$Element$Input$button,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$padding(12),
									$mdgriffith$elm_ui$Element$Background$color($author$project$Main$gray),
									$mdgriffith$elm_ui$Element$Border$rounded(30),
									$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
									$mdgriffith$elm_ui$Element$Font$size(24),
									$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
									$mdgriffith$elm_ui$Element$Font$center
								]),
							{
								a0: $mdgriffith$elm_ui$Element$text('Enter an Amount'),
								k: $elm$core$Maybe$Nothing
							});
					}
				} else {
					var _v5 = _Utils_Tuple2(resultCollateralBalance, resultCollateralBigInt);
					if ((!_v5.a.$) && (!_v5.b.$)) {
						var currentCollateralBalance = _v5.a.a;
						var collateralBigInt = _v5.b.a;
						return A2($cmditch$elm_bigint$BigInt$gte, currentCollateralBalance, collateralBigInt) ? A2(
							$mdgriffith$elm_ui$Element$Input$button,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$padding(12),
									$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
									$mdgriffith$elm_ui$Element$Border$rounded(30),
									$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
									$mdgriffith$elm_ui$Element$Font$size(24),
									$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
									$mdgriffith$elm_ui$Element$Font$center
								]),
							{
								a0: $mdgriffith$elm_ui$Element$text('Swap'),
								k: $elm$core$Maybe$Just($author$project$Main$Swap)
							}) : A2(
							$mdgriffith$elm_ui$Element$Input$button,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$padding(12),
									$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
									$mdgriffith$elm_ui$Element$Border$rounded(30),
									$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
									$mdgriffith$elm_ui$Element$Font$size(24),
									$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
									$mdgriffith$elm_ui$Element$Font$center
								]),
							{
								a0: $mdgriffith$elm_ui$Element$text('Not Enough Funds'),
								k: $elm$core$Maybe$Nothing
							});
					} else {
						return A2(
							$mdgriffith$elm_ui$Element$Input$button,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$padding(12),
									$mdgriffith$elm_ui$Element$Background$color($author$project$Main$gray),
									$mdgriffith$elm_ui$Element$Border$rounded(30),
									$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
									$mdgriffith$elm_ui$Element$Font$size(24),
									$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
									$mdgriffith$elm_ui$Element$Font$center
								]),
							{
								a0: $mdgriffith$elm_ui$Element$text('Enter an Amount'),
								k: $elm$core$Maybe$Nothing
							});
					}
				}
			} else {
				return A2(
					$mdgriffith$elm_ui$Element$Input$button,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$padding(12),
							$mdgriffith$elm_ui$Element$Background$color($author$project$Main$gray),
							$mdgriffith$elm_ui$Element$Border$rounded(30),
							$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
							$mdgriffith$elm_ui$Element$Font$size(24),
							$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
							$mdgriffith$elm_ui$Element$Font$center
						]),
					{
						a0: $mdgriffith$elm_ui$Element$text('Enter an Amount'),
						k: $elm$core$Maybe$Nothing
					});
			}
		} else {
			return A2(
				$mdgriffith$elm_ui$Element$Input$button,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$padding(12),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Main$gray),
						$mdgriffith$elm_ui$Element$Border$rounded(30),
						$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
						$mdgriffith$elm_ui$Element$Font$size(24),
						$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
						$mdgriffith$elm_ui$Element$Font$center
					]),
				{
					a0: $mdgriffith$elm_ui$Element$text('Requires Approval'),
					k: $elm$core$Maybe$Nothing
				});
		}
	});
var $author$project$Main$ChangeTokenAmount = function (a) {
	return {$: 9, a: a};
};
var $author$project$Main$viewPrincipalText = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$padding(5),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectBlack),
			$mdgriffith$elm_ui$Element$Font$size(14),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	$mdgriffith$elm_ui$Element$text('Principal'));
var $author$project$Main$viewInputTokenDetails = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
		]),
	$author$project$Main$viewPrincipalText);
var $author$project$Main$viewToken = function (token) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding(20),
				$mdgriffith$elm_ui$Element$spacing(10),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Main$imperfectWhite),
				$mdgriffith$elm_ui$Element$Border$rounded(30)
			]),
		_List_fromArray(
			[
				$author$project$Main$viewInputTokenDetails,
				A3($author$project$Main$viewInput, token, 'DAI', $author$project$Main$ChangeTokenAmount)
			]));
};
var $author$project$Main$viewSwap = function (info) {
	var _v0 = info.g.C;
	if (!_v0) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width(
					$mdgriffith$elm_ui$Element$px(400)),
					$mdgriffith$elm_ui$Element$padding(20),
					$mdgriffith$elm_ui$Element$spacing(20),
					$mdgriffith$elm_ui$Element$centerX,
					$mdgriffith$elm_ui$Element$alignTop,
					$mdgriffith$elm_ui$Element$Background$color($author$project$Main$dirtyWhite),
					$mdgriffith$elm_ui$Element$Border$rounded(30)
				]),
			_List_fromArray(
				[
					$author$project$Main$viewLendTabs,
					$author$project$Main$viewToken(info.g.dS),
					A5($author$project$Main$viewInsurance, info.g.dS, info.g.bl, info.I, info.au, info.aC),
					A2($author$project$Main$viewInterest, info.g.dS, info.g.c2),
					$author$project$Main$viewApproveButton(info.af),
					A4($author$project$Main$viewSwapButton, info.ao, info.W, info.af, info.g)
				]));
	} else {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width(
					$mdgriffith$elm_ui$Element$px(400)),
					$mdgriffith$elm_ui$Element$padding(20),
					$mdgriffith$elm_ui$Element$spacing(20),
					$mdgriffith$elm_ui$Element$centerX,
					$mdgriffith$elm_ui$Element$alignTop,
					$mdgriffith$elm_ui$Element$Background$color($author$project$Main$dirtyWhite),
					$mdgriffith$elm_ui$Element$Border$rounded(30)
				]),
			_List_fromArray(
				[
					$author$project$Main$viewBorrowTabs,
					$author$project$Main$viewToken(info.g.dS),
					A3($author$project$Main$viewCollateral, info.g.dS, info.g.bl, info.I),
					A2($author$project$Main$viewInterest, info.g.dS, info.g.c2),
					$author$project$Main$viewApproveButton(info.V),
					A4($author$project$Main$viewSwapButton, info.ao, info.W, info.V, info.g)
				]));
	}
};
var $author$project$Main$viewBody = function (info) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				A2($mdgriffith$elm_ui$Element$paddingXY, 20, 172),
				$mdgriffith$elm_ui$Element$spacing(20)
			]),
		_List_fromArray(
			[
				A3($author$project$Main$viewAssetBox, info.cG, info.au, info.aC),
				$author$project$Main$viewSwap(info),
				$author$project$Main$viewLiabilityBox(info.c5)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$Paragraph = {$: 9};
var $mdgriffith$elm_ui$Element$paragraph = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asParagraph,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Paragraph),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$spacing(5),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $author$project$Main$viewBodyNoMetamask = A2(
	$mdgriffith$elm_ui$Element$paragraph,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$padding(100),
			$mdgriffith$elm_ui$Element$centerY,
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Font$size(48),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$text('Timeswap Demo requires Metamask.')
		]));
var $author$project$Main$viewBodyNotConnected = A2(
	$mdgriffith$elm_ui$Element$paragraph,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$padding(100),
			$mdgriffith$elm_ui$Element$centerY,
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Font$size(48),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato),
			$mdgriffith$elm_ui$Element$Font$center
		]),
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$text('Connect to Metamask Rinkeby Test Network.')
		]));
var $author$project$Main$viewElement = function (model) {
	var _v0 = model.d;
	switch (_v0.$) {
		case 0:
			var info = _v0.a;
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Main$imperfectWhite)
					]),
				$author$project$Main$viewBody(info));
		case 1:
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Main$imperfectWhite)
					]),
				$author$project$Main$viewBodyNotConnected);
		default:
			return $author$project$Main$viewBodyNoMetamask;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Bottom = 2;
var $mdgriffith$elm_ui$Element$alignBottom = $mdgriffith$elm_ui$Internal$Model$AlignY(2);
var $author$project$Main$viewEmail = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			A2($mdgriffith$elm_ui$Element$paddingXY, 18, 9),
			$mdgriffith$elm_ui$Element$alignRight,
			$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
			$mdgriffith$elm_ui$Element$Font$size(18),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	$mdgriffith$elm_ui$Element$text('Mathepreneur.eth@gmail.com'));
var $author$project$Main$SendMintCollateral = {$: 16};
var $author$project$Main$viewMintCollateral = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			A2($mdgriffith$elm_ui$Element$paddingXY, 18, 9),
			$mdgriffith$elm_ui$Element$alignLeft,
			$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
			$mdgriffith$elm_ui$Element$Font$size(18),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	{
		a0: $mdgriffith$elm_ui$Element$text('Mint 5 Test FILE'),
		k: $elm$core$Maybe$Just($author$project$Main$SendMintCollateral)
	});
var $author$project$Main$SendMintToken = {$: 15};
var $author$project$Main$viewMintToken = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			A2($mdgriffith$elm_ui$Element$paddingXY, 18, 9),
			$mdgriffith$elm_ui$Element$alignLeft,
			$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
			$mdgriffith$elm_ui$Element$Font$size(18),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	{
		a0: $mdgriffith$elm_ui$Element$text('Mint 1000 Test DAI'),
		k: $elm$core$Maybe$Just($author$project$Main$SendMintToken)
	});
var $author$project$Main$WatchCollateral = {$: 14};
var $author$project$Main$viewWatchCollateral = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			A2($mdgriffith$elm_ui$Element$paddingXY, 18, 9),
			$mdgriffith$elm_ui$Element$alignLeft,
			$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
			$mdgriffith$elm_ui$Element$Font$size(18),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	{
		a0: $mdgriffith$elm_ui$Element$text('Show Test FILE in Metamask'),
		k: $elm$core$Maybe$Just($author$project$Main$WatchCollateral)
	});
var $author$project$Main$WatchToken = {$: 13};
var $author$project$Main$viewWatchToken = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			A2($mdgriffith$elm_ui$Element$paddingXY, 18, 9),
			$mdgriffith$elm_ui$Element$alignLeft,
			$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
			$mdgriffith$elm_ui$Element$Font$size(18),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	{
		a0: $mdgriffith$elm_ui$Element$text('Show Test DAI in Metamask'),
		k: $elm$core$Maybe$Just($author$project$Main$WatchToken)
	});
var $author$project$Main$viewFooterConnected = A2(
	$mdgriffith$elm_ui$Element$row,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$height(
			$mdgriffith$elm_ui$Element$px(72)),
			$mdgriffith$elm_ui$Element$padding(12),
			$mdgriffith$elm_ui$Element$spacing(12),
			$mdgriffith$elm_ui$Element$alignBottom
		]),
	_List_fromArray(
		[$author$project$Main$viewMintToken, $author$project$Main$viewWatchToken, $author$project$Main$viewMintCollateral, $author$project$Main$viewWatchCollateral, $author$project$Main$viewEmail]));
var $author$project$Image$Image = $elm$core$Basics$identity;
var $author$project$Image$createImage = F2(
	function (filename, description) {
		return {aX: description, a9: './image/' + filename};
	});
var $author$project$Image$timeswapDayLogo = A2($author$project$Image$createImage, 'TimeswapDayLogo.png', 'Timeswap Day Logo');
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $mdgriffith$elm_ui$Element$image = F2(
	function (attrs, _v0) {
		var src = _v0.a9;
		var description = _v0.aX;
		var imageAttributes = A2(
			$elm$core$List$filter,
			function (a) {
				switch (a.$) {
					case 7:
						return true;
					case 8:
						return true;
					default:
						return false;
				}
			},
			attrs);
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cT),
				attrs),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asEl,
						$mdgriffith$elm_ui$Internal$Model$NodeName('img'),
						_Utils_ap(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Internal$Model$Attr(
									$elm$html$Html$Attributes$src(src)),
									$mdgriffith$elm_ui$Internal$Model$Attr(
									$elm$html$Html$Attributes$alt(description))
								]),
							imageAttributes),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var $author$project$Image$toElement = F2(
	function (attributes, _v0) {
		var src = _v0.a9;
		var description = _v0.aX;
		return A2(
			$mdgriffith$elm_ui$Element$image,
			attributes,
			{aX: description, a9: src});
	});
var $author$project$Main$viewLogo = A2(
	$author$project$Image$toElement,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width(
			$mdgriffith$elm_ui$Element$px(200)),
			$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink)
		]),
	$author$project$Image$timeswapDayLogo);
var $author$project$Hexadecimal$toStringHexadecimalShort = function (hexadecimal) {
	var string = $author$project$Hexadecimal$toStringHexadecimal(hexadecimal);
	var right = A2($elm$core$String$right, 4, string);
	var left = A2($elm$core$String$left, 6, string);
	return left + ('...' + right);
};
var $author$project$Hexadecimal$toTextHexadecimalShort = function (hexadecimal) {
	return $mdgriffith$elm_ui$Element$text(
		$author$project$Hexadecimal$toStringHexadecimalShort(hexadecimal));
};
var $author$project$Data$fromAddressToTextShort = function (_v0) {
	var hexadecimal = _v0;
	return $author$project$Hexadecimal$toTextHexadecimalShort(hexadecimal);
};
var $author$project$Main$viewWallet = function (address) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Element$paddingXY, 18, 9),
				$mdgriffith$elm_ui$Element$alignRight,
				$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
				$mdgriffith$elm_ui$Element$Border$rounded(30),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
				$mdgriffith$elm_ui$Element$Font$size(18),
				$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
			]),
		$author$project$Data$fromAddressToTextShort(address));
};
var $author$project$Main$viewHeaderConnected = function (address) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(72)),
				$mdgriffith$elm_ui$Element$padding(12)
			]),
		_List_fromArray(
			[
				$author$project$Main$viewLogo,
				$author$project$Main$viewWallet(address)
			]));
};
var $author$project$Main$SendConnect = {$: 1};
var $author$project$Main$viewWalletNotConnected = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			A2($mdgriffith$elm_ui$Element$paddingXY, 18, 9),
			$mdgriffith$elm_ui$Element$alignRight,
			$mdgriffith$elm_ui$Element$Background$color($author$project$Main$blue),
			$mdgriffith$elm_ui$Element$Border$rounded(30),
			$mdgriffith$elm_ui$Element$Font$color($author$project$Main$imperfectWhite),
			$mdgriffith$elm_ui$Element$Font$size(18),
			$mdgriffith$elm_ui$Element$Font$family($author$project$Main$lato)
		]),
	{
		a0: $mdgriffith$elm_ui$Element$text('Connect Metamask'),
		k: $elm$core$Maybe$Just($author$project$Main$SendConnect)
	});
var $author$project$Main$viewHeaderNotConnected = A2(
	$mdgriffith$elm_ui$Element$row,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$height(
			$mdgriffith$elm_ui$Element$px(72)),
			$mdgriffith$elm_ui$Element$padding(12)
		]),
	_List_fromArray(
		[$author$project$Main$viewLogo, $author$project$Main$viewWalletNotConnected]));
var $author$project$Main$view = function (model) {
	var viewHeader = function () {
		var _v1 = model.d;
		switch (_v1.$) {
			case 0:
				var info = _v1.a;
				return $author$project$Main$viewHeaderConnected(info.i);
			case 1:
				return $author$project$Main$viewHeaderNotConnected;
			default:
				return $mdgriffith$elm_ui$Element$none;
		}
	}();
	var viewFooter = function () {
		var _v0 = model.d;
		switch (_v0.$) {
			case 0:
				return $author$project$Main$viewFooterConnected;
			case 1:
				return $mdgriffith$elm_ui$Element$none;
			default:
				return $mdgriffith$elm_ui$Element$none;
		}
	}();
	return A3(
		$mdgriffith$elm_ui$Element$layoutWith,
		{
			dh: _List_fromArray(
				[
					$mdgriffith$elm_ui$Element$focusStyle($author$project$Main$focus)
				])
		},
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$inFront(viewHeader),
				$mdgriffith$elm_ui$Element$inFront(viewFooter)
			]),
		$author$project$Main$viewElement(model));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{cX: $author$project$Main$init, dC: $author$project$Main$subscriptions, dX: $author$project$Main$update, dY: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (height) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (hasMetamask) {
							return $elm$json$Json$Decode$succeed(
								{aZ: hasMetamask, aO: height, aT: width});
						},
						A2($elm$json$Json$Decode$field, 'hasMetamask', $elm$json$Json$Decode$bool));
				},
				A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$int));
		},
		A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$int)))(0)}});}(this));