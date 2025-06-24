import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Navigation = () => {
   // Function to navigate back to the previous page using the browser's history
  const goBack = () => {
    window.history.back(); 
  };

  return (
         // Bootstrap Navbar with a dark background and theme
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            {/* clicking virtual card text brings you to the loading screen of the app */}
            <Navbar.Brand href="/" >E-Business Card</Navbar.Brand>
            <Nav className="me-auto">
                {/* the routes present on the navigation bar */}
              <Nav.Link href="/SignUp">SignUp</Nav.Link>
              <Nav.Link href="/Login">Login</Nav.Link>
              {/* <img src="/images/back.png" alt="back" width={35} onClick={goBack}></img> */}
            </Nav>
          </Container>
      </Navbar>
  );
};

export default Navigation;