const express = require('express');
const authRoute = require('./auth.router');
const questionRoute = require('./question.router');
const userRoute = require('./user.router');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/question',
        route: questionRoute,
    },
    {
        path: '/user',
        route: userRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;