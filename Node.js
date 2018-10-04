const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

//ARRAY OF MANUAL REVIEW DATA
const review = [
    { reviewid: 1, name: 'Michael Scott', stars: 4, date: "01-01-2001"},
    { reviewid: 2, name: 'Donald Glover', stars: 2, date: "01-02-2001"},
    { reviewid: 3, name: 'Eric Cartman ', stars: 5, date: "01-03-2001"},
    ];

app.get('/reviews/:reviewid', (req, res) => {
   res.send (review);
});

//ADD A REVIEW
app.post('/reviews/:reviewid', (req, res) => {
    const { error } = validateReviews(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   const reviews = {
       id: review.length + 1,
       name: req.body.name
       
   };
    review.push(reviews);
    res.send(reviews);
});


//GET A REVIEW
app.get('/reviews/:reviewid', (req, res) => {
    const reviews = review.find(c =>c.reviewid === parseInt(req.params.reviewid))
    if(!reviews) return res.status(404).send('The review with the given ID was not found.');
    res.send(reviews);
});


//UPDATE A REVIEW
app.put('/reviews/:reviewid'), (req, res) => {
    const reviews = review.find(c =>c.reviewid === parseInt(req.params.reviewid))
        if(!reviews) return res.status(404).send('The review with the given ID was not found.');

   const result = validateReviews  (req.body);      
   
    if (result.error){
       res.status(400).send(result.error.details[0].message);
       return;
   }
   
   reviews.name =req.body.name;
   res.send(reviews);
         
}

//VALIDATION
    function validateReviews(reviews) {
        const schema = {
            name: Joi.string().min(3).required()
        };
    
    return Joi.validate(reviews, schema);
    }
    
    
//DELETE A REVIEW    
app.delete('/reviews/:review', (req, res) => {
    const reviews = review.find(c =>c.reviewid === parseInt(req.params.reviewid))
    if(!reviews)  return res.status(404).send('The review with the given ID was not found.');
    
    const index = review.indexOf(reviews);
    review.splice(index, 1 );
    
    res.send(reviews);
});


//PORT
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`))

