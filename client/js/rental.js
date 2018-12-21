class Rental {
   constructor(id, carId, startDate, endDate, distance){
      /* *** ATTRIBUTS *** */
      this.id = id
      this.carId = carId
      this.startDate = startDate
      this.endDate = endDate
      this.distance = distance
      this.duration = this.setDuration()
      this.amount = null
      this.GPSOptionPricePerDay = 500
      this.BabySeatOptionPricePeerDay = 200
      this.AdditionalInsuranceOptionPricePeerDay = 1000
      this.options = []
      this.optionsOwnerAmount = null
      this.optionsDrivyAmount = null

   }
   /* *** METHODS *** */
   setAmount(pricePerDay, pricePerKm) {
     this.amount = this.duration * pricePerDay + this.distance * pricePerKm
   }

   setAmountWithPercentDecreases(pricePerDay, pricePerKm, pricePerDayAfterOneDay, pricePerDayAfterFourDay, pricePerDayAfterTenDay) {
     let duration = this.duration
     while (duration) {
       if (duration > 10) this.amount = this.amount +  pricePerDayAfterTenDay
       else if (duration > 4) this.amount = this.amount +  pricePerDayAfterFourDay
       else if (duration > 1) this.amount = this.amount +  pricePerDayAfterOneDay
       else this.amount = this.amount + pricePerDay
       duration--
     }
     this.amount +=  this.distance * pricePerKm
   }

   setDuration() {
      return moment(new Date(this.endDate)).diff(moment(new Date(this.startDate)), "days") + 1
   }

   getInsuranceFee(amount) {
     return amount * .3 / 2
   }

   getAssistanceFee() {
     return this.duration * 100 // 100€/peer day ???
   }

   getDrivyFee(amount) {
     return amount * .3 / 2 - this.duration * 100 + this.optionsDrivyAmount
   }

   getOwnerCreditedRent(amount) {
     return amount - (amount * .3 / 2) - (this.duration * 100) - (amount * .3 / 2 - this.duration * 100) + this.optionsOwnerAmount
   }

   setOptions(option) {
     this.options = [
       ...this.options,
       option.type
     ]

   }
   setOptionsAmount() {
     this.options.filter(option => {
       if(option === "gps") this.optionsOwnerAmount += this.GPSOptionPricePerDay * this.duration
       if(option === "baby_seat") this.optionsOwnerAmount += this.BabySeatOptionPricePeerDay * this.duration
       if(option === "additional_insurance") this.optionsDrivyAmount += this.AdditionalInsuranceOptionPricePeerDay * this.duration
     })
   }


}
