const app = require("express")();

const stripe = require('stripe')('sk_test_wAoiUJKGbVDVChNRAvKKwtOj007M0e1zp3');
app.use(require("body-parser").text());
app.post("/charge", async (req, res) => {
    try {
        console.log(req.body);
        var b = JSON.parse(req.body);
        var c = {
            amount: b.amount*100,
            currency: "AUD",
            source: b.token,
            description : b.name+"-"+b.email
        }
        console.log(c);
        let {status} = await stripe.charges.create(c);

        res.json({status});
    } catch (err) {
        res.status(500).end();
    }
});
var port = 9090;
app.listen(port, () => console.log("Listening on port "+port));
