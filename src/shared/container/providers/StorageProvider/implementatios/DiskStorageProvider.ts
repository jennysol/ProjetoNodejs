import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {

    }

    public async deleteFile(file: string): Promise<void> {

    }
}

export default DiskStorageProvider;