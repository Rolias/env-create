const fs = require('fs')
const chai = require('chai')
const should = chai.should()
const sandbox = require('sinon').createSandbox()
const envCreate = require('./main')

let readFileSyncStub
const topObject1 = '{"name":"secret name"}'
const topObject2 = '{"id":"secret id"}'
const mockReadResponse = `{"secret1":${topObject1}, "secret2": ${topObject2}}`


describe.only('load() ', () => {
  describe('when it throws should', () => {
    beforeEach(() => {
      readFileSyncStub = sandbox.stub(fs, 'readFileSync').throws()
    })
    afterEach(() => {
      sandbox.restore()
    })

    it('should...', () => {
      {(() => envCreate.load).should.throw}
    })
  })


  describe('when it does not throw should', () => {
    beforeEach(() => {
      readFileSyncStub = sandbox.stub(fs, 'readFileSync').returns(mockReadResponse)
      sandbox.spy(console, 'log')
      delete process.env.secret1
      delete process.env.secret2
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('return status:true when everything works', () => {
      const result = envCreate.load()
      result.status.should.be.true
    })

    it('have default filename when no parameter passed', () => {
      envCreate.load()
      readFileSyncStub.args[0][0].should.contain(envCreate.DEFAULT_ENV_FILENAME)
    })

    it('have default filename when path property is empty', () => {
      envCreate.load({path: ''})
      readFileSyncStub.args[0][0].should.contain(envCreate.DEFAULT_ENV_FILENAME)
    })

    it('work when option parameter is supplied', () => {
      const fakePath = {path: '../fake.json'}
      envCreate.load(fakePath)
      readFileSyncStub.calledWith(fakePath.path).should.be.true
    })

    it('work when encoding property supplied', () => {
      const fakeEncoding = {encoding: 'utf16'}
      envCreate.load(fakeEncoding)
      readFileSyncStub.calledWith(fakeEncoding.encoding)
    })
    it('call console.log when debug property supplied ', () => {
      const debugProp = {debug: true}
      envCreate.load(debugProp)
      console.log.called.should.be.true
    })

    it('creates the expected process.env variables', () => {
      envCreate.load()
      process.env.secret1.should.equal(topObject1)
      process.env.secret2.should.equal(topObject2)
    })

    describe('will not overwrite existing property', () => {
      let preExists
      beforeEach(() => {
        preExists = 'I am therefore I am'
        process.env.secret1 = preExists
      })
      it('when debug is true', () => {
        envCreate.load({debug: true})
        process.env.secret1.should.equal(preExists)
      })

      it('will not overwrite an existing property with debug false', () => {
        envCreate.load({debug: false})
        process.env.secret1.should.equal(preExists)
      })
    })


    it('returns error value when it throws', () => {
      readFileSyncStub.throws()
      const getError = envCreate.load()
      getError.error.should.be.instanceOf(Error)
      getError.status.should.be.false
    })
  })
})