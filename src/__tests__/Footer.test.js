import { render, screen } from '@testing-library/react'
import { Footer } from '../components/Footer'
describe('Footer', () => {
  it('Footer', async () => {
    render(<Footer />)
    expect(screen.getByText('Super Web Site@2021')).toBeInTheDocument()
  })
})
