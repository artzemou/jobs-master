loader.include('client/js/car.js', () => {
  loader.include('client/js/rental.js', () => {
    loader.get(`backend/${level}/data/input.json`, (data) => {
      var output = new Array()
      data.rentals.map((rental, index) => {
        var carId = rental.car_id
        // hydrate car and rental object
        var rental = new Rental(rental.id, rental.car_id, rental.start_date, rental.end_date, rental.distance)
        data.cars.filter( car => {
            if(car.id === carId) {
              var car = new Car(carId, car.price_per_day, car.price_per_km)

              // rental decreased calculation
              rental.setAmountWithPercentDecreases(car.pricePerDay, car.pricePerKm, car.pricePerDayAfterOneDay, car.pricePerDayAfterFourDay, car.pricePerDayAfterTenDay)

              //set Options
              data.options.filter(option => {
                if(option.rental_id === rental.id) rental.setOptions(option)
              })
              rental.setOptionsAmount()
              // push rental item in rentals array
              output = [
                ...output,
                {
                  id: rental.id,
                  "options": rental.options,
                  "actions": [
                    {
                      "who": "driver",
                      "type": "debit",
                      "amount": rental.amount + rental.optionsDrivyAmount + rental.optionsOwnerAmount
                    },
                    {
                      "who": "owner",
                      "type": "credit",
                      "amount": rental.getOwnerCreditedRent(rental.amount)
                    },
                    {
                      "who": "insurance",
                      "type": "credit",
                      "amount": rental.getInsuranceFee(rental.amount)
                    },
                    {
                      "who": "assistance",
                      "type": "credit",
                      "amount": rental.getAssistanceFee()
                    },
                    {
                      "who": "drivy",
                      "type": "credit",
                      "amount": rental.getDrivyFee(rental.amount)
                    }
                  ]
                }
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
      loader.post(JSON.stringify({output: _output, level: level}))
    })
  })
})
