const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const { ObjectId } = require("bson");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (!err) {
                //success
                req.uid = decoded.id;
                next();
            } else {
                res.send({ message: "token doesn't match!" });
            }
        });
    } else {
        res.send({ message: "No token found!" });
    }
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ykse1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
    console.log("Errors found: ", err);
    const blogsCollection = client.db(process.env.DB_NAME).collection("blogs");
    const usersCollection = client.db(process.env.DB_NAME).collection("users");
    const reviewsCollection = client.db(process.env.DB_NAME).collection("reviews");

    app.post("/users", (req, res) => {
        const newUser = req.body;
        const uid = newUser.uid;
        usersCollection.findOne({uid: uid}).then((user) => {
            if(user){
                const token = jwt.sign({ id: uid }, process.env.TOKEN_SECRET, {
                    expiresIn: 10000,
                });
                res.send({
                    success: true,
                    token: token,
                });
            } else {
                newUser.isAdmin = false;
                usersCollection.insertOne(newUser).then((result) => {
                    const token = jwt.sign({ id: uid }, process.env.TOKEN_SECRET, {
                        expiresIn: 2000,
                    });
                    res.send({
                        success: true,
                        token: token,
                    });
                });
            }
        })
    });

    app.get("/getUser", verifyJwt, (req, res) => {
        usersCollection.findOne({ uid: req.uid }).then((user) => {
            if (user) {
                // const { uid, displayName, email } = user;
                res.send({ auth: true, user });
            } else {
                res.send({ auth: false });
            }
        });
    });

    app.post("/addBlog", verifyJwt, (req, res) => {
        const newBlog = req.body;
        console.log(newBlog);
        blogsCollection.insertOne(newBlog).then((result) => {
            res.send(result.insertedCount > 0);
        });
    });

    app.get("/blogs", (req, res) => {
        blogsCollection.find({}).toArray((err, blogs) => {
            res.send(blogs);
        });
    });

    app.get('/blog/:blogId', (req, res) => {
        const blogId = req.params.blogId;
        blogsCollection.findOne({ _id: ObjectId(blogId) }).then((blog) => {
            res.send(blog);
        });
    });

    app.post('/addReview', (req, res) => {
        const newReview = req.body;
        reviewsCollection.insertOne(newReview)
        .then(result => {
            res.send(result.insertedCount > 0);
        })
    });

    app.get('/reviews', (req, res) => {
        reviewsCollection.find({}).limit(6).toArray((err, reviews) => {
            res.send(reviews);
        })
    });

    app.delete("/blogs/:id", (req, res) => {
        const id = req.params.id;
        blogsCollection
            .findOneAndDelete({ _id: ObjectId(id) })
            .then((deletedBlog) => {
                if (deletedBlog) {
                    res.send({
                        deleted: true,
                        message: `Successfully deleted blog: ${deletedBlog}.`,
                    });
                } else {
                    res.send({ deleted: false, message: "No blog matches the provided id." });
                }
            })
            .catch((err) =>
                res.send({
                    deleted: false,
                    message: `Failed to find and delete blog: ${err}`,
                })
            );
    });


});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
