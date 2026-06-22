import Image from 'next/image'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#" className="footer-logo" aria-label="ByARMS accueil">
          <div className="footer-logo-img">
            <Image src="/byarms-logo.png" alt="ByARMS" fill style={{ objectFit: 'contain', objectPosition: 'center' }} />
          </div>
          ByARMS
        </a>
        <ul className="footer-links">
          <li><a href="#ada">ADA System</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#founder">Fondateur</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="mailto:armsjonathan878@gmail.com">armsjonathan878@gmail.com</a></li>
        </ul>
        <p className="footer-copy">© 2026 ByARMS. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
