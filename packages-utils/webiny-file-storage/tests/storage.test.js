import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

import { Storage } from '../src';
import MockDriver from './mockDriver';

describe('Storage class test', function () {
    const cdnUrl = 'https://cdn.webiny.com';
    const mockDriver = new MockDriver({ cdnUrl, createDatePrefix: true });

    const storage = new Storage(mockDriver);

    const file1 = {
        key: '/path/1',
        data: { body: 'file1', meta: { ext: 'jpg', size: 412, timeModified: Date.now() } }
    };
    const file2 = {
        key: '/path/2',
        data: { body: 'file2', meta: { ext: 'png', size: 173, timeModified: Date.now() } }
    };

    it('should retrieve an empty list of keys', function () {
        return storage.getKeys('/').should.become([]);
    });

    it('should store a file', async function () {
        const newKey = await storage.setFile(file1.key, file1.data);
        expect(newKey).to.be.a('string');
        file1.key = newKey;
    });

    it('should update a file without changing the key', async function () {
        file1.data.body = 'file1-updated';
        const newKey = await storage.setFile(file1.key, file1.data);
        expect(newKey).to.equal(file1.key);
    });

    it('should retrieve a list of file keys', async function () {
        file2.key = await storage.setFile(file2.key, file2.data);
        return storage.getKeys('/').should.become([file1.key, file2.key]);
    });

    it('should retrieve a file', function () {
        return storage.getFile(file1.key).should.become(file1.data);
    });

    it('should not retrieve a file', function () {
        return storage.getFile('/file').should.become(null);
    });

    it('should retrieve file meta', function () {
        return storage.getMeta(file2.key).should.become(file2.data.meta);
    });

    it('should not retrieve file meta', function () {
        return storage.getMeta('/path/246').should.become(null);
    });

    it('should confirm that file exists', function () {
        return storage.exists(file1.key).should.become(true);
    });

    it('should confirm that file does not exist', function () {
        return storage.exists('/path/114').should.become(false);
    });

    it('should retrieve time when file was modified', function () {
        return storage.getTimeModified(file2.key).should.become(file2.data.meta.timeModified);
    });

    it('should retrieve a public file URL', function () {
        expect(storage.getURL(file1.key)).to.equal(cdnUrl + file1.key);
    });

    it('should rename a file', async function () {
        const newKey = '/new/key';
        await storage.rename(file1.key, newKey);
        file1.key = newKey;
        return storage.getFile('/new/key').should.become(file1.data);
    });

    it('should delete a file', async function () {
        await storage.delete(file1.key);
        return storage.getFile(file1.key).should.become(null);
    });
});