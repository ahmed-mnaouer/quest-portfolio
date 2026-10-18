import { useId, useState } from 'react'
import './WishDemo.css'

interface DemoProduct {
  id: string
  merchant: string
  country: string
  shipping: 'Standard' | 'Express'
  price: number
  unitsSold: number
}

// Fictional interface-test data.
// Not taken from the original Wish dataset or project.
const EXAMPLE_PRODUCTS: DemoProduct[] = [
  {
    id: 'example-1',
    merchant: 'Example merchant A',
    country: 'Example country A',
    shipping: 'Standard',
    price: 12,
    unitsSold: 120,
  },
  {
    id: 'example-2',
    merchant: 'Example merchant A',
    country: 'Example country A',
    shipping: 'Express',
    price: 18,
    unitsSold: 80,
  },
  {
    id: 'example-3',
    merchant: 'Example merchant B',
    country: 'Example country B',
    shipping: 'Standard',
    price: 9,
    unitsSold: 160,
  },
  {
    id: 'example-4',
    merchant: 'Example merchant B',
    country: 'Example country B',
    shipping: 'Express',
    price: 24,
    unitsSold: 60,
  },
  {
    id: 'example-5',
    merchant: 'Example merchant C',
    country: 'Example country A',
    shipping: 'Standard',
    price: 15,
    unitsSold: 100,
  },
  {
    id: 'example-6',
    merchant: 'Example merchant C',
    country: 'Example country B',
    shipping: 'Express',
    price: 21,
    unitsSold: 40,
  },
]

const numberFormat = new Intl.NumberFormat('en')
const euroFormat = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'EUR',
})

function median(values: number[]) {
  if (values.length === 0) return null

  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)

  return sorted.length % 2 === 1
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2
}

export default function WishDemo() {
  const id = useId()
  const [enabled, setEnabled] = useState(false)
  const [country, setCountry] = useState('All')
  const [shipping, setShipping] = useState('All')
  const [merchant, setMerchant] = useState('All')

  const countries = [...new Set(EXAMPLE_PRODUCTS.map((row) => row.country))]
  const merchants = [...new Set(EXAMPLE_PRODUCTS.map((row) => row.merchant))]

  const rows = EXAMPLE_PRODUCTS.filter(
    (row) =>
      (country === 'All' || row.country === country) &&
      (shipping === 'All' || row.shipping === shipping) &&
      (merchant === 'All' || row.merchant === merchant),
  )

  const units = rows.reduce((sum, row) => sum + row.unitsSold, 0)
  const merchantCount = new Set(rows.map((row) => row.merchant)).size
  const medianPrice = median(rows.map((row) => row.price))

  const totals = new Map<string, number>()

  for (const row of rows) {
    totals.set(
      row.merchant,
      (totals.get(row.merchant) ?? 0) + row.unitsSold,
    )
  }

  const ranking = [...totals.entries()].sort((a, b) => b[1] - a[1])

  const reset = () => {
    setCountry('All')
    setShipping('All')
    setMerchant('All')
  }

  return (
    <section className="wish-demo" aria-labelledby={`${id}-heading`}>
      <header className="wish-demo-heading">
        <div>
          <p className="wish-kicker">INTERACTIVE PROTOTYPE</p>
          <h4 id={`${id}-heading`}>Wish Analytics Lab</h4>
        </div>
        <span className="wish-data-badge">Synthetic data only</span>
      </header>

      <p className="wish-disclosure">
        This demonstration uses six fictional product records to test the
        interface. Its values and comparisons are not findings from the
        original Wish project.
      </p>

      {!enabled ? (
        <div className="wish-empty">
          <p>
            Try the filters and merchant comparison. The approved project
            data has not been connected yet.
          </p>
          <button
            type="button"
            className="wish-button"
            onClick={() => setEnabled(true)}
          >
            Load illustrative example
          </button>
        </div>
      ) : (
        <>
          <div className="wish-filters">
            <label htmlFor={`${id}-country`}>
              Country of origin
              <select
                id={`${id}-country`}
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                <option value="All">All countries</option>
                {countries.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor={`${id}-shipping`}>
              Shipping
              <select
                id={`${id}-shipping`}
                value={shipping}
                onChange={(event) => setShipping(event.target.value)}
              >
                <option value="All">All shipping options</option>
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
              </select>
            </label>

            <label htmlFor={`${id}-merchant`}>
              Merchant
              <select
                id={`${id}-merchant`}
                value={merchant}
                onChange={(event) => setMerchant(event.target.value)}
              >
                <option value="All">All merchants</option>
                {merchants.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <button type="button" className="wish-button" onClick={reset}>
              Reset
            </button>
          </div>

          <p className="wish-result-status" role="status">
            Showing {rows.length} of {EXAMPLE_PRODUCTS.length} fictional
            product records.
          </p>

          <dl className="wish-metrics">
            <div>
              <dt>Product records</dt>
              <dd>{rows.length}</dd>
            </div>
            <div>
              <dt>Merchants</dt>
              <dd>{merchantCount}</dd>
            </div>
            <div>
              <dt>Example units sold</dt>
              <dd>{numberFormat.format(units)}</dd>
            </div>
            <div>
              <dt>Median example price</dt>
              <dd>
                {medianPrice === null ? '—' : euroFormat.format(medianPrice)}
              </dd>
            </div>
          </dl>

          <div className="wish-chart">
            <h5>Example units by merchant</h5>
            <p>Fixed chart scale: 0–220 fictional units.</p>

            {ranking.length === 0 ? (
              <p>No matching records. Change a filter or reset.</p>
            ) : (
              <ul className="wish-ranking">
                {ranking.map(([name, value]) => (
                  <li key={name}>
                    <div className="wish-bar-label">
                      <span>{name}</span>
                      <strong>{numberFormat.format(value)}</strong>
                    </div>
                    <div className="wish-track" aria-hidden="true">
                      <div
                        className="wish-bar"
                        style={{
                          width: `${Math.min((value / 220) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <details className="wish-definitions">
            <summary>How these example metrics are calculated</summary>
            <ul>
              <li>Product records: number of matching fictional rows.</li>
              <li>Merchants: distinct merchants in the filtered rows.</li>
              <li>Example units sold: sum of the matching unit values.</li>
              <li>Median price: middle price of the filtered product rows.</li>
            </ul>
            <p>
              No inventory-turnover, profitability, real revenue, or
              historical trend is inferred from this example.
            </p>
          </details>
        </>
      )}
    </section>
  )
}