class Car {
   constructor(id, pricePerDay, pricePerKm){
      /* *** ATTRIBUTS *** */
      this.id = id
      this.pricePerDay = pricePerDay
      this.pricePerDayAfterOneDay = this.pricePerDay - this.pricePerDay * .1
      this.pricePerDayAfterFourDay = this.pricePerDay - this.pricePerDay * .3
      this.pricePerDayAfterTenDay = this.pricePerDay - this.pricePerDay * .5
      this.pricePerKm = pricePerKm

   }
   /* *** DEFINITION DES METHODES *** */
   generateOutput() {
      return `${this.pricePerDay}`
   }
}
