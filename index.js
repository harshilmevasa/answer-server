const express = require('express');
const questionRoutes = require('./routes/api/questionRoutes');
const answerRoutes = require('./routes/api/answerRoutes');
const companyRoutes = require('./routes/api/companyRoutes');
const jobRoutes = require('./routes/api/jobRoutes');
const userRoutes = require('./routes/api/userRoutes');
const authRoutes = require('./routes/api/authRoutes');
const categoryRoutes = require('./routes/api/CategoryRoutes-DB');
const tagRoutes = require('./routes/api/tagRoutes-DB');
const accountRoutes = require('./routes/api/AccountDB');
const forgotPassword = require('./routes/api/forgot-password');


const bodyParser = require("body-parser");
const cors = require('cors');


const connectDB = require('./config/connectDB');

const app = express();

var corsOptions = {
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//coneect to db
connectDB();

//set a middleware to parse dat
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/tag', tagRoutes);
app.use('/api/userAccount', accountRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);

app.use('/api/forgot-password', forgotPassword);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started');
});
