import Link from 'next/link'

const Header = props =>
  <header>
    <nav className="wrapper">
      <div className="logo"><Link href="/"><a>Logo</a></Link></div>
      <div className="links">
        <Link href="#"><a>Link</a></Link>
        <Link href="#"><a>Link</a></Link>
        <Link href="#"><a>Link</a></Link>
        <Link href="#"><a>Link</a></Link>
        <Link href="#"><a>Link</a></Link>
      </div>
      <div className="social">
        <a href="#">Social</a>
        <a href="#">Social</a>
        <a href="#">Social</a>
        <a href="#">Social</a>
      </div>
    </nav>
    <style jsx>{`
      header {
        .wrapper {
          display: grid;
          grid-template-columns: 1fr 50rem 50rem;
          align-items: center;
        }
      }

      .links,
      .social {
        a {
          padding: 1rem 3rem;
          text-align: center;
          display: inline-block;
        }
      }
    `}</style>
  </header>

export default Header
