import * as Express from "express";
 
const app = Express.default();

app.get("/", (req, res, next) => {
  res.send('hello world');
});
 
app.get("/search/:query", (req, res, next) => {
  res.send(`Search query: ${req.params.query}`);
});
 
app.listen(8080);