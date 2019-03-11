const fs = require('fs')
const chai = require('chai')
chai.should()
const sandbox = require('sinon').createSandbox()
const envCreate = require('./main')

let readFileSyncStub
const topObject1 = '{"name":"secret name"}'
const topObject2 = '{"id":"secret id"}'
const mockReadResponse = `{"secret1":${topObject1}, "secret2": ${topObject2}}`

describe('load() should', () => {
  beforeEach(() => {
    readFileSyncStub = sandbox.stub(fs, 'readFileSync').returns(mockReadResponse)
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

  it('have passed path when option parameter is supplied', () => {
    const fakePath = '../fake.json'
    envCreate.load({path: fakePath})
    readFileSyncStub.args[0][0].should.contain(fakePath)
  })

  it('should have passed encoding when supplied', () => {
    const fakeEncoding = 'utf16'
    envCreate.load({encoding: fakeEncoding})
    readFileSyncStub.args[0][1].should.contain(fakeEncoding)
  })

  it('creates the expected process.env variables', () => {
    envCreate.load()
    process.env.secret1.should.equal(topObject1)
    process.env.secret2.should.equal(topObject2)
  })

  it('will not overwrite an existing property', () => {
    const preExists = 'I am therefore I am'
    process.env.secret1 = preExists
    envCreate.load({debug: true})
    process.env.secret1.should.equal(preExists)
  })

  it('returns error value when it throws', () => {
    readFileSyncStub.throws()
    const getError = envCreate.load()
    getError.error.should.be.instanceOf(Error)
    getError.status.should.be.false
  })
})