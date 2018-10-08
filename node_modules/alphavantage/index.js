const request = require('request');

function loop() {
    
    db.Indice
    .findOrCreate({ where: { symbol: 'djia' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)

      /*
       findOrCreate returns an array containing the object that was found or created and a boolean that will be true if a new object was created and false if not, like so:
  
      [ {
          username: 'sdepold',
          job: 'Technical Lead JavaScript',
          id: 1,
          createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
          updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
        },
        true ]
  
   In the example above, the "spread" on line 39 divides the array into its 2 parts and passes them as arguments to the callback function defined beginning at line 39, which treats them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "true".)
      */
    });
  db.Indice
    .findOrCreate({ where: { symbol: 'inx' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)
    });

    db.Indice
    .findOrCreate({ where: { symbol: 'rut' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)
    });

    db.Indice
    .findOrCreate({ where: { symbol: 'ixic' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)
    });


    function intervalFunc() {
        let dprice;
        let sprice;
        let rprice;
        let nprice;
        request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DJIA&apikey=5HIDPCV4IGFUOO8D', (error, response, body) => {
          let json = JSON.parse(body);
          dprice = (json['Global Quote']['05. price']);
          db.Indice.findOne({ where: { symbol: 'djia' } }).then((djia) => {
            djia.set('currentprice', dprice);
            djia.save();
          });
        });
    
        request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=INX&apikey=5HIDPCV4IGFUOO8D', (error, response, body) => {
          let json = JSON.parse(body);
          sprice = (json['Global Quote']['05. price']);
          db.Indice.findOne({ where: { symbol: 'inx' } }).then((inx) => {
            inx.set('currentprice', sprice);
            inx.save();
          });
    
        });
    
        request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=^RUT&apikey=5HIDPCV4IGFUOO8D', (error, response, body) => {
          let json = JSON.parse(body);
          rprice = (json['Global Quote']['05. price']);
          db.Indice.findOne({ where: { symbol: 'rut' } }).then((rut) => {
            rut.set('currentprice', rprice);
            rut.save();
          });
    
        });
    
        request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IXIC&apikey=5HIDPCV4IGFUOO8D', (error, response, body) => {
          let json = JSON.parse(body);
          nprice = (json['Global Quote']['05. price']);
          db.Indice.findOne({ where: { symbol: 'ixic' } }).then((ixic) => {
            ixic.set('currentprice', nprice);
            ixic.save();
          });
    
        });
        
        console.log('Price updated');
    
    }
    
    setInterval(intervalFunc, 120000);
}

module.exports = {
    loop: loop
};