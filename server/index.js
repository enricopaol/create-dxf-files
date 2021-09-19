import express from 'express';
const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

import * as fs from 'fs';
import makeBancali from './create-dxf/createDxf.js';




app.post('/api/create-dxf', (request, response) => {

  const data = request.body.data;

  const fileName = request.body.fileName;

  const dxfString = makeBancali(data);

  fs.writeFile(`disegni/${fileName}.dxf`, dxfString, (err) => {
    if(err) {
      console.log(err)
    } else {
      response.send(JSON.stringify({ 
        result: 'success!'
      })); 
    }
  });

});




app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
