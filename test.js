'use strict';

const assert = require('assert');
const mongo = require('mongodb');
const oid2int64 = require('./mongoid2int64');

describe('MongoDB ObjectID to Int64', function()
{

  it('from ObjectID #1', function(done){
    let objid = new mongo.ObjectID();
    let int64val = oid2int64(objid, 16);

    console.log(int64val);
    console.log(mongo.Long.fromString(int64val, 16).toString(10));

    assert.equal(mongo.Long.fromString(int64val, 16).toString(16), int64val);

    done();
  });

  it('from ObjectID #2', function(done){
    let objid = new mongo.ObjectID();
    let int64val = oid2int64(objid, 16);

    console.log(int64val);
    console.log(mongo.Long.fromString(int64val, 16).toString(10));

    assert.equal(mongo.Long.fromString(int64val, 16).toString(16), int64val);

    done();
  });

  it('from String (12byte Hex)', function(done){
    let objid = '573d0a8f3497dc9823163c90';
    let int64val = oid2int64(objid);

    console.log(int64val);
    console.log(mongo.Long.fromString(int64val, 10));
    console.log(mongo.Long.fromString(oid2int64(objid, 16), 16));

    assert.equal(oid2int64(objid, 16), mongo.Long.fromString(int64val, 10).toString(16));

    done();
  });

  it('from String (16byte Hex)', function(done){
    let intval = oid2int64('ffff573d0a8f3497dc9823163c90');

    console.log(intval);

    assert(!intval);

    done();
  });

  it('from int', function(done){
    let intval = oid2int64(0xffffffff);

    console.log(intval);

    assert(!intval);

    done();
  });

  it('from ObjectID #3', function(done){
    let objid = new mongo.ObjectID();
    let int64val = oid2int64(objid, 16);

    console.log(int64val);
    console.log(mongo.Long.fromString(int64val, 16).toString(10));

    assert.equal(mongo.Long.fromString(int64val, 16).toString(16), int64val);

    done();
  });

});

