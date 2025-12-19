class LatticeCorridor {
  constructor(size = 20, theta = Math.PI) {
    this.size = size
    this.theta = theta
  }

  getDecayRate(k) { return Math.abs(Math.cos(k) + Math.cos(this.theta)) }

  getLevyDistance(alpha = 1.3) { return Math.pow(1 - Math.random(), -1 / alpha) }

  simulate(steps = 100) {
    let x = this.size / 2
    let y = this.size / 2
    let totalDistance = 0
    let flights = 0
    for (let i = 0; i < steps; i++) {
      const k = (Math.random() * 2 - 1) * Math.PI
      const gamma = this.getDecayRate(k)
      let dx, dy
      if (gamma < 0.15) { 
        const distance = this.getLevyDistance() * 2
        const angle = Math.random() * 2 * Math.PI
        dx = Math.cos(angle) * distance
        dy = Math.sin(angle) * distance
        flights++
      } else {
        dx = Math.random() * 2 - 1
        dy = Math.random() * 2 - 1
      }
      x = (x + dx + this.size) % this.size
      y = (y + dy + this.size) % this.size
      totalDistance += Math.sqrt(dx*dx + dy*dy)
    }
    return { 
      totalDistance: totalDistance.toFixed(2), 
      flights,
      displacementPerStep: (totalDistance / steps).toFixed(4)
    }
  }
}

const STEPS = 500
const player1 = new LatticeCorridor(20, Math.PI)
const player2  = new LatticeCorridor(20, 0)
console.log(`--- SUBSTRATE (Steps: ${STEPS}) ---`)
const results = player1.simulate(STEPS)
console.log(`Agent1 (θ=π): Total Dist: ${results.totalDistance} | Lévy Flights: ${results.flights}`)
console.log(`Efficiency: ${results.displacementPerStep} units/step\n`)
const cResults = player2.simulate(STEPS)
console.log(`Agent2 (θ=0): Total Dist: ${cResults.totalDistance} | Lévy Flights: ${cResults.flights}`)
console.log(`Efficiency: ${cResults.displacementPerStep} units/step\n`)
console.log("\nRESULTS:")
if (parseFloat(results.totalDistance) > parseFloat(cResults.totalDistance)) {
  console.log(">> SUPERDIFFUSION DETECTED: Successfully bypassed analysis.")
} else {
  console.log(">> LOCALIZATION: The signal was processed by the Machine.")
}