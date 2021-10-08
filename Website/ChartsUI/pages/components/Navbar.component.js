import React, { Component } from 'react';
import {Navbar, Nav, Dropdown, Icon, Button, Affix} from 'rsuite'
import NavItem from 'rsuite/lib/Nav/NavItem';

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
     <Navbar {...props} >
       <Nav pullLeft>
         <Nav.Item href="/" >
         🏋️ <b>Strong App Analytics</b>
         </Nav.Item>
         </Nav>
         <Nav pullRight>
           <Nav.Item href="https://github.com/AlexandrosKyriakakis/StrongAppAnalytics" icon={<Icon icon="github" />}><b>Github</b></Nav.Item>
           <Nav.Item href="https://pay.revolut.com/alexanog30" icon={<Icon icon="heart" />}><b>Donate</b></Nav.Item>
         </Nav>

     </Navbar>
   );
 };
 
 export default class NavBar extends Component {
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
         <Affix>
         <NavBarInstance activeKey={activeKey} onSelect={this.handleSelect} />
         </Affix>
       </div>
     );
   }
 }
 
 