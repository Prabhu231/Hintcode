import { Document } from 'mongoose';

interface IBaseTestCase extends Document {
    problemName: string;
    description: string;
}

export default IBaseTestCase;