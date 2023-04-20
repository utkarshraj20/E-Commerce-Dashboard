const express = require('express')

require('./db/config');

const User = require('./db/user');

const Product = require('./db/Product');

const cors = require('cors');

const app = express();

const Jwt = require('jsonwebtoken');

const jwtKey = 'e-comm';

const bcrypt = require('bcrypt');

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

app.use(express.json());

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            res.send('Something went wrong, Please try after somtime')
        }
        else {
            res.send({result, auth: token });
        }
    })
})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        
        let user = await User.findOne({email : req.body.email}).select('-password');
        let hashString = JSON.stringify(await User.findOne({email : req.body.email}).select('password'));
    
        async function validatePassword(plainText, hash) {
                let result = await bcrypt.compare(plainText, hash);
                return result;
        }
        
        if (user && validatePassword(req.body.password, hashString)) {
            Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.send('Something went wrong, Please try after somtime')
                }
                else {
                    res.send({user, auth: token });
                }
            })
        }
        else
            res.send({ result: 'No User Found!' });
    }
    else
        res.send({ result: 'No User Found!' });

})

app.post('/add-product', verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();

    res.send(result);
})

app.get('/products', verifyToken,async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    }
    else {
        res.send({ result: "No Products Found!" });
    }
})

app.delete('/product/:id', verifyToken, async (req, res) => {

    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.get('/product/:id',  verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });

    if (result)
        res.send(result);
    else
        res.send({ result: "No Record Found!" });
})

app.put('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
})

app.get('/search/:key', verifyToken,  async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { cateogry: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})

function verifyToken(req, res, next){
    let token = req.headers['authorization'];
    
    if(token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if(err){
                res.status(401).send({result: "Please Provide Valid Token"});
            }
            else{
                next();
            }
        })
    }
    else {
        res.status(403).send({result: "Please add token with header"});
    }
}
app.listen(5000);