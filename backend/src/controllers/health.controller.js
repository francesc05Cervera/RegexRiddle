function getHealth(req, res) {
    res.json({
        ok: true,
        message: 'Backend online'
    });
}

module.exports = {
    getHealth
};