import fs from 'fs'
import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import  path from 'path'

app.use('/client', express.static('client'))
app.use('/backend', express.static('backend'))


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  if(req.query.level) res.render('index.ejs', { method: req.query.method, level: req.query.level })
  else res.render('index.ejs', { method: null, level: null })
})

app.post('/output', (req, res) => {
  fs.writeFile(`outputs/output${req.body.level}.json`, JSON.stringify(req.body.output, null, 2), function(err){
    if(err) throw err
    else res.redirect('/')
  })
})

app.listen(8080, () => {
  console.log('Example app listening on port 8080!')
})


/*
                 ,7'  ''²?(  )
                ,7'      '?q?7'
             ..,??,.
   ,.  .,,--***²""²***--,,.  .,
 ²   ,p²''              ''²q,   ²
:  ,7'                      '7,  :
 ' ?      ,db,      ,db,      ? '
  '?                          ?'
  '?                          ?'
   '?.     .,        ,.     .?'
    'b,     '²«»«»«»²'     ,d'
     '²?bn,,          ,,nd?²'
       ,7? ''²²²²²²²²'' ?7,
     ,² ²?              ?² ²,
     ?  :?              ?:  ?
     ?   ?              ?   ?
     'b  q:            :p  d'
      '²«??.          .??»²'
         'b            d'
       ,²²'?,.      .,?'²²,
      ²==--≥²²==--==²²≤--==² */
