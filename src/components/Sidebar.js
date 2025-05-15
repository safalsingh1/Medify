import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
// background: #007ccf;
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBInputGroup, MDBInput, MDBIcon, MDBBtn,MDBBadge } from 'mdb-react-ui-kit';


const Nav = styled.div`
background-color:#031927;
  border-radius:20px;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border:1px solid white;
  position:sticky;
  top:0;
  z-index: 10;
 
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon2 = styled(Link)`
margin-left: 1.2rem;
font-size: 1.5rem;
height: 50px;
display: flex;
justify-content: flex-start;
align-items: center;
@media (max-width: 768px) {
  display:none
}
`;



const SidebarNav = styled.nav`
  background:#031927;
  width: ${({ expanded }) => (expanded ? '250px' : '70px')};
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  transition: 350ms;
  z-index: 10;
  border-radius:0px;
 
  @media (max-width: 768px) {
    width: ${({ expanded }) => (expanded ? '250px' : '0px')};
    border:1px solid white;
  }
`;


const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const showSidebar = () => setSidebar(!sidebar);
  
    const handleIconClick = (index) => {
    //   setSelectedItem(index);
      setSidebar(true);
    };
    
    return (
      <>
    
        <IconContext.Provider value={{ color: '#fff' }}>
          <Nav style={{display:"flex",justifyContent:"flex-start",}}>

            <NavIcon to="#" style={{flexGrow:"1"}} >
              <FaIcons.FaBars onClick={showSidebar} style={{color:"blue"}}/>
            </NavIcon>
            <div style={{display:"flex",justifyContent:"flex-start", flexGrow:"43"}}>
            <div style={{display:"flex",background:"white",padding:"2px",borderRight:"3px solid blue",borderRadius:"30px"}}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwC52NXL7L-gEAYaCJifSG1ko3VMKH0TEgyg&s" style={{height: "45px", width: "60px",background:"lightblue",borderRadius:"45px",paddingLeft:"4px",paddingRight:"4px",marginTop:"4px"}} />
            <h2 style={{color:"BLACK",marginLeft:"9px",marginTop:"7px",fontWeight:"bolder",paddingRight:"30px"}}>Medify</h2>
            </div>

            <div style={{display:"flex",marginTop:"10px",width:"600px",marginLeft:"2vw",gap:"15px",justifyContent:"center",alignItems:"center"}}>
                <h5 style={{color:"white"}}>About Us</h5>
                <Link to={"/registerorlogindoctor"}>
                <h5 style={{color:"white"}}>RegisterOrLoginDoctor</h5></Link>
                {/* <MDBDropdown>
      <MDBDropdownToggle tag='a' className='btn btn-primary'>
        Dropdown link
      </MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem link>Action</MDBDropdownItem>
        <MDBDropdownItem link>Another action</MDBDropdownItem>
        <MDBDropdownItem link>Something else here</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown> */}
                
            </div>
        
        {/* <div style={{borderRadius:"10px",marginTop:"14px"}}>
        <MDBInputGroup style={{backgroundColor:"white",borderRadius:"9px"}}>
      <MDBInput label='Search' />
      <MDBBtn rippleColor='blue' style={{color:"white",borderRadius:"9px",backgroundColor:"darkblue"}} >
        <MDBIcon icon='search' />
      </MDBBtn>
    </MDBInputGroup>
        </div> */}


        <div style={{marginLeft:"150px",display:"flex",justifyContent:"center",alignItems:"center",gap:"30px"}}>
       
        <div className='d-inline-flex position-relative'>
    <MDBBadge className='position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle'>
      <span className='visually-hidden'>New alerts</span>
    </MDBBadge>
    <img
      className='rounded-4 shadow-4'
      src='https://mdbootstrap.com/img/Photos/Avatars/man2.jpg'
      alt='Avatar'
      style={{ width: '50px', height: '50px' }}
    />
  </div>
  <i className="fas fa-sign-out-alt fa-2x" style={{color:"white"}} ></i>
  <i className="fa fa-bell fa-2x" aria-hidden="true" style={{color:"white"}}></i>

        </div>
            <div>
            
            </div>
            </div>
            

           
          </Nav>

          <SidebarNav expanded={sidebar}>
            <SidebarWrap>
              <NavIcon to="#" style={{"marginLeft":"10px"}}>
              <FaIcons.FaBars onClick={showSidebar} />
              </NavIcon>
              {SidebarData.map((item, index) => (
                <div key={index} onClick={() => handleIconClick(index)}>
                  {sidebar ? (
                    <SubMenu item={item} key={index} />
                  ) : (
                    <NavIcon2 to="#">
                      {item.iconSidebarClosed}
                    </NavIcon2>
                  )}
                </div>
              ))}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      </>
    );
  };
  
  export default Sidebar;
  
