import { describe, expect, it } from 'vitest'

import {
  calculateHealthScore,
  getHealthStatus
} from './healthScore'

describe('calculateHealthScore', () => {
  it('calculates the correct score', () => {
    expect(
      calculateHealthScore({
        cpu: 20,
        memory: 40,
        disk: 30
      })
    ).toBe(70)
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

  it('returns zero when all resource usage is 100', () => {
    expect(
      calculateHealthScore({
        cpu: 100,
        memory: 100,
        disk: 100
      })
    ).toBe(0)
  })

  it('uses zero when an individual metric is missing', () => {
    expect(
      calculateHealthScore({
        cpu: 30
      })
    ).toBe(90)
  })

  it('throws when metrics are missing', () => {
    expect(() => calculateHealthScore()).toThrow(
      'Metrics are required'
    )
  })

  it('rejects values higher than 100', () => {
    expect(() => {
      calculateHealthScore({
        cpu: 120,
        memory: 40,
        disk: 30
      })
    }).toThrow('Metrics must be between 0 and 100')
  })

  it('rejects negative values', () => {
    expect(() => {
      calculateHealthScore({
        cpu: -5,
        memory: 40,
        disk: 30
      })
    }).toThrow('Metrics must be between 0 and 100')
  })

  it('rejects non-numeric values', () => {
    expect(() => {
      calculateHealthScore({
        cpu: 'high',
        memory: 40,
        disk: 30
      })
    }).toThrow('Metrics must be valid numbers')
  })
})

describe('getHealthStatus', () => {
  it.each([
    [100, 'Excellent'],
    [80, 'Excellent'],
    [79, 'Good'],
    [60, 'Good'],
    [59, 'Warning'],
    [40, 'Warning'],
    [39, 'Critical'],
    [0, 'Critical']
  ])(
    'returns the correct status',
    (score, expectedStatus) => {
      expect(getHealthStatus(score)).toBe(expectedStatus)
    }
  )

  it('rejects invalid score types', () => {
    expect(() => getHealthStatus('90')).toThrow(
      'Score must be a valid number'
    )
  })

  it('rejects scores outside the valid range', () => {
    expect(() => getHealthStatus(120)).toThrow(
      'Score must be between 0 and 100'
    )
  })
})
