import { MONGO_URL } from '../config';
export const dbConnection = {
  url:MONGO_URL || 'mongodb://127.0.0.1:27017/dev_hunsaker',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};