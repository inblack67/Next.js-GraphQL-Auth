import { connect } from 'mongoose';
import 'colors';

export const connectDB = async () => {

    try {
        await connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongo is here`.bold.blue);
    } catch (err) {
        console.error(`${err}`.red.bold);
    }
}