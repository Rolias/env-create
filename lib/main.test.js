const fs = require('fs')
const chai = require('chai')
chai.should()
const sinon = require('sinon')
const sandbox = sinon.createSandbox()
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
    // have to use match since the default filename is prepended with the path
    const hasDefaultFilename = () => readFileSyncStub.calledWith(sinon.match(envCreate.DEFAULT_ENV_FILENAME))

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
      hasDefaultFilename().should.be.true
    })

    it('have default filename when path property is empty', () => {
      envCreate.load({path: ''})
      hasDefaultFilename().should.be.true
    })

    it('work when option parameter is supplied', () => {
      const fakePath = {path: '../fake.json'}
      envCreate.load(fakePath)
      readFileSyncStub.calledWith(fakePath.path).should.be.true
    })

    it('work when encoding property supplied', () => {
      const fakeEncoding = {encoding: 'utf16'}
      envCreate.load(fakeEncoding)
      // don't care about the first parameter (already tested above)
      readFileSyncStub.calledWith(sinon.match.any, fakeEncoding.encoding).should.be.true
    })
    it('messages returned when debug property supplied ', () => {
      const debugProp = {debug: true}
      const result = envCreate.load(debugProp)
      result.messages.length.should.be.gt(0)
    })

    it('creates the expected process.env variables', () => {
      envCreate.load()
      process.env.secret1.should.equal(topObject1)
      process.env.secret2.should.equal(topObject2)
    })

    describe('will not overwrite existing property', () => {
      let preExists
      let value = false
      beforeEach(() => {
        preExists = 'I am therefore I am'
        process.env.secret1 = preExists
        value = !value
        envCreate.load({debug: value})
      })
      it('when debug is true', () => {
        process.env.secret1.should.equal(preExists)
      })

      it('when debug is false', () => {
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