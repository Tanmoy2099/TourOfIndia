const cors = require('cors');

const corsOptions = {
    origin: 'https://tourindia-tan.web.app ',
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);