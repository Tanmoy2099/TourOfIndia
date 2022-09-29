import classes from './Footer.module.css';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return <>
    <footer className={ `container-fluid ${classes.Footer}` }>
      <div className={ classes.footerDetails }>

        <div className={ `d-flex flex-row ${classes.about}` }>
          <ul className={ classes.info }>
            <h3>ABOUT ME</h3>
            <li > <a className={ classes.links } href="https://www.tanmoynath.me" target="_blank" rel="noreferrer" >My Portfolio</a></li>
            <li > <a className={ classes.links } href="https://github.com/Tanmoy2099" target="_blank" rel="noreferrer" >My Github</a></li>
            <li>Contact</li>
          </ul>

          <ul className={ classes.info }>
            <h3>FOR DEVELOPER</h3>
            <li>Community</li>
            <li>Developer</li>
            <li>Blog</li>
          </ul>
        </div>

        <div className={ classes.newsletter }>
          <h4>SUBSCRIBE TO GET DISCOUNTS!</h4>
          <form className={ classes.newsletterForm } action="#" method="Post">
            <input className={ classes.newsletterInput } type="text" name="text" placeholder="  Enter Your Email Id" />
            <button type="button" className={ `btn btn-outline-warning ${classes.button}` }>Subscribe</button>
          </form>
          <p>Register now to get updates on <span> Offers and Coupons</span></p>
        </div>
      </div>


      <div className={ classes.bottomFooter }>
        <h4>Copyright &copy; 2020 - { year } All Rights reserved. </h4>
        <h5>made with ❤ by <span>Tanmoy Nath</span> </h5>
      </div>
    </footer>
  </>
}

export default Footer

