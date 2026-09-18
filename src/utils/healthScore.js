export function calculateHealthScore(metrics) {
  if (!metrics || typeof metrics !== 'object') {
    throw new Error('Metrics are required')
  }

  const {
    cpu = 0,
    memory = 0,
    disk = 0
  } = metrics

  const values = [cpu, memory, disk]

  if (values.some(value => value < 0 || value > 100)) {
    throw new Error('Metrics must be between 0 and 100')
  }

  const averageUsage = (cpu + memory + disk) / 3
  return Math.round(100 - averageUsage)
}

export function getHealthStatus(score) {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Warning'
  return 'Critical'
}
