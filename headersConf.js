module.exports = function(req, res, n) {
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin || 'localhost');
    res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization',
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    n();
}