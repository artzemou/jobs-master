class Rental {
   constructor(id, carId, startDate, endDate, distance){
      /* *** ATTRIBUTS *** */
      this.id = id
      this.carId = carId
      this.startDate = startDate
      this.endDate = endDate
      this.distance = distance
      this.duration = this.getDuration()
   }
   /* *** DEFINITION DES METHODES *** */
   getDuration() {
      return moment(new Date(this.endDate)).diff(moment(new Date(this.startDate)), "days") + 1
   }

}
