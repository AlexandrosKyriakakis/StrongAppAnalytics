import React, { Component } from 'react';
import {Navbar, Nav, Dropdown, Icon} from 'rsuite'
import 'rsuite/lib/styles/themes/dark/index.less';
/**
 * .navbar-brand {
 *   padding: 18px 20px;
 *   display: inline-block;
 * }
 * <Nav onSelect={onSelect} activeKey={activeKey}>
           <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
              Home
           </Nav.Item>
           <Nav.Item eventKey="2">News</Nav.Item>
           <Nav.Item eventKey="3">Products</Nav.Item>
           <Dropdown title="About">
             <Dropdown.Item eventKey="4">Company</Dropdown.Item>
             <Dropdown.Item eventKey="5">Team</Dropdown.Item>
             <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
           </Dropdown>
         </Nav>
 */
 const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
   return (
     <Navbar {...props}>
       <Navbar.Header>
         <a href="/" className="navbar-brand logo">
         🏋️ Strong App Analytics
         </a>
       </Navbar.Header>
       <Navbar.Body>
         
         <Nav pullRight>
           <Nav.Item href="https://pay.revolut.com/alexanog30" icon={<Icon icon="heart" />}>Donate</Nav.Item>
         </Nav>
       </Navbar.Body>
     </Navbar>
   );
 };
 
 export default class Demo extends Component {
   constructor(props) {
     super(props);
     this.handleSelect = this.handleSelect.bind(this);
     this.state = {
       activeKey: null
     };
   }
   handleSelect(eventKey) {
     this.setState({
       activeKey: eventKey
     });
   }
   render() {
     const { activeKey } = this.state;
     return (
       <div className="nav-wrapper">
         <NavBarInstance activeKey={activeKey} onSelect={this.handleSelect} />

       </div>
     );
   }
 }
 
 