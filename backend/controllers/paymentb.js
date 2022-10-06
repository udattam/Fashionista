var braintree = require("braintree");

//Braintree payment gateway
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
});

//Getting client token
exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

//Processing payment
exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,

            options: {
                submitForSettlement: true
            }
        },
        function (err, result) {
            if (err) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};
