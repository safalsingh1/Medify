import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Overview',
  
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconSidebarClosed: <AiIcons.AiFillHome />, 
    subNav: [
      {
        title: 'Doctors',
        path: '/getalldoctor',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Patient',
        path: '/getallpatient',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Medicine & Room',
   
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconSidebarClosed: <AiIcons.AiFillHome />, 

    subNav: [
      {
        title: 'Medicines',
        path: '/medicine/all',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Rooms',
        path: '/rooms/all',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 3',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Articles',
    path: '/articles',
    icon: <FaIcons.FaCartPlus />,
    iconSidebarClosed: <AiIcons.AiFillHome />, 
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    iconSidebarClosed: <AiIcons.AiFillHome />

  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconSidebarClosed: <AiIcons.AiFillHome />, 

    subNav: [
      {
        title: 'Message 1',
        path: '/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Message 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    iconSidebarClosed: <AiIcons.AiFillHome />, 

  }
];