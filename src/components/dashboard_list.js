import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '../scss/custom.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartBar} from '@fortawesome/free-solid-svg-icons';
//import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
//import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons';
import {faPencilRuler} from '@fortawesome/free-solid-svg-icons';
import {faSchool} from  '@fortawesome/free-solid-svg-icons';
//import Divider from '@material-ui/core/Divider';
import Avatarimg from '../img/avatar.png';
import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export default function DashboardList() {
  const [nametoshow, setNametoshow] = useState("");

  useEffect(() => {
    setNametoshow(localStorage.getItem("Username"));
  }, [])


  /*
  <ListItem>
          <ListItemIcon>
            
          </ListItemIcon>
            <ListItemText primary={<b>My Classes</b>} />
          </ListItem>
         
            <Link to="/portal/dashboard/syllabus" className="custom-link-normal">

          <ListItem>
            <ListItemIcon>
              <FontAwesomeIcon icon={faCalculator} size='2x' />
            </ListItemIcon>
            <ListItemText primary="IB Mathematics" />
          </ListItem>
            </Link>

            ---------

            <Link to="/portal/dashboard/schedule" className="custom-link-normal">
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon icon={faCalendarAlt} size='2x' />
              </ListItemIcon>
              <ListItemText primary="Schedule" />
            </ListItem>
          </Link>


          ---------

          <Divider></Divider>
      <List>
        <div>


        </div>
      </List>
      <Divider></Divider>
  
  */

  return (
    <>
      <List>
        <div>
          <ListItem>
            <ListItemIcon>
              <Avatar alt={nametoshow} src={Avatarimg} />
            </ListItemIcon>
            <ListItemText primary={nametoshow} />
          </ListItem>

          

          <Link to="/admin/dashboard/courses" className="custom-link-normal">
            <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faBookmark} size='2x' />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem>
          </Link>

          <Link to="/admin/dashboard/syllabus" className="custom-link-normal">
            <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faPencilRuler} size='2x' />
              </ListItemIcon>
              <ListItemText primary="Syllabus" />
            </ListItem>
          </Link>

          <Link to="/admin/dashboard/class" className="custom-link-normal">
            <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faSchool} size='2x' />
              </ListItemIcon>
              <ListItemText primary="Class" />
            </ListItem>
          </Link>

          <Link to="/admin/dashboard/lessons" className="custom-link-normal">
            <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faBookOpen} size='2x' />
              </ListItemIcon>
              <ListItemText primary="Lessons" />
            </ListItem>
          </Link>
        
          <Link to="/admin/dashboard/students" className="custom-link-normal">
            <ListItem button>
              <ListItemIcon>
              <FontAwesomeIcon icon={faUsers} size='2x' />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Link>

          <Link to="/admin/dashboard/analytics" className="custom-link-normal">
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon icon={faChartBar} size='2x' />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
          </Link>

        </div>
      </List>

      <List>
        <div>
          <Link to="/admin/" className="custom-link-normal">
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon icon={faSignOutAlt} size='2x' />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </Link>
        </div>
      </List>
    </>
  );
}

