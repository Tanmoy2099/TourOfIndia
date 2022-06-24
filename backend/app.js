const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./router/tourRoutes');
const placeRouter = require('./router/placeRouter.js');
const userRouter = require('./router/userRoutes');
const reviewRouter = require('./router/reviewRoutes');

const AppError = require('./utils/customError');
const globleError = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

//Indicates the app is behind a front-facing proxy, and to use the X-Forwarded-* 
//headers to determine the connection and the IP address of the client
app.enable('trust proxy');

// Cross-Origin Resource Sharing, restricts access from different domain. THIS SOLVES THAT.
app.use(cors());
app.options('*', cors());

// Set security HTTP headers
app.use(helmet());


// if (process.env.NODE_ENV !== 'production')
app.use(morgan('dev'));


// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json({ limit: '100kb' }));

// extended: true, means body perser can perse both (array, string) and json,
// if false it can only perse (array, string) but not the json
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// perser all the cookie request, for POST, PUT, UPDATE request
app.use(cookieParser());


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS, make any passed html code to simple string
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({ // used to prevent duplicate parameter passed for the mondoDB, in the query. or params
        whitelist: [ //whitelisted schema params are allowed have duplicate parameter passed through the url
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    })
);

// Using compression in the middleware data, and req,body
app.use(compression());

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/places', placeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => next(new AppError(404, `Can't find ${req.originalUrl} on this server!`)));

app.use(globleError)

module.exports = app;

