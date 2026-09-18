import { describe, expect, it } from 'vitest'
import {
  calculateHealthScore,
  getHealthStatus
} from './healthScore'

describe('calculateHealthScore', () => {
  it('calculates the correct health score', () => {
    const score = calculateHealthScore({
      cpu: 20,
      memory: 40,
      disk: 30
    })

    expect(score).toBe(70)
  })

  it('returns 100 when resource usage is zero', () => {
    expect(
      calculateHealthScore({
        cpu: 0,
        memory: 0,
        disk: 0
      })
    ).toBe(100)
  })

  it('throws an error for invalid values', () => {
    expect(() =>
      calculateHealthScore({
        cpu: 120,
        memory: 40,
        disk: 30
      })
    ).toThrow('Metrics must be between 0 and 100')
  })
})

describe('getHealthStatus', () => {
  it.each([
    [90, 'Excellent'],
    [70, 'Good'],
    [50, 'Warning'],
    [20, 'Critical']
  ])('returns the expected status for %i', (score, status) => {
    expect(getHealthStatus(score)).toBe(status)
  })
})
