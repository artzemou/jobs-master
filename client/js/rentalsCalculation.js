utils.include('client/js/car.js', () => {
  utils.include('client/js/rental.js', () => {
    utils.get(`backend/${level}/data/input.json`, (data) => {
      var output = new Array(), price
      data.rentals.map((rental, index) => {
        var carId = rental.car_id
        // hydrate car and rental object
        var rental = new Rental(rental.id, rental.car_id, rental.start_date, rental.end_date, rental.distance)
        data.cars.filter( car => {
            if(car.id === carId) {
              var car = new Car(carId, car.price_per_day, car.price_per_km)

              // rental calculation
              let {duration, distance} = rental
              let {pricePerDay, pricePerKm} = car
              price = duration * pricePerDay + distance * pricePerKm
              // push rental item in rentals array
              output = [
                ...output,
                {id: rental.id, price: price}
              ]
            }
        })
      })

      // build outputJson
      _output = new Object()
      _output.rentals = output
      // write outputJson on client side
      document.querySelector('section').innerHTML = '<pre>'+JSON.stringify(_output, null, 2)+'</pre>'
      //write outputJson file in the root's outputs folder
      utils.post(JSON.stringify({output: _output, level: level}))
    })
  })
})
