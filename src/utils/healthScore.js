/**
 * Calculate a computer health score from resource usage.
 *
 * A lower resource utilization produces a higher health score.
 *
 * @param {Object} metrics
 * @param {number} metrics.cpu
 * @param {number} metrics.memory
 * @param {number} metrics.disk
 * @returns {number}
 */
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

  const containsInvalidType = values.some(
    value => typeof value !== 'number' || Number.isNaN(value)
  )

  if (containsInvalidType) {
    throw new Error('Metrics must be valid numbers')
  }

  const containsOutOfRangeValue = values.some(
    value => value < 0 || value > 100
  )

  if (containsOutOfRangeValue) {
    throw new Error('Metrics must be between 0 and 100')
  }

  const averageUsage = (cpu + memory + disk) / 3

  return Math.round(100 - averageUsage)
}

/**
 * Convert a numeric health score to a status.
 *
 * @param {number} score
 * @returns {'Excellent'|'Good'|'Warning'|'Critical'}
 */
export function getHealthStatus(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) {
    throw new Error('Score must be a valid number')
  }

  if (score < 0 || score > 100) {
    throw new Error('Score must be between 0 and 100')
  }

  if (score >= 80) {
    return 'Excellent'
  }

  if (score >= 60) {
    return 'Good'
  }

  if (score >= 40) {
    return 'Warning'
  }

  return 'Critical'
}
